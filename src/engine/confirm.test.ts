import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import {
  init,
  next,
  report,
  status,
  confirm,
  EngineError,
  getWorkflowDbPath,
  getWorkflowsDir,
} from "./index.ts";
import type { ConfirmDeps } from "./confirm.ts";
import { mockConfirmDeps, mockConfirmAnswers } from "./__fixtures__/confirm-helper.ts";

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

function setupWorkflowFromContent(id: string, content: string): void {
  const dir = path.join(getWorkflowsDir(), id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.ts"), content);
}

async function reachGate(): Promise<string> {
  setupSimpleWorkflow();
  const { sessionId } = await init("test-simple", { title: "test-title" });
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
      "SELECT step_key, attempt_number, event, answers_json, tty_name FROM gate_events WHERE session_id = ? ORDER BY id",
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
    expect(events[0].answers_json).toBeNull();
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

    expect(result.answers).toEqual({ decision: { value: "approve" } });
    expect(result.nextAction).toBe("continue");

    const events = gateEvents(sessionId);
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe("confirmed");
    expect(JSON.parse(events[0].answers_json as string)).toEqual({
      decision: { value: "approve" },
    });
    expect(events[0].tty_name).toBe("/dev/test-tty");

    const db = new Database(getWorkflowDbPath());
    const attempt = db
      .query(
        "SELECT result_json, check_status FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) ORDER BY attempt_number DESC LIMIT 1",
      )
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(JSON.parse(attempt.result_json as string)).toEqual({ decision: { value: "approve" } });
    expect(attempt.check_status).toBe("pass");
    db.close();
  });

  it("approve回答は回答データとして保存して通常進行する", async () => {
    const sessionId = await reachGate();

    const result = await confirm(sessionId, mockConfirmDeps("approve"));

    // human_gate は確認と回答保存のみを責務とし、巻き戻しは行わない。
    // 回答値 "approve" は通常の回答データとして保存され、ゲートを通過する。
    const ans = result.answers.decision as { value: string; input?: string };
    expect(ans.value).toBe("approve");
    expect(result.nextAction).toBe("continue");
    expect(result).not.toHaveProperty("targetStep");

    // 前ステップは passed のまま巻き戻らず、次は後続ステップになる
    const db = new Database(getWorkflowDbPath());
    const prev = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(prev.status).toBe("passed");
    db.close();

    const r = await next(sessionId);
    expect(r.stepKey).toBe("step3_parallel");
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
    const { sessionId } = await init("test-simple", { title: "test-title" });
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

  it("request_changesで必須入力がない場合はバリデーションエラーになる", async () => {
    const sessionId = await reachGate();
    const badDeps: ConfirmDeps = {
      isTTY: () => true,
      ttyName: () => "/dev/test-tty",
      presentGate: async () => ({ decision: { value: "request_changes" } }),
    };
    await expect(confirm(sessionId, badDeps)).rejects.toThrow("Invalid gate answers");
    const events = gateEvents(sessionId);
    expect(events).toHaveLength(0);
  });

  it("maxLength超過ではバリデーションエラーになる", async () => {
    const sessionId = await reachGate();
    const longInput = "x".repeat(501);
    const badDeps: ConfirmDeps = {
      isTTY: () => true,
      ttyName: () => "/dev/test-tty",
      presentGate: async () => ({ decision: { value: "request_changes", input: longInput } }),
    };
    await expect(confirm(sessionId, badDeps)).rejects.toThrow("Invalid gate answers");
  });

  it("複数設問の回答がanswersとgateEventsに保存される", async () => {
    // Prepare a workflow with decision + comment free_text
    const dir = path.join(getWorkflowsDir(), "multi-question");
    fs.mkdirSync(dir, { recursive: true });
    const content = `
      const def = {
        id: 'multi-question',
        steps: [
          {
            key: 'gate',
            phase: 'Gate',
            type: 'human_gate',
            maxRetries: 1,
            onFail: { action: 'escalate' },
            humanGate: {
              presentArtifacts: [],
              outcomeQuestionKey: 'decision',
              questions: [
                {
                  key: 'decision',
                  title: '判定',
                  type: 'choice_with_input',
                  choices: [
                    { value: 'approve', label: '承認' },
                    { value: 'reject', label: '却下', input: { required: true, placeholder: '理由', maxLength: 500 } },
                  ],
                },
                { key: 'comment', title: 'コメント', type: 'free_text', required: false, maxLength: 100 },
              ],
            },
            check: () => ({ status: 'pass', reasons: [] }),
          },
        ],
      };
      export default def;
    `;
    fs.writeFileSync(path.join(dir, "index.ts"), content);
    const { sessionId } = await init("multi-question", { title: "test-title" });
    await next(sessionId);
    const result = await confirm(
      sessionId,
      mockConfirmAnswers({ decision: { value: "approve" }, comment: "任意コメント" }),
    );
    expect(result.answers).toEqual({ decision: { value: "approve" }, comment: "任意コメント" });
    const events = gateEvents(sessionId);
    expect(JSON.parse(events[0].answers_json as string)).toEqual({
      decision: { value: "approve" },
      comment: "任意コメント",
    });
  });

  it("途中キャンセルは原子的に全破棄してrunningのまま", async () => {
    const sessionId = await reachGate();
    let callCount = 0;
    const cancelDeps: ConfirmDeps = {
      isTTY: () => true,
      ttyName: () => "/dev/test-tty",
      presentGate: async () => {
        callCount++;
        return null;
      },
    };
    await expect(confirm(sessionId, cancelDeps)).rejects.toThrow("confirm canceled");
    expect(callCount).toBe(1);
    const events = gateEvents(sessionId);
    expect(events).toHaveLength(0);
    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();
    // retry with valid answer should succeed
    const retry = await confirm(sessionId, mockConfirmDeps("approve"));
    expect(retry.nextAction).toBe("continue");
  });

  it("旧値の素通し確認用: revise回答はRecord直渡しで受理される", async () => {
    // 旧値の素通し確認用: "revise" は現行語彙 request_changes の旧値。エンジンは値の受理のみ行い、
    // 配線（loop本体内配置＋gateAnswersを読むcheck）はワークフロー作者の責務（ADR-0027）。
    // 文字列ショートハンドは使わず Record 直渡しで旧値の素通しを確認する。
    const no_revise_target_workflow_content = `
      const def = {
        id: 'no-revise-target-test',
        steps: [
          {
            key: 'prepare',
            phase: 'Prepare',
            type: 'task',
            maxRetries: 0,
            onFail: { action: 'abort' },
            task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'prepare' },
            check: () => ({ status: 'pass', reasons: [] }),
          },
          {
            key: 'gate',
            phase: 'Gate',
            type: 'human_gate',
            maxRetries: 1,
            onFail: { action: 'escalate' },
            humanGate: {
              presentArtifacts: [],
              outcomeQuestionKey: 'decision',
              questions: [
                {
                  key: 'decision',
                  title: '判定',
                  type: 'choice_with_input',
                  choices: [
                    { value: 'approve', label: 'OK' },
                    { value: 'revise', label: 'Revise', input: { required: true, placeholder: '理由', maxLength: 500 } },
                  ],
                },
              ],
            },
            check: () => ({ status: 'pass', reasons: [] }),
          },
        ],
      };
      export default def;
    `;
    setupWorkflowFromContent("no-revise-target-test", no_revise_target_workflow_content);

    // 回答値 "revise" 自体は通常の回答データとして許容される
    const { sessionId } = await init("no-revise-target-test", { title: "test-title" });
    expect(sessionId).toBeTruthy();
    await next(sessionId);
    await report(sessionId, {
      stepKey: "prepare",
      status: "completed",
      subagentOutput: "done",
    });
    await next(sessionId);
    const result = await confirm(
      sessionId,
      mockConfirmDeps({ decision: { value: "revise", input: "要修正" } }),
    );
    const ans = result.answers.decision as { value: string; input?: string };
    expect(ans.value).toBe("revise");
    expect(ans.input).toBe("要修正");
    expect(result.nextAction).toBe("done");
  });

  it("reviseTargetStep付き定義はロード時に拒否される", async () => {
    // 旧差し戻し機構 reviseTargetStep が残っている定義は fail-fast する
    const legacy_revise_target_workflow_content = `
      const def = {
        id: 'legacy-revise-target-test',
        steps: [
          {
            key: 'prepare',
            phase: 'Prepare',
            type: 'task',
            maxRetries: 0,
            onFail: { action: 'abort' },
            task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'prepare' },
            check: () => ({ status: 'pass', reasons: [] }),
          },
          {
            key: 'gate',
            phase: 'Gate',
            type: 'human_gate',
            maxRetries: 1,
            onFail: { action: 'escalate' },
            humanGate: {
              presentArtifacts: [],
              outcomeQuestionKey: 'decision',
              reviseTargetStep: 'prepare',
              questions: [
                {
                  key: 'decision',
                  title: '判定',
                  type: 'choice_with_input',
                  choices: [
                    { value: 'approve', label: 'OK' },
                    { value: 'revise', label: 'Revise', input: { required: true, placeholder: '理由', maxLength: 500 } },
                  ],
                },
              ],
            },
            check: () => ({ status: 'pass', reasons: [] }),
          },
        ],
      };
      export default def;
    `;
    setupWorkflowFromContent("legacy-revise-target-test", legacy_revise_target_workflow_content);
    await expect(init("legacy-revise-target-test", { title: "test-title" })).rejects.toThrow(
      /humanGate\.reviseTargetStep.*revise has been removed/,
    );
  });

  it("ループ本体のゲート承認でループが完了して後続へ進む", async () => {
    const loop_gate_workflow_content = `
      const def = {
        id: 'loop-gate-test',
        steps: [
          {
            key: 'review_loop',
            phase: 'Loop',
            type: 'loop',
            maxIterations: 2,
            onExhausted: 'abort',
            body: [
              {
                key: 'gate',
                phase: 'Gate',
                type: 'human_gate',
                maxRetries: 1,
                onFail: { action: 'escalate' },
                humanGate: {
                  presentArtifacts: [],
                  outcomeQuestionKey: 'decision',
                  questions: [
                    {
                      key: 'decision',
                      title: '判定',
                      type: 'choice_with_input',
                      choices: [
                        { value: 'approve', label: 'OK' },
                        { value: 'abort', label: 'Abort' },
                      ],
                    },
                  ],
                },
                check: () => ({ status: 'pass', reasons: [] }),
              },
            ],
          },
          {
            key: 'finalize',
            phase: 'Finalize',
            type: 'task',
            maxRetries: 0,
            onFail: { action: 'abort' },
            task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'finalize' },
            check: () => ({ status: 'pass', reasons: [] }),
          },
        ],
      };
      export default def;
    `;
    setupWorkflowFromContent("loop-gate-test", loop_gate_workflow_content);
    const { sessionId } = await init("loop-gate-test", { title: "test-title" });

    const gate = await next(sessionId);
    expect(gate.stepKey).toBe("gate");
    expect(gate.stepType).toBe("human_gate");
    expect(gate.context.loop).toEqual({ key: "review_loop", iteration: 1, maxIterations: 2 });

    const result = await confirm(sessionId, mockConfirmDeps("approve"));
    expect(result.nextAction).toBe("continue");
    expect(result.message).toContain("finalize");

    const s = status(sessionId);
    expect(s.steps.find((step) => step.key === "review_loop")?.status).toBe("passed");

    const finalStep = await next(sessionId);
    expect(finalStep.stepKey).toBe("finalize");
  });
});
