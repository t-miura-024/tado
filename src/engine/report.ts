import * as path from "node:path";
import { Database } from "bun:sqlite";
import type { StepDef } from "../types/workflow-def.ts";
import type { CheckCtx } from "../types/context.ts";
import type { ReportInput, ReportResult, StatusResult, AttemptResult } from "../types/result.ts";
import {
  openDb,
  dbRowToSessionRow,
  dbRowToStepRow,
  dbRowToStepAttemptRow,
  importWorkflowDef,
  getArtifacts,
  EngineError,
} from "./store.ts";
import type { StepRow } from "./store.ts";

function handleHumanGateTransition(
  db: Database,
  sessionId: string,
  step: StepRow,
  input: ReportInput,
  stepDef: StepDef,
  checkStatus: "pass" | "fail" | "error",
  checkReasons: string[],
): ReportResult | null {
  const answer = (input.subagentOutput ?? "").trim();

  if (answer === "revise") {
    const targetStep = stepDef.humanGate?.reviseTargetStep ?? stepDef.onFail.target ?? step.stepKey;
    db.run("UPDATE steps SET status = 'passed' WHERE id = ?", [step.id]);

    // Reset target and all subsequent steps to pending
    const targetStepRow = db
      .query("SELECT step_index FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, targetStep) as Record<string, unknown> | undefined;
    if (targetStepRow) {
      db.run(
        `UPDATE steps SET status = 'pending', retry_count = 0 WHERE session_id = ? AND step_index >= ?`,
        [sessionId, targetStepRow.step_index as number],
      );
    }

    db.run("UPDATE sessions SET current_step = ?, updated_at = datetime('now') WHERE id = ?", [
      targetStep,
      sessionId,
    ]);
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "goto",
      targetStep,
      message: `User requested revision. Going to: ${targetStep}`,
    };
  }

  if (answer === "abort") {
    db.run("UPDATE sessions SET status = 'aborted', updated_at = datetime('now') WHERE id = ?", [
      sessionId,
    ]);
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "abort",
      message: "Session aborted by user.",
    };
  }

  return null;
}

