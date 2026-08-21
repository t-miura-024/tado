---
name: tado
description: LLM のワークフロー順守を強制する決定論的ワークフローエンジン。init/next/report/confirm/status のコマンドでセッション管理・ステップ進行・ヒューマンゲート・リトライ判定を行う。
---

# tado

決定論的ワークフローエンジンです。
LLM がオーケストレーションする多段ワークフローで、手順抜かし・簡略化を防ぎます。
状態は SQLite（`workflow.db`）で機械的に管理し、LLM は `next` で返される完全プロンプトに従うだけです。

## アーキテクチャ

```
Skill (上位スキル)
  └── workflow.ts  ── ワークフロー定義（WorkflowDef）
                          │
tado (共有エンジン)        │
  ├── CLI  ── エントリポイント（init/next/report/confirm/status）
  └── engine ── 状態機械核心（SQLite 管理）
```

## コマンド

### init

```bash
tado init --workflow <path-to-workflow.ts> [--session <id>]
```

ワークフロー定義を読み込み、セッションを初期化する。

- 単一の `workflow.db` を `{TADO_HOME}/` に作成（デフォルトは `~/.tado/`、`TADO_HOME` で変更可能）
- セッションディレクトリ `{TADO_HOME}/{sessionId}/` を成果物置き場として作成
- sessions/steps テーブルを初期化
- フック（beforeInit/afterInit）を実行
- セッションIDを stdout に JSON で出力

### next

```bash
tado next --session <id>
```

現在のステップのプロンプトを生成し、stdout に構造化 JSON で出力する。
返却形式は Step タイプにより異なる：

**task:**

```json
{
  "sessionId": "...",
  "stepKey": "spec_writer",
  "stepType": "task",
  "action": "run_subagent",
  "subagentType": "spec-writer",
  "prompt": "## 目的\n...",
  "constraints": { "mustCallTaskTool": true, "readonly": false, "reportAfterCompletion": true },
  "context": { "sessionDir": "...", "attemptNumber": 1, "retryCount": 0, "maxRetries": 3 }
}
```

**human_gate:**

```json
{
  "stepKey": "approve",
  "stepType": "human_gate",
  "action": "human_gate",
  "prompt": "## Human Gate: 仕様確認\n\n### 確認する成果物\n...\n\n### 選択肢\n- **approve**: 承認\n- **revise**: 修正\n- **abort**: 中断\n\n### 人間の確認が必要です\n...",
  "constraints": { "mustCallTaskTool": false, "readonly": true, "reportAfterCompletion": false }
}
```

human_gate ステップは LLM 自身では完了できません。プロンプトの指示に従い、ユーザーに `tado confirm` の実行を促してください（下記「confirm」参照）。`report` で human_gate に回答することはできません。

**parallel:**

```json
{
  "stepType": "parallel",
  "parallel": {
    "subtasks": [
      { "key": "researcher_q1", "subagentType": "...", "prompt": "...", "constraints": {} },
      { "key": "researcher_q2", "subagentType": "...", "prompt": "...", "constraints": {} }
    ]
  }
}
```

### report

```bash
echo '{...}' | tado report --session <id>
```

stdin から JSON でステップ実行結果を受け取り、完了検証を走らせて状態遷移・リトライ判定を行う。

**入力形式:**

```json
{
  "stepKey": "spec_writer",
  "status": "completed",
  "subagentOutput": "仕様書を作成しました...",
  "artifacts": [{ "key": "spec.md", "path": "tmp/sdd/spec.md" }]
}
```

**並列実行時の入力形式:**

```json
{
  "stepKey": "researcher",
  "status": "completed",
  "subtaskResults": [
    { "subtaskKey": "researcher_q1", "subagentOutput": "...", "status": "completed" },
    {
      "subtaskKey": "researcher_q2",
      "subagentOutput": "...",
      "status": "failed",
      "error": "timeout"
    }
  ]
}
```

**Human Gate の回答:**

human_gate への回答は `report` では受け付けません。人間が自分の端末（TTY 付き）で `tado confirm` を実行すると、成果物パスと選択肢がその端末に表示され、選択・状態遷移まで行われます。LLM は回答を転記してはならず、転記しようとしてもエンジンが拒否します。

### confirm

```bash
tado confirm --session <id>
```

human_gate の回答を人間から直接受け付ける対話コマンドです。

- stdin が TTY の場合のみ実行できるため、エージェントの Bash ツールからは構造的に実行できない
- 現在のステップが human_gate でない場合はエラーになる
- TTY なしでの実行試行も `gate_events` テーブルに監査記録として残る
- fzf 風の TUI（入力で絞り込み、↑↓で選択、Enter で確定）で選択させ、選択に応じて状態遷移する:
  - `approve`: ゲート通過。次のステップへ
  - `revise`: `reviseTargetStep` 以降を pending に戻して巻き戻す
  - `abort`: セッションを中断する

### status

```bash
tado status --session <id>
```

セッションの現在状態を stdout に JSON で出力する。

## ワークフロー定義の作成

各スキルディレクトリに `workflow.ts` を配置する。
`WorkflowDef` を default export する。

```typescript
import { existsSync } from "node:fs";
import type { CheckCtx, CheckResult, PromptCtx, WorkflowDef } from "tado";

const def: WorkflowDef = {
  id: "my-workflow",
  steps: [
    {
      key: "phase1_planner",
      phase: "調査計画",
      type: "task",
      maxRetries: 3,
      onFail: { action: "escalate" },
      task: {
        action: "run_subagent",
        subagentType: "planner",
        buildPrompt: (ctx: PromptCtx): string => {
          return `## 目的\nplan.mdを作成してください。\n\n### コンテキスト\n- セッション: ${ctx.sessionDir}`;
        },
      },
      check: (ctx: CheckCtx): CheckResult => {
        const planExists = existsSync(`${ctx.sessionDir}/plan.md`);
        return {
          status: planExists ? "pass" : "fail",
          reasons: planExists ? ["plan.md exists"] : ["plan.md not found"],
        };
      },
    },
    {
      key: "phase2_approve",
      phase: "仕様承認",
      type: "human_gate",
      maxRetries: 1,
      onFail: { action: "escalate" },
      humanGate: {
        presentArtifacts: ["plan.md"],
        choices: [
          { value: "approve", label: "承認" },
          { value: "revise", label: "修正が必要" },
          { value: "abort", label: "中断" },
        ],
        reviseTargetStep: "phase1_planner",
      },
      check: (_ctx: CheckCtx): CheckResult => ({ status: "pass", reasons: [] }),
    },
  ],
};

export default def;
```

最小テンプレートはリポジトリの `examples/simple-workflow.ts` を参照。

## セッション再開

```bash
tado next --session <id>
```

中断したセッションIDを指定すれば、`{TADO_HOME}/workflow.db` から状態を復元して再開できる。

## 注意事項

- 各スキルは `workflow.ts` でワークフロー定義を提供する
- 既存の SubAgent やスクリプトは、workflow.ts の buildPrompt/check から参照する
- `workflow.db`（`{TADO_HOME}/workflow.db` の状態DB）と成果物DB（research.db等）は完全分離
- `next` が返すプロンプトは完全で、LLM が再構築の余地を持たない
