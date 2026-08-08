import type { StepDef } from "../types/workflow-def.ts";
import type { PromptCtx, StepCtx } from "../types/context.ts";
import type { ArtifactInput, ArtifactRecord } from "../types/artifact.ts";
import type { AttemptSummary, NextResult, ParallelNextResult } from "../types/result.ts";
import { and, count, eq, gt, inArray, notInArray, sql } from "drizzle-orm";
import { sessions, stepAttempts, steps } from "./schema.ts";
import {
  openSessionDb,
  importWorkflowDef,
  getPreviousAttempts,
  getArtifacts,
  registerHookArtifacts,
  buildConditionCtx,
  EngineError,
} from "./store.ts";
import type { SessionRow, StepRow, TadoDb } from "./store.ts";

export const ARTIFACT_PRESENT_INSTRUCTION =
  "このゲートをユーザーに提示する際、上記「確認する成果物」のファイルパスを必ず表示すること（ユーザーがファイルを開いて内容を確認できるように）。";

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
 * 例: human_gate の revise で再実行されたステップでは、過去の pass 試行が
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
  stepDef: StepDef,
  promptCtx: PromptCtx,
  artifacts: ArtifactRecord[],
  attempt: AttemptInfo,
): NextResult {
  if (stepDef.type === "human_gate") {
    const hg = stepDef.humanGate!;
    const artifactList = hg.presentArtifacts
      .map((k) => artifacts.find((a) => a.artifactKey === k))
      .filter(Boolean) as ArtifactRecord[];

    const choicesText = hg.choices
      .map((c) => `- **${c.value}**: ${c.label}${c.desc ? ` (${c.desc})` : ""}`)
      .join("\n");
    const artifactsSection =
      artifactList.length > 0
        ? `${artifactList.map((a) => `- ${a.artifactKey}: ${a.filePath}`).join("\n")}\n\n${ARTIFACT_PRESENT_INSTRUCTION}`
        : "(成果物なし)";
    const prompt = `## Human Gate: ${stepDef.phase}\n\n### 確認する成果物\n${artifactsSection}\n\n### 選択肢\n${choicesText}\n\n回答は選択肢の value を入力してください。`;

    return {
      sessionId,
      stepKey: currentStep.stepKey,
      stepType: "human_gate",
      phase: stepDef.phase,
      action: "human_gate",
      prompt,
      parallel: null,
      constraints: {
        mustCallTaskTool: false,
        readonly: true,
        reportAfterCompletion: true,
      },
      context: {
        sessionDir: session.sessionDir,
        artifactDbPath: session.artifactDbPath,
        attemptNumber: attempt.attemptNumber,
        retryCount: currentStep.retryCount,
        maxRetries: stepDef.maxRetries,
      },
    };
  }

  if (stepDef.type === "parallel") {
    const pd = stepDef.parallel!;
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
      prompt: "",
      parallel: { subtasks } as ParallelNextResult,
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
      },
    };
  }

  const taskStep = stepDef.task!;
  const boilerplate = buildBoilerplate(session.sessionDir, attempt);
  const prompt = appendBoilerplate(taskStep.buildPrompt(promptCtx), boilerplate);

  return {
    sessionId,
    stepKey: currentStep.stepKey,
    stepType: "task",
    phase: stepDef.phase,
    action: taskStep.action,
    subagentType: taskStep.subagentType,
    prompt,
    parallel: null,
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
  stepDef: StepDef,
  attemptNumber: number,
): Promise<ArtifactInput[] | null> {
  if (!stepDef.beforeStep) {
    return [];
  }

  const ctx: StepCtx = {
    sessionDir,
    artifacts: getArtifacts(db, sessionId),
    stepKey: step.stepKey,
    attemptNumber,
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

    const def = await importWorkflowDef(resolvedWorkflowPath);
    const stepDefsByKey = new Map<string, StepDef>();
    for (const s of def.steps) {
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

      let currentStepRaw: StepRow | undefined;

      if (session.currentStep) {
        currentStepRaw = db
          .select()
          .from(steps)
          .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, session.currentStep)))
          .get();
      }

      if (!currentStepRaw) {
        const row = db
          .select()
          .from(steps)
          .where(and(eq(steps.sessionId, sessionId), inArray(steps.status, ["pending", "running"])))
          .orderBy(steps.stepIndex)
          .limit(1)
          .get();
        if (row) {
          currentStepRaw = row;
        } else {
          const allDone = db
            .select({ cnt: count() })
            .from(steps)
            .where(
              and(eq(steps.sessionId, sessionId), notInArray(steps.status, ["passed", "skipped"])),
            )
            .get();
          if ((allDone?.cnt ?? 0) === 0) {
            db.update(sessions)
              .set({ status: "done", updatedAt: sql`datetime('now')` })
              .where(eq(sessions.id, sessionId))
              .run();
            commit();
            throw new EngineError(`All steps completed for session: ${sessionId}`);
          }
          throw new EngineError(`No pending steps found for session: ${sessionId}`);
        }
      }

      let currentStep = currentStepRaw;
      let stepDef = stepDefsByKey.get(currentStep.stepKey);

      if (!stepDef) {
        throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
      }

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
          maxRetries: currentStepRaw.maxRetries,
          previousAttempts,
        };

        const promptCtx: PromptCtx = {
          sessionDir,
          artifactDbPath: session.artifactDbPath ?? undefined,
          artifacts,
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
        const conditionCtx = buildConditionCtx(db, sessionId);
        if (stepDef.condition(conditionCtx)) {
          break;
        }
        // Mark step as skipped
        db.update(steps).set({ status: "skipped" }).where(eq(steps.id, currentStep.id)).run();

        // Find next pending step
        const nextRow = db
          .select()
          .from(steps)
          .where(
            and(
              eq(steps.sessionId, sessionId),
              gt(steps.stepIndex, currentStep.stepIndex),
              eq(steps.status, "pending"),
            ),
          )
          .orderBy(steps.stepIndex)
          .limit(1)
          .get();

        if (!nextRow) {
          const allDone = db
            .select({ cnt: count() })
            .from(steps)
            .where(
              and(eq(steps.sessionId, sessionId), notInArray(steps.status, ["passed", "skipped"])),
            )
            .get();
          if ((allDone?.cnt ?? 0) === 0) {
            db.update(sessions)
              .set({ status: "done", updatedAt: sql`datetime('now')` })
              .where(eq(sessions.id, sessionId))
              .run();
            commit();
            throw new EngineError(`All steps completed for session: ${sessionId}`);
          }
          throw new EngineError(`No pending steps found for session: ${sessionId}`);
        }

        currentStep = nextRow;
        stepDef = stepDefsByKey.get(currentStep.stepKey);
        if (!stepDef) {
          throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
        }
      }

      const previousAttempts = getPreviousAttempts(db, currentStep.id);
      const artifacts = getArtifacts(db, sessionId);
      const attemptNumber = previousAttempts.length + 1;

      if (!stepDef.beforeStep) {
        // Fast path: the step has no hook, so no user code runs inside the
        // transaction (no await at all). The lock is held only for the
        // synchronous read/allocate/write sequence.
        const attempt: AttemptInfo = {
          attemptNumber,
          maxRetries: currentStepRaw.maxRetries,
          previousAttempts,
        };

        const promptCtx: PromptCtx = {
          sessionDir,
          artifactDbPath: session.artifactDbPath ?? undefined,
          artifacts,
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
        maxRetries: currentStepRaw.maxRetries,
        previousAttempts,
      };

      const promptCtx: PromptCtx = {
        sessionDir,
        artifactDbPath: reSession.artifactDbPath ?? undefined,
        artifacts: finalArtifacts,
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
