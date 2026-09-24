import type { ExecutableStepDef, StepDef } from "../types/workflow-def.ts";
import type { GateAnswers, PromptCtx, StepCtx } from "../types/context.ts";
import type { ArtifactInput, ArtifactRecord } from "../types/artifact.ts";
import type { AttemptSummary, NextResult, ParallelNextResult } from "../types/result.ts";
import { eq, sql } from "drizzle-orm";
import { sessions, stepAttempts, steps } from "./schema.ts";
import {
  openSessionDb,
  importWorkflowDef,
  importWorkflowDefFromPath,
  isPathLike,
  getPreviousAttempts,
  getArtifacts,
  getGateAnswers,
  getLoopContext,
  registerHookArtifacts,
  buildConditionCtx,
  resolveExecutableStep,
  resolveNextExecutableStep,
  completeSessionIfDone,
  flattenStepDefs,
  EngineError,
} from "./store.ts";
import type { SessionRow, StepRow, TadoDb } from "./store.ts";
import {
  appendNextSection,
  buildHumanGateNextSection,
  buildParallelNextSection,
  buildTaskNextSection,
  confirmCommand,
  reportCommand,
} from "./guidance.ts";

/** buildPrompt 結果の末尾に付与するボイラープレート生成に必要な試行情報。 */
interface AttemptInfo {
  attemptNumber: number;
  maxRetries: number;
  previousAttempts: AttemptSummary[];
}

/** 過去の試行の check 理由（JSON 文字列）を表示用の文字列配列に変換する。 */
function parseCheckReasons(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
    return [String(parsed)];
  } catch {
    return [raw];
  }
}

/**
 * リトライ時の前回試行フィードバックを構築する。
 *
 * pass 試行（成功済み）は混入させず、直近の失敗試行（fail / error）のみを
 * 対象にする。失敗試行がなければ空文字（フィードバック節は出力しない）。
 * 例: loop の次イテレーションで再実行されるステップでは、過去の pass 試行が
 * 「前回の試行」としてモデルに誤解を与えないようにする（difit 指摘対応）。
 */
function buildRetryFeedback(attempts: AttemptSummary[]): string {
  const failedAttempts = attempts.filter(
    (attempt) => attempt.checkStatus === "fail" || attempt.checkStatus === "error",
  );
  if (failedAttempts.length === 0) return "";
  const blocks = failedAttempts.map((attempt) => {
    const status = attempt.checkStatus ? `（${attempt.checkStatus}）` : "";
    const reasons = parseCheckReasons(attempt.checkResults);
    const reasonLines =
      reasons.length > 0
        ? reasons.map((reason) => `  - ${reason}`).join("\n")
        : "  - （理由の記録なし）";
    return `- 試行 ${attempt.attemptNumber}${status}\n${reasonLines}`;
  });
  return `## 前回の試行フィードバック\n\n${blocks.join("\n")}`;
}

/**
 * buildPrompt 結果の末尾に連結するボイラープレート（セッション情報・
 * リトライフィードバック）を構築する（ADR-0003）。
 */
function buildBoilerplate(sessionDir: string, attempt: AttemptInfo): string {
  const lines = [
    "## セッション情報",
    "",
    `- セッションディレクトリ: ${sessionDir}`,
    `- 試行: ${attempt.attemptNumber}/${attempt.maxRetries}`,
  ];
  const feedback = buildRetryFeedback(attempt.previousAttempts);
  if (feedback) {
    lines.push("", feedback);
  }
  return lines.join("\n");
}

/** buildPrompt の戻り値にボイラープレートを末尾連結する。 */
function appendBoilerplate(prompt: string, boilerplate: string): string {
  return prompt === "" ? boilerplate : `${prompt}\n\n${boilerplate}`;
}

/**
 * Build the full prompt/result for the current step without touching the DB.
 *
 * Shared by the normal allocation path and the idempotent resume path so a
 * resumed `next` returns exactly the same prompt as the original call.
 */
