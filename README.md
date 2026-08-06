# tado（辿）

決定論的ワークフローエンジン。LLM セッションでステップ進行を機械的に管理します。

LLM がオーケストレーションする多段ワークフローで、手順抜かし・簡略化を防ぐためのツールです。
状態は SQLite（`~/.tado/workflow.db`）で機械的に管理され、LLM は `next` コマンドが返す完全なプロンプト（cue）に逐次応答するだけで、ワークフローを完走できます。

> 名前の由来: 辿（たどる）— 舞台の cue や prompter に導かれて道を順に辿るように、LLM は全体を暗記せず「次はこれ」の指示に従うだけでゴールに到達します。

## 必要環境

- [Bun](https://bun.sh) ランタイム（Bun 専用です）

## インストール

### CLI として

```bash
bun install -g github:t-miura-024/tado
```

グローバルに `tado` コマンドが追加されます。

### ライブラリとして

```bash
bun add github:t-miura-024/tado
```

## 使い方

### CLI

```bash
# セッション初期化（状態 DB: ~/.tado/workflow.db）
tado init --workflow <path-to-workflow.ts> [--session <id>]

# 次のステップのプロンプト取得
tado next --session <id>

# ステップ実行結果の報告（stdin から JSON）
echo '{"stepKey":"...","status":"completed","subagentOutput":"..."}' | tado report --session <id>

# 現在状態の確認
tado status --session <id>
```

典型的な進行は `init` → `next`（プロンプト取得）→ ステップ実行 → `report`（結果報告）のサイクルです。
`next` が返すプロンプトは完全で、LLM が手順を再構築する余地はありません。ワークフローが完了するまでサイクルを繰り返します。

状態 DB は全セッションで共有される `~/.tado/workflow.db` に、成果物は `~/.tado/<sessionId>/` に保存されます。
`TADO_HOME` 環境変数を設定すると保存先を変更できます。中断したセッションは、同じ `--session <id>` を指定すれば再開できます。

`next` が成功しコミットされた後、`report` を送信する前にプロセスが中断した場合も、同じ `--session <id>` で `next` を再実行してください。そのステップは実行中（running）状態のままですが、`next` は新しい試行（アテンプト）を割り当てずに同じプロンプトを再発行するため、そのまま作業を続けて `report` を送信できます。

### ライブラリ

`tado` パッケージから `WorkflowDef` などの型を import し、ワークフロー定義ファイル（`workflow.ts`）を作成します。

```typescript
import type { WorkflowDef } from "tado";

const def: WorkflowDef = {
  id: "my-workflow",
  steps: [
    // ... StepDef の配列
  ],
};

export default def;
```

作成した定義は CLI から読み込みます:

```bash
tado init --workflow ./workflow.ts
```

## ワークフロー定義の作成方法

`WorkflowDef` を default export する TypeScript ファイルを作成します。

### WorkflowDef の構造

| フィールド    | 型                                           | 説明                                     |
| ------------- | -------------------------------------------- | ---------------------------------------- |
| `id`          | `string`                                     | ワークフロー識別子                       |
| `steps`       | `StepDef[]`                                  | ステップ定義の配列（定義順に進行）       |
| `beforeInit?` | `(ctx: InitCtx) => Promise<void>`            | 初期化前のフック                         |
| `afterInit?`  | `(ctx: InitCtx) => Promise<AfterInitResult>` | 初期化後のフック（成果物DBパス等の登録） |

### StepDef の構造

| フィールド   | 型                                     | 説明                                                  |
| ------------ | -------------------------------------- | ----------------------------------------------------- |
| `key`        | `string`                               | ステップ識別子（ワークフロー内で一意）                |
| `phase`      | `string`                               | フェーズ名（表示用）                                  |
| `type`       | `"task" \| "human_gate" \| "parallel"` | ステップの種類                                        |
| `maxRetries` | `number`                               | 最大リトライ回数                                      |
| `onFail`     | `OnFailStrategy`                       | 失敗時戦略（`retry` / `goto` / `abort` / `escalate`） |
| `check`      | `(ctx: CheckCtx) => CheckResult`       | 完了検証関数（`pass` / `fail` / `error` を返す）      |
| `condition?` | `(ctx: ConditionCtx) => boolean`       | ステップ実行条件（`false` ならスキップ）              |
| `task?`      | `TaskStepDef`                          | `type: "task"` のときの定義                           |
| `humanGate?` | `HumanGateStepDef`                     | `type: "human_gate"` のときの定義                     |
| `parallel?`  | `ParallelStepDef`                      | `type: "parallel"` のときの定義                       |

### ステップタイプ

#### task

SubAgent の実行やコマンド実行を行う基本ステップです。

```typescript
import { buildStepPrompt } from "tado/prompt";

{
  key: "write_spec",
  phase: "仕様策定",
  type: "task",
  maxRetries: 3,
  onFail: { action: "escalate" },
  task: {
    action: "run_subagent",
    subagentType: "spec-writer",
    buildPrompt: (ctx) =>
      buildStepPrompt({
        purpose: ["仕様書を作成してください。"],
        criteria: ["変更対象・変更内容・影響範囲が明記されていること。"],
        approach: ["セッション情報を確認してから作業を進めること。"],
        output: [
          `セッションディレクトリ: ${ctx.sessionDir}`,
          "仕様書（Markdown）のパスと要約",
        ],
        policy: ["仕様にない機能は追加しないこと。"],
      }),
  },
  check: (ctx) => {
    const output = ctx.attemptResult.subagentOutput ?? "";
    return output.includes("仕様書")
      ? { status: "pass", reasons: ["spec written"] }
      : { status: "fail", reasons: ["spec not found in output"] };
  },
}
```

- `task.action`: `run_subagent` / `run_command` / `orchestrate`
- `buildPrompt(ctx: PromptCtx)`: `next` が呼ばれたときにプロンプトを生成します。`ctx` からは `sessionDir`・`artifactDbPath`・`artifacts` を参照できます。構造化プロンプトは `buildStepPrompt(spec)`（`tado/prompt`）で構築できます。セッション情報・リトライフィードバックはエンジンが自動付与します。
- `check(ctx: CheckCtx)`: `report` 後に実行される完了検証です。`ctx.attemptResult`（実行結果）や `ctx.sessionDir` を使って判定し、`{ status, reasons }` を返します。

#### human_gate

人間による承認・判断を挟むステップです。

```typescript
{
  key: "approve_spec",
  phase: "仕様承認",
  type: "human_gate",
  maxRetries: 1,
  onFail: { action: "escalate" },
  humanGate: {
    presentArtifacts: ["spec.md"],
    choices: [
      { value: "approve", label: "承認" },
      { value: "revise", label: "修正が必要" },
      { value: "abort", label: "中断" },
    ],
    reviseTargetStep: "write_spec",
  },
  check: (_ctx) => ({ status: "pass", reasons: [] }),
}
```

- `presentArtifacts`: 提示する成果物キーの配列
- `choices`: 人間に提示する選択肢
- `reviseTargetStep`: `revise` 選択時に巻き戻るステップの `key`

Human Gate への回答は `report` で渡します:

```bash
echo '{"stepKey":"approve_spec","status":"completed","subagentOutput":"approve"}' | tado report --session <id>
```

#### parallel

複数の SubTask を並列に実行するステップです。`parallel.subtasks` に `SubtaskDef`（`key` / `subagentType` / `buildPrompt`）の配列を定義します。`report` 時は `subtaskResults` に各 SubTask の結果をまとめて渡します。

## examples/

最小のワークフローテンプレートを [`examples/simple-workflow.ts`](./examples/simple-workflow.ts) に用意しています。
`task` + `human_gate` の 2 ステップ構成で、ワークフロー定義の雛形としてそのまま利用できます。

```bash
tado init --workflow examples/simple-workflow.ts
```

## 同梱 Skill

エージェントスキルとして利用できる SKILL.md を同梱しています。

- [`skills/tado/SKILL.md`](./skills/tado/SKILL.md) — ワークフローエンジンのコマンド仕様・返却 JSON スキーマ・ワークフロー定義の作成方法
- [`skills/tado-run/SKILL.md`](./skills/tado-run/SKILL.md) — `init` → `next` / `report` サイクルでワークフローを進行させる汎用ランナー

## ライセンス

[MIT](./LICENSE)
