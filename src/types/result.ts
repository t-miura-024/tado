/**
 * ステップ実行の結果および CLI / API の返却値関連の型定義。
 */

/** ステップの完了チェック結果。 */
export interface CheckResult {
  status: "pass" | "fail" | "error";
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
  nextAction: "continue" | "retry" | "goto" | "abort" | "escalate" | "done";
  targetStep?: string;
  message: string;
}

/** `confirm` コマンドの返却値。人間のゲート回答とその結果の遷移を含む。 */
export interface ConfirmResult {
  sessionId: string;
  stepKey: string;
  choice: string;
  nextAction: "continue" | "goto" | "abort" | "done";
  targetStep?: string;
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
