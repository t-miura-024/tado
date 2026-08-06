import type { StepDef } from "../types/workflow-def.ts";
import type { PromptCtx } from "../types/context.ts";
import type { ArtifactRecord } from "../types/artifact.ts";
import type { AttemptSummary, NextResult, ParallelNextResult } from "../types/result.ts";
import {
  openSessionDb,
  dbRowToSessionRow,
  dbRowToStepRow,
  importWorkflowDef,
  getPreviousAttempts,
  getArtifacts,
  buildConditionCtx,
  EngineError,
} from "./store.ts";
import type { SessionRow, StepRow } from "./store.ts";

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

export async function next(sessionId: string, workflowPath?: string): Promise<NextResult> {
  const db = openSessionDb(sessionId);

  let transactionActive = false;
  try {
    const initialSessionRowRaw = db.query("SELECT * FROM sessions WHERE id = ?").get(sessionId) as
      | Record<string, unknown>
      | undefined;
    if (!initialSessionRowRaw) {
      throw new EngineError(`Session not found: ${sessionId}`);
    }

    const resolvedWorkflowPath = workflowPath ?? (initialSessionRowRaw.workflow_path as string);
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

    // Serialize the final read/allocate/write sequence. WAL and busy_timeout
    // only control how SQLite waits; BEGIN IMMEDIATE prevents two next calls
    // from allocating the same attempt and re-running a step concurrently.
    // It intentionally starts after the asynchronous workflow import so a
    // second call in the same process cannot block the event loop while the
    // first call is waiting to resume.
    db.exec("BEGIN IMMEDIATE");
    transactionActive = true;
    const commit = (): void => {
      db.exec("COMMIT");
      transactionActive = false;
    };

    const sessionRowRaw = db.query("SELECT * FROM sessions WHERE id = ?").get(sessionId) as
      | Record<string, unknown>
      | undefined;
    if (!sessionRowRaw) {
      throw new EngineError(`Session not found: ${sessionId}`);
    }
    const session = dbRowToSessionRow(sessionRowRaw);
    const sessionDir = session.sessionDir;

    if (session.status === "done") {
      throw new EngineError(`Session already done: ${sessionId}`);
    }

    if (session.status === "aborted") {
      throw new EngineError(`Session is aborted: ${sessionId}`);
    }

    let currentStepRaw: Record<string, unknown> | undefined;

    if (session.currentStep) {
      currentStepRaw = db
        .query("SELECT * FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, session.currentStep) as Record<string, unknown> | undefined;
    }

    if (!currentStepRaw) {
      const rows = db
        .query(
          "SELECT * FROM steps WHERE session_id = ? AND status IN ('pending', 'running') ORDER BY step_index LIMIT 1",
        )
        .all(sessionId) as Record<string, unknown>[];
      if (rows.length > 0) {
        currentStepRaw = rows[0];
      } else {
        const allDone = db
          .query(
            "SELECT COUNT(*) as cnt FROM steps WHERE session_id = ? AND status != 'passed' AND status != 'skipped'",
          )
          .get(sessionId) as Record<string, unknown>;
        if ((allDone.cnt as number) === 0) {
          db.run("UPDATE sessions SET status = 'done', updated_at = datetime('now') WHERE id = ?", [
            sessionId,
          ]);
          commit();
          throw new EngineError(`All steps completed for session: ${sessionId}`);
        }
        throw new EngineError(`No pending steps found for session: ${sessionId}`);
      }
    }

    let currentStep = dbRowToStepRow(currentStepRaw);
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
        maxRetries: currentStepRaw.max_retries as number,
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
      db.run(`UPDATE steps SET status = 'skipped' WHERE id = ?`, [currentStep.id]);

      // Find next pending step
      const nextRow = db
        .query(
          `SELECT * FROM steps WHERE session_id = ? AND step_index > ? AND status = 'pending' ORDER BY step_index LIMIT 1`,
        )
        .get(sessionId, currentStep.stepIndex) as Record<string, unknown> | undefined;

      if (!nextRow) {
        const allDone = db
          .query(
            `SELECT COUNT(*) as cnt FROM steps WHERE session_id = ? AND status NOT IN ('passed', 'skipped')`,
          )
          .get(sessionId) as Record<string, unknown>;
        if ((allDone.cnt as number) === 0) {
          db.run(`UPDATE sessions SET status = 'done', updated_at = datetime('now') WHERE id = ?`, [
            sessionId,
          ]);
          commit();
          throw new EngineError(`All steps completed for session: ${sessionId}`);
        }
        throw new EngineError(`No pending steps found for session: ${sessionId}`);
      }

      currentStep = dbRowToStepRow(nextRow);
      stepDef = stepDefsByKey.get(currentStep.stepKey);
      if (!stepDef) {
        throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
      }
    }

    const previousAttempts = getPreviousAttempts(db, currentStep.id);
    const artifacts = getArtifacts(db, sessionId);
    const attemptNumber = previousAttempts.length + 1;

    const attempt: AttemptInfo = {
      attemptNumber,
      maxRetries: currentStepRaw.max_retries as number,
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

    db.run(
      `INSERT INTO step_attempts (step_id, attempt_number)
       VALUES (?, ?)`,
      [currentStep.id, attemptNumber],
    );

    db.run(`UPDATE steps SET status = 'running' WHERE id = ?`, [currentStep.id]);

    db.run(`UPDATE sessions SET current_step = ?, updated_at = datetime('now') WHERE id = ?`, [
      currentStep.stepKey,
      sessionId,
    ]);

    commit();
    return nextResult;
  } catch (error) {
    if (transactionActive) {
      try {
        db.exec("ROLLBACK");
      } catch {
        // Preserve the original error if rollback itself cannot be completed.
      }
    }
    throw error;
  } finally {
    db.close();
  }
}
