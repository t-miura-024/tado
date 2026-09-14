# goto を廃止し loop ステップ型を導入する

ワークフローのループを `onFail.goto`（任意ジャンプ + 巻き戻し）で表現していたが、後方ループの表現が散在し、mt-plan-run では steps を直接 UPDATE する回避策が必要だった。`StepDef` を `type` 判別のユニオン（task / human_gate / parallel / loop）に再構成し、`type: "loop"`（`body` / `maxIterations` / `onExhausted`）と check の `continue` ステータスによる反復をエンジン機能として導入する。goto は完全撤去し前方ジャンプの代替は設けない（ADR-0025 を置換）。parallel の子は task 相当のみとし、loop を parallel 内に置けない。
