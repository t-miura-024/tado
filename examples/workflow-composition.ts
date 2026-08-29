/**
 * tado ステップ合成ワークフローの例: ブログ記事の公開ワークフロー
 *
 * 記事執筆部品（workflow-parts.ts）の `steps` を import して展開し、
 * 記事を公開するまでの工程（校正 → 公開承認）を追加した例。
 * 下書き執筆は部品から再利用し、承認は公開ステップに一本化するため、
 * 部品側のレビュー承認（parts_review）は filter で除外している。
 *
 * 合成の仕組みは TypeScript のモジュール機能のみで実現している
 * （`...parts.steps.filter(...)` のスプレッド展開）。エンジン側に特別な
 * 機能はない。
 *
 * ステップ key は部品が `parts_*`、合成独自が `composed_*` のプレフィックス
 * を付けているため、key の重複は発生しない。
 *
 * 使い方:
 *   tado init --workflow examples/workflow-composition.ts
 *   tado next --session <id>
 */
import parts from "./workflow-parts.ts";
import { buildStepPrompt } from "../src/prompt.ts";
import type { WorkflowDef } from "../src/types/workflow-def.ts";
import type { CheckCtx, PromptCtx } from "../src/types/context.ts";
import type { CheckResult } from "../src/types/result.ts";

const def: WorkflowDef = {
  id: "article-publishing",
  steps: [
    // 部品の執筆ステップ（parts_write）のみ再利用する
    // （承認は後段の公開ステップに一本化するため parts_review は除外）
    ...parts.steps.filter((s) => s.key !== "parts_review"),
    {
      key: "composed_proofread",
      phase: "校正",
      type: "task",
      maxRetries: 2,
      onFail: { action: "abort" },
      task: {
        action: "run_subagent",
        subagentType: "general-purpose",
        buildPrompt: (ctx: PromptCtx): string =>
          buildStepPrompt({
            purpose: ["記事の下書きを校正し、公開できる状態に仕上げてください。"],
            criteria: [
              "誤字脱字・事実誤認・構成の問題が解消され、出力に `done` が含まれていること。",
            ],
            approach: [
              "下書き全体を読み直し、以下の観点で修正する。",
              "",
              "1. 誤字脱字",
              "2. 事実誤認",
              "3. 構成",
              "",
              "修正点を反映した完成原稿を出力する。",
            ],
            output: [
              `セッションディレクトリ: ${ctx.sessionDir}`,
              "校正後の完成原稿（`done` を含める）",
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
      key: "composed_publish",
      phase: "公開",
      type: "human_gate",
      maxRetries: 1,
      onFail: { action: "escalate" },
      humanGate: {
        presentArtifacts: [],
        outcomeQuestionKey: "decision",
        questions: [
          {
            key: "decision",
            title: "判定",
            type: "choice_with_input",
            choices: [
              { value: "approve", label: "公開", desc: "記事を公開してワークフローを完了する" },
              {
                value: "revise",
                label: "修正指示",
                desc: "校正ステップをやり直す",
                input: {
                  required: true,
                  placeholder: "修正理由を入力してください",
                  maxLength: 500,
                },
              },
              { value: "abort", label: "中断" },
            ],
          },
        ],
        reviseTargetStep: "composed_proofread",
      },
      check: (_ctx: CheckCtx): CheckResult => ({ status: "pass", reasons: [] }),
    },
  ],
};

export default def;
