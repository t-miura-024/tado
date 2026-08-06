# ADR-002: parallel ステップへのインターセプター適用範囲

## Status

accepted

## Context

parallel ステップの各 subtask に beforeStep/afterStep を適用すると、実行順序・artifact 衝突の複雑性が増す。

## Decision

beforeStep / afterStep は parallel ステップ全体に1回のみ適用する。subtask 単位では適用しない。

## Consequences

- subtask 固有の前処理は subtask の buildPrompt 内で対応する
- 将来 subtask 単位のフックが必要になった場合は別途設計する
