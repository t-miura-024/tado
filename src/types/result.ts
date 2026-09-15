/**
 * ステップ実行の結果および CLI / API の返却値関連の型定義。
 */
import type { LoopContext } from "./context.ts";
import type { GateAnswer } from "./workflow-def.ts";

/**
 * ステップの完了チェック結果。
 *
 * `continue` はループ本体の check が返す「次イテレーション要求」（判定）で、
 * エンジンは本体先頭への巻き戻しを適用し、呼び出し側には遷移 `repeat` として
 * 返す。ループ外で返された場合はエラーとする。
 *
 * 三者の区別（名前空間が異なるため厳密に区別する）:
 * - 判定 `continue`（`CheckResult.status`）: loop 本体の check が返す次イテレーション要求。
 * - 遷移 `repeat`（`ReportResult.nextAction`）: 判定 `continue` に基づく巻き戻しを
 *   適用したことを表す遷移値。巻き戻しはこの経路でのみ行う。
 * - 通常進行 `continue`（`ReportResult` / `ConfirmResult` の `nextAction`）:
 *   次ステップへ進む通常進行。巻き戻しを伴わない。
 */
export interface CheckResult {
  status: "pass" | "fail" | "error" | "continue";
  reasons: string[];
}

/** 1 回の試行（アテンプト）の実行結果。 */
export interface AttemptResult {
  status: "completed" | "failed";
  subagentOutput?: string;
  errors?: string;
}

/** 過去の試行の要約情報。リトライ時のプロンプト構築に利用される。 */
export interface AttemptSummary {
  attemptNumber: number;
  startedAt: string;
  endedAt?: string;
  checkStatus?: string;
  checkResults: string | null;
}

/** 並列ステップにおける個別サブタスクの実行結果。 */
export interface SubtaskResult {
  subtaskKey: string;
  subagentOutput: string;
  status: "completed" | "failed";
  error?: string;
}

/** ステップ完了時に報告する入力情報。 */
export interface ReportInput {
  stepKey: string;
  status: "completed" | "failed";
  subagentOutput?: string;
  subtaskResults?: SubtaskResult[];
  artifacts?: { key: string; path: string }[];
  errors?: string;
}

/** `init` コマンドの返却値。 */
export interface InitResult {
  sessionId: string;
  sessionDir: string;
  workflowId: string;
}

/** `next` コマンドの返却値。次に実行すべきステップの指示を含む。 */
export interface NextResult {
  sessionId: string;
  stepKey: string;
  stepType: "task" | "human_gate" | "parallel";
  phase: string;
  action: string;
  subagentType?: string;
  prompt: string;
  parallel?: ParallelNextResult | null;
  constraints: {
    mustCallTaskTool: boolean;
    readonly: boolean;
    reportAfterCompletion: boolean;
  };
  context: {
    sessionDir: string;
    artifactDbPath: string | null;
    attemptNumber: number;
    retryCount: number;
    maxRetries: number;
    /** 実行中ステップが属する最も内側のループの文脈。ループ外では null。 */
    loop: LoopContext | null;
  };
}

/** 並列ステップで各サブタスクに渡す実行指示。 */
export interface ParallelNextResult {
  subtasks: {
    key: string;
    subagentType: string;
    prompt: string;
    constraints: {
      mustCallTaskTool: boolean;
      readonly: boolean;
      reportAfterCompletion: boolean;
    };
  }[];
}

/** `report` コマンドの返却値。チェック結果と次のアクションを含む。 */
export interface ReportResult {
  sessionId: string;
  stepKey: string;
  checkResult: CheckResult;
  /**
   * 次のアクション。
   *
   * - `continue`: 通常進行（次ステップへ。巻き戻しを伴わない）。
   * - `repeat`: 判定 `continue` に基づく巻き戻しを適用した遷移（loop 本体の check 経由のみ）。
   * - `retry` / `abort` / `escalate` / `done`: リトライ・中断・エスカレーション・完了。
   */
  nextAction: "continue" | "repeat" | "retry" | "abort" | "escalate" | "done";
  message: string;
}

/**
 * `confirm` コマンドの返却値。人間のゲート回答とその結果の遷移を含む。
 *
 * human_gate は確認と回答保存のみを責務とし、巻き戻しは行わない。
 * 分岐判断は loop 本体の check が `gateAnswers` を読んで行い、巻き戻しが
 * 必要な場合は check が判定 `continue` を返して遷移 `repeat` を引き起こす。
 * そのため `confirm` の `nextAction` に `repeat` は現れない。
 */
export interface ConfirmResult {
  sessionId: string;
  stepKey: string;
  answers: Record<string, GateAnswer>;
  /** 次のアクション（`continue`: 通常進行、`abort`: 中断、`done`: 完了）。 */
  nextAction: "continue" | "abort" | "done";
  message: string;
}

/** `status` コマンドの返却値。セッションと各ステップの進捗を含む。 */
export interface StatusResult {
  sessionId: string;
  workflowId: string;
  sessionStatus: string;
  currentStep: string | null;
  createdAt: string;
  updatedAt: string;
  steps: {
    key: string;
    phase: string;
    type: string;
    status: string;
    retryCount: number;
    maxRetries: number;
    attempts: {
      attemptNumber: number;
      startedAt: string;
      endedAt: string | null;
      checkStatus: string | null;
    }[];
  }[];
}
