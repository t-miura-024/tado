import type { WorkflowDef } from "../../types/workflow-def.ts";

/**
 * loop 本体内 human_gate＋gateAnswers 分岐 check の置換経路を示す fixture。
 *
 * 本体 [draft → review_gate → judge] のうち judge の check が
 * `gateAnswers["review_gate"]["decision"]` を読む。request_changes 回答で
 * 判定 `continue` を返して遷移 `repeat`（本体先頭へ巻き戻り）を引き起こし、
 * approve 回答で `pass` して loop を脱出する。
 * 配線（loop本体内配置＋gateAnswersを読むcheck）はワークフロー作者の責務であり、
 * エンジンは値の受理のみを行う（ADR-0027）。
 */
const def: WorkflowDef = {
  id: "test-loop-gate-rework",
  steps: [
    {
      key: "fix_loop",
      phase: "修正ループ",
      type: "loop",
      maxIterations: 3,
      onExhausted: "abort",
      body: [
        {
          key: "draft",
          phase: "起草",
          type: "task",
          maxRetries: 0,
          onFail: { action: "abort" },
          task: {
            action: "run_subagent",
            subagentType: "test-agent",
            buildPrompt: () => "draft",
          },
          check: () => ({ status: "pass", reasons: [] }),
        },
        {
          key: "review_gate",
          phase: "レビュー",
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
                  { value: "approve", label: "承認", desc: "次に進む" },
                  {
                    value: "request_changes",
                    label: "修正",
                    desc: "修正を求める",
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
          },
          // human_gate.check はデッド配線のため定義しないのが正だが、
          // WorkflowDef 型が check を必須とするため型が通る最小形として例外送出スタブを置く。
          // エンジンは human_gate の check を呼ばない（confirm が確定する）。
          check: () => {
            throw new Error("human_gate check must not be called (confirm determines the outcome)");
          },
        },
        {
          key: "judge",
          phase: "判定",
          type: "task",
          maxRetries: 0,
          onFail: { action: "abort" },
          task: {
            action: "run_subagent",
            subagentType: "test-agent",
            buildPrompt: () => "judge",
          },
          // 唯一の分岐点: gateAnswers["review_gate"]["decision"] を読んで continue/pass を判定する。
          check: (ctx) => {
            const ans = ctx.gateAnswers["review_gate"]?.["decision"];
            const value = typeof ans === "string" ? ans : ans?.value;
            if (value === undefined) return { status: "error", reasons: ["gate answer missing"] };
            if (value === "approve") return { status: "pass", reasons: [] };
            if (value === "request_changes")
              return { status: "continue", reasons: ["request_changes: rework requested"] };
            return { status: "fail", reasons: [`unknown gate value: ${value}`] };
          },
        },
      ],
    },
    {
      key: "followup",
      phase: "後処理",
      type: "task",
      maxRetries: 0,
      onFail: { action: "abort" },
      task: {
        action: "run_subagent",
        subagentType: "test-agent",
        buildPrompt: () => "followup",
      },
      check: () => ({ status: "pass", reasons: [] }),
    },
  ],
};

export default def;
