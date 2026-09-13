# onFail goto に巻き戻し意味論を追加する

`onFail goto` は失敗元のステップのみを再キューし、分岐先から失敗元までの間のステップを巻き戻さなかった。このため「実行 → レビュー → 判定」のようなサイクルを再実行できず、ワークフローが `steps` テーブルを直接 UPDATE して巻き戻す事例が発生した。`onFail` に `reset: "downstream"` を追加し、分岐先 `target` から失敗元ステップまでのステップ（両端を含む）を pending + retryCount=0 に戻す意味論を宣言的に指定できるようにする。失敗元より後ろのステップは変更しない。既存の `confirm` の revise 巻き戻しと同一機構を共通化して実装し、`requeueSource` は `reset` に置き換えて廃止する。

`requeueSource` を使う既存ワークフロー（tools 側の mt-plan-run など）は `reset: "downstream"` へ移行した上で、本エンジンと同時、または本エンジン導入直後に即時に適用すること。tools 側の移行を先行させ、旧エンジンのまま `reset: "downstream"` へ移行する順序は不可とする。

旧エンジンは `reset` を解釈しない。旧 `validateWorkflowDef` は `onFail` を検証せず（`validateOnFail` は本差分で新設のため、移行済み定義のロード自体は成功する）、旧 `handleStepFailure` は `requeueSource` のみを読む。したがって tools 先行では失敗元ステップが pending ではなく failed に確定し、`resetReviewCycle` 撤去後の定義ではサイクルが再実行されず、未解決の blocking を残したまま後続（人手フェーズ）へ進む無言の挙動変更になる。fail-fast が働くのはエンジン先行のときだけである。

定義のロードは init / next / report / confirm が実行のたびに行われ `validateWorkflowDef` を通るため、エンジン導入後に未移行の定義は `Invalid onFail.requeueSource ...` の EngineError でロード時に拒否される（fail-fast。無言の挙動変更を排除するための設計）。tools 側の移行（mt-plan-run の `reset: "downstream"` 化と、`steps` を直接 UPDATE する `resetReviewCycle` の撤去）は follow-up Issue で実施する。

後方 goto（`target` が失敗元ステップより前）は `reset: "downstream"` を必須とし、省略した定義はロード時に EngineError で拒否する。`reset` を省略できるのは前方 goto のみで、その場合の挙動は従来どおり失敗元のみ `failed` となり中間ステップは変更されない。

`onFail.action` / `target` / `reset` はセッション init 時に `steps` へスナップショットされ、セッションの遷移はこのスナップショットを正として適用される。report はリトライ予算を使い切って onFail を適用する直前に定義側の3フィールドとスナップショットを比較し、セッション作成後の定義変更を検出した場合は失敗元ステップを `failed` に確定させた上で EngineError で拒否する。
