# ADR-0002: buildStepPrompt を純粋フォーマッターとして設計する

## Status

accepted

## Context

プロンプト構築ヘルパーに ctx を渡すと、フォーマット責務とコンテキスト参照責務が混在する。
ctx の値（sessionDir, artifacts）は buildPrompt のクロージャスコープで既に参照可能である。

## Decision

buildStepPrompt は ctx を受け取らず、string[] の構造化レンダリングのみを担当する純粋関数とする。
ctx 依存は buildPrompt クロージャ内に閉じ込める。

## Consequences

- テストが容易（ctx モック不要、純粋関数の入力出力だけ検証）
- workflow 作者の自由度維持（ctx の使い方は作者に委ねる）
- ボイラープレートはエンジン側で一元管理
