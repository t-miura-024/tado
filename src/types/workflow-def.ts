/**
 * ワークフローとそのステップを定義するための型定義。
 */
import type { ArtifactInput } from "./artifact.ts";
import type { CheckCtx, ConditionCtx, InitCtx, PromptCtx } from "./context.ts";
import type { CheckResult } from "./result.ts";

/** ワークフロー全体の定義。ステップの列と初期化フックで構成される。 */
export interface WorkflowDef {
  id: string;
  steps: StepDef[];
  beforeInit?: (ctx: InitCtx) => Promise<void>;
  afterInit?: (ctx: InitCtx) => Promise<AfterInitResult>;
}

/** `afterInit` フックの返却値。初期成果物の登録に利用される。 */
export interface AfterInitResult {
  artifactDbPath?: string;
  artifacts?: ArtifactInput[];
}

/** ワークフローを構成する単一のステップの定義。 */
export interface StepDef {
  key: string;
  phase: string;
  type: "task" | "human_gate" | "parallel";
  maxRetries: number;
  /** チェック失敗時の振る舞い（リトライ / 分岐 / 中断 / エスカレーション）。 */
  onFail: OnFailStrategy;
  check: (ctx: CheckCtx) => CheckResult;
  /** 指定した場合、この条件が true のときのみステップを実行する。 */
  condition?: (ctx: ConditionCtx) => boolean;
  task?: TaskStepDef;
  humanGate?: HumanGateStepDef;
  parallel?: ParallelStepDef;
}

/** タスクステップの定義。SubAgent 実行などのアクションを指定する。 */
export interface TaskStepDef {
  action: "run_subagent" | "run_command" | "orchestrate";
  subagentType?: string;
  readonly?: boolean;
  buildPrompt: (ctx: PromptCtx) => string;
}

/** ヒューマンゲートステップの定義。人間による承認・選択を待つ。 */
export interface HumanGateStepDef {
  presentArtifacts: string[];
  choices: GateChoice[];
  /** 差し戻し時に再実行するステップの key。 */
  reviseTargetStep?: string;
}

/** 並列ステップの定義。複数のサブタスクを同時に実行する。 */
export interface ParallelStepDef {
  subtasks: SubtaskDef[];
}

/** 並列ステップ内で実行される個別サブタスクの定義。 */
export interface SubtaskDef {
  key: string;
  subagentType: string;
  readonly?: boolean;
  buildPrompt: (ctx: PromptCtx) => string;
}

/** チェック失敗時の戦略。アクションと分岐先で振る舞いを指定する。 */
export interface OnFailStrategy {
  action: "retry" | "goto" | "abort" | "escalate";
  /** `goto` 時の分岐先ステップの key。 */
  target?: string;
  /** 失敗した試行のソースをキューへ再投入するかどうか。 */
  requeueSource?: boolean;
}

/** ヒューマンゲートで提示する選択肢。 */
export interface GateChoice {
  value: string;
  label: string;
  desc?: string;
}
