import type { ConfirmDeps } from "../confirm.ts";
import type { GateAnswer } from "../../types/workflow-def.ts";

/**
 * confirm のテスト用モック deps。answers を順に返し、枯渇すると null（キャンセル）を返す。
 * 文字列ショートハンドは outcome設問 decision への選択として解釈する。
 * - "approve"/"abort" -> { decision: { value } }
 * - "revise" -> { decision: { value: "revise", input: "要修正" } } （必須入力を満たす）
 * Record を渡した場合はそのまま返す。
 */
export function mockConfirmDeps(
  ...answers: (string | Record<string, GateAnswer> | null)[]
): ConfirmDeps {
  const queue = [...answers];
  return {
    isTTY: () => true,
    ttyName: () => "/dev/test-tty",
    presentGate: async () => {
      const next = queue.shift();
      if (next === undefined) return null;
      if (next === null) return null;
      if (typeof next === "string") {
        if (next === "revise") return { decision: { value: "revise", input: "要修正" } };
        if (next === "approve" || next === "abort") return { decision: { value: next } };
        // fallback: treat as single_choice string value for decision
        return { decision: next };
      }
      return next;
    },
  };
}

export function mockConfirmAnswers(answers: Record<string, GateAnswer>): ConfirmDeps {
  return {
    isTTY: () => true,
    ttyName: () => "/dev/test-tty",
    presentGate: async () => answers,
  };
}
