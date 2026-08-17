/**
 * tado 部品ワークフローの例: ブログ記事の執筆・レビュー部品
 *
 * 「記事の下書きを執筆する → 人間がレビューして承認する」という
 * ブログ記事制作の基本工程を部品として定義する。
 * 単体でもそのまま初期化できるが、主な用途は workflow-composition.ts の
 * 公開ワークフローから `steps` を import して再利用されること。
 *
 * 部品であることが分かるよう、ステップ key は `parts_*` プレフィックスを
 * 付けて名前空間化している（合成時に key が衝突しないため）。
 *
 * 使い方（単体）:
 *   tado init --workflow examples/workflow-parts.ts
 *   tado next --session <id>
 */
import { buildStepPrompt } from "../src/prompt.ts";
import type { WorkflowDef } from "../src/types/workflow-def.ts";
import type { CheckCtx, PromptCtx } from "../src/types/context.ts";
import type { CheckResult } from "../src/types/result.ts";

const def: WorkflowDef = {
  id: "article-writing-parts",
  steps: [
    {
      key: "parts_write",
      phase: "執筆",
      type: "task",
      maxRetries: 2,
      onFail: { action: "abort" },
      task: {
        action: "run_subagent",
        subagentType: "general-purpose",
        buildPrompt: (ctx: PromptCtx): string =>
          buildStepPrompt({
            purpose: ["指定されたトピックでブログ記事の下書きを執筆してください。"],
            criteria: ["記事の下書きが完成し、出力に `done` が含まれていること。"],
            approach: ["トピックの要点を整理してから、タイトル・見出し・本文の順に執筆すること。"],
            output: [
              `セッションディレクトリ: ${ctx.sessionDir}`,
              "執筆した記事下書きの全文（`done` を含める）",
            ],
            policy: ["作業ディレクトリ外のファイルを変更しないこと。"],
          }),
      },
      check: (ctx: CheckCtx): CheckResult => {
        const output = ctx.attemptResult.subagentOutput ?? "";
        return output.includes("done")
          ? { status: "pass", reasons: ["output contains 'done'"] }
          : { status: "fail", reasons: ["output does not contain 'done'"] };
      },
    },
    {
      key: "parts_review",
      phase: "レビュー",
      type: "human_gate",
      maxRetries: 1,
      onFail: { action: "escalate" },
      humanGate: {
        presentArtifacts: [],
        choices: [
          { value: "approve", label: "承認", desc: "記事の下書きを承認する" },
          { value: "revise", label: "修正依頼", desc: "執筆ステップからやり直す" },
          { value: "abort", label: "中断" },
        ],
        reviseTargetStep: "parts_write",
      },
      check: (_ctx: CheckCtx): CheckResult => ({ status: "pass", reasons: [] }),
    },
  ],
};

export default def;
