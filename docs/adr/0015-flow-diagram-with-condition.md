# 進捗図をフロー図（ボックス＋矢印）で表現し、conditionスキップを破線で区別する

ワークフロー定義と進捗を兼ねて視覚化するため、縦方向のフロー図（ボックス＋矢印）を採用する。1ステップを1ノード（Box+Border）として縦積みし、間を `│`/`▼` で接続する。1ノード内に `phase / key / type` を収め、status色と currentStepの太線強調で進捗を示す。`condition` が `false` で `steps.status='skipped'` となったステップは、灰色破線枠の `skipped (condition false)` として区別し、進捗率の分子には含めない。

代替のリスト/stepperでは「流れ」が視覚的に伝わらず、対象ワークフローが全て直列実行であるため、フロー図は実質的に「線で繋がったリスト」として同コストで実装できる。横方向フローはターミナル横幅に収まらないため不採用とした。

なお OpenTUI (@opentui/core) の `borderStyle` には破線 (dashed) が提供されていないため（対応値: `single` / `double` / `rounded` / `heavy`）、実装では灰色単線枠＋タイトルラベル `skipped (condition false)` で破線枠を代替表現する。
