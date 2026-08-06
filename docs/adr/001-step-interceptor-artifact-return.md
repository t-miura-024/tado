# ADR-001: afterStep の返り値を ArtifactInput[] にする

## Status

accepted

## Context

Issue 原案では `afterStep?: (ctx: StepCtx) => Promise<void>` だったが、成果物の追加登録を afterStep で完結させたいユースケースがある。

## Decision

`afterStep?: (ctx: StepCtx) => Promise<ArtifactInput[]>` とする。void 互換（空配列返却）も可能。beforeStep と対称的な API にする。

## Consequences

- beforeStep と afterStep でマージ戦略を統一（上書き優先）
- 呼び出し側は常に配列を返す必要がある（空配列 `[]` で副作用のみの表現も可能）
