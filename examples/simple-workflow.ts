/**
 * tado 最小ワークフローテンプレート
 *
 * task（SubAgent 実行）→ human_gate（人間による承認）の 2 ステップ構成。
 * このファイルを雛形にして、steps を追加・編集してください。
 *
 * 使い方:
 *   tado init --workflow examples/simple-workflow.ts
 *   tado next --session <id>
 */
import type { CheckCtx, CheckResult, PromptCtx, WorkflowDef } from "../src/types.ts";

const def: WorkflowDef = {
  id: "simple-workflow",
  steps: [
    {
      key: "step1_task",
      phase: "タスク実行",
      type: "task",
      maxRetries: 2,
      onFail: { action: "abort" },
      task: {
        action: "run_subagent",
        subagentType: "general-purpose",
        buildPrompt: (ctx: PromptCtx): string =>
          `## 目的\nテンプレートタスクを実行してください。\n\n### コンテキスト\n- セッション: ${ctx.sessionDir}\n- 試行回数: ${ctx.attemptNumber}/${ctx.maxRetries}`,
      },
      check: (ctx: CheckCtx): CheckResult => {
        const output = ctx.attemptResult.subagentOutput ?? "";
        return output.includes("done")
          ? { status: "pass", reasons: ["output contains 'done'"] }
          : { status: "fail", reasons: ["output does not contain 'done'"] };
      },
    },
    {
      key: "step2_approve",
      phase: "承認",
      type: "human_gate",
      maxRetries: 1,
      onFail: { action: "escalate" },
      humanGate: {
        presentArtifacts: [],
        choices: [
          { value: "approve", label: "承認", desc: "ワークフローを完了する" },
          { value: "revise", label: "修正", desc: "前のステップをやり直す" },
          { value: "abort", label: "中断" },
        ],
        reviseTargetStep: "step1_task",
      },
      check: (_ctx: CheckCtx): CheckResult => ({ status: "pass", reasons: [] }),
    },
  ],
};

export default def;
