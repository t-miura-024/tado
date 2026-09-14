/**
 * ワークフローの各フック（check / condition / buildPrompt 等）に渡されるコンテキストの型定義。
 */
import type { ArtifactRecord } from "./artifact.ts";
import type { AttemptResult } from "./result.ts";
import type { GateAnswer } from "./workflow-def.ts";

/** ゲートごとの最新回答（`stepKey` → `questionKey` → `GateAnswer`）。 */
export type GateAnswers = Record<string, Record<string, GateAnswer>>;

/** 実行中ステップが属する最も内側のループの文脈。ループ外では null。 */
export interface LoopContext {
  key: string;
  iteration: number;
  maxIterations: number;
}

/** 全フック（condition / check / buildPrompt / beforeStep / afterStep）が共通で受け取るコンテキスト。 */
export interface HookCtxBase {
  sessionDir: string;
  sessionId: string;
  /** ゲートごとの最新試行の回答（approve / revise を問わず）。未回答のゲートは含まれない。 */
  gateAnswers: GateAnswers;
  /** 実行中ステップが属する最も内側のループの文脈。ループ外のステップでは null。 */
  loop: LoopContext | null;
}

/** ステップの `condition` 判定に渡されるコンテキスト。 */
export interface ConditionCtx extends HookCtxBase {
  artifacts: ArtifactRecord[];
}

/** `beforeInit` / `afterInit` フックに渡されるコンテキスト。 */
export interface InitCtx {
  sessionDir: string;
  sessionId: string;
}

/** ステップの `check` 関数に渡されるコンテキスト。 */
export interface CheckCtx extends HookCtxBase {
  artifactDbPath?: string;
  attemptResult: AttemptResult;
  artifacts: ArtifactRecord[];
}

/** タスク / サブタスクの `buildPrompt` 関数に渡されるコンテキスト。 */
export interface PromptCtx extends HookCtxBase {
  artifactDbPath?: string;
  artifacts: ArtifactRecord[];
}

/** `beforeStep` / `afterStep` フックに渡されるコンテキスト。 */
export interface StepCtx extends HookCtxBase {
  artifacts: ArtifactRecord[];
  stepKey: string;
  attemptNumber: number;
}
