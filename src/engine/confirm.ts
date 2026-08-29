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
import type { GateAnswer, GateQuestion, HumanGateStepDef } from "../types/workflow-def.ts";

/** 人間に提示するゲート内容。 */
export interface GateView {
  phase: string;
  artifacts: { key: string; filePath: string }[];
  questions: GateQuestion[];
  outcomeQuestionKey: string;
}

/**
 * confirm の入出力を注入するためのポート。
 * CLI は標準入出力（TTY）を渡し、テストはモックを渡す。
 */
export interface ConfirmDeps {
  isTTY(): boolean;
  ttyName(): string | null;
  /** ゲート内容を提示し、全設問の回答集合を返す。人間が中断した場合は null を返す（原子的）。 */
  presentGate(view: GateView): Promise<Record<string, GateAnswer> | null>;
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
      const total = view.questions.length;
      clack.log.info(`設問数: ${total}件  判定設問: ${view.outcomeQuestionKey}`);
      const answers: Record<string, GateAnswer> = {};
      for (let idx = 0; idx < total; idx++) {
        const q = view.questions[idx];
        const progress = `[Q${idx + 1}/${total}] ${q.title}`;
        if (q.description) {
          clack.log.info(q.description);
        }

        if (q.type === "single_choice") {
          if (!q.choices || q.choices.length === 0) {
            clack.log.error(`設問 "${q.key}" に選択肢がありません`);
            clack.cancel("confirm canceled.");
            return null;
          }
          const useAutocomplete = q.choices.length > 6;
          let selection: unknown;
          if (useAutocomplete) {
            selection = await clack.autocomplete({
              message: progress,
              options: q.choices.map((c) => ({ value: c.value, label: c.label, hint: c.desc })),
              placeholder: q.placeholder ?? "Type to filter...",
            });
          } else {
            selection = await clack.select({
              message: progress,
              options: q.choices.map((c) => ({ value: c.value, label: c.label, hint: c.desc })),
            });
          }
          if (clack.isCancel(selection)) {
            clack.cancel("confirm canceled.");
            return null;
          }
          answers[q.key] = selection as string;
        } else if (q.type === "free_text") {
          while (true) {
            const input = await clack.text({
              message: progress,
              placeholder: q.placeholder ?? "",
            });
            if (clack.isCancel(input)) {
              clack.cancel("confirm canceled.");
              return null;
            }
            const val = input as string;
            if (q.required && val.trim() === "") {
              clack.log.error("必須入力です。入力してください。");
              continue;
            }
            if (q.maxLength !== undefined && val.length > q.maxLength) {
              clack.log.error(`最大${q.maxLength}文字を超えています（現在 ${val.length}文字）`);
              continue;
            }
            answers[q.key] = val;
            break;
          }
        } else if (q.type === "choice_with_input") {
          if (!q.choices || q.choices.length === 0) {
            clack.log.error(`設問 "${q.key}" に選択肢がありません`);
            clack.cancel("confirm canceled.");
            return null;
          }
          const useAutocomplete = q.choices.length > 6;
          let selectedValue: unknown;
          if (useAutocomplete) {
            selectedValue = await clack.autocomplete({
              message: progress,
              options: q.choices.map((c) => ({ value: c.value, label: c.label, hint: c.desc })),
              placeholder: q.placeholder ?? "Type to filter...",
            });
          } else {
            selectedValue = await clack.select({
              message: progress,
              options: q.choices.map((c) => ({ value: c.value, label: c.label, hint: c.desc })),
            });
          }
          if (clack.isCancel(selectedValue)) {
            clack.cancel("confirm canceled.");
            return null;
          }
          const selectedChoice = q.choices.find((c) => c.value === selectedValue);
          if (selectedChoice?.input) {
            const inputDef = selectedChoice.input;
            const inputTitle = inputDef.title ?? `${selectedChoice.label} の追加入力`;
            const inputMessage = `${progress} - ${inputTitle}`;
            while (true) {
              const input = await clack.text({
                message: inputMessage,
                placeholder: inputDef.placeholder ?? q.placeholder ?? "",
              });
              if (clack.isCancel(input)) {
                clack.cancel("confirm canceled.");
                return null;
              }
              const val = input as string;
              if (inputDef.required && val.trim() === "") {
                clack.log.error("必須入力です。入力してください。");
                continue;
              }
              if (inputDef.maxLength !== undefined && val.length > inputDef.maxLength) {
                clack.log.error(
                  `最大${inputDef.maxLength}文字を超えています（現在 ${val.length}文字）`,
                );
                continue;
              }
              if (q.maxLength !== undefined && val.length > q.maxLength) {
                clack.log.error(`最大${q.maxLength}文字を超えています（現在 ${val.length}文字）`);
                continue;
              }
              if (val === "" && !inputDef.required) {
                answers[q.key] = { value: selectedValue as string };
              } else if (val === "") {
                // required case already handled, but fallback
                answers[q.key] = { value: selectedValue as string, input: val };
              } else {
                answers[q.key] = { value: selectedValue as string, input: val };
              }
              break;
            }
          } else {
            answers[q.key] = { value: selectedValue as string };
          }
        } else {
          clack.log.error(`未知の設問タイプ: ${(q as GateQuestion).type}`);
          clack.cancel("confirm canceled.");
          return null;
        }
      }
      return answers;
    },
  };
}

