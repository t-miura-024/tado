---
name: tado-create-workflow
description: tadoのWorkflowDefを対話的に設計・生成するためのLLM向けSkill。grill思想のラウンド制ヒアリングでワークフローをスキャフォールドし、workflow.ts + SKILL.md の2ファイルセットを生成する。
---

# tado-create-workflow

tado の `WorkflowDef` を対話的に設計し、`workflow.ts` + `SKILL.md` の2ファイルセットとしてスキャフォールドする軽量 Skill です。

本 Skill は LLM オーケストレーション型であり、tado エンジン駆動（`workflow.ts` を持つワークフロー）は持たない。ワークフローを作るためにワークフローを走らせる循環を避けるためである。生成されたワークフローは `tado-run` 経由で即座に実行可能になる。

## 前提

- 本 Skill が生成する雛形は Section 型（`PromptItem<string|Section>`、H6キャップ、行頭 `#` は型で拒否）を前提とする。`string` に行頭 `#` を含む記法は生成しない。
- 既存の `string[]` 呼び出しは後方互換で動作することを担保する。
- 生成される雛形の唯一の参照は `examples/simple-workflow.ts` とする。`docs/adr` の解説は本 Skill に重複させない。
- 型は `src/types/workflow-def.ts`、`prompt` は `src/prompt.ts` を正とする。

## 参照ファイル

- `examples/simple-workflow.ts` — 唯一の雛形参照。`WorkflowDef` の最小構成（`task` → `human_gate`）を示す。
- `src/types/workflow-def.ts` — `WorkflowDef` / `StepDef` / `TaskStepDef` / `HumanGateStepDef` / `ParallelStepDef` / `SubtaskDef` / `OnFailStrategy` の型定義。
- `src/prompt.ts` — `buildStepPrompt` / `PromptString` / `PromptSection` / `PromptItem` / `StepPromptSpec` の定義とレンダラー。
- `src/cli/paths.ts` — `TOOLS` / `SCOPES` / `resolveSkillsDir` / `findInstalledLocations` の配布機構。

## 出力先解決

生成成果物の出力先は必ずツール + スコープ + Skill 名の3要素で解決し、デフォルトパスや分離型配置は用いない。

### 解決手順

1. **ツール選択**: `findInstalledLocations(cwd, home)` を呼び出し、インストール済みの `InstallLocation[]`（各要素は `tool` / `scope` / `dir`）を列挙する。`src/cli/paths.ts` の `TOOLS`（`claude-code` / `opencode` / `codex` / `cursor` の4ツール）と `SCOPES`（`user` / `project`）の8パターンが対象。インストール済みの中からユーザーに選択させる。未インストールのツールは選択肢に含めない。

2. **スコープ選択**: `user` / `project` のいずれかを必ず選択させる。デフォルト値は設けない。`src/cli/paths.ts` の `SCOPES` を参照する。

3. **Skill 名決定**:
   - ケバブケース（`^[a-z0-9-]+$`）で検証する。不正な場合はエラー表示し再入力を求める。
   - 既存チェック: `resolveSkillsDir(tool, scope)/<skill-name>` が既に存在する場合は重複エラーとして表示し、再入力を求める。
   - LLM からワークフロー目的に基づく具体的な候補3案を提案する。例: ワークフロー目的が「コードレビュー自動化」なら `code-review-flow` / `review-pipeline` / `auto-review-workflow` のように目的に即した3案を提示する。ユーザーは候補から選ぶか、独自の名前を入力できる。
   - 既存ディレクトリが存在する場合（`resolveSkillsDir(...) + "/" + skillName` が存在する場合）は上書き確認を挟む。上書きする場合は明示的に確認を取る。

4. **出力先確定**: `resolveSkillsDir(tool, scope)/<skill-name>/` の同居型とする。同ディレクトリ配下に `SKILL.md` と `workflow.ts` を同居させ、`SKILL.md` からは `./workflow.ts` の相対参照とする。`src/cli/paths.ts` の `resolveSkillsDir` を使用する。

## 手順（grill 思想のラウンド制）

各ラウンドでユーザー確認を挟むこと。次のラウンドに進む前に、現在のラウンドの決定内容を要約して提示し、ユーザーの承認を得る。

### Round 1: ワークフロー目的とステップ数確定

- ワークフローの目的（`WorkflowDef.description` に入る1〜2文）、想定利用シナリオをヒアリングする。
- ステップ数（2〜n）を決定する。最小2ステップを推奨するが、上限は設けない。
- 各ステップの `phase` 名を仮決めする（例: `調査計画` / `実装` / `レビュー` / `承認`）。
- ラウンド終了時に「ワークフロー目的」「ステップ数」「各ステップの phase 名（仮）」を要約してユーザー確認を取る。

