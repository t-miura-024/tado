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
Workflow Registry ({TADO_HOME}/workflows/<name>/index.ts)
  └── WorkflowDef (id / description / steps)
                          │
tado (共有エンジン)        │
  ├── CLI  ── エントリポイント（init/next/report/confirm/status）
  └── engine ── 状態機械核心（SQLite 管理）
```

## コマンド

### init

```bash
tado init --workflow <id> --title "<title>" [--session <id>]
```

`{TADO_HOME}/workflows/<id>/index.ts` からワークフロー定義を解決してセッションを初期化する。`--title` は必須（1-100文字、改行不可）。存在しない ID の場合は `Workflow not found: <id> (tried {TADO_HOME}/workflows/<id>/index.ts)` と利用可能ワークフロー一覧（ID + description）を併記してエラーになる。

- 単一の `workflow.db` を `{TADO_HOME}/` に作成（デフォルトは `~/.tado/`、`TADO_HOME` で変更可能）
- セッションディレクトリ `{TADO_HOME}/sessions/{sessionId}/` を成果物置き場として作成
- sessions/steps テーブルを初期化
- `sessions.cwd` に `process.cwd()` の絶対パス、`sessions.title` に指定タイトルを保存
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
  "prompt": "## Human Gate: 仕様確認\n\n### 確認する成果物\n...\n\n### 設問一覧 (1件 判定設問: `decision`)\n- 判定設問: `decision`\n\n#### Q1/1: decision - 判定 (type: choice_with_input, 必須)\n- key: `decision`\n- title: \"判定\"\n- type: `choice_with_input`\n- choices:\n  - `approve`: 承認\n  - `revise`: 修正が必要 [input: required: true, placeholder: \"修正理由...\", maxLength: 500]\n  - `abort`: 中断\n\n### 人間の確認が必要です\n...",
  "constraints": { "mustCallTaskTool": false, "readonly": true, "reportAfterCompletion": false }
}
```

human_gate ステップは LLM 自身では完了できません。プロンプトには設問一覧（`key/title/type/choices/input`）と成果物パス、`tado confirm --session <id>` 案内が含まれます。ユーザーに `tado confirm` の実行を促してください（下記「confirm」参照）。`report` で human_gate に回答することはできません。

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

human_gate の回答を人間から直接受け付ける対話コマンドです。1ゲートで複数設問を一括回答します。

- stdin が TTY の場合のみ実行できるため、エージェントの Bash ツールからは構造的に実行できない
- 現在のステップが human_gate でない場合はエラーになる
- TTY なしでの実行試行も `gate_events` テーブルに監査記録として残る
- 各設問を `clack.select/autocomplete` → 条件付き `clack.text` で順次提示し、進捗 `Qn/M` と設問タイトル・説明を表示する。付帯入力 `input` がある選択肢を選んだ場合は追加入力を求め、必須・文字数バリデーションが即時に行われ未達なら再入力を求める。途中キャンセルは原子的に全破棄して `running` のまま再試行可能
- 判定設問（`outcomeQuestionKey` で指名）の値で状態遷移する:
  - `approve` 相当（例: `approve`）: ゲート通過。次のステップへ
  - `revise` 相当（例: `revise`）: `reviseTargetStep` 以降を pending に戻して巻き戻す
  - `abort` 相当（例: `abort`）: セッションを中断する

### status

```bash
tado status --session <id>
```

セッションの現在状態を stdout に JSON で出力する。

### dashboard

```bash
tado dashboard
```

同一ターミナルで参照専用のTUIを起動する。2カラム（サイドバー垂直タブ + メインコンテンツ）でセッション一覧と進捗フロー図・履歴・成果物を一画面で確認できる。

- サイドバー: 起動ディレクトリbasename / 進捗率 `passed/total` / ステータス色（running=青● / paused=黄◐ / done=緑✔ / aborted=赤✘）/ タイトル
- メイン: フロー図（`phase/key/type`、status色、currentStep太線、`skipped (condition false)` 灰色単線枠＋ラベル）、履歴（`step_attempts`+`gate_events` 最新20件）、成果物（`artifactKey: filePath (存在✓/欠損✗)`）
- 成果物プレビュー: `Enter` で展開、`.md/.txt/.json/.yaml/.yml/.toml/.ts/.js/.tsx/.jsx/.sql/.css/.html` の13種のみ先頭50行/8KBまで等幅表示、非対応やバイナリ（先頭1KBに0x00含む）は `プレビュー非対応: <reason>` と表示
- 操作: `j/k` / `↑/↓` でセッション選択、`Tab` でフォーカス切替、`Enter` でプレビュー、`r` で再読込、`q` / `Ctrl+C` で終了（1秒ポーリング）
- 警告: DB不在・0件・`workflow file not found` は画面内に警告を表示

## ワークフロー定義の作成

`{TADO_HOME}/workflows/<name>/index.ts` に配置する。ディレクトリ名と `def.id` は一致させる（不一致はエラー/警告）。
`WorkflowDef` を default export する。付随ファイル（`scripts/` / `templates/` 等）は `workflows/<name>/` 配下に自由配置でき、`index.ts` から相対 import できる。ワークフローからの `import from "tado"` は `{TADO_HOME}/node_modules/tado` から解決される。

```typescript
import { existsSync } from "node:fs";
import type { CheckCtx, CheckResult, PromptCtx, WorkflowDef } from "tado";

const def: WorkflowDef = {
  id: "my-workflow",
  description: "このワークフローの目的を1〜2文で記述する。",
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
        outcomeQuestionKey: "decision",
        questions: [
          {
            key: "decision",
            title: "判定",
            type: "choice_with_input",
            choices: [
              { value: "approve", label: "承認" },
              {
                value: "revise",
                label: "修正が必要",
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

- ワークフロー定義は `{TADO_HOME}/workflows/<name>/index.ts` に集約される（`TADO_HOME` 環境変数で変更可能）
- 既存の SubAgent やスクリプトは、`index.ts` の buildPrompt/check から参照する
- `workflow.db`（`{TADO_HOME}/workflow.db` の状態DB）と成果物DB（research.db等）は完全分離
- `next` が返すプロンプトは完全で、LLM が再構築の余地を持たない
- 利用可能なワークフローが0件の場合は「利用可能なワークフローがありません。ワークフローを作成してから実行してください」と案内する。description 未設定は ID のみ表示で許容する