function recordGateEvent(
  db: TadoDb,
  sessionId: string,
  stepKey: string,
  attemptNumber: number | null,
  event: "confirmed" | "rejected",
  answersJson: string | null,
  ttyName: string | null,
): void {
  db.insert(gateEvents)
    .values({ sessionId, stepKey, attemptNumber, event, answersJson, ttyName })
    .run();
}

function validateAnswers(hg: HumanGateStepDef, answers: Record<string, GateAnswer>): string | null {
  for (const q of hg.questions) {
    const ans = answers[q.key];
    if (ans === undefined || ans === null) {
      if (q.required) return `必須設問 "${q.key}" が未回答です`;
      continue;
    }
    if (q.type === "single_choice") {
      if (typeof ans !== "string") return `設問 "${q.key}" は文字列で回答してください`;
      if (q.required && ans.trim() === "") return `設問 "${q.key}" は必須です`;
      if (q.maxLength !== undefined && ans.length > q.maxLength)
        return `設問 "${q.key}" が最大文字数 ${q.maxLength} を超えています`;
      if (q.choices && !q.choices.some((c) => c.value === ans))
        return `設問 "${q.key}" の値 "${ans}" は選択肢に存在しません`;
    } else if (q.type === "free_text") {
      if (typeof ans !== "string") return `設問 "${q.key}" は文字列で回答してください`;
      if (q.required && ans.trim() === "") return `設問 "${q.key}" は必須です`;
      if (q.maxLength !== undefined && ans.length > q.maxLength)
        return `設問 "${q.key}" が最大文字数 ${q.maxLength} を超えています`;
    } else if (q.type === "choice_with_input") {
      if (
        typeof ans !== "object" ||
        ans === null ||
        Array.isArray(ans) ||
        typeof (ans as { value?: unknown }).value !== "string"
      ) {
        return `設問 "${q.key}" は {value, input?} 形式で回答してください`;
      }
      const obj = ans as { value: string; input?: string };
      if (q.choices && !q.choices.some((c) => c.value === obj.value))
        return `設問 "${q.key}" の値 "${obj.value}" は選択肢に存在しません`;
      const choice = q.choices?.find((c) => c.value === obj.value);
      if (choice?.input) {
        const inputDef = choice.input;
        const inputVal = obj.input ?? "";
        if (inputDef.required && inputVal.trim() === "")
          return `設問 "${q.key}" の選択肢 "${obj.value}" は追加入力が必須です`;
        if (inputDef.maxLength !== undefined && inputVal.length > inputDef.maxLength)
          return `設問 "${q.key}" の追加入力が最大文字数 ${inputDef.maxLength} を超えています`;
        if (q.maxLength !== undefined && inputVal.length > q.maxLength)
          return `設問 "${q.key}" の入力が最大文字数 ${q.maxLength} を超えています`;
      } else {
        if (obj.input !== undefined && obj.input !== "") {
          return `設問 "${q.key}" の選択肢 "${obj.value}" に追加入力は不要です`;
        }
      }
    }
  }
  for (const k of Object.keys(answers)) {
    if (!hg.questions.some((q) => q.key === k)) {
      return `未知の設問キー "${k}" が含まれています`;
    }
  }
  const outcomeQuestion = hg.questions.find((q) => q.key === hg.outcomeQuestionKey);
  if (!outcomeQuestion) {
    return `判定設問 "${hg.outcomeQuestionKey}" が questions に存在しません`;
  }
  if (outcomeQuestion.type !== "single_choice" && outcomeQuestion.type !== "choice_with_input") {
    return `判定設問 "${hg.outcomeQuestionKey}" は single_choice または choice_with_input である必要があります`;
  }
  return null;
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

    const answers = await deps.presentGate({
      phase: stepDef.phase,
      artifacts: artifactList.map((a) => ({ key: a.artifactKey, filePath: a.filePath })),
      questions: hg.questions,
      outcomeQuestionKey: hg.outcomeQuestionKey,
    });
    if (answers === null) {
      throw new EngineError("confirm canceled by user.");
    }

    const validationError = validateAnswers(hg, answers);
    if (validationError) {
      throw new EngineError(`Invalid gate answers: ${validationError}`);
    }

    const outcomeAns = answers[hg.outcomeQuestionKey];
    const outcomeValue = typeof outcomeAns === "string" ? outcomeAns : outcomeAns.value;
    const answersJson = JSON.stringify(answers);

    const checkStatus = outcomeValue === "abort" || outcomeValue === "revise" ? "fail" : "pass";
    const checkReasons =
      outcomeValue === "approve"
        ? ["User approved"]
        : outcomeValue === "revise"
          ? ["User requested revision"]
          : outcomeValue === "abort"
            ? ["User requested abort"]
            : [`User selected: ${outcomeValue}`];
    try {
      db.$client.exec("BEGIN IMMEDIATE");
      recordGateEvent(
        db,
        sessionId,
        stepRow.stepKey,
        attempt.attemptNumber,
        "confirmed",
        answersJson,
        ttyName,
      );
      db.update(stepAttempts)
        .set({
          endedAt: sql`datetime('now')`,
          resultJson: answersJson,
          checkResultsJson: JSON.stringify(checkReasons),
          checkStatus,
        })
        .where(eq(stepAttempts.id, attempt.id))
        .run();

      if (outcomeValue === "abort") {
        db.update(sessions)
          .set({ status: "aborted", updatedAt: sql`datetime('now')` })
          .where(eq(sessions.id, sessionId))
          .run();
        db.$client.exec("COMMIT");
        return {
          sessionId,
          stepKey: stepRow.stepKey,
          answers,
          nextAction: "abort",
          message: "Session aborted by user.",
        };
      }

      db.update(steps).set({ status: "passed" }).where(eq(steps.id, stepRow.id)).run();

      if (outcomeValue === "revise") {
        const targetStep = hg.reviseTargetStep ?? stepDef.onFail.target ?? stepRow.stepKey;
        const targetStepRow = db
          .select({ stepIndex: steps.stepIndex })
          .from(steps)
          .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, targetStep)))
          .get();
        if (targetStepRow) {
          db.update(steps)
            .set({ status: "pending", retryCount: 0 })
            .where(
              and(eq(steps.sessionId, sessionId), gte(steps.stepIndex, targetStepRow.stepIndex)),
            )
            .run();
        }
        db.update(sessions)
          .set({ currentStep: targetStep, updatedAt: sql`datetime('now')` })
          .where(eq(sessions.id, sessionId))
          .run();
        db.$client.exec("COMMIT");
        return {
          sessionId,
          stepKey: stepRow.stepKey,
          answers,
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
        db.$client.exec("COMMIT");
        return {
          sessionId,
          stepKey: stepRow.stepKey,
          answers,
          nextAction: "continue",
          message: `User approved. Next step: ${nextStep.stepKey}`,
        };
      }

      db.update(sessions)
        .set({ status: "done", updatedAt: sql`datetime('now')` })
        .where(eq(sessions.id, sessionId))
        .run();
      db.$client.exec("COMMIT");
      return {
        sessionId,
        stepKey: stepRow.stepKey,
        answers,
        nextAction: "done",
        message: "User approved. All steps completed. Session done.",
      };
    } catch (e) {
      try {
        db.$client.exec("ROLLBACK");
      } catch {}
      throw e;
    }
  } finally {
    db.$client.close();
  }
}
