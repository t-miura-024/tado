# 生成ワークフローは workflow.ts と SKILL.md の2ファイルセットとする

tadoのワークフローは `workflow.ts` 単体ではLLMから呼び出せず、薄いSkill（`SKILL.md` が `tado-run --workflow ./workflow.ts` へ委譲する）として扱うことを想定している。生成成果物を `workflow.ts` 単体にすると、利用者が手で `SKILL.md` を追加する手間が残り「生成してすぐ使える」体験が損なわれる。出力先は `resolveSkillsDir(tool, scope)/<skill-name>/` 配下に2ファイルを同居させ、`SKILL.md` からは `./workflow.ts` の相対参照とする。分離型（`workflows/` と `skills/` に分離）は相対パスが深くなり壊れやすいため不採用とした。
