import { spawnSync } from "node:child_process";
import * as clack from "@clack/prompts";
import { and, desc, eq, gt, gte, sql } from "drizzle-orm";
import { gateEvents, sessions, stepAttempts, steps } from "./schema.ts";
import type { StepRow, TadoDb } from "./store.ts";
import {
  getArtifacts,
  importWorkflowDef,
  importWorkflowDefFromPath,
  isPathLike,
  openSessionDb,
  EngineError,
} from "./store.ts";
import type { ConfirmResult } from "../types/result.ts";

/** 人間に提示するゲート内容。 */
export interface GateView {
  phase: string;
  artifacts: { key: string; filePath: string }[];
  choices: { value: string; label: string; desc?: string }[];
}

/**
 * confirm の入出力を注入するためのポート。
 * CLI は標準入出力（TTY）を渡し、テストはモックを渡す。
 */
export interface ConfirmDeps {
  isTTY(): boolean;
  ttyName(): string | null;
  /** ゲート内容を提示し、有効な選択値を 1 つ返す。人間が中断した場合は null を返す。 */
  presentGate(view: GateView): Promise<string | null>;
}

export function defaultConfirmDeps(): ConfirmDeps {
  return {
    isTTY: () => process.stdin.isTTY === true,
    ttyName: () => {
      const r = spawnSync("tty", [], { stdio: ["inherit", "pipe", "ignore"], encoding: "utf-8" });
      return r.status === 0 ? (r.stdout ?? "").trim() || null : null;
    },
    presentGate: async (view) => {
      const artifactsBody =
        view.artifacts.length > 0
          ? view.artifacts.map((a) => `- ${a.key}: ${a.filePath}`).join("\n")
          : "(成果物なし)";
      clack.note(artifactsBody, `Human Gate: ${view.phase}`);
      const choice = await clack.autocomplete({
        message: "回答を選択してください（入力で絞り込み、↑↓で選択）",
        options: view.choices.map((c) => ({ value: c.value, label: c.label, hint: c.desc })),
        placeholder: "Type to filter...",
      });
      if (clack.isCancel(choice)) {
        clack.cancel("confirm canceled.");
        return null;
      }
      return choice;
    },
  };
}

function recordGateEvent(
  db: TadoDb,
  sessionId: string,
  stepKey: string,
  attemptNumber: number | null,
  event: "confirmed" | "rejected",
  choice: string | null,
  ttyName: string | null,
): void {
  db.insert(gateEvents).values({ sessionId, stepKey, attemptNumber, event, choice, ttyName }).run();
}

/**
 * human_gate の回答を人間から直接受け付け、状態遷移まで行う。
 *
 * stdin が TTY でない場合は遷移させず rejected イベントを記録して拒否する。
 * エージェントの Bash ツールには TTY がないため、ゲート回答は構造的に
 * エージェント経由では成立しない（ADR-0007）。
 */
