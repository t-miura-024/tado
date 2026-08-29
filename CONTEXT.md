# tado

決定論的ワークフローエンジン。LLM がオーケストレーションする多段ワークフローから、手順抜かし・簡略化を機械的に防ぐ。

## Language

**ヒューマンゲート（human_gate）**:
ワークフロー中、人間だけが下せる判断を差し挟むステップ型。1ステップ内に複数のゲート設問を持ち、`tado confirm` の一括回答で通過する。エンジンは人間の関与なしには通過できないことを保証する。
_Avoid_: 承認ステップ, approval step, チェックポイント

**ゲート設問（GateQuestion）**:
human_gate ステップ内で人間に提示する1つの問い。`key` / `title` / `type` / `choices` / `required` 等で構成される。
_Avoid_: 質問（汎用的）, 設問項目

**設問型（QuestionType）**:
GateQuestion の種別。`single_choice`（選択のみ）/ `free_text`（自由記述のみ）/ `choice_with_input`（選択＋条件付き入力）の3種。
_Avoid_: タイプ（カタカナ汎用）

**ゲート回答（GateAnswer）**:
GateQuestion に対する人間の回答値。`single_choice` は選択値文字列、`free_text` は自由記述文字列、`choice_with_input` は `{ value, input? }` 構造。
_Avoid_: subagentOutput（ゲート文脈での転記値）, ユーザー入力（汎用的）

**ゲート回答集合（GateAnswers）**:
1つの human_gate ステップに対する全設問の回答の集合。`Record<questionKey, GateAnswer>` 形式で永続化され、`ConditionCtx.gateAnswers[stepKey][questionKey]` で参照される。
_Avoid_: gateChoices（旧単一値）, ゲート回答（単数と混同する用法）

**判定設問（OutcomeQuestion）**:
ゲート内で全体判定（continue/goto/abort）を決めるために `HumanGateStepDef.outcomeQuestionKey` で指名された設問。通常は `single_choice` / `choice_with_input` で `approve/revise/abort` を値に含む。
_Avoid_: 承認設問（汎用的）

**選択肢付帯入力（ChoiceInput）**:
GateChoice に紐づく自由入力欄の定義。`required` / `placeholder` / `maxLength` / `title` 等を持つ。選択肢の値に応じて入力の要否が決まる。
_Avoid_: コメント欄（汎用的）, 追加入力（汎用的）

**ゲート回答集合の参照（gateAnswers）**:
`ConditionCtx.gateAnswers[stepKey][questionKey]` で設問単位の回答を参照する仕組み。旧 `gateChoices[stepKey]`（単一文字列）は廃止。
_Avoid_: gateChoices

**confirm（承認サブコマンド）**:
人間が自分の端末（TTY 付き）で実行し、ゲート回答集合を記録して状態遷移まで行う CLI 操作。複数設問を順次対話で回収し、途中キャンセルは原子的に全破棄する。エージェントの Bash ツールからは TTY がないため構造的に実行できない。
_Avoid_: approve コマンド, 承認 API

**無視型スキップ**:
オーケストレータ LLM がゲートプロンプトを人間に提示せず、自己判断で回答を捏造する失敗モード。本設計が構造的に排除する対象。
_Avoid_: スキップ（単独で使う）

**ワークフロー（Workflow）**:
tado エンジンが実行する `WorkflowDef` で定義された一連のステップ列。`id` で識別される。
_Avoid_: タスク, ジョブ

**ワークフロー集約（Workflow Registry）**:
`{TADO_HOME}/workflows/<name>/index.ts` 形式でワークフロー定義を一箇所に集約する配置規約。`TADO_HOME` 配下で一元管理される。
_Avoid_: skills ディレクトリ配置, 分散配置

**ワークフロー解決（Workflow Resolution）**:
`--workflow` 引数に渡された ID を実際の `index.ts` ファイルパスへ解決する処理。`{TADO_HOME}/workflows/<name>/index.ts` を探索する。
_Avoid_: パス解決（単独）, workflow lookup

**tado-run**:
ワークフローエンジンを起動し `next`/`report` サイクルを進行させる汎用ランナー。移行後は起動対象ワークフローの推定・選択も担う。
_Avoid_: ランナー（単独）, エンジン

