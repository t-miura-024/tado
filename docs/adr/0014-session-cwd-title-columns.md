# sessionsに起動ディレクトリ(cwd)とタイトル(title)列を追加し、init --titleを必須化する

サイドバーの「起動ディレクトリ名」と「セッションタイトル」を正確に表示するため、`sessions` に `cwd TEXT` / `title TEXT` 列を追加する。`cwd` は `tado init` 時に `process.cwd()` の絶対パスを保存し、`title` は `tado init --title` の必須引数（1-100文字、改行不可）で人間（またはLLM）が付与する。`WorkflowDef.id` は従来通り `workflowId` 列に保持し、titleとは別概念とする。既存セッションは両列がNULLのままマイグレーションし、表示時に `workflowId` / `workflowPath` でフォールバックする。

代替として `workflowPath` 推定（親ディレクトリのbasename）では、別リポジトリで同じワークフロー名を使った場合の識別ができず、`WorkflowDef.id` の機械的な流用では人間可読な一覧にならないため不採用とした。`--title` を任意にすると未設定セッションが再び混在するため、破壊的変更だが必須化する。
