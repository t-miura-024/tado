import { and, desc, eq, gt, sql } from "drizzle-orm";
import { artifacts as artifactsTable, sessions, stepAttempts, steps } from "./schema.ts";
import type { StepDef } from "../types/workflow-def.ts";
import type { CheckCtx, StepCtx } from "../types/context.ts";
import type { ReportInput, ReportResult, StatusResult, AttemptResult } from "../types/result.ts";
import {
  openSessionDb,
  importWorkflowDef,
  getArtifacts,
  registerHookArtifacts,
  EngineError,
} from "./store.ts";
import type { StepRow, TadoDb } from "./store.ts";

function handleStepFailure(
  db: TadoDb,
  sessionId: string,
  step: StepRow,
  input: ReportInput,
  checkStatus: "pass" | "fail" | "error",
  checkReasons: string[],
  stepDef?: StepDef,
): ReportResult {
  const newRetryCount = step.retryCount + 1;
  const maxRetries = step.maxRetries;

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

  if (onFailAction === "goto" && onFailTarget) {
    const requeueSource = stepDef?.onFail?.requeueSource === true;
    db.update(steps)
      .set({ status: requeueSource ? "pending" : "failed" })
      .where(eq(steps.id, step.id))
      .run();
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
      message: requeueSource
        ? `Step requires revision. Going to: ${onFailTarget} (review will re-run after fix)`
        : `Step failed after ${maxRetries} retries. Going to: ${onFailTarget}`,
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

  const def = await importWorkflowDef(resolvedWorkflowPath);
  const stepDef = def.steps.find((s) => s.key === input.stepKey);

  let checkStatus: "pass" | "fail" | "error" = "pass";
  let checkReasons: string[] = [];

  if (stepDef) {
    if (stepDef.afterStep) {
      const stepCtx: StepCtx = {
        sessionDir,
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
    const result = handleStepFailure(
      db,
      sessionId,
      step,
      input,
      checkStatus,
      checkReasons,
      stepDef,
    );
    db.$client.close();
    return result;
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
