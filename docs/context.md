# tado Context

tado のデータ永続化とセッション管理に関わる語彙。

## Language

**型 barrel**:
型のみを集約して再 export するファイル。`import type` のルート解決（`from 'tado'`）を提供する。
_Avoid_: ルート index、値も含む barrel

**TADO_HOME**:
tado のデータ置き場ルート。デフォルトは `~/.tado`、環境変数で上書き可能。

**セッションディレクトリ**:
1 セッションの成果物・artifact DB を置くディレクトリ。`{TADO_HOME}/{sessionId}/`。

**単一 DB**:
全セッションの状態を保持する SQLite ファイル。`{TADO_HOME}/workflow.db`。

**schema.ts**:
Drizzle のスキーマ定義の正（source of truth）。テーブル名・カラム名は snake_case を維持する。
_Avoid_: schema.sql

**ベースライン migration**:
現行スキーマと等価のスキーマを初回 migration として固定し、既存 DB を無傷で移行する方式。新規 DB はこの migration 適用で作成される。

**migrate()**:
drizzle-orm のランタイム migration 適用 API。`tado init` 時に自動実行され、スキーマを最新化する。

**起動ディレクトリ（cwd）**:
`tado init` 実行時の `process.cwd()` を `sessions.cwd` に保存する絶対パス。既存セッションではNULLとなり、表示時に `workflowPath` の親ディレクトリで代替する。
_Avoid_: 起動パス, 実行ディレクトリ（曖昧）

**セッションタイトル**:
`tado init --title` で人間（またはLLM）が付与する、サイドバー各タブに表示する人間可読なタイトル。`sessions.title` に保存。`WorkflowDef.id` とは別概念であり、機械的に決定しない。
_Avoid_: ワークフロー名, workflowId（混同）
