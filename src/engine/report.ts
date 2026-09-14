import { and, desc, eq, sql } from "drizzle-orm";
import { artifacts as artifactsTable, sessions, stepAttempts, steps } from "./schema.ts";
import type { CheckCtx, StepCtx } from "../types/context.ts";
import type { ExecutableStepDef, StepDef } from "../types/workflow-def.ts";
import type { ReportInput, ReportResult, StatusResult, AttemptResult } from "../types/result.ts";
import {
  openSessionDb,
  importWorkflowDef,
  importWorkflowDefFromPath,
  isPathLike,
  getArtifacts,
  getGateAnswers,
  getLoopBodyRange,
  getLoopContext,
  getLoopMaxIterations,
  getLoopOnExhausted,
  getInnermostEnclosingLoop,
  registerHookArtifacts,
  resolveNextExecutableStep,
  findLoopResumeStep,
  flattenStepDefs,
  rewindSteps,
  EngineError,
} from "./store.ts";
import type { StepRow, TadoDb } from "./store.ts";

/**
 * リトライ予算を使い切ったステップの失敗を処理する（onFail: abort / escalate）。
 *
 * `continue` はループの巻き戻しとして report 本体が処理するためここには来ない。
 */
function handleStepFailure(
  db: TadoDb,
  sessionId: string,
  step: StepRow,
  stepDef: StepDef | undefined,
  input: ReportInput,
  checkStatus: "fail" | "error",
  checkReasons: string[],
): ReportResult {
  const newRetryCount = step.retryCount + 1;
  const maxRetries = step.maxRetries;

  // リトライ予算が残っている間は onFail を適用しない。
  if (newRetryCount <= maxRetries) {
    db.update(steps)
      .set({ retryCount: newRetryCount, status: "pending" })
      .where(eq(steps.id, step.id))
      .run();
    db.update(sessions)
      .set({ currentStep: step.stepKey, updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "retry",
      message: `Check failed. Retry ${newRetryCount}/${maxRetries}`,
    };
  }

  const onFailAction = step.onFailAction;
  const defOnFail = stepDef && stepDef.type !== "loop" ? stepDef.onFail : undefined;

  // セッション作成後にワークフロー定義の onFail が変わったドリフトを、ここで
  // 無言に適用しない。失敗元ステップを failed に確定させてから拒否する。
  const defAction = defOnFail?.action ?? null;
  if (defAction !== onFailAction) {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    throw new EngineError(
      `onFail drift detected for step "${step.stepKey}" in session ${sessionId}: definition has action "${defAction ?? ""}", but the session was created with action "${onFailAction ?? ""}". Start a new session or restore the original workflow definition`,
    );
  }

  if (onFailAction === "abort") {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    db.update(sessions)
      .set({ status: "aborted", updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "abort",
      message: "Step failed and onFail=abort. Session aborted.",
    };
  }

  if (onFailAction === "escalate") {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    db.update(sessions)
      .set({ status: "paused", updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "escalate",
      message: "Step failed and onFail=escalate. Human intervention required.",
    };
  }

  db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
  return {
    sessionId,
    stepKey: input.stepKey,
    checkResult: { status: checkStatus, reasons: checkReasons },
    nextAction: "abort",
    message: `Step failed after ${maxRetries} retries. Session stopped.`,
  };
}

export async function report(
  sessionId: string,
  input: ReportInput,
  workflowPath?: string,
): Promise<ReportResult> {
  const db = openSessionDb(sessionId);

  const session = db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
  if (!session) {
    db.$client.close();
    throw new EngineError(`Session not found: ${sessionId}`);
  }
  const sessionDir = session.sessionDir;

  // 係属ステップ以外の report は受理しない。オーケストレーターが別ステップとして
  // 報告して正規化・判定ステップを迂回するのを構造的に排除する
  //（human_gate 排除と同型のガード。goto・リトライは currentStep 自体を書き換える
  // ため、厳密一致チェックと両立する）。
  if (input.stepKey !== session.currentStep) {
    db.$client.close();
    throw new EngineError(
      `Step mismatch: current step is '${session.currentStep}', but report targets '${input.stepKey}'. Report the current step instead.`,
    );
  }

  const resolvedWorkflowPath = workflowPath ?? session.workflowPath;
  if (!resolvedWorkflowPath) {
    db.$client.close();
    throw new EngineError("No workflow path available");
  }

  const step = db
    .select()
    .from(steps)
    .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, input.stepKey)))
    .get();
  if (!step) {
    db.$client.close();
    throw new EngineError(`Step not found: ${input.stepKey}`);
  }

  // human_gate の回答は report では受理しない（ADR-0007）。
  // 人間は自分の端末から `tado confirm` で回答する。LLM の転記は捏造になりうるため
  // 構造的に排除する。
  if (step.type === "human_gate") {
    db.$client.close();
    throw new EngineError(
      `human_gate steps cannot be reported. The human must run: tado confirm --session ${sessionId}`,
    );
  }

  // loop 行は実行ステップではない。本体のステップを report する。
  if (step.type === "loop") {
    db.$client.close();
    throw new EngineError(
      `Loop steps cannot be reported: ${input.stepKey}. Report the loop body steps instead.`,
    );
  }

  const isPath = isPathLike(resolvedWorkflowPath);
  const def = isPath
    ? await importWorkflowDefFromPath(resolvedWorkflowPath)
    : await importWorkflowDef(resolvedWorkflowPath);
  const stepDef = flattenStepDefs(def.steps).find(({ def: s }) => s.key === input.stepKey)?.def;

  const attempt = db
    .select()
    .from(stepAttempts)
    .where(eq(stepAttempts.stepId, step.id))
    .orderBy(desc(stepAttempts.attemptNumber))
    .limit(1)
    .get();
  if (!attempt) {
    db.$client.close();
    throw new EngineError(`No attempt found for step: ${input.stepKey}`);
  }

  db.update(stepAttempts)
    .set({
      endedAt: sql`datetime('now')`,
      resultJson: input.subagentOutput ?? null,
      subtaskResultsJson: input.subtaskResults ? JSON.stringify(input.subtaskResults) : null,
    })
    .where(eq(stepAttempts.id, attempt.id))
    .run();

  if (input.artifacts && input.artifacts.length > 0) {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    for (const a of input.artifacts) {
      db.insert(artifactsTable)
        .values({
          sessionId,
          stepKey: input.stepKey,
          artifactKey: a.key,
          filePath: a.path,
          createdAt: now,
        })
        .run();
    }
  }

  let checkStatus: "pass" | "fail" | "error" | "continue" = "pass";
  let checkReasons: string[] = [];

  // loop 行は上のガードで除外済みだが、型上は StepDef ユニオンなので絞り込む
  const executableStepDef: ExecutableStepDef | undefined =
    stepDef && stepDef.type !== "loop" ? stepDef : undefined;

  if (executableStepDef) {
    const gateAnswers = getGateAnswers(db, sessionId);

    if (executableStepDef.afterStep) {
      const stepCtx: StepCtx = {
        sessionDir,
        sessionId,
        gateAnswers,
        artifacts: getArtifacts(db, sessionId),
        stepKey: step.stepKey,
        attemptNumber: attempt.attemptNumber,
        loop: getLoopContext(db, sessionId, step.stepKey),
      };
      const hookArtifacts = await executableStepDef.afterStep(stepCtx);
      if (hookArtifacts.length > 0) {
        registerHookArtifacts(db, sessionId, step.stepKey, hookArtifacts, "afterStep");
      }
    }

    const artifacts = getArtifacts(db, sessionId);
    const attemptResult: AttemptResult = {
      status: input.status,
      subagentOutput: input.subagentOutput,
      errors: input.errors,
    };

    const checkCtx: CheckCtx = {
      sessionDir,
      sessionId,
      gateAnswers,
      artifactDbPath: session.artifactDbPath ?? undefined,
      attemptResult,
      artifacts,
      loop: getLoopContext(db, sessionId, step.stepKey),
    };

    try {
      const result = await executableStepDef.check(checkCtx);
      checkStatus = result.status;
      checkReasons = result.reasons;
    } catch (e) {
      checkStatus = "error";
      checkReasons = [e instanceof Error ? e.message : String(e)];
    }
  } else {
    checkStatus = input.status === "completed" ? "pass" : "fail";
    checkReasons = input.errors ? [input.errors] : [];
  }

  db.update(stepAttempts)
    .set({ checkResultsJson: JSON.stringify(checkReasons), checkStatus })
    .where(eq(stepAttempts.id, attempt.id))
    .run();

  if (checkStatus === "pass") {
    db.update(steps).set({ status: "passed" }).where(eq(steps.id, step.id)).run();
    // このパスで本体が完了した loop 行の確定と次ステップの解決は
    // store.resolveNextExecutableStep に集約されている（loop 行は実行対象外）。
    const nextStep = resolveNextExecutableStep(db, sessionId, step.stepIndex);

    if (nextStep) {
      db.update(sessions)
        .set({ currentStep: nextStep.stepKey, updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      db.$client.close();
      return {
        sessionId,
        stepKey: input.stepKey,
        checkResult: { status: checkStatus, reasons: checkReasons },
        nextAction: "continue",
        message: `Step passed. Next step: ${nextStep.stepKey}`,
      };
    } else {
      db.update(sessions)
        .set({ status: "done", updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      db.$client.close();
      return {
        sessionId,
        stepKey: input.stepKey,
        checkResult: { status: checkStatus, reasons: checkReasons },
        nextAction: "done",
        message: "All steps completed. Session done.",
      };
    }
  }

  if (checkStatus === "continue") {
    try {
      return handleLoopContinue(db, sessionId, step, input, checkStatus, checkReasons);
    } finally {
      db.$client.close();
    }
  }

  try {
    return handleStepFailure(db, sessionId, step, stepDef, input, checkStatus, checkReasons);
  } finally {
    db.$client.close();
  }
}

/**
 * ループ本体の check が `continue` を返したときの次イテレーション適用。
 *
 * 失敗元ステップを包む最も内側の loop に帰属させ、本体全体を pending +
 * retryCount=0 に巻き戻して本体先頭から再開する。ネストした内側 loop の
 * 反復状態も初期化される。`maxIterations` に達した場合は `onExhausted`
 * （escalate / abort）を適用する。ループ外で返された `continue` は fail-fast する。
 */
function handleLoopContinue(
  db: TadoDb,
  sessionId: string,
  step: StepRow,
  input: ReportInput,
  checkStatus: "continue",
  checkReasons: string[],
): ReportResult {
  const loopRow = getInnermostEnclosingLoop(db, sessionId, step.stepKey);
  if (!loopRow) {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    db.update(sessions)
      .set({ status: "aborted", updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    throw new EngineError(
      `check returned "continue" outside a loop for step "${step.stepKey}" in session ${sessionId}: continue is only valid in a loop body`,
    );
  }

  const maxIterations = getLoopMaxIterations(loopRow);
  const nextIteration = loopRow.loopIteration + 1;
  if (nextIteration > maxIterations) {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    // 欠落・未知値はより破壊的な abort へ無言で丸めず、EngineError で fail-fast する
    //（step は failed に確定済み。onFail ドリフト検出と同方針）。
    const onExhausted = getLoopOnExhausted(loopRow);
    if (onExhausted === "escalate") {
      db.update(sessions)
        .set({ status: "paused", updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      return {
        sessionId,
        stepKey: input.stepKey,
        checkResult: { status: checkStatus, reasons: checkReasons },
        nextAction: "escalate",
        message: `Loop "${loopRow.stepKey}" reached maxIterations ${maxIterations}. Step "${step.stepKey}" failed. Human intervention required.`,
      };
    }
    db.update(sessions)
      .set({ status: "aborted", updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "abort",
      message: `Loop "${loopRow.stepKey}" reached maxIterations ${maxIterations}. Session aborted.`,
    };
  }

  const bodyRange = getLoopBodyRange(db, sessionId, loopRow.stepKey);
  if (!bodyRange) {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    throw new EngineError(
      `Cannot rewind loop "${loopRow.stepKey}": loop body is empty (session ${sessionId})`,
    );
  }

  // 本体の巻き戻し・反復回数の更新・currentStep 更新を同一トランザクションで
  // 確定し、途中失敗で半端な状態を残さない。
  db.run(sql`BEGIN IMMEDIATE`);
  try {
    rewindSteps(db, sessionId, bodyRange.fromStepIndex, bodyRange.toStepIndex);
    db.update(steps).set({ loopIteration: nextIteration }).where(eq(steps.id, loopRow.id)).run();

    // loop 内再開位置の解決は store.findLoopResumeStep に集約されている。
    const firstStep = findLoopResumeStep(db, sessionId, loopRow);
    if (!firstStep) {
      throw new EngineError(
        `Cannot rewind loop "${loopRow.stepKey}": loop body has no executable step (session ${sessionId})`,
      );
    }

    db.update(sessions)
      .set({ currentStep: firstStep.stepKey, updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    db.run(sql`COMMIT`);

    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "repeat",
      message: `Check returned continue. Loop "${loopRow.stepKey}" iteration ${nextIteration}/${maxIterations}. Rewinding to loop start: ${firstStep.stepKey}`,
    };
  } catch (error) {
    try {
      db.run(sql`ROLLBACK`);
    } catch {
      // ロールバック自体が失敗しても元のエラーを優先する。
    }
    throw error;
  }
}

export function status(sessionId: string): StatusResult {
  const db = openSessionDb(sessionId);

  const session = db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
  if (!session) {
    db.$client.close();
    throw new EngineError(`Session not found: ${sessionId}`);
  }

  const stepRows = db
    .select()
    .from(steps)
    .where(eq(steps.sessionId, sessionId))
    .orderBy(steps.stepIndex)
    .all();

  const stepsResult = stepRows.map((s) => {
    const attemptRows = db
      .select()
      .from(stepAttempts)
      .where(eq(stepAttempts.stepId, s.id))
      .orderBy(stepAttempts.attemptNumber)
      .all();

    const attempts = attemptRows.map((a) => {
      return {
        attemptNumber: a.attemptNumber,
        startedAt: a.startedAt,
        endedAt: a.endedAt,
        checkStatus: a.checkStatus,
      };
    });

    return {
      key: s.stepKey,
      phase: s.phase ?? "",
      type: s.type,
      status: s.status,
      retryCount: s.retryCount,
      maxRetries: s.maxRetries,
      attempts,
    };
  });

  db.$client.close();

  return {
    sessionId,
    workflowId: session.workflowId,
    sessionStatus: session.status,
    currentStep: session.currentStep,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    steps: stepsResult,
  };
}