export async function confirm(
  sessionId: string,
  deps: ConfirmDeps = defaultConfirmDeps(),
): Promise<ConfirmResult> {
  const db = openSessionDb(sessionId);
  try {
    const session = db.select().from(sessions).where(eq(sessions.id, sessionId)).get();
    if (!session) {
      throw new EngineError(`Session not found: ${sessionId}`);
    }
    if (session.status === "done") {
      throw new EngineError(`Session already done: ${sessionId}`);
    }
    if (session.status === "aborted") {
      throw new EngineError(`Session is aborted: ${sessionId}`);
    }

    let stepRow: StepRow | undefined;
    if (session.currentStep) {
      stepRow = db
        .select()
        .from(steps)
        .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, session.currentStep)))
        .get();
    }
    if (!stepRow || stepRow.type !== "human_gate") {
      throw new EngineError(`No human gate awaiting confirmation in session: ${sessionId}`);
    }

    const isPath = isPathLike(session.workflowPath);
    const def = isPath
      ? await importWorkflowDefFromPath(session.workflowPath)
      : await importWorkflowDef(session.workflowPath);
    const stepDef = def.steps.find((s) => s.key === stepRow.stepKey);
    const hg = stepDef?.humanGate;
    if (!hg) {
      throw new EngineError(`Step definition not found in workflow: ${stepRow.stepKey}`);
    }

    const attempt = db
      .select()
      .from(stepAttempts)
      .where(eq(stepAttempts.stepId, stepRow.id))
      .orderBy(desc(stepAttempts.attemptNumber))
      .limit(1)
      .get();
    if (!attempt) {
      throw new EngineError(`No attempt found for step: ${stepRow.stepKey}`);
    }

    if (!deps.isTTY()) {
      recordGateEvent(
        db,
        sessionId,
        stepRow.stepKey,
        attempt.attemptNumber,
        "rejected",
        null,
        null,
      );
      throw new EngineError(
        "confirm requires an interactive terminal (TTY). Run this command in your own terminal.",
      );
    }
    const ttyName = deps.ttyName();

    const artifacts = getArtifacts(db, sessionId);
    const artifactList = hg.presentArtifacts
      .map((k) => artifacts.find((a) => a.artifactKey === k))
      .filter(Boolean) as ReturnType<typeof getArtifacts>;

    const choice = await deps.presentGate({
      phase: stepDef.phase,
      artifacts: artifactList.map((a) => ({ key: a.artifactKey, filePath: a.filePath })),
      choices: hg.choices.map((c) => ({ value: c.value, label: c.label, desc: c.desc })),
    });
    if (choice === null) {
      throw new EngineError("confirm canceled by user.");
    }

    recordGateEvent(
      db,
      sessionId,
      stepRow.stepKey,
      attempt.attemptNumber,
      "confirmed",
      choice,
      ttyName,
    );

    const checkStatus = choice === "approve" ? "pass" : "fail";
    const checkReasons =
      choice === "approve"
        ? ["User approved"]
        : choice === "revise"
          ? ["User requested revision"]
          : ["User requested abort"];
    db.update(stepAttempts)
      .set({
        endedAt: sql`datetime('now')`,
        resultJson: choice,
        checkResultsJson: JSON.stringify(checkReasons),
        checkStatus,
      })
      .where(eq(stepAttempts.id, attempt.id))
      .run();

    if (choice === "abort") {
      db.update(sessions)
        .set({ status: "aborted", updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      return {
        sessionId,
        stepKey: stepRow.stepKey,
        choice,
        nextAction: "abort",
        message: "Session aborted by user.",
      };
    }

    db.update(steps).set({ status: "passed" }).where(eq(steps.id, stepRow.id)).run();

    if (choice === "revise") {
      const targetStep = hg.reviseTargetStep ?? stepDef.onFail.target ?? stepRow.stepKey;
      const targetStepRow = db
        .select({ stepIndex: steps.stepIndex })
        .from(steps)
        .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, targetStep)))
        .get();
      if (targetStepRow) {
        db.update(steps)
          .set({ status: "pending", retryCount: 0 })
          .where(and(eq(steps.sessionId, sessionId), gte(steps.stepIndex, targetStepRow.stepIndex)))
          .run();
      }
      db.update(sessions)
        .set({ currentStep: targetStep, updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      return {
        sessionId,
        stepKey: stepRow.stepKey,
        choice,
        nextAction: "goto",
        targetStep,
        message: `User requested revision. Going to: ${targetStep}`,
      };
    }

    const nextStep = db
      .select()
      .from(steps)
      .where(
        and(
          eq(steps.sessionId, sessionId),
          gt(steps.stepIndex, stepRow.stepIndex),
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
      return {
        sessionId,
        stepKey: stepRow.stepKey,
        choice,
        nextAction: "continue",
        message: `User approved. Next step: ${nextStep.stepKey}`,
      };
    }

    db.update(sessions)
      .set({ status: "done", updatedAt: sql`datetime('now')` })
      .where(eq(sessions.id, sessionId))
      .run();
    return {
      sessionId,
      stepKey: stepRow.stepKey,
      choice,
      nextAction: "done",
      message: "User approved. All steps completed. Session done.",
    };
  } finally {
    db.$client.close();
  }
}
