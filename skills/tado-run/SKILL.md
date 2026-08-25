---
name: tado-run
description: ワークフローエンジン（tado）を起動し、init → next/report サイクルでワークフローを進行させる汎用ランナー。プロンプト内容と各ワークフローのdescriptionから起動対象を推定し、ユーザー確認を経てtado init --workflow <id>を実行する。
---

# tado-run

ワークフローエンジン（`tado`）を起動し、`next` / `report` サイクルでワークフローを進行させる**汎用ランナー**です。

本 Skill はエンジン起動の通用手順を 1 箇所に集約したものであり、純粋なランナーです。ワークフロー固有のロジック（完了条件・注意事項・共有資材パス・ステップ固有の指示）は一切持ちません。それらはすべて起動対象のワークフロー定義（`{TADO_HOME}/workflows/<name>/index.ts`）のステッププロンプト内に含まれており、`next` が返す完全なプロンプトに従うだけで進行できます。

## ワークフロー解決

ワークフローは `{TADO_HOME}/workflows/<name>/index.ts` に集約され、`--workflow <id>` の ID で解決される。`listWorkflows()` 相当の列挙は `src/engine/workflows.ts` の `getWorkflowsDir()` / `listWorkflows()` が担い、壊れたワークフローは warn ログを出してスキップする。

## 起動対象の決定

### 1. ワークフロー列挙

`{TADO_HOME}/workflows/` 配下を `readdir` + `import` で列挙し、各ワークフローの `id` / `description` / `path` / `stepsCount` を取得する。列挙は都度行いキャッシュしない。

- ワークフロー0件の場合: 「利用可能なワークフローがありません。ワークフローを作成してから実行してください」と案内して終了する。
- description 未設定のワークフローは ID のみ表示で許容する。
- ディレクトリ名と `def.id` が不一致の場合は警告（またはエラー）を出してスキップする。

### 2. 推定とユーザー確認

- **プロンプトありの場合**: ユーザーのプロンプト内容と各ワークフローの `description` から AI エージェントが起動対象を推定する。推定結果を ID + description 付きの候補として提示し、ユーザーに選択させて確定する。
- **プロンプトなしの場合**: `workflows/` 配下の全 ID を列挙し、ID + description 付きでユーザーに提示して選択させる。

推定は候補提示に留め、最終決定は常にユーザーが行う。誤推定リスクを排除するため、ユーザー確認を必須とする。

### 3. セッション初期化（init）

ユーザー確認で確定した `<id>` を使ってセッションを初期化する:

```bash
tado init --workflow <id>
```

- stdout にセッション情報（`sessionId` を含む JSON）が出力される。`sessionId` を控え、以降のコマンドの `<id>` に使う。
- 状態は `{TADO_HOME}/workflow.db`（SQLite、デフォルトは `~/.tado/workflow.db`）で機械的に管理される。セッションの成果物は `{TADO_HOME}/{sessionId}/` に保存される。
- ワークフローからの `import from "tado"` は `{TADO_HOME}/node_modules/tado` から解決される（`{TADO_HOME}/package.json` 管理）。CLI バイナリ自体はグローバルインストール（`~/.bun/bin/tado`）に準拠。

### 4. next / report サイクル

`init` 後は、`next`（次のステップのプロンプト取得）→ ステップ実行 → `report`（結果報告）のサイクルで進行する。

```bash
# 次のステップのプロンプトを取得
tado next --session <id>
```

`next` は現在のステップの**完全なプロンプト**を stdout に JSON で返す。返却された `prompt` と `action` に従ってステップを実行する。プロンプトは完全であり、LLM が手順を再構築・補完する余地はない。ワークフロー固有の指示もすべてこのプロンプトに含まれる。

ステップ完了後、結果を stdin の JSON で `report` に渡す:

```bash
echo '{"stepKey":"...","status":"completed","subagentOutput":"..."}' | tado report --session <id>
```

`report` は完了検証・状態遷移・リトライ判定を行い、次の状態を返す。`next` → 実行 → `report` を、ワークフローが完了するまで繰り返す。

**例外（human_gate）**: 現在のステップが human_gate の場合、`report` では完了できない。ゲートプロンプトの指示に従い、ユーザー自身の端末で `tado confirm --session <id>` を実行してもらうこと（コマンド全文をそのまま提示する）。confirm は TTY 必須のためエージェントからは実行できず、人間が実行するまでワークフローは停止する。停止は正常な挙動であり、回答を捏造してはならない。

### 5. 状態確認（status）

必要に応じて現在状態を確認できる。

```bash
tado status --session <id>
```
