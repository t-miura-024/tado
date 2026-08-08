# ORMとしてDrizzleを採用する

store.ts の生 SQL と手動の行マッピングが増え、スキーマと型の乖離（steps.on_fail_action 等）も生じていたため、型安全なクエリビルダと schema-first のマイグレーション管理を備えた Drizzle（drizzle-orm + drizzle-kit、bun-sqlite アダプタ）を採用した。代替案の Prisma はコード生成ステップとビルドの重さ、Kysely はスキーマ管理を別途必要とすることが理由で却下した。bun:sqlite との親和性と型推論ベースの軽量さが決め手となった。

なお、ランタイムの migration 適用で参照する MIGRATIONS_FOLDER はソース配置前提の相対パス（`__dirname` 基準で `drizzle/` を解決）である。Bun のソース実行では問題なく解決されるが、将来バンドルや単一バイナリ配布に移行する場合は `drizzle/` ディレクトリの同梱と解決方式を再検討する必要がある。