### Round 2: 各ステップの種別と依存確定

各ステップについて以下を決定する:

- **ステップ種別**: 各ステップの `type`（`task` / `human_gate` / `parallel`）を決定する。
- **task の場合**: `action`（`run_subagent` / `run_command` / `orchestrate`）と、必要に応じて `subagentType` を決定する。
  - `run_subagent`: SubAgent にプロンプトを委譲する
  - `run_command`: シェルコマンドを実行する
  - `orchestrate`: オーケストレーターとして複雑な制御を行う
- **parallel の場合**: `subtasks` の数と、各 subtask の `key` / `subagentType` を決定する。
- **ステップ間の依存**:
  - `condition` による分岐の有無と判定条件
  - `reviseTargetStep` による差し戻し先（`human_gate` の `revise` 選択時に戻るステップの `key`）
  - `onFail` 戦略（`retry` / `goto` / `abort` / `escalate`）と `goto` 時の `target`
- **`maxRetries` と `onFail`**: 各ステップの `maxRetries`（リトライ上限）と `onFail`（`{ action, target?, requeueSource? }`）を決定する。
- ラウンド終了時に「各ステップの `key` / `phase` / `type` / `action` / `subtasks` / `condition` / `onFail` / `maxRetries`」の一覧を要約してユーザー確認を取る。

### Round 3: 各ステップの `buildStepPrompt` 6セクション概要と `check` / `condition` / `beforeStep` / `afterStep` 有無確定

各ステップについて以下を決定する:

- **`buildStepPrompt` 6セクション概要**: 各ステップの `buildStepPrompt` で使う6セクション（`purpose` / `criteria` / `approach` / `output` / `policy` / `input`）の概要をヒアリングする。
  - 各セクションに何を書くか（例: `purpose` にはタスクの目的、`criteria` には完了条件、`approach` には手順、`output` には成果物の形式）
  - Section ネストが必要か（`###` 以降の見出し構造が必要な場合は `PromptSection` を使う。例: `approach` 内で `### 前提確認` / `### 実行手順` に分割する）
  - `PromptItem<string|Section>`、H6キャップ（`######` で止まる）、行頭 `#` は型で拒否される旨を意識した記述とする。`string` に `# 見出し` を直接書かず、`Section` の `title` を使う。
- **`check` 関数の有無と判定ロジック概要**: `check` は必須。各ステップの `check` で何を検証するか（例: `ctx.attemptResult.subagentOutput` に特定文字列が含まれるか、`ctx.sessionDir` 配下に成果物ファイルが存在するか）を決定する。
- **`condition` の有無と判定条件**: Round 2 で決定した `condition` の詳細（例: `ctx.gateChoices["step_key"] === "approve"` のときのみ実行）。
- **`beforeStep` / `afterStep` の有無と返却 artifacts 概要**: `beforeStep`（プロンプト生成前に実行、返却 `ArtifactInput[]` は既存成果物と同名キーを上書きして DB へ登録・マージ）/ `afterStep`（`check` 前に実行、同様に artifacts を登録）の有無と、返却する artifacts の概要を決定する。
- ラウンド終了時に「各ステップの6セクション概要」「`check` / `condition` / `beforeStep` / `afterStep` の有無と概要」を要約してユーザー確認を取る。

## スキャフォールド生成

上記3ラウンドのヒアリング結果に基づき、以下の骨格を持つ `WorkflowDef` を生成する。

### WorkflowDef の骨格

```typescript
import { buildStepPrompt } from "../src/prompt.ts"; // または適切な相対パス
import type { WorkflowDef } from "../src/types/workflow-def.ts";
import type { CheckCtx, PromptCtx } from "../src/types/context.ts";
import type { CheckResult } from "../src/types/result.ts";

const def: WorkflowDef = {
  id: "<workflow-id>",
  description: "<Round 1 で確定した目的>",
  steps: [
    // 各 StepDef を Round 2/3 の結果に基づき生成
  ],
};

export default def;
```

### 各 StepDef に含める雛形

- `key` / `phase` / `type` / `maxRetries` / `onFail` / `task.buildPrompt` / `check` の雛形を必ず含める。
- `buildStepPrompt` を用いた Section 型対応のプロンプト雛形を含む。コードコメントで以下を明示する:
  - `PromptItem<string|Section>` であること
  - H6キャップ（`######` で止まる）であること
  - 行頭 `#` は `PromptString` 型で拒否されるため `string` に `# 見出し` を直接書かず `Section` の `title` を使うこと
