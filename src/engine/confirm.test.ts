import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import {
  init,
  next,
  report,
  confirm,
  EngineError,
  getWorkflowDbPath,
  getWorkflowsDir,
} from "./index.ts";
import type { ConfirmDeps } from "./confirm.ts";
import { mockConfirmDeps } from "./__fixtures__/confirm-helper.ts";

const TEST_TADO_HOME = path.join(__dirname, "__test_sessions_confirm__");
process.env.TADO_HOME = TEST_TADO_HOME;
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(tadoHome: string): void {
  if (fs.existsSync(tadoHome)) {
    fs.rmSync(tadoHome, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_TADO_HOME);
});

function setupSimpleWorkflow(): void {
  const dir = path.join(getWorkflowsDir(), "test-simple");
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(FIXTURE_WORKFLOW, path.join(dir, "index.ts"));
}

async function reachGate(): Promise<string> {
  setupSimpleWorkflow();
  const { sessionId } = await init("test-simple");
  await next(sessionId);
  await report(sessionId, {
    stepKey: "step1_task",
    status: "completed",
    subagentOutput: "success task done",
  });
  await next(sessionId);
  return sessionId;
}

function nonTtyDeps(): ConfirmDeps {
  return {
    isTTY: () => false,
    ttyName: () => null,
    presentGate: async () => null,
  };
}

function gateEvents(sessionId: string): Record<string, unknown>[] {
  const db = new Database(getWorkflowDbPath());
  const rows = db
    .query(
      "SELECT step_key, attempt_number, event, choice, tty_name FROM gate_events WHERE session_id = ? ORDER BY id",
    )
    .all(sessionId) as Record<string, unknown>[];
  db.close();
  return rows;
}

describe("confirm", () => {
  it("TTYなしでは拒否されrejectedイベントを記録する", async () => {
    const sessionId = await reachGate();

    await expect(confirm(sessionId, nonTtyDeps())).rejects.toThrow(EngineError);

    const events = gateEvents(sessionId);
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe("rejected");
    expect(events[0].choice).toBeNull();
    expect(events[0].tty_name).toBeNull();

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();
  });

  it("拒否後も正規のTTYからconfirmできる", async () => {
    const sessionId = await reachGate();

    await expect(confirm(sessionId, nonTtyDeps())).rejects.toThrow(EngineError);

    const result = await confirm(sessionId, mockConfirmDeps("approve"));
    expect(result.nextAction).toBe("continue");

    const events = gateEvents(sessionId);
    expect(events.map((e) => e.event)).toEqual(["rejected", "confirmed"]);
  });

  it("approveで承認イベントとアテンプト結果を記録する", async () => {
    const sessionId = await reachGate();

    const result = await confirm(sessionId, mockConfirmDeps("approve"));

    expect(result.choice).toBe("approve");
    expect(result.nextAction).toBe("continue");

    const events = gateEvents(sessionId);
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe("confirmed");
    expect(events[0].choice).toBe("approve");
    expect(events[0].tty_name).toBe("/dev/test-tty");

    const db = new Database(getWorkflowDbPath());
    const attempt = db
      .query(
        "SELECT result_json, check_status FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) ORDER BY attempt_number DESC LIMIT 1",
      )
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(attempt.result_json).toBe("approve");
    expect(attempt.check_status).toBe("pass");
    db.close();
  });

  it("reviseで対象ステップに巻き戻す", async () => {
    const sessionId = await reachGate();

    const result = await confirm(sessionId, mockConfirmDeps("revise"));

    expect(result.choice).toBe("revise");
    expect(result.nextAction).toBe("goto");
    expect(result.targetStep).toBe("step1_task");

    const r = await next(sessionId);
    expect(r.stepKey).toBe("step1_task");
  });

  it("abortでセッションを中断する", async () => {
    const sessionId = await reachGate();

    const result = await confirm(sessionId, mockConfirmDeps("abort"));

    expect(result.nextAction).toBe("abort");

    const db = new Database(getWorkflowDbPath());
    const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
      string,
      unknown
    >;
    expect(session.status).toBe("aborted");
    db.close();
  });

  it("キャンセル時は遷移せずEngineErrorをスローする", async () => {
    const sessionId = await reachGate();

    await expect(confirm(sessionId, mockConfirmDeps())).rejects.toThrow(
      "confirm canceled by user.",
    );

    const events = gateEvents(sessionId);
    expect(events).toHaveLength(0);

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();
  });

  it("ゲート以外のステップが current の場合はEngineErrorをスローする", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple");
    await next(sessionId);

    await expect(confirm(sessionId, mockConfirmDeps("approve"))).rejects.toThrow(
      "No human gate awaiting confirmation",
    );
  });

  it("存在しないセッションでEngineErrorをスローする", async () => {
    await expect(confirm("nonexistent-session", mockConfirmDeps("approve"))).rejects.toThrow(
      EngineError,
    );
  });
});