**TADO_HOME**:
tado のデータ置き場ルート。デフォルトは `~/.tado`、環境変数で上書き可能。単一 DB、セッションディレクトリ、workflows ディレクトリを包含する。
_Avoid_: tado home, ホームディレクトリ

**description**:
`WorkflowDef` に追加されるワークフローの人間可読な説明。tado-run がプロンプト内容から起動対象を推定する際の判断材料となる。
_Avoid_: ディスクリプション（カタカナ）, 説明文

**ワークフロー作成用Skill**:
tadoのWorkflowDefを対話的に設計・生成するためのLLM向けSkill。`skills/tado-create-workflow/SKILL.md` としてライブラリに同梱し、`tado install`/`tado update` で配布される。
_Avoid_: ワークフロー生成コマンド, workflow generator

**スキャフォールド**:
WorkflowDefの骨格（`id`/`steps`/各StepDefの `key`/`phase`/`type`/`maxRetries`/`onFail`/`task.buildPrompt`/`check` の雛形）。`buildStepPrompt` を用いたSection型対応のプロンプト雛形を含む。
_Avoid_: テンプレート（単なる文字列置換の意味で使う場合）, ボイラープレート

**検証**:
生成したワークフローが `{TADO_HOME}/workflows/<workflow-id>/index.ts` に配置後、即座に `tado init --workflow <id> --title "<title>"` で初期化できる状態にあることを機械的に確認する工程。`tsc --noEmit` / `oxlint` / `tado init --workflow <id> --title` + `tado list --workflow --json` の3点を指す。
_Avoid_: テスト（検証は生成直後の機械的チェックを指し、ユニットテスト全般を指さない）

**ダッシュボード（GUI）**:
`tado dashboard` でローカルHTTPサーバーを起動しブラウザで表示する、ワークフロー実行状態を視覚的に確認する参照専用のGUI画面。React + Vite + Tailwind CSS + shadcn/ui + Three.js で実装し、Catppuccin Mocha配色で統一する。2カラム（サイドバー垂直タブ + メインコンテンツ）レイアウトと進捗フロー図を継承する。
_Avoid_: TUIダッシュボード, Webダッシュボード（リモート公開の意味で使う場合）

**サイドバー**:
画面左側の垂直タブ領域。セッションをタブとして縦に並べ、選択操作を受け付ける。
_Avoid_: サイドパネル, ナビゲーション

**垂直タブ**:
サイドバー内で1セッションを1タブとして縦積みするUI単位。選択中タブに対応するセッション詳細がメインコンテンツに表示される。
_Avoid_: 詳細パネル, コンテンツエリア

**メインコンテンツ**:
画面右側の詳細領域。選択中セッションの進捗フロー図（定義兼用）と進行履歴・成果物一覧を表示する。
_Avoid_: 詳細パネル, コンテンツエリア

**参照専用**:
ダッシュボードがワークフロー定義やセッション状態の作成・変更・削除を一切行わないスコープ制約。
_Avoid_: 読み取り専用モード（曖昧）, view-only

**進捗率**:
`passedステップ数 / 全ステップ数` で算出する、サイドバー各タブに表示する進捗割合。skippedは分母に含めるが分子に含めない。
_Avoid_: currentStep位置による率, (passed+running)/total

**初期選択セッション**:
起動時CWDに紐づくセッションのうち `updated_at` 最新、該当なしは全体最新。
_Avoid_: 最後に作成されたセッション, ランダム選択

**進捗フロー図**:
ワークフロー定義と進捗を兼ねて視覚化する縦方向のボックス＋矢印図。1ステップ=1ノードで `phase/key/type` を表示し、`status` と `currentStep` を色・枠で強調。conditionでskipされたステップは灰色単線枠＋ `skipped` ラベルで区別する。
_Avoid_: ステッパー（リスト）, ガントチャート

**スキップ（skipped）**:
`condition` が `false` を返したため実行されず `steps.status='skipped'` となったステップ。フロー図では灰色単線枠＋ラベルで表示し、進捗率の分子には含めない。
_Avoid_: スキップされたステップ（冗長）, 未実行