- `task` の3種別雛形（`run_subagent` / `run_command` / `orchestrate`）をコメントまたはサンプルコードとして含める。実際に選択された `action` に応じた雛形を生成し、他の種別はコメントで例示する。
- `human_gate` 雛形: `presentArtifacts` / `choices`（`value` / `label` / `desc`）/ `reviseTargetStep` を含む。
- `parallel` の `subtasks` 雛形: 各 subtask の `key` / `subagentType` / `buildPrompt` を含む。
- `condition` / `beforeStep` / `afterStep` は Round 3 で「有り」とされた場合のみ雛形を含め、「無し」の場合はコメントで利用例を示す程度に留める。
- 参照は `examples/simple-workflow.ts` と `src/types/workflow-def.ts` / `src/prompt.ts` のみとする。`docs/adr` の解説は重複させない。

### 型とプロンプトの正

- 型定義は `src/types/workflow-def.ts` を正とする。`WorkflowDef` / `StepDef` / `TaskStepDef` / `HumanGateStepDef` / `ParallelStepDef` / `SubtaskDef` / `OnFailStrategy` / `GateChoice` を使用する。
- プロンプト構築は `src/prompt.ts` の `buildStepPrompt` / `PromptItem` / `PromptSection` / `PromptString` を正とする。

## 生成成果物

出力先 `resolveSkillsDir(tool, scope)/<skill-name>/` 配下に以下の2ファイルセットを生成する（同居型）:

### 1. `workflow.ts`

上記スキャフォールド生成で作成した `WorkflowDef` の実装ファイル。`export default def` でワークフロー定義をエクスポートする。

### 2. `SKILL.md`

`tado-run --workflow ./workflow.ts` への薄い委譲として機能する Skill 定義ファイル。

```markdown
---
name: <skill-name>
description: <Round 1 で確定したワークフロー目的>
---

# <skill-name>

<ワークフローの目的と利用シナリオの説明>

## 起動手順

\`\`\`bash
tado init --workflow ./workflow.ts
\`\`\`

\`\`\`bash
tado next --session <id>

# → プロンプトに従いステップを実行

echo '{"stepKey":"...","status":"completed","subagentOutput":"..."}' | tado report --session <id>

# → 次のステップへ（human_gate の場合は tado confirm --session <id> を人間に依頼）

\`\`\`

ワークフロー本体は同ディレクトリの \`./workflow.ts\` を参照する。
```

- frontmatter に `name` / `description` を含める。
- 起動手順として `tado init --workflow ./workflow.ts` → `tado next` / `report` サイクルを明記する。
- `workflow.ts` への相対参照は `./workflow.ts` とする。
- 本 Skill は `tado-run` の汎用ランナー機構に委譲する薄いラッパーであり、ワークフロー固有のロジックは `workflow.ts` に集約する。`tado-run` の詳細は `skills/tado-run/SKILL.md` を参照。

## 検証手順

生成直後に LLM がその場で以下を順に実行し、結果を報告すること。

### 1. `tsc --noEmit`（型エラーなしを確認）

```bash
tsc --noEmit
```

型エラーが0件であることを確認する。エラーがある場合はエラー内容を報告する。

### 2. `oxlint` / `oxfmt --check`（Lint / Format 検証）

```bash
oxlint
oxfmt --check
```

Lint エラー・Format 差分が0件であることを確認する。エラーがある場合はエラー内容を報告する。

### 3. `tado init --workflow <生成ファイル>`（初期化可能であることを確認）

```bash
tado init --workflow <resolveSkillsDir(tool, scope)/<skill-name>/workflow.ts>
```

ワークフローが正常に初期化できることを確認する。セッションIDが返却されれば成功。

### 失敗時の対応

- いずれかの検証が失敗した場合は、失敗内容と修正案を提示すること。
- LLM が勝手に修正ループに入り自動リトライしないこと。修正案を提示した上で、ユーザーに修正の判断を委ねる。
- 既存の配布機構（`paths.ts:TOOLS` / `SCOPES` / `resolveSkillsDir` / `findInstalledLocations`）と検証コマンド（`tsc --noEmit` / `oxlint` / `tado init`）を再利用し、新たな抽象化や汎用ユーティリティ（`withPrefix` 等）は追加しない。

## 注意事項

- 本 Skill は軽量な LLM オーケストレーション型とし、tado エンジン駆動のワークフローは持たない。
- 生成される雛形は `examples/simple-workflow.ts` を唯一の参照とし、`docs/adr` の解説は重複させない。
- Section 型を前提とし、`string` に行頭 `#` を含む記法は生成しない。既存の `string[]` 呼び出しは後方互換で動作することを担保する。
- 出力先は必ずツール + スコープ + Skill 名の3要素で解決し、デフォルトパスや分離型配置は用いない。
- 新たな抽象化や汎用ユーティリティは追加せず、既存の `src/cli/paths.ts` と検証コマンドを再利用する。
