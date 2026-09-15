# human_gate 差し戻し撤去・巻き戻し一元化

## Status

Accepted

## Date

2026-09-15

## Context

tools#97（t-miura-024/tools#97、refined）の Grill ヒアリングで、human_gate の revise は実質 goto でありややこしいと確定した。本決定は計画#25（本リポジトリ tado#25、t-miura-024/tado#25）で実装する。tools 側の更新（ネスト loop・`apply_feedback` 新設・全ゲート revise 撤去）は tools#97 の実行で行い、本計画のスコープには含めない。

## Decision

tools#97 の Grill 確定を受け、human_gate から差し戻し機構（revise 選択・`reviseTargetStep`）を撤去し確認＋回答保存専任とし、巻き戻しは loop 本体 check の `continue` 判定に基づく `repeat` 遷移に一元化することを決定した。revise 温存案は実質 goto で分岐が二重化し理解・検証コストが高いため却下した。0025・0026 の巻き戻し・loop 意味論は本決定で補完・一部 supersede される。

## Considered Options

- revise 温存案: human_gate に差し戻しを残し loop と併存させる。分岐が二重化し、確認と巻き戻しの責務が混在して検証が複雑になるため却下した。

## Consequences

- 配線（loop 本体内への human_gate 配置＋`gateAnswers` を読む check）はワークフロー作者の責務であり、エンジンは回答値の受理のみを行う。loop 配線のないゲートでは修正系の回答を選んでも巻き戻しは起きない。
- loop 外ゲートでの非 approve 回答（例: `request_changes`）は回答として記録された上で `pass` として通過する。エンジンは巻き戻さず、`confirm` 時に警告ログを出して loop 配線への書き換えを促す。
- `abort` 回答のみ例外的に `confirm` がセッション中断の合図として扱う（回答値ではなく中断信号）。巻き戻し（`repeat`）は loop/check 側の責務であり `confirm` は行わないため、`ConfirmResult.nextAction` に `repeat` は現れない。
- 破壊的変更: `ConfirmResult` から `nextAction: 'revise'` と `targetStep` を撤去した（`nextAction` は `'continue' | 'abort' | 'done'` のみ）。旧 revise 期待の自動化は `'continue'`＋`gateAnswers` 参照方式（loop 本体 check が回答を読んで判定 `continue` を返す配線）へ書き換えること。後方互換シムは提供しない。
- 既存の `reviseTargetStep` 所持ワークフローは `reviseTargetStep` を削除し、巻き戻しが必要なら loop/check 配線へ書き換えること。未移行の定義はロード時に EngineError で fail-fast し、エラーメッセージに手順（`reviseTargetStep` の削除＋loop 本体内配置＋本体 check での `gateAnswers` 参照）を記載済みである。