function buildNextResult(
  sessionId: string,
  session: SessionRow,
  currentStep: StepRow,
  stepDef: ExecutableStepDef,
  promptCtx: PromptCtx,
  artifacts: ArtifactRecord[],
  attempt: AttemptInfo,
): NextResult {
  if (stepDef.type === "human_gate") {
    const hg = stepDef.humanGate;
    const artifactList = hg.presentArtifacts
      .map((k) => artifacts.find((a) => a.artifactKey === k))
      .filter(Boolean) as ArtifactRecord[];

    const artifactsSection =
      artifactList.length > 0
        ? artifactList.map((a) => `- ${a.artifactKey}: ${a.filePath}`).join("\n")
        : "(成果物なし)";
    const questionsText = hg.questions
      .map((q, idx) => {
        const lines: string[] = [];
        lines.push(
          `#### Q${idx + 1}/${hg.questions.length}: ${q.key} - ${q.title} (type: ${q.type}${q.required ? ", 必須" : ""})`,
        );
        if (q.description) lines.push(`- 説明: ${q.description}`);
        lines.push(`- key: \`${q.key}\``);
        lines.push(`- title: "${q.title}"`);
        lines.push(`- type: \`${q.type}\``);
        lines.push(`- required: ${q.required ? "true" : "false"}`);
        if (q.placeholder) lines.push(`- placeholder: "${q.placeholder}"`);
        if (q.maxLength !== undefined) lines.push(`- maxLength: ${q.maxLength}`);
        if (q.choices && q.choices.length > 0) {
          lines.push(`- choices:`);
          for (const c of q.choices) {
            let line = `  - \`${c.value}\`: ${c.label}${c.desc ? ` (${c.desc})` : ""}`;
            if (c.input) {
              const parts: string[] = [];
              if (c.input.title) parts.push(`title: "${c.input.title}"`);
              if (c.input.placeholder) parts.push(`placeholder: "${c.input.placeholder}"`);
              parts.push(`required: ${c.input.required ? "true" : "false"}`);
              if (c.input.maxLength !== undefined) parts.push(`maxLength: ${c.input.maxLength}`);
              line += ` [input: ${parts.join(", ")}]`;
            }
            lines.push(line);
          }
        }
        return lines.join("\n");
      })
      .join("\n\n");
    const basePrompt = [
      `## Human Gate: ${stepDef.phase}`,
      "",
      "### 確認する成果物",
      artifactsSection,
      "",
      `### 設問一覧 (${hg.questions.length}件 判定設問: \`${hg.outcomeQuestionKey}\`)`,
      `- 判定設問: \`${hg.outcomeQuestionKey}\``,
      "",
      questionsText,
    ].join("\n");
    const prompt = appendNextSection(basePrompt, buildHumanGateNextSection(sessionId));

    return {
      sessionId,
      stepKey: currentStep.stepKey,
      stepType: "human_gate",
      phase: stepDef.phase,
      action: "human_gate",
      prompt,
      parallel: null,
      nextCommand: confirmCommand(sessionId),
      constraints: {
        mustCallTaskTool: false,
        readonly: true,
        reportAfterCompletion: false,
      },
      context: {
        sessionDir: session.sessionDir,
        artifactDbPath: session.artifactDbPath,
        attemptNumber: attempt.attemptNumber,
        retryCount: currentStep.retryCount,
        maxRetries: stepDef.maxRetries,
        loop: promptCtx.loop,
      },
    };
  }

  if (stepDef.type === "parallel") {
    const pd = stepDef.parallel;
    const boilerplate = buildBoilerplate(session.sessionDir, attempt);
    const subtasks = pd.subtasks.map((st) => {
      const stPrompt = appendBoilerplate(st.buildPrompt(promptCtx), boilerplate);
      return {
        key: st.key,
        subagentType: st.subagentType,
        prompt: stPrompt,
        constraints: {
          mustCallTaskTool: true,
          readonly: st.readonly ?? false,
          reportAfterCompletion: true,
        },
      };
    });

    const taskStep = stepDef.task;
    return {
      sessionId,
      stepKey: currentStep.stepKey,
      stepType: "parallel",
      phase: stepDef.phase,
      action: taskStep?.action ?? "run_subagent",
      prompt: buildParallelNextSection(
        currentStep.stepKey,
        sessionId,
        pd.subtasks.map((st) => st.key),
      ),
      parallel: { subtasks } as ParallelNextResult,
      nextCommand: reportCommand(sessionId),
      constraints: {
        mustCallTaskTool: true,
        readonly: false,
        reportAfterCompletion: true,
      },
      context: {
        sessionDir: session.sessionDir,
        artifactDbPath: session.artifactDbPath,
        attemptNumber: attempt.attemptNumber,
        retryCount: currentStep.retryCount,
        maxRetries: stepDef.maxRetries,
        loop: promptCtx.loop,
      },
    };
  }

  const taskStep = stepDef.task;
  const boilerplate = buildBoilerplate(session.sessionDir, attempt);
  const prompt = appendNextSection(
    appendBoilerplate(taskStep.buildPrompt(promptCtx), boilerplate),
    buildTaskNextSection(currentStep.stepKey, sessionId),
  );

  return {
    sessionId,
    stepKey: currentStep.stepKey,
    stepType: "task",
    phase: stepDef.phase,
    action: taskStep.action,
    subagentType: taskStep.subagentType,
    prompt,
    parallel: null,
    nextCommand: reportCommand(sessionId),
    constraints: {
      mustCallTaskTool: taskStep.action === "run_subagent",
      readonly: taskStep.readonly ?? false,
      reportAfterCompletion: true,
    },
    context: {
      sessionDir: session.sessionDir,
      artifactDbPath: session.artifactDbPath,
      attemptNumber: attempt.attemptNumber,
      retryCount: currentStep.retryCount,
      maxRetries: stepDef.maxRetries,
      loop: promptCtx.loop,
    },
  };
}

