import * as path from "node:path";
import type {
  StepDef,
  NextResult,
  PromptCtx,
  ParallelNextResult,
  ArtifactRecord,
} from "../types.ts";
import {
  openDb,
  dbRowToSessionRow,
  dbRowToStepRow,
  importWorkflowDef,
  getPreviousAttempts,
  getArtifacts,
  buildConditionCtx,
  EngineError,
} from "./store.ts";

export const ARTIFACT_PRESENT_INSTRUCTION =
  "このゲートをユーザーに提示する際、上記「確認する成果物」のファイルパスを必ず表示すること（ユーザーがファイルを開いて内容を確認できるように）。";

export async function next(
  sessionId: string,
  baseDir: string,
  workflowPath?: string,
): Promise<NextResult> {
  const sessionDir = path.resolve(baseDir, sessionId);
  const db = openDb(sessionDir);

  const sessionRowRaw = db.query("SELECT * FROM sessions WHERE id = ?").get(sessionId) as
    | Record<string, unknown>
    | undefined;
  if (!sessionRowRaw) {
    db.close();
    throw new EngineError(`Session not found: ${sessionId}`);
  }
  const session = dbRowToSessionRow(sessionRowRaw);

  if (session.status === "done") {
    db.close();
    throw new EngineError(`Session already done: ${sessionId}`);
  }

  if (session.status === "aborted") {
    db.close();
    throw new EngineError(`Session is aborted: ${sessionId}`);
  }

  const resolvedWorkflowPath = workflowPath ?? (sessionRowRaw.workflow_path as string);
  if (!resolvedWorkflowPath) {
    db.close();
    throw new EngineError(
      "No workflow path available; provide --workflow flag or ensure session has workflow_path stored",
    );
  }

  const def = await importWorkflowDef(resolvedWorkflowPath);
  const stepDefsByKey = new Map<string, StepDef>();
  for (const s of def.steps) {
    stepDefsByKey.set(s.key, s);
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
        db.close();
        throw new EngineError(`All steps completed for session: ${sessionId}`);
      }
      db.close();
      throw new EngineError(`No pending steps found for session: ${sessionId}`);
    }
  }

  let currentStep = dbRowToStepRow(currentStepRaw);
  let stepDef = stepDefsByKey.get(currentStep.stepKey);

  if (!stepDef) {
    db.close();
    throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
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
        db.close();
        throw new EngineError(`All steps completed for session: ${sessionId}`);
      }
      db.close();
      throw new EngineError(`No pending steps found for session: ${sessionId}`);
    }

    currentStep = dbRowToStepRow(nextRow);
    stepDef = stepDefsByKey.get(currentStep.stepKey);
    if (!stepDef) {
      db.close();
      throw new EngineError(`Step definition not found in workflow: ${currentStep.stepKey}`);
    }
  }

  const previousAttempts = getPreviousAttempts(db, currentStep.id);
  const artifacts = getArtifacts(db, sessionId);
  const attemptNumber = previousAttempts.length + 1;

  const promptCtx: PromptCtx = {
    sessionDir,
    artifactDbPath: session.artifactDbPath,
    attemptNumber,
    retryCount: currentStep.retryCount,
    maxRetries: currentStepRaw.max_retries as number,
    previousAttempts,
    artifacts,
  };

  let nextResult: NextResult;

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

    nextResult = {
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
        sessionDir,
        artifactDbPath: session.artifactDbPath,
        attemptNumber,
        retryCount: currentStep.retryCount,
        maxRetries: stepDef.maxRetries,
      },
    };
  } else if (stepDef.type === "parallel") {
    const pd = stepDef.parallel!;
    const subtasks = pd.subtasks.map((st) => {
      const stPrompt = st.buildPrompt(promptCtx);
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
    nextResult = {
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
        sessionDir,
        artifactDbPath: session.artifactDbPath,
        attemptNumber,
        retryCount: currentStep.retryCount,
        maxRetries: stepDef.maxRetries,
      },
    };
  } else {
    const taskStep = stepDef.task!;
    const prompt = taskStep.buildPrompt(promptCtx);

    nextResult = {
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
        sessionDir,
        artifactDbPath: session.artifactDbPath,
        attemptNumber,
        retryCount: currentStep.retryCount,
        maxRetries: stepDef.maxRetries,
      },
    };
  }

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

  db.close();

  return nextResult;
}
