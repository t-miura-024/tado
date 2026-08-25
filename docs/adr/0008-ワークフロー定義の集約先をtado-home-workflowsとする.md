# ワークフロー定義の集約先を {TADO_HOME}/workflows/<name>/index.ts とする

ワークフロー定義を各ツールの skills ディレクトリ分散から `TADO_HOME` 配下の単一レジストリ `{TADO_HOME}/workflows/<name>/index.ts` へ集約する。複数ツール運用時の特定煩雑さと skills ディレクトリ汚染を解消し、`TADO_HOME` 環境変数で上書き可能とすることでテスト隔離も担保する。
