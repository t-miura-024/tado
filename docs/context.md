# tado Context

tado のデータ永続化とセッション管理に関わる語彙。

## Language

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