function handleStepFailure(
  db: Database,
  sessionId: string,
  step: StepRow,
  stepRaw: Record<string, unknown>,
  input: ReportInput,
  checkStatus: "pass" | "fail" | "error",
  checkReasons: string[],
  stepDef?: StepDef,
): ReportResult {
  const newRetryCount = step.retryCount + 1;
  const maxRetries = stepRaw.max_retries as number;

  if (newRetryCount <= maxRetries) {
    db.run("UPDATE steps SET retry_count = ?, status = 'pending' WHERE id = ?", [
      newRetryCount,
      step.id,
    ]);
    db.run("UPDATE sessions SET current_step = ?, updated_at = datetime('now') WHERE id = ?", [
      step.stepKey,
      sessionId,
    ]);
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "retry",
      message: `Check failed. Retry ${newRetryCount}/${maxRetries}`,
    };
  }

  const onFailAction = stepRaw.on_fail_action as string;
  const onFailTarget = stepRaw.on_fail_target as string | null;

  if (onFailAction === "goto" && onFailTarget) {
    const requeueSource = stepDef?.onFail?.requeueSource === true;
    db.run(`UPDATE steps SET status = ? WHERE id = ?`, [
      requeueSource ? "pending" : "failed",
      step.id,
    ]);
    db.run("UPDATE sessions SET current_step = ?, updated_at = datetime('now') WHERE id = ?", [
      onFailTarget,
      sessionId,
    ]);
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "goto",
      targetStep: onFailTarget,
      message: requeueSource
        ? `Step requires revision. Going to: ${onFailTarget} (review will re-run after fix)`
        : `Step failed after ${maxRetries} retries. Going to: ${onFailTarget}`,
    };
  }

  if (onFailAction === "abort") {
    db.run("UPDATE steps SET status = 'failed' WHERE id = ?", [step.id]);
    db.run("UPDATE sessions SET status = 'aborted', updated_at = datetime('now') WHERE id = ?", [
      sessionId,
    ]);
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "abort",
      message: "Step failed and onFail=abort. Session aborted.",
    };
  }

  if (onFailAction === "escalate") {
    db.run("UPDATE steps SET status = 'failed' WHERE id = ?", [step.id]);
    db.run("UPDATE sessions SET status = 'paused', updated_at = datetime('now') WHERE id = ?", [
      sessionId,
    ]);
    return {
      sessionId,
      stepKey: input.stepKey,
      checkResult: { status: checkStatus, reasons: checkReasons },
      nextAction: "escalate",
      message: "Step failed and onFail=escalate. Human intervention required.",
    };
  }

  db.run("UPDATE steps SET status = 'failed' WHERE id = ?", [step.id]);
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
  baseDir: string,
  workflowPath?: string,
): Promise<ReportResult> {
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

  const resolvedWorkflowPath = workflowPath ?? (sessionRowRaw.workflow_path as string);
  if (!resolvedWorkflowPath) {
    db.close();
    throw new EngineError("No workflow path available");
  }

  const stepRaw = db
    .query("SELECT * FROM steps WHERE session_id = ? AND step_key = ?")
    .get(sessionId, input.stepKey) as Record<string, unknown> | undefined;
  if (!stepRaw) {
    db.close();
    throw new EngineError(`Step not found: ${input.stepKey}`);
  }
  const step = dbRowToStepRow(stepRaw);

  const attemptRaw = db
    .query("SELECT * FROM step_attempts WHERE step_id = ? ORDER BY attempt_number DESC LIMIT 1")
    .get(step.id) as Record<string, unknown> | undefined;
  if (!attemptRaw) {
    db.close();
    throw new EngineError(`No attempt found for step: ${input.stepKey}`);
  }
  const attempt = dbRowToStepAttemptRow(attemptRaw);

  db.run(
    `UPDATE step_attempts SET ended_at = datetime('now'), result_json = ?, subtask_results_json = ?
     WHERE id = ?`,
    [
      input.subagentOutput ?? null,
      input.subtaskResults ? JSON.stringify(input.subtaskResults) : null,
      attempt.id,
    ],
  );

  if (input.artifacts && input.artifacts.length > 0) {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);
    const insertArtifact = db.prepare(
      "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
    );
    for (const a of input.artifacts) {
      insertArtifact.run(sessionId, input.stepKey, a.key, a.path, now);
    }
  }

  const def = await importWorkflowDef(resolvedWorkflowPath);
  const stepDef = def.steps.find((s) => s.key === input.stepKey);

  let checkStatus: "pass" | "fail" | "error" = "pass";
  let checkReasons: string[] = [];

  if (stepDef) {
    const artifacts = getArtifacts(db, sessionId);
    const attemptResult: AttemptResult = {
      status: input.status,
      subagentOutput: input.subagentOutput,
      errors: input.errors,
    };

    const checkCtx: CheckCtx = {
      sessionDir,
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

    if (stepDef.type === "human_gate") {
      const answer = (input.subagentOutput ?? "").trim();

      if (checkStatus === "pass") {
        if (answer === "approve") {
          checkReasons = ["User approved"];
        } else if (answer === "revise") {
          checkStatus = "fail";
          checkReasons = ["User requested revision"];
        } else if (answer === "abort") {
          checkStatus = "fail";
          checkReasons = ["User requested abort"];
        } else {
          checkStatus = "fail";
          checkReasons = [`Unknown gate response: ${answer}`];
        }
      }
    }
  } else {
    checkStatus = input.status === "completed" ? "pass" : "fail";
    checkReasons = input.errors ? [input.errors] : [];
  }

  db.run(`UPDATE step_attempts SET check_results_json = ?, check_status = ? WHERE id = ?`, [
    JSON.stringify(checkReasons),
    checkStatus,
    attempt.id,
  ]);

  if (checkStatus === "pass") {
    db.run(`UPDATE steps SET status = 'passed' WHERE id = ?`, [step.id]);

    const nextStepRaw = db
      .query(
        "SELECT * FROM steps WHERE session_id = ? AND step_index > ? AND status = 'pending' ORDER BY step_index LIMIT 1",
      )
      .get(sessionId, step.stepIndex) as Record<string, unknown> | undefined;

    if (nextStepRaw) {
      const nextStep = dbRowToStepRow(nextStepRaw);
      db.run("UPDATE sessions SET current_step = ?, updated_at = datetime('now') WHERE id = ?", [
        nextStep.stepKey,
        sessionId,
      ]);
      db.close();
      return {
        sessionId,
        stepKey: input.stepKey,
        checkResult: { status: checkStatus, reasons: checkReasons },
        nextAction: "continue",
        message: `Step passed. Next step: ${nextStep.stepKey}`,
      };
    } else {
      db.run("UPDATE sessions SET status = 'done', updated_at = datetime('now') WHERE id = ?", [
        sessionId,
      ]);
      db.close();
      return {
        sessionId,
        stepKey: input.stepKey,
        checkResult: { status: checkStatus, reasons: checkReasons },
        nextAction: "done",
        message: "All steps completed. Session done.",
      };
    }
  } else {
    if (stepDef && stepDef.type === "human_gate") {
      const hgResult = handleHumanGateTransition(
        db,
        sessionId,
        step,
        input,
        stepDef,
        checkStatus,
        checkReasons,
      );
      if (hgResult) {
        db.close();
        return hgResult;
      }
    }

    const result = handleStepFailure(
      db,
      sessionId,
      step,
      stepRaw,
      input,
      checkStatus,
      checkReasons,
      stepDef,
    );
    db.close();
    return result;
  }
}

export function status(sessionId: string, baseDir: string): StatusResult {
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

  const stepRows = db
    .query("SELECT * FROM steps WHERE session_id = ? ORDER BY step_index")
    .all(sessionId) as Record<string, unknown>[];

  const steps = stepRows.map((sRaw) => {
    const s = dbRowToStepRow(sRaw);
    const attemptRows = db
      .query("SELECT * FROM step_attempts WHERE step_id = ? ORDER BY attempt_number")
      .all(s.id) as Record<string, unknown>[];

    const maxRetries = sRaw.max_retries as number;
    const attempts = attemptRows.map((aRaw) => {
      const a = dbRowToStepAttemptRow(aRaw);
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
      maxRetries,
      attempts,
    };
  });

  db.close();

  return {
    sessionId,
    workflowId: session.workflowId,
    sessionStatus: session.status,
    currentStep: session.currentStep,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
    steps,
  };
}
