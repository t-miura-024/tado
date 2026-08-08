# ADR-0003: ボイラープレートをエンジン側で付与する

## Status

accepted

## Context

attemptNumber や previousAttempts は全ステップで共通形式であり、workflow 作者が毎回書くのは冗長。
PromptCtx に含めると「使わなくても渡される」ノイズになる。

## Decision

next.ts が buildPrompt 結果の後ろにボイラープレート（セッション情報・リトライフィードバック）を連結する。
PromptCtx から該当フィールド（attemptNumber, retryCount, maxRetries, previousAttempts）を削除する。
task / parallel(subtask) 両方に適用する。

## Consequences

- 破壊的変更が発生するが、一気に置き換える
- 全ステップでボイラープレート形式の一貫性が保証される
- workflow 作者は本文の構造化に集中できる
