import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  next,
  report,
  status,
  confirm,
  readGateAnswers,
  getWorkflowsDir,
  resolveWorkflowPath,
} from "./index.ts";
import { mockConfirmDeps } from "./__fixtures__/confirm-helper.ts";
import { createLegacyWorkflowDb } from "./__fixtures__/legacy-db.ts";

const TEST_TADO_HOME = path.join(__dirname, "__test_sessions_legacy_db__");
process.env.TADO_HOME = TEST_TADO_HOME;
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");
const SESSION_ID = "legacy-session";

function cleanup(tadoHome: string): void {
  if (fs.existsSync(tadoHome)) {
    fs.rmSync(tadoHome, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_TADO_HOME);
});

describe("旧スキーマDB", () => {
  it("initを経由せずにstatus/next/report/confirm/answersが動作する", async () => {
    const workflowDir = path.join(getWorkflowsDir(), "test-simple");
    fs.mkdirSync(workflowDir, { recursive: true });
    fs.copyFileSync(FIXTURE_WORKFLOW, path.join(workflowDir, "index.ts"));
    const sessionDir = path.join(TEST_TADO_HOME, "sessions", SESSION_ID);
    fs.mkdirSync(sessionDir, { recursive: true });

    // 0004/0005 適用前に作成されたセッションを再現する
    createLegacyWorkflowDb(TEST_TADO_HOME, {
      sessionId: SESSION_ID,
      workflowId: "test-simple",
      workflowPath: resolveWorkflowPath("test-simple"),
      sessionDir,
      title: "旧スキーマセッション",
      steps: [
        {
          key: "step1_task",
          index: 0,
          phase: "テストタスク",
          type: "task",
          maxRetries: 2,
          onFailAction: "abort",
        },
        {
          key: "step2_human_gate",
          index: 1,
          phase: "確認",
          type: "human_gate",
          maxRetries: 1,
          onFailAction: "escalate",
        },
        {
          key: "step3_parallel",
          index: 2,
          phase: "並列実行",
          type: "parallel",
          maxRetries: 1,
          onFailAction: "abort",
        },
      ],
    });

    // status: steps の全列 SELECT（旧スキーマでは no such column で落ちていた）
    const initial = status(SESSION_ID);
    expect(initial.sessionStatus).toBe("running");
    expect(initial.steps.map((s) => s.key)).toEqual([
      "step1_task",
      "step2_human_gate",
      "step3_parallel",
    ]);

    // next / report
    expect((await next(SESSION_ID)).stepKey).toBe("step1_task");
    const reported = await report(SESSION_ID, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    expect(reported.checkResult.status).toBe("pass");

    // confirm（human_gate）
    expect((await next(SESSION_ID)).stepKey).toBe("step2_human_gate");
    await confirm(SESSION_ID, mockConfirmDeps("approve"));

    // answers: confirm が記録した回答を読み出せる
    expect(readGateAnswers(SESSION_ID)["step2_human_gate"]?.["decision"]).toEqual({
      value: "approve",
    });

    // parallel の report まで完走する
    expect((await next(SESSION_ID)).stepKey).toBe("step3_parallel");
    const finished = await report(SESSION_ID, {
      stepKey: "step3_parallel",
      status: "completed",
      subagentOutput: "done all subtasks",
      subtaskResults: [
        { subtaskKey: "sub_a", subagentOutput: "sub A finished", status: "completed" },
        { subtaskKey: "sub_b", subagentOutput: "sub B finished", status: "completed" },
      ],
    });
    expect(finished.checkResult.status).toBe("pass");
    expect(status(SESSION_ID).sessionStatus).toBe("done");
  });
});
