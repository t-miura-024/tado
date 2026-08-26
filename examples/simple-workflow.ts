/**
 * tado 最小ワークフローテンプレート
 *
 * task（SubAgent 実行）→ human_gate（人間による承認）の 2 ステップ構成。
 * このファイルを雛形にして、steps を追加・編集してください。
 *
 * 使い方:
 *   # レジストリへ配置（初回のみ）: {TADO_HOME}/workflows/simple-workflow/index.ts にコピー
 *   tado list --workflow --json   # 一覧に simple-workflow が現れることを確認
 *   tado init --workflow simple-workflow --title "example"
 *   tado next --session <id>
 *
 * step2_approve（human_gate）に到達したら、ユーザー自身の端末で次を実行する:
 *   tado confirm --session <id>
 *
 * 生成ワークフロー（本Skillが生成する雛形）は `import from "tado"`（`{TADO_HOME}/node_modules/tado` 解決）を使用します。本 example は開発用のため `../src/prompt.ts` の相対 import のままです。
 */
import { buildStepPrompt } from "../src/prompt.ts";
import type { WorkflowDef } from "../src/types/workflow-def.ts";
import type { CheckCtx, PromptCtx } from "../src/types/context.ts";
import type { CheckResult } from "../src/types/result.ts";

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
          buildStepPrompt({
            purpose: ["テンプレートタスクを実行してください。"],
            criteria: ["出力に `done` が含まれていること。"],
            approach: [
              "1. セッションディレクトリを確認する",
              "2. タスクを実行する",
              "",
              "```bash",
              "ls <セッションディレクトリ>",
              "```",
            ],
            output: [
              `セッションディレクトリ: ${ctx.sessionDir}`,
              "実行結果の要約（`done` を含める）",
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
