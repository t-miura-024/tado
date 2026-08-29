# human_gate を複数設問と選択肢付帯入力へ拡張する

単一 `choices` の human_gate では revise理由等の文脈や複数論点の一括回収ができず、1論点ごとに停止が増える。後方互換を維持すると `choices` と `questions` の二重管理や `gateChoices` と `gateAnswers` の併存が生じ、型・保存・参照・ダッシュボード表示のすべてで分岐が増える。破壊的変更として `HumanGateStepDef` を `questions: GateQuestion[]` 中心に再設計し、`GateChoice` に `input` 付帯（`required/placeholder/maxLength`）を持たせ、永続化は `GateAnswers` オブジェクトに一本化して旧 `gateChoices` は廃止する。ゲート全体の状態遷移は `outcomeQuestionKey` で指名された判定設問の値で決め、CLI は `clack.select/autocomplete` と条件付き `clack.text` を順次実行してバリデーションする。
