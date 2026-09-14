/**
 * ワークフローとそのステップを定義するための型定義。
 */
import type { ArtifactInput } from "./artifact.ts";
import type { CheckCtx, ConditionCtx, InitCtx, PromptCtx, StepCtx } from "./context.ts";
import type { CheckResult } from "./result.ts";

/** ワークフロー全体の定義。ステップの列と初期化フックで構成される。 */
export interface WorkflowDef {
  id: string;
  description?: string;
  steps: StepDef[];
  beforeInit?: (ctx: InitCtx) => Promise<void>;
  afterInit?: (ctx: InitCtx) => Promise<AfterInitResult>;
}

/** `afterInit` フックの返却値。初期成果物の登録に利用される。 */
export interface AfterInitResult {
  artifactDbPath?: string;
  artifacts?: ArtifactInput[];
}

/**
 * ワークフローを構成する単一のステップの定義。`type` で判別するユニオン。
 *
 * `task` / `human_gate` / `parallel` は実行されるステップ、`loop` は本体を
 * 繰り返す構造ステップで、それ自身は実行されない。
 */
export type StepDef = TaskStepDef | HumanGateStepDef | ParallelStepDef | LoopStepDef;

/** 実行されるステップ（task / human_gate / parallel）のユニオン。 */
export type ExecutableStepDef = TaskStepDef | HumanGateStepDef | ParallelStepDef;

/** 全ステップ型が共通で持つフィールド。 */
export interface StepDefBase {
  key: string;
  phase: string;
}

/** task / human_gate / parallel が共通で持つ実行ステップのフィールド。 */
export interface ExecutableStepDefBase extends StepDefBase {
  maxRetries: number;
  /** チェック失敗時の振る舞い（リトライ / 中断 / エスカレーション）。 */
  onFail: OnFailStrategy;
  check: (ctx: CheckCtx) => CheckResult;
  /** 指定した場合、この条件が true のときのみステップを実行する。 */
  condition?: (ctx: ConditionCtx) => boolean;
  /** プロンプト生成前に実行されるフック。返却 artifacts は既存成果物と同名キーを上書きして DB へ登録・マージする。 */
  beforeStep?: (ctx: StepCtx) => Promise<ArtifactInput[]>;
  /** `check` 前に実行されるフック。返却 artifacts は既存成果物と同名キーを上書きして DB へ登録・マージする。 */
  afterStep?: (ctx: StepCtx) => Promise<ArtifactInput[]>;
}

/** タスクステップの定義。SubAgent 実行などのアクションを指定する。 */
export interface TaskStepDef extends ExecutableStepDefBase {
  type: "task";
  task: TaskConfig;
}

/** ヒューマンゲートステップの定義。人間による承認・選択を待つ。 */
export interface HumanGateStepDef extends ExecutableStepDefBase {
  type: "human_gate";
  humanGate: HumanGateConfig;
}

/** 並列ステップの定義。複数のサブタスクを同時に実行する。 */
export interface ParallelStepDef extends ExecutableStepDefBase {
  type: "parallel";
  parallel: ParallelConfig;
  /** parallel 実行時に使う action 指定。省略時は run_subagent。 */
  task?: TaskConfig;
}

/**
 * ループステップの定義。本体（`body`）を繰り返す。
 *
 * 本体の check が `continue` を返すたびに本体先頭へ巻き戻って次のイテレーション
 * を実行し、check が `pass` を返すと後続ステップへ脱出する。`maxIterations` に
 * 達したときは `onExhausted`（escalate / abort）が適用される。loop を parallel の
 * サブタスクに置くことはできない（型とロード時検証の両方で拒否する）。
 */
export interface LoopStepDef extends StepDefBase {
  type: "loop";
  body: StepDef[];
  maxIterations: number;
  onExhausted: OnExhaustedStrategy;
}

/** ループの反復上限に達したときの戦略。 */
export type OnExhaustedStrategy = "escalate" | "abort";

/** タスクステップの実行内容。SubAgent 実行などのアクションを指定する。 */
export interface TaskConfig {
  action: "run_subagent" | "run_command" | "orchestrate";
  subagentType?: string;
  readonly?: boolean;
  buildPrompt: (ctx: PromptCtx) => string;
}

/** ヒューマンゲートの定義。人間による承認・選択を待つ。 */
export interface HumanGateConfig {
  presentArtifacts: string[];
  outcomeQuestionKey: string;
  /** 差し戻し（revise）時に再実行するステップの key。revise の選択には必須。 */
  reviseTargetStep?: string;
  questions: GateQuestion[];
}

/** 並列ステップの定義。複数のサブタスクを同時に実行する。 */
export interface ParallelConfig {
  subtasks: SubtaskConfig[];
}

/** 並列ステップ内で実行される個別サブタスクの定義。 */
export interface SubtaskConfig {
  key: string;
  subagentType: string;
  readonly?: boolean;
  buildPrompt: (ctx: PromptCtx) => string;
}

/** チェック失敗時の戦略。 */
export interface OnFailStrategy {
  action: "retry" | "abort" | "escalate";
}

/** ヒューマンゲート設問の定義。 */
export interface GateQuestion {
  key: string;
  title: string;
  description?: string;
  type: "single_choice" | "free_text" | "choice_with_input";
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  choices?: GateChoice[];
}

/** ヒューマンゲートで提示する選択肢。 */
export interface GateChoice {
  value: string;
  label: string;
  desc?: string;
  input?: {
    title?: string;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
  };
}

export type GateAnswer = string | { value: string; input?: string };
