import { and, desc, eq, gt, sql } from "drizzle-orm";
import { artifacts as artifactsTable, sessions, stepAttempts, steps } from "./schema.ts";
import type { CheckCtx, StepCtx } from "../types/context.ts";
import type { StepDef } from "../types/workflow-def.ts";
import type { ReportInput, ReportResult, StatusResult, AttemptResult } from "../types/result.ts";
import {
  openSessionDb,
  importWorkflowDef,
  importWorkflowDefFromPath,
  isPathLike,
  getArtifacts,
  getGateAnswers,
  registerHookArtifacts,
  rewindSteps,
  EngineError,
} from "./store.ts";
import type { StepRow, TadoDb } from "./store.ts";

function handleStepFailure(
  db: TadoDb,
  sessionId: string,
  step: StepRow,
  stepDef: StepDef | undefined,
  input: ReportInput,
  checkStatus: "pass" | "fail" | "error",
  checkReasons: string[],
): ReportResult {
  const newRetryCount = step.retryCount + 1;
  const maxRetries = step.maxRetries;

  // リトライ予算が残っている間は onFail を適用しない。onFail のドリフト検証や
  // reset の対象解決はここで行わない（成功経路・リトライ経路を brick させない）。
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
  const onFailTarget = step.onFailTarget;
  const onFailReset = step.onFailReset ?? null;
  const defOnFail = stepDef?.onFail;

  // セッション作成後にワークフロー定義の onFail が変わったドリフトを、ここで
  // 無言に適用しない。失敗元ステップを failed に確定させてから拒否する。
  // reset も action/target と同様に steps へスナップショット済みで、定義側が
  // 後から reset を追記/削除しても適用前に食い違いとして検出する。マイグレーション
  // 前の既存セッションの NULL は「reset 未指定」として扱う（ADR-0025）。
  const defAction = defOnFail?.action ?? null;
  const defTarget = defOnFail?.target ?? null;
  const defReset = defOnFail?.reset ?? null;
  if (defAction !== onFailAction || defTarget !== onFailTarget || defReset !== onFailReset) {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    throw new EngineError(
      `onFail drift detected for step "${step.stepKey}" in session ${sessionId}: definition has action "${defAction ?? ""}" target "${defTarget ?? ""}" reset "${defReset ?? ""}", but the session was created with action "${onFailAction ?? ""}" target "${onFailTarget ?? ""}" reset "${onFailReset ?? ""}". Start a new session or restore the original workflow definition`,
    );
  }

  // reset の適用判定はセッション作成時に凍結したスナップショットを基準にし、
  // 対象解決・範囲検証はリトライ予算を使い切ったこの時点で行う（ADR-0025）。
  if (onFailReset === "downstream") {
    const resetTargetRow = onFailTarget
      ? db
          .select({ stepIndex: steps.stepIndex })
          .from(steps)
          .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, onFailTarget)))
          .get()
      : undefined;
    if (!onFailTarget || !resetTargetRow) {
      db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
      throw new EngineError(
        `Cannot reset downstream: onFail.target "${onFailTarget ?? ""}" was not found in session ${sessionId} (step "${step.stepKey}")`,
      );
    }
    if (resetTargetRow.stepIndex > step.stepIndex) {
      db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
      throw new EngineError(
        `Cannot reset downstream: onFail.target "${onFailTarget}" (stepIndex ${resetTargetRow.stepIndex}) is after failing step "${step.stepKey}" (stepIndex ${step.stepIndex})`,
      );
    }
    // 巻き戻しと currentStep 更新を BEGIN IMMEDIATE / COMMIT で囲み、
    // 途中で失敗しても「steps は pending だが currentStep は失敗元」という
    // 半端な状態を残さない（ADR-0025）。
    db.run(sql`BEGIN IMMEDIATE`);
    try {
      rewindSteps(db, sessionId, resetTargetRow.stepIndex, step.stepIndex);
      db.update(sessions)
        .set({ currentStep: onFailTarget, updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      db.run(sql`COMMIT`);
    } catch (error) {
      try {
        db.run(sql`ROLLBACK`);
      } catch {
        // ロールバック自体が失敗しても元のエラーを優先する。
      }
      throw error;
    }
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "goto",
      targetStep: onFailTarget,
      message: `Step failed after ${maxRetries} retries. Rewinding steps ${onFailTarget}..${step.stepKey} to pending. Going to: ${onFailTarget}`,
    };
  }

  if (onFailAction === "goto" && onFailTarget) {
    db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
    db.update(sessions)
      .set({ currentStep: onFailTarget, updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "goto",
      targetStep: onFailTarget,
      message: `Step failed after ${maxRetries} retries. Going to: ${onFailTarget}`,
    };
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

  const isPath = isPathLike(resolvedWorkflowPath);
  const def = isPath
    ? await importWorkflowDefFromPath(resolvedWorkflowPath)
    : await importWorkflowDef(resolvedWorkflowPath);
  const stepDef = def.steps.find((s) => s.key === input.stepKey);

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

  let checkStatus: "pass" | "fail" | "error" = "pass";
  let checkReasons: string[] = [];

  if (stepDef) {
    const gateAnswers = getGateAnswers(db, sessionId);

    if (stepDef.afterStep) {
      const stepCtx: StepCtx = {
        sessionDir,
        sessionId,
        gateAnswers,
        artifacts: getArtifacts(db, sessionId),
        stepKey: step.stepKey,
        attemptNumber: attempt.attemptNumber,
      };
      const hookArtifacts = await stepDef.afterStep(stepCtx);
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
    };

    try {
      const result = await stepDef.check(checkCtx);
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

    const nextStep = db
      .select()
      .from(steps)
      .where(
        and(
          eq(steps.sessionId, sessionId),
          gt(steps.stepIndex, step.stepIndex),
          eq(steps.status, "pending"),
        ),
      )
      .orderBy(steps.stepIndex)
      .limit(1)
      .get();

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
  } else {
    try {
      return handleStepFailure(db, sessionId, step, stepDef, input, checkStatus, checkReasons);
    } finally {
      db.$client.close();
    }
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
