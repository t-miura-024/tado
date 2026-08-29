# tado

決定論的ワークフローエンジン。LLM がオーケストレーションする多段ワークフローから、手順抜かし・簡略化を機械的に防ぐ。

## Language

**ヒューマンゲート（human_gate）**:
ワークフロー中、人間だけが下せる判断を差し挟むステップ型。エンジンは人間の関与なしには通過できないことを保証する。
_Avoid_: 承認ステップ, approval step, チェックポイント

**ゲート回答**:
ヒューマンゲートにおける人間の選択（approve / revise / abort）。confirm を通じてのみエンジンに記録され、LLM が代答することはない。本設計では単一選択のみを扱い、旧来の GateQuestion / QuestionType / ChoiceInput / GateAnswers / OutcomeQuestion 等による複数設問・条件付き入力はゼロベース再設計により廃止し、縮退範囲と移行は ADR 0017 系に記録する。
_Avoid_: subagentOutput（ゲート文脈での転記値）, ユーザー入力

**confirm（承認サブコマンド）**:
人間が自分の端末（TTY 付き）で実行し、ゲート回答を記録して状態遷移まで行う CLI 操作。エージェントの Bash ツールからは TTY がないため構造的に実行できない。単一選択のため複数設問の順次回収や途中キャンセルの原子性は不要であり、旧来の原子性保証は廃止した。
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
`tado dashboard` でローカルHTTPサーバーを起動しブラウザで表示する、ワークフロー定義を主役に進捗を重ねて参照する参照専用GUI。React+Vite+Tailwind+shadcn/ui+Three.js/fiber/drei+Catppuccin Mochaで構築し、3ペイン（左 定義ブラウザ / 中 定義キャンバス / 右 詳細ペイン）とノードグラフ+三層オーバーレイで構成する。配信は Bun.serve のランダムポートで `src/dashboard/client/dist` を配信し `DIST_DIR` 未存在時はフォールバックHTML、1秒ポーリングで更新し、軽量化（60 Points/BufferGeometry）と `prefers-reduced-motion` / `visibilitychange` / CSSフォールバックで完了条件4を担保する。`@opentui/core` は撤去済み。
_Avoid_: TUIダッシュボード, 2カラム垂直タブ, 進捗フロー図（旧）

**定義ブラウザ**:
画面左側のワークフロー→セッション選択領域。ワークフロー定義一覧と、そのワークフローに紐づくセッション一覧を階層で示し、単一アクティブセッションの選択を受け付ける。ワークフロー0件 / セッション0件 / 取得失敗時は空状態・エラー表示を行い、検索/フィルタ（id/説明・title/id 部分一致）を備える。完了条件8の操作・空・エラー表示に対応する。
_Avoid_: サイドバー, 垂直タブ, サイドパネル

**定義キャンバス**:
画面中央の主役領域。ワークフロー定義をノードグラフ（ステップ=ノード、遷移=エッジ、横=進行・縦=並列、Phase=深度レイヤー）として描画する。エッジ/深度/発光は Three.js/R3F で構造表現し、パン/ズーム/ミニマップは DOM で制御して俯瞰⇔詳細を往復する。Three 失敗時は CSS グラデーションフォールバックし、`prefers-reduced-motion` / `visibilitychange` でアニメを停止する。
_Avoid_: メインコンテンツ, フロー図（旧縦方向ボックス）, キャンバス（汎用）

**詳細ペイン**:
画面右側の選択中ノード詳細領域。上段にステップ定義（type/phase/prompt）、中段に進捗（status/attempt/checkResult）、下段に成果物（artifactKey: filePath、存在✓/欠損✗、プレビュー）を表示する。上段は type/phase/prompt、中段は status/attempt/checkResult、下段は artifact 存在判定とプレビュー（上限 50行/8KB/18拡張子）に分離し、欠損時は「欠損✗」、非対応時は理由を表示してフォールバックする。
_Avoid_: メインコンテンツ, 詳細パネル, コンテンツエリア

**ノードグラフ**:
ワークフロー定義を有向グラフとして表現する形式。1ステップ=1ノードで `phase/key/type` を示し、遷移をエッジで結ぶ。
_Avoid_: 進捗フロー図（旧）, ステッパー, ガントチャート

**三層オーバーレイ**:
定義キャンバス上に進捗を重ねる三層表現。ノード色/発光で現在ステップ、エッジのアニメーションで遷移履歴、右詳細ペインで成果物/アーティファクトを参照する。Three 失敗時は CSS グラデーションフォールバックで代替し、`prefers-reduced-motion` / `visibilitychange` ではアニメを停止して 60 Points/BufferGeometry 程度に軽量化する。
_Avoid_: 進捗ハイライト（単層）, オーバーレイ（汎用）

**単一アクティブセッション**:
定義キャンバスに重ねる進捗の選択モデル。左の定義ブラウザで選択された1セッションの進捗のみをオーバーレイし、未選択時は定義のみを表示するブラウズモードとなる。未選択時はブラウズモード、選択でオーバーレイ、再選択で切替、ワークフロー不一致時は定義のみ表示にフォールバックし、初期選択は CWD 紐づけ最新／なければ全体最新（`初期選択セッション` 参照）とする。
_Avoid_: 全セッション同時重ね, セッション一覧駆動

**参照専用**:
ダッシュボードがワークフロー定義やセッション状態の作成・変更・削除を一切行わないスコープ制約。
_Avoid_: 読み取り専用モード（曖昧）, view-only

**進捗率**:
`passedステップ数 / 全ステップ数` で算出する、定義ブラウザ各セッションに表示する進捗割合。skippedは分母に含めるが分子に含めない。
_Avoid_: currentStep位置による率, (passed+running)/total

**初期選択セッション**:
起動時CWDに紐づくセッションのうち `updated_at` 最新、該当なしは全体最新。
_Avoid_: 最後に作成されたセッション, ランダム選択

**スキップ（skipped）**:
`condition` が `false` を返したため実行されず `steps.status='skipped'` となったステップ。ノードグラフでは灰色単線枠＋ `skipped` ラベルで区別し、進捗率の分子には含めない。
_Avoid_: スキップされたステップ（冗長）, 未実行
