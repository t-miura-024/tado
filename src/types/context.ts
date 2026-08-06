/**
 * ワークフローの各フック（check / condition / buildPrompt 等）に渡されるコンテキストの型定義。
 */
import type { ArtifactRecord } from "./artifact.ts";
import type { AttemptResult } from "./result.ts";

/** ステップの `condition` 判定に渡されるコンテキスト。 */
export interface ConditionCtx {
  gateChoices: Record<string, string>;
  artifacts: ArtifactRecord[];
}

/** `beforeInit` / `afterInit` フックに渡されるコンテキスト。 */
export interface InitCtx {
  sessionDir: string;
  sessionId: string;
}

/** ステップの `check` 関数に渡されるコンテキスト。 */
export interface CheckCtx {
  sessionDir: string;
  artifactDbPath?: string;
  attemptResult: AttemptResult;
  artifacts: ArtifactRecord[];
}

/** タスク / サブタスクの `buildPrompt` 関数に渡されるコンテキスト。 */
export interface PromptCtx {
  sessionDir: string;
  artifactDbPath?: string;
  artifacts: ArtifactRecord[];
}