/**
 * Run the `beforeStep` hook with retries OUTSIDE any transaction.
 *
 * The hook is user code that may perform slow async I/O (network calls, etc.).
 * Awaiting it inside BEGIN IMMEDIATE would block every other `next()` in this
 * process: the busy_timeout wait spins the same event loop that must run the
 * hook to release the lock, so a slow hook would starve other sessions and
 * eventually fail them with SQLITE_BUSY. The caller therefore commits before
 * invoking this function and re-validates afterwards (see `next`).
 *
 * The hook is retried up to `maxRetries` times (matching the step's own retry
 * budget, i.e. `maxRetries + 1` total calls). On exhaustion the step is marked
 * failed, the session is aborted and an EngineError is thrown after committing,
 * so the failure state is durable — but only if the step is still pending. A
 * concurrent `next()` may have allocated the step while the hook was running;
 * in that case this call must not abort the session, so it returns `null` and
 * the caller re-selects (idempotent resume).
 *
 * Returns the hook's artifacts on success (`[]` when the hook is absent).
 */
async function runBeforeStep(
  db: TadoDb,
  sessionId: string,
  sessionDir: string,
  step: StepRow,
  stepDef: ExecutableStepDef,
  attemptNumber: number,
  gateAnswers: GateAnswers,
): Promise<ArtifactInput[] | null> {
  if (!stepDef.beforeStep) {
    return [];
  }

  const ctx: StepCtx = {
    sessionDir,
    sessionId,
    gateAnswers,
    artifacts: getArtifacts(db, sessionId),
    stepKey: step.stepKey,
    attemptNumber,
    loop: getLoopContext(db, sessionId, step.stepKey),
  };

  let lastError: unknown;
  for (let retry = 0; retry <= stepDef.maxRetries; retry++) {
    try {
      return await stepDef.beforeStep(ctx);
    } catch (error) {
      lastError = error;
    }
  }

  // Retry budget exhausted: record the durable failure only when the step is
  // still ours. Use a short dedicated transaction so the failed/aborted state
  // is committed atomically before the error propagates.
  db.run(sql`BEGIN IMMEDIATE`);
  let stillPending = false;
  try {
    const stepRow = db
      .select({ status: steps.status })
      .from(steps)
      .where(eq(steps.id, step.id))
      .get();
    stillPending = stepRow !== undefined && stepRow.status === "pending";
    if (stillPending) {
      db.update(steps).set({ status: "failed" }).where(eq(steps.id, step.id)).run();
      db.update(sessions)
        .set({ status: "aborted", updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
    }
    db.run(sql`COMMIT`);
  } catch (error) {
    try {
      db.run(sql`ROLLBACK`);
    } catch {
      // Preserve the original error if rollback itself cannot be completed.
    }
    throw error;
  }

  if (stillPending) {
    const reason = lastError instanceof Error ? lastError.message : String(lastError);
    throw new EngineError(
      `beforeStep failed after ${stepDef.maxRetries} retries for step: ${step.stepKey} (${reason})`,
    );
  }
  return null;
}

export async function next(sessionId: string, workflowPath?: string): Promise<NextResult> {
  const db = openSessionDb(sessionId);

  let transactionActive = false;
  try {
    const initialSessionRow = db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
    if (!initialSessionRow) {
      throw new EngineError(`Session not found: ${sessionId}`);
    }

    const resolvedWorkflowPath = workflowPath ?? initialSessionRow.workflowPath;
    if (!resolvedWorkflowPath) {
      throw new EngineError(
        "No workflow path available; provide --workflow flag or ensure session has workflow_path stored",
      );
    }

    const isPath = isPathLike(resolvedWorkflowPath);
    const def = isPath
      ? await importWorkflowDefFromPath(resolvedWorkflowPath)
      : await importWorkflowDef(resolvedWorkflowPath);
    const stepDefsByKey = new Map<string, StepDef>();
    for (const { def: s } of flattenStepDefs(def.steps)) {
      stepDefsByKey.set(s.key, s);
    }

    const commit = (): void => {
      db.run(sql`COMMIT`);
      transactionActive = false;
    };

    // Serialize the final read/allocate/write sequence. WAL and busy_timeout
    // only control how SQLite waits; BEGIN IMMEDIATE prevents two next calls
    // from allocating the same attempt and re-running a step concurrently.
    // The transaction intentionally starts after the asynchronous workflow
    // import so a second call in the same process cannot block the event loop
    // while the first call is waiting to resume.
    //
    // When the selected step defines a beforeStep hook, the hook runs OUTSIDE
    // the transaction (slow user I/O must not hold the write lock; see
    // runBeforeStep). The loop below re-acquires the lock afterwards and
    // re-validates: if a concurrent next() allocated the step while the hook
    // was running, we re-select from scratch, which takes the idempotent
    // resume path on the next iteration.
    while (true) {
      db.run(sql`BEGIN IMMEDIATE`);
      transactionActive = true;

      const sessionRow = db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
      if (!sessionRow) {
        throw new EngineError(`Session not found: ${sessionId}`);
      }
      const session = sessionRow;
      const sessionDir = session.sessionDir;

      if (session.status === "done") {
        throw new EngineError(`Session already done: ${sessionId}`);
      }

      if (session.status === "aborted") {
        throw new EngineError(`Session is aborted: ${sessionId}`);
      }

      // 本体が終端に達した loop 行の確定と「loop 行を実行対象にしない」解決
      // （loop 内再開は本体先頭）は store.resolveExecutableStep に集約されている。
      let currentStep = resolveExecutableStep(db, sessionId, session.currentStep);
      if (!currentStep) {
        if (completeSessionIfDone(db, sessionId)) {
          commit();
          throw new EngineError(`All steps completed for session: ${sessionId}`);
        }
        throw new EngineError(`No pending steps found for session: ${sessionId}`);
      }

      const foundStepDef = stepDefsByKey.get(currentStep.stepKey);
      if (!foundStepDef) {
        throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
      }
      if (foundStepDef.type === "loop") {
        throw new EngineError(`Loop step cannot be executed directly: ${currentStep.stepKey}`);
      }
      let stepDef: ExecutableStepDef = foundStepDef;

      if (currentStep.status === "running") {
        // Idempotent resume: the previous `next` committed an attempt but the
        // process was interrupted before `report`. Instead of allocating a new
        // attempt, reissue the exact same prompt so the CLI can resume the
        // session ("同じ --session <id> を指定すれば再開できます").
        //
        // Concurrency is still safe: this branch is only reached inside the
        // BEGIN IMMEDIATE transaction, so two concurrent `next` calls are
        // serialized and the running attempt is never duplicated. The running
        // attempt is excluded from previousAttempts so the prompt inputs match
        // the original allocation.
        const allAttempts = getPreviousAttempts(db, currentStep.id);
        const previousAttempts = allAttempts.filter((a) => a.endedAt !== undefined);
        const attemptNumber = previousAttempts.length + 1;
        const artifacts = getArtifacts(db, sessionId);

        const attempt: AttemptInfo = {
          attemptNumber,
          maxRetries: currentStep.maxRetries,
          previousAttempts,
        };

        const promptCtx: PromptCtx = {
          sessionDir,
          sessionId,
          gateAnswers: getGateAnswers(db, sessionId),
          artifactDbPath: session.artifactDbPath ?? undefined,
          artifacts,
          loop: getLoopContext(db, sessionId, currentStep.stepKey),
        };

        const nextResult = buildNextResult(
          sessionId,
          session,
          currentStep,
          stepDef,
          promptCtx,
          artifacts,
          attempt,
        );

        commit();
        return nextResult;
      }

      // Condition evaluation: skip steps whose condition returns false
      while (currentStep.status === "pending" && stepDef.condition) {
        const conditionCtx = buildConditionCtx(db, sessionId, currentStep.stepKey);
        if (stepDef.condition(conditionCtx)) {
          break;
        }
        // Mark step as skipped
        db.update(steps).set({ status: "skipped" }).where(eq(steps.id, currentStep.id)).run();

        // このスキップで本体が終端に達した loop 行の確定と次ステップの解決は
        // store.resolveNextExecutableStep が所有する（loop 行は実行対象外）。
        const nextRow = resolveNextExecutableStep(db, sessionId, currentStep.stepIndex);

        if (!nextRow) {
          if (completeSessionIfDone(db, sessionId)) {
            commit();
            throw new EngineError(`All steps completed for session: ${sessionId}`);
          }
          throw new EngineError(`No pending steps found for session: ${sessionId}`);
        }

        currentStep = nextRow;
        const nextStepDef = stepDefsByKey.get(currentStep.stepKey);
        if (!nextStepDef) {
          throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
        }
        if (nextStepDef.type === "loop") {
          throw new EngineError(`Loop step cannot be executed directly: ${currentStep.stepKey}`);
        }
        stepDef = nextStepDef;
      }

      const previousAttempts = getPreviousAttempts(db, currentStep.id);
      const artifacts = getArtifacts(db, sessionId);
      const attemptNumber = previousAttempts.length + 1;
      const gateAnswers = getGateAnswers(db, sessionId);

      if (!stepDef.beforeStep) {
        // Fast path: the step has no hook, so no user code runs inside the
        // transaction (no await at all). The lock is held only for the
        // synchronous read/allocate/write sequence.
        const attempt: AttemptInfo = {
          attemptNumber,
          maxRetries: currentStep.maxRetries,
          previousAttempts,
        };

        const promptCtx: PromptCtx = {
          sessionDir,
          sessionId,
          gateAnswers,
          artifactDbPath: session.artifactDbPath ?? undefined,
          artifacts,
          loop: getLoopContext(db, sessionId, currentStep.stepKey),
        };

        const nextResult = buildNextResult(
          sessionId,
          session,
          currentStep,
          stepDef,
          promptCtx,
          artifacts,
          attempt,
        );

        db.insert(stepAttempts).values({ stepId: currentStep.id, attemptNumber }).run();

        db.update(steps).set({ status: "running" }).where(eq(steps.id, currentStep.id)).run();

        db.update(sessions)
          .set({ currentStep: currentStep.stepKey, updatedAt: sql`datetime('now')` })
          .where(eq(sessions.id, sessionId))
          .run();

        commit();
        return nextResult;
      }

      // The step defines a beforeStep hook. Commit before running it so the
      // hook's async I/O never holds the write lock; re-acquire afterwards.
      // (This matches the plan's NOTE: no await inside the transaction — the
      // hook simply runs outside it instead.)
      commit();

      const hookArtifacts = await runBeforeStep(
        db,
        sessionId,
        sessionDir,
        currentStep,
        stepDef,
        attemptNumber,
        gateAnswers,
      );
      if (hookArtifacts === null) {
        // A concurrent next() allocated the step (or otherwise changed it)
        // while the hook was running. Nothing to roll back; re-select from
        // scratch, which takes the idempotent resume path.
        continue;
      }

      // Re-acquire and re-validate before touching the DB: the step must
      // still be pending for this call to own the allocation.
      db.run(sql`BEGIN IMMEDIATE`);
      transactionActive = true;

      const reSession = db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
      if (!reSession) {
        throw new EngineError(`Session not found: ${sessionId}`);
      }
      if (reSession.status === "done") {
        throw new EngineError(`Session already done: ${sessionId}`);
      }
      if (reSession.status === "aborted") {
        throw new EngineError(`Session is aborted: ${sessionId}`);
      }

      const reStep = db.select().from(steps).where(eq(steps.id, currentStep.id)).get();
      if (!reStep || reStep.status !== "pending") {
        // The step changed under us (allocated → running, or skipped via a
        // concurrent condition evaluation). Drop this call's hook result and
        // re-select from scratch on the next iteration.
        commit();
        continue;
      }

      if (hookArtifacts.length > 0) {
        registerHookArtifacts(db, sessionId, reStep.stepKey, hookArtifacts, "beforeStep");
      }
      const finalArtifacts = getArtifacts(db, sessionId);

      const attempt: AttemptInfo = {
        attemptNumber,
        maxRetries: reStep.maxRetries,
        previousAttempts,
      };

      const promptCtx: PromptCtx = {
        sessionDir,
        sessionId,
        gateAnswers,
        artifactDbPath: reSession.artifactDbPath ?? undefined,
        artifacts: finalArtifacts,
        loop: getLoopContext(db, sessionId, reStep.stepKey),
      };

      const nextResult = buildNextResult(
        sessionId,
        reSession,
        reStep,
        stepDef,
        promptCtx,
        finalArtifacts,
        attempt,
      );

      db.insert(stepAttempts).values({ stepId: reStep.id, attemptNumber }).run();

      db.update(steps).set({ status: "running" }).where(eq(steps.id, reStep.id)).run();

      db.update(sessions)
        .set({ currentStep: reStep.stepKey, updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();

      commit();
      return nextResult;
    }
  } catch (error) {
    if (transactionActive) {
      try {
        db.run(sql`ROLLBACK`);
      } catch {
        // Preserve the original error if rollback itself cannot be completed.
      }
    }
    throw error;
  } finally {
    db.$client.close();
  }
}
