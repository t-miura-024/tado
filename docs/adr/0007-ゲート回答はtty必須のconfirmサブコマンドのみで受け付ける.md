# ADR-0007: ゲート回答は TTY 必須の confirm サブコマンドのみで受け付ける

## Status

accepted

## Context

human_gate の回答を report 経由（LLM が人間の回答を転記）で受け付けていたため、オーケストレータ LLM が人間に提示せず自己判断で回答を捏造する「無視型スキップ」が頻発した。プロンプト文による防御は LLM に無視できるため、機械的な保証が必要。

## Decision

人間が自分の端末（TTY 付き）で実行する `tado confirm` を唯一のゲート回答経路にする。confirm は stdin が TTY であることを要求し、選択受付と状態遷移（approve / revise / abort）まで行う。report は human_gate ステップを受理せずエラーとする。承認の成立と、非 TTY からの拒否された試行の両方を監査記録する。

## Consequences

- エージェントの Bash ツールには TTY がないため、エージェントは構造的にゲートを通過できない。LLM が人間への案内を省略しても、ゲートは停止するだけで通過しない（fail-safe）
- next/report サイクルの対称性が崩れ、report が human_gate を拒否するのは一見奇妙だが、これは意図的な設計
- 意図的な回避には pty 偽装などの偽造工作が必要となり、監査記録に痕跡が残る（過失防止＋抑止）
- 後方互換は維持しない。LLM 転記方式のコードパスは削除する
