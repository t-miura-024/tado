---
status: accepted
---

# TUI（OpenTUI）からGUI（React+Vite+Tailwind+shadcn/ui）へ移行する

`tado dashboard` は @opentui/core によるTUIで実装されていたが、可読性・操作性・表現力の上限があった。Bun上で動作するローカルGUIとして、React + Vite + Tailwind CSS + shadcn/ui へ移行する。

ViteはBunとの親和性が高くビルドが高速、Tailwindとshadcn/uiでCatppuccin Mocha配色を一貫して適用できる。代替のTauri/Electronはバイナリ配布コストやRust/Node追加toolchainが必要で、tadoのCLI配布モデルに過剰。Vanilla TSは将来のコンポーネント拡張で再実装コストが生じるため不採用。

`@opentui/core` 依存と `src/dashboard/ui.ts` のTUI描画を撤去し、`src/dashboard/client/` 配下にReactソースを配置、Viteビルド成果物を `src/dashboard/client/dist` に出力してBun.serveで配信する。既存ロジック `logic.ts` / `store.ts` は流用する。
