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
tado init --workflow <id> --title "<title>" [--session <id>]

# 次のステップのプロンプト取得
tado next --session <id> [--workflow <id>]

# ステップ実行結果の報告（stdin から JSON）
echo '{"stepKey":"...","status":"completed","subagentOutput":"..."}' | tado report --session <id> [--workflow <id>]

# human_gate への回答（人間が自分の端末で実行・TTY 必須）
tado confirm --session <id>

# 記録済みのゲート回答を読み出す（読み取り専用。--json で機械可読 JSON。
# 未指定時はゲートごとの最新試行のみ、--all で全試行の回答履歴）
tado answers --session <id> [--step <key>] [--json] [--all]

# 現在状態の確認
tado status --session <id>

# ダッシュボード（参照専用TUI）
tado dashboard

# ワークフロー一覧
tado list --workflow [--json] [--verbose]
# 一覧のみ。`tado list` 単体はヘルプを表示
```

典型的な進行は `init` → `next`（プロンプト取得）→ ステップ実行 → `report`（結果報告）のサイクルです。
`next` が返すプロンプトは完全で、LLM が手順を再構築する余地はありません。ワークフローが完了するまでサイクルを繰り返します。
human_gate ステップだけは例外で、`report` では回答できず、人間が自分の端末から `tado confirm` を実行します（後述）。

状態 DB は全セッションで共有される `~/.tado/workflow.db` に、成果物は `~/.tado/sessions/<sessionId>/` に、ワークフロー定義は `~/.tado/workflows/<name>/index.ts` に保存されます。
`TADO_HOME` 環境変数を設定すると保存先を変更できます。中断したセッションは、同じ `--session <id>` を指定すれば再開できます。

`next` が成功しコミットされた後、`report` を送信する前にプロセスが中断した場合も、同じ `--session <id>` で `next` を再実行してください。そのステップは実行中（running）状態のままですが、`next` は新しい試行（アテンプト）を割り当てずに同じプロンプトを再発行するため、そのまま作業を続けて `report` を送信できます。

### ライブラリ

`tado` パッケージから `WorkflowDef` などの型を import し、ワークフロー定義ファイル（`{TADO_HOME}/workflows/<name>/index.ts`）を作成します。

型は原則ルート（`import type { WorkflowDef } from "tado"`）から import してください。`tado/types/*` のサブパスは `.ts` 付き（例: `tado/types/workflow-def.ts`）でのみ参照できます。

```typescript
import type { WorkflowDef } from "tado";

const def: WorkflowDef = {
  id: "my-workflow",
  description: "このワークフローの目的を1〜2文で記述する。",
  steps: [
    // ... StepDef の配列
  ],
};

export default def;
```

作成した定義は `~/.tado/workflows/<name>/index.ts` に配置し、CLI から ID で読み込みます:

```bash
tado init --workflow my-workflow
```

ワークフロー ID はディレクトリ名と一致させる必要があります。不一致の場合はエラーになります。`workflows/<name>/` 配下には `scripts/` や `templates/` などの付随ファイルも配置でき、`index.ts` から相対 import できます。

## 公開契約と内部実装

ワークフロー定義とエージェントが依存してよい公開契約は、フック ctx（`ConditionCtx` / `CheckCtx` / `PromptCtx` / `StepCtx`）・CLI（`tado` サブコマンド）・`WorkflowDef` の3つです。`~/.tado/workflow.db` のスキーマや `gate_events` / `steps` / `step_attempts` などのテーブルは内部実装であり、ワークフローやエージェントが直接読み書きしてはなりません。ゲート回答の参照は ctx の `gateAnswers`、確認・監査は `tado answers` を使ってください。

## ワークフロー定義の作成方法

`{TADO_HOME}/workflows/<name>/index.ts` に `WorkflowDef` を default export する TypeScript ファイルを作成します。

### WorkflowDef の構造

| フィールド     | 型                                           | 説明                                       |
| -------------- | -------------------------------------------- | ------------------------------------------ |
| `id`           | `string`                                     | ワークフロー識別子（ディレクトリ名と一致） |
| `description?` | `string`                                     | ワークフローの人間可読な説明（1〜2文）     |
| `steps`        | `StepDef[]`                                  | ステップ定義の配列（定義順に進行）         |
| `beforeInit?`  | `(ctx: InitCtx) => Promise<void>`            | 初期化前のフック                           |
| `afterInit?`   | `(ctx: InitCtx) => Promise<AfterInitResult>` | 初期化後のフック（成果物DBパス等の登録）   |

### StepDef の構造

`StepDef` は `type` で判別するユニオンです。`task` / `human_gate` / `parallel` は実行されるステップ、`loop` は本体を繰り返す構造ステップで、それ自身は実行されません。

| フィールド      | 型                                               | 説明                                                                                       |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `key`           | `string`                                         | ステップ識別子（ワークフロー内で一意）                                                     |
| `phase`         | `string`                                         | フェーズ名（表示用）                                                                       |
| `type`          | `"task" \| "human_gate" \| "parallel" \| "loop"` | ステップの種類                                                                             |
| `maxRetries`    | `number`                                         | 最大リトライ回数（実行ステップのみ）                                                       |
| `onFail`        | `OnFailStrategy`                                 | 失敗時戦略（`retry` / `abort` / `escalate`。実行ステップのみ）                             |
| `check`         | `(ctx: CheckCtx) => CheckResult`                 | 完了検証関数（`pass` / `fail` / `error` / `continue` を返す。`continue` は loop 本体のみ） |
| `condition?`    | `(ctx: ConditionCtx) => boolean`                 | ステップ実行条件（`false` ならスキップ）                                                   |
| `beforeStep?`   | `(ctx: StepCtx) => Promise<ArtifactInput[]>`     | プロンプト生成前に実行されるフック                                                         |
| `afterStep?`    | `(ctx: StepCtx) => Promise<ArtifactInput[]>`     | `check` の前に実行されるフック                                                             |
| `task?`         | `TaskConfig`                                     | `type: "task"` のときの定義                                                                |
| `humanGate?`    | `HumanGateConfig`                                | `type: "human_gate"` のときの定義                                                          |
| `parallel?`     | `ParallelConfig`                                 | `type: "parallel"` のときの定義                                                            |
| `body`          | `StepDef[]`                                      | `type: "loop"` のときの本体ステップ列                                                      |
| `maxIterations` | `number`                                         | `type: "loop"` のときの最大反復回数                                                        |
| `onExhausted`   | `OnExhaustedStrategy`                            | `type: "loop"` の上限到達時戦略（`escalate` / `abort`）                                    |

### ステップタイプ

#### task

SubAgent の実行やコマンド実行を行う基本ステップです。

````typescript
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
        approach: [
          "1. セッション情報を確認する",
          "2. 変更対象のコードを読み、仕様を整理する",
          "",
          "```bash",
          "gh issue view <number>",
          "```",
        ],
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
````

- `task.action`: `run_subagent` / `run_command` / `orchestrate`
- `buildPrompt(ctx: PromptCtx)`: `next` が呼ばれたときにプロンプトを生成します。`ctx` からは `sessionDir`・`artifactDbPath`・`artifacts` を参照できます。本文は `buildStepPrompt(spec)`（`tado/prompt`）で構築できます。各セクションの中身は行テキストの配列で、そのまま（raw）レンダリングされます。セッション情報・リトライフィードバックはエンジンが自動付与します。
- `check(ctx: CheckCtx)`: `report` 後に実行される完了検証です。`ctx.attemptResult`（実行結果）や `ctx.sessionDir` を使って判定し、`{ status, reasons }` を返します。loop 本体では `"continue"` を返すと次イテレーションへ巻き戻ります。

#### human_gate

人間による承認・判断を挟むステップです。1ゲートで複数設問を一括回答できます。

```typescript
{
  key: "approve_spec",
  phase: "仕様承認",
  type: "human_gate",
  maxRetries: 1,
  onFail: { action: "escalate" },
  humanGate: {
    presentArtifacts: ["spec.md"],
    outcomeQuestionKey: "decision",
    questions: [
      {
        key: "decision",
        title: "判定",
        type: "choice_with_input",
        choices: [
          { value: "approve", label: "承認" },
          { value: "request_changes", label: "修正が必要", input: { required: true, placeholder: "修正理由を入力してください", maxLength: 500 } },
          { value: "abort", label: "中断" },
        ],
      },
      // 必要に応じて自由記述設問を追加
      // { key: "comment", title: "コメント", type: "free_text", required: false, placeholder: "任意コメント", maxLength: 1000 },
    ],
  },
  check: (_ctx) => ({ status: "pass", reasons: [] }),
}
```

- `presentArtifacts`: 提示する成果物キーの配列
- `outcomeQuestionKey`: ゲート全体の状態遷移を決める判定設問の `key`。回答の `value` が文字列 `abort` と完全一致すれば中断、それ以外の値はすべて承認（ゲート通過）として扱われる。human_gate は確認と回答保存のみを責務とし、巻き戻しは行わない
- `questions`: ゲート設問の配列（`GateQuestion[]`）。各設問は `key` / `title` / `type`（`single_choice` / `free_text` / `choice_with_input`）/ `required` / `placeholder` / `maxLength` / `choices` で構成。`choice_with_input` の選択肢は `input: { required, placeholder, maxLength, title }` で付帯入力を定義でき、選択値に応じて自由入力の要否・必須・文字数・placeholder が切り替わる（例: `request_changes` は理由必須）
- 回答は `Record<questionKey, GateAnswer>` として保存され、全フック ctx（condition / check / buildPrompt / beforeStep / afterStep）の `gateAnswers[stepKey][questionKey]` から参照できる。値はゲートごとの最新試行の回答で、最新試行が未回答のゲートは含まれない。記録済みの回答は `tado answers` でも確認でき、全試行の履歴は `tado answers --all` で参照できる（旧 `gateChoices` は廃止）。分岐判断は loop 本体の check がこの回答を読んで行う

Human Gate への回答は **`tado confirm` サブコマンドでのみ**受け付けます（ADR-0007）。
LLM が人間の回答を転記する経路は存在せず、`report` で human_gate ステップを報告するとエラーになります。

```bash
# 人間が自分の端末（TTY 付き）で実行する。
# 成果物パスと選択肢がその端末に表示され、
# fzf 風の TUI（入力絞り込み + 矢印キー選択）で回答すると状態遷移まで行われる。
tado confirm --session <id>
```

- `confirm` は stdin が TTY の場合のみ実行できるため、エージェントの Bash ツールからは構造的に実行できません。LLM が人間への案内を省略しても、ゲートは停止するだけで通過しません
- 承認の成立に加え、TTY なしで拒否された実行試行も `gate_events` テーブルに監査記録として残ります
- `confirm` は複数設問を `clack.select/autocomplete` → 条件付き `clack.text` で順次提示し、進捗 `Qn/M` と設問タイトル・説明を表示する。必須・文字数バリデーションが即時に行われ、未達なら再入力を求める。途中キャンセルは原子的に全破棄して `running` のまま再試行可能
- 判定設問（`outcomeQuestionKey` で指名）の回答 `value` は文字列の完全一致で判定される。値が文字列 `abort` のときだけセッションが中断され、それ以外の値はすべて承認として扱われる。巻き戻しが必要な場合は human_gate ではなく loop 本体の check が `gateAnswers` を読んで判定 `continue` を返し、遷移 `repeat` で本体先頭へ巻き戻す（例: `const ans = ctx.gateAnswers["approve_spec"]?.["decision"]; const val = typeof ans === "string" ? ans : ans?.value; if (val === undefined) return { status: "error", reasons: ["gate answer missing"] }; if (val === "approve") return { status: "pass", reasons: [] }; if (val === "request_changes") return { status: "continue", reasons: ["revision requested"] }; return { status: "fail", reasons: ["unknown gate value"] };`）。判定 `continue`（check の返値）と遷移 `repeat`（巻き戻しを適用した `report` の `nextAction`）と通常進行 `continue`（巻き戻しなしの `report` の `nextAction`）は区別される。未回答・typo・未知値を `continue` に丸めず、未回答は `error`、未知値は `fail` で止める。`{ value: "rework", label: "差し戻し" }` のような同義語も承認ではなく分岐対象として check 側で解釈する

#### parallel

複数の SubTask を並列に実行するステップです。`parallel.subtasks` に `SubtaskConfig`（`key` / `subagentType` / `buildPrompt`）の配列を定義します。`report` 時は `subtaskResults` に各 SubTask の結果をまとめて渡します。`loop` は `parallel` の子に置けません（型とロード時検証で拒否されます）。

#### loop

`body`（`StepDef[]`）を繰り返す構造ステップです。loop 自身はステップとして実行されず、本体のステップが実行対象になります。

```typescript
{
  key: "review_cycle",
  phase: "レビューサイクル",
  type: "loop",
  body: [
    { key: "write_spec", phase: "仕様策定", type: "task", /* ... */ },
    {
      key: "review_spec",
      phase: "レビュー",
      type: "task",
      /* ... */
      check: (ctx) =>
        ctx.attemptResult.subagentOutput?.includes("LGTM")
          ? { status: "pass", reasons: ["approved"] }
          : { status: "continue", reasons: ["revision requested"] },
    },
  ],
  maxIterations: 3,
  onExhausted: "escalate",
}
```

- 本体の `check` が `"continue"` を返すたびに本体先頭へ巻き戻して（本体全体を pending + retryCount=0 に戻して）次イテレーションを実行します。`"pass"` で本体が完了して後続ステップへ進み、`"fail"` / `"error"` は通常どおりリトライ / `onFail` で処理されます
- ループ外の `"continue"` はエラー（fail-fast）になります
- `maxIterations` に達すると `onExhausted`（`escalate` = セッション paused / `abort` = aborted）が適用されます
- ネストした loop の `"continue"` は最内ループに帰属し、外側 loop の巻き戻しでは内側 loop の反復状態も初期化されます
- ループ文脈（`iteration` / `maxIterations`）は全フック ctx の `loop` と `next` の `context.loop` から参照できます（ループ外は `null`）

### ステップフック（beforeStep / afterStep）

ステップのプロンプト生成前 / チェック前に非同期処理を挟み、成果物を注入・変換できる汎用インターセプターです。

- `beforeStep(ctx: StepCtx)` — `buildPrompt` の前に実行されます。返却した成果物は DB に登録され、`PromptCtx.artifacts` にマージされます（既存と同じ `key` はフックの返却値で上書き）。失敗時は `maxRetries` までリトライし、枯渇するとステップは `failed` となりワークフローが停止します。フックは DB トランザクションの外で実行されるため、時間のかかる非同期 I/O（ネットワーク等）を実行しても他セッションの `next()` をブロックしません。
- `afterStep(ctx: StepCtx)` — `check` の前に実行されます。返却した成果物は DB に登録され、`CheckCtx.artifacts` にマージされます（上書き戦略は `beforeStep` と同じ）。同名キーの上書きが発生した場合はログ出力のみ行い、変換履歴を DB に残しません。

```typescript
{
  key: "write_spec",
  phase: "仕様策定",
  type: "task",
  maxRetries: 3,
  onFail: { action: "escalate" },
  beforeStep: async (ctx) => {
    const plan = await loadPlan(ctx.sessionDir);
    return [{ key: "plan.md", path: plan }];
  },
  afterStep: async (ctx) => {
    await exportArtifacts(ctx.sessionDir);
    return [];
  },
  task: { /* ... */ },
  check: (ctx) => { /* ... */ },
}
```

`StepCtx` は `sessionDir` / `artifacts` / `stepKey` / `attemptNumber` を提供します。
`parallel` ステップでは、フックはステップ全体に 1 回だけ適用されます（各サブタスクには適用されません）。

## examples/

最小のワークフローテンプレートを [`examples/simple-workflow.ts`](./examples/simple-workflow.ts) に用意しています。
`task` + `human_gate` の 2 ステップ構成で、ワークフロー定義の雛形としてそのまま利用できます。`{TADO_HOME}/workflows/<name>/index.ts` に配置して利用してください。

```bash
# 例: テンプレートをワークフローとして登録して起動
mkdir -p ~/.tado/workflows/my-workflow
cp examples/simple-workflow.ts ~/.tado/workflows/my-workflow/index.ts
tado init --workflow my-workflow --title "My Workflow"
```

## ダッシュボード

`tado dashboard` で参照専用のTUIを同一ターミナルで起動します。セッション一覧と選択中セッションの進捗フロー図・履歴・成果物を一画面で確認できます。

```bash
tado dashboard
```

- 2カラム構成: 左サイドバー（垂直タブ）にセッション一覧、右メインコンテンツにフロー図・履歴・成果物
- サイドバー各タブ: 起動ディレクトリ名 / 進捗率 `passed/total` / ステータス `●◐✔✘` / タイトル
- 初期選択: 起動時CWDに前方一致するセッションのうち `updated_at` 最新、該当なしは全体最新
- フロー図: ステップをボックス+矢印で縦積み、`phase/key/type` と `status` 色、`currentStep` は太線強調、 `skipped (condition false)` は灰色単線枠＋ラベル表示
- 履歴: `step_attempts` + `gate_events` を時系列統合して最新20件
- 成果物: `artifactKey: filePath (存在✓/欠損✗)` 一覧、`Enter` でプレビュー展開（対応拡張子のみ先頭 50 行 /8KB まで等幅表示、非対応やバイナリは `プレビュー非対応: <reason>` と表示）
- 操作: `j/k` / `↑/↓` でセッション選択、 `Tab` でフォーカス切替、`Enter` で成果物プレビュー展開/折りたたみ、`r` で再読込、`q` / `Ctrl+C` で終了（ 1 秒自動ポーリング）
- 参照専用: TUI から状態の作成・変更・削除は行いません
- 警告: DB 不在・ 0 件・ `workflow file not found` は画面内に警告を表示

## 同梱 Skill

エージェントスキルとして利用できる SKILL.md を同梱しています。

- [`skills/tado/SKILL.md`](./skills/tado/SKILL.md) — ワークフローエンジンのコマンド仕様・返却 JSON スキーマ・ワークフロー定義の作成方法
- [`skills/tado-run/SKILL.md`](./skills/tado-run/SKILL.md) — `init` → `next` / `report` サイクルでワークフローを進行させる汎用ランナー

## 開発

依存のインストールと lint / format / test の実行方法です。

```bash
bun install
bun run check   # oxlint + oxfmt --check
bun test
```

### Git hooks（lefthook）

コミット・プッシュ時に以下のチェックが自動実行されます。`bun install` の postinstall で自動インストールされるため、clone や新しい worktree で `bun install` を実行すれば有効になります（設定は `lefthook.yml`）。

- **コミット前（pre-commit）**: ステージ済みの TS ファイルに oxfmt でフォーマットを適用し（差分は再ステージ）、続けて oxlint で lint を実行します。失敗するとコミットはブロックされます。
- **プッシュ前（pre-push）**: `bun test` を実行します。失敗するとプッシュはブロックされます。

チェックに引っかかった場合は、指摘を修正して再度コミット・プッシュしてください。緊急時は `LEFTHOOK=0`（環境変数）または `--no-verify`（git の引数）で一時的にスキップできます。

## ライセンス

[MIT](./LICENSE)
