# WorkflowDef.description による推定とユーザー確認の二段階起動とする

`WorkflowDef` に任意の `description?: string` を追加し、tado-run はプロンプト内容と各ワークフローの description から AI エージェントが起動対象を推定し、ユーザー確認（ID + description 付き候補提示→選択）を経て確定する。プロンプトなし時は `workflows/` 配下の全 ID を列挙して選択させる。推定は候補提示に留め最終決定は常にユーザーが行うことで誤推定リスクを排除する。
