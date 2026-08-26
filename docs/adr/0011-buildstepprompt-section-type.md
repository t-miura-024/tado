---
status: accepted
---

> **Note:** 本 ADR は計画 #14 で新規作成されたもので、当初 `0008` として起票されたが既存 `0008-ワークフロー定義の集約先をtado-home-workflowsとする.md` と衝突したため次空き番号 `0011` にリナンバーした。タイトルの `ADR-0008` は Issue #14 および `docs/context.md` との参照整合性を保つため維持する。

# ADR-0008: buildStepPrompt の Section型による見出し統制

## Context

`buildStepPrompt` は ADR-0002 で純粋フォーマッター、ADR-0006 で行の raw レンダリング（`items.join("\n")`）と定義された。見出しの著作責任は作者に委ねられ、H2 直書きの不正構造を防ぐ仕組みはなかった。

移行後の `tools` 5 workflow で `approach` 内に `## 手順` 等の H2 が直書きされ、`## 方針` 配下に同階層H2が並列する不正構造が発生。`tools-wt-1` で手動 `###` 化で暫定対応したが、ライブラリ側で階層を意識せずに見出しを付与できる型サポートが求められた。

当初 Draft #13 は「自動降格（Smart Render）」で `##` → `###` へ暗黙降格する案だったが、ヒアリングで明示的な `Section` 型による構造化に方針変更し、#13 は superseded として close した。

## Decision

`buildStepPrompt` に渡す各プロパティ配列で `string | Section` のユニオンを許容し、`Section` は `title: PromptString` と `content: (string | Section)[]` の再帰構造で見出しを表現する。

- `PromptString<T extends string>` は `T extends \`#${string}\` ? never : T`で行頭`#` を型レベルで拒否（`title`含む）。動的`string` 変数は許可。
- `NextDepth<D extends 3|4|5|6>` は `3→4→5→6→6` で型レベル H6 キャップ。
- `PromptSection<Depth>` は `{title: PromptString, content: PromptItem<NextDepth<Depth>>[]}`。
- `PromptItem<Depth>` は `PromptString | PromptSection<Depth>`。
- `StepPromptSpec` の全6フィールドは `PromptItem<3>[]` に変更。
- レンダラーは `renderItems(items, depth)` の再帰で `string` は素通し、`Section` は `"#".repeat(Math.min(depth+1,6)) + title` で `###` → `######` に自動インクリメント（H6キャップ）。空 `content` は見出しのみ出力。
- 型は `src/prompt.ts` で定義し、`src/types/index.ts` からも再exportする。

## Consequences

- 見出しの誤記（`["## 手順"]`）をコンパイル時に検出できる。
- ネスト Section は自動で `####` → `#####` → `######` と深くなり、`#######` は出力されない（型＋ランタイムの二重保証）。
- 既存の `string[]` のみの呼び出しは後方互換で全てパスする。
- `tools` 側の既存ワークフロー（手動 `###` 化済み）も正しくレンダリングされる。
- `tools` 側の Section型への書き換えは本計画のスコープ外（別途対応）。
