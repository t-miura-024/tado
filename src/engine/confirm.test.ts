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

  it("reviseで対象ステップに巻き戻す", async () => {
    const sessionId = await reachGate();

    const result = await confirm(sessionId, mockConfirmDeps("revise"));

    const ans = result.answers.decision as { value: string; input?: string };
    expect(ans.value).toBe("revise");
    expect(result.nextAction).toBe("revise");
    expect(result.targetStep).toBe("step1_task");

    const r = await next(sessionId);
    expect(r.stepKey).toBe("step1_task");
  });

  it("revise対象のステップ行がセッションに無い場合はEngineErrorになり巻き戻さない", async () => {
    const sessionId = await reachGate();

    // def には reviseTargetStep（step1_task）があるが、セッションの行が無い状態を再現する
    const db = new Database(getWorkflowDbPath());
    db.run("DELETE FROM steps WHERE session_id = ? AND step_key = ?", [sessionId, "step1_task"]);
    db.close();

    await expect(confirm(sessionId, mockConfirmDeps("revise"))).rejects.toThrow(
      /Cannot revise: target step "step1_task" was not found/,
    );

    // トランザクションはロールバックされ、ゲートは running のまま
    const verifyDb = new Database(getWorkflowDbPath());
    const gate = verifyDb
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(gate.status).toBe("running");
    const session = verifyDb
      .query("SELECT current_step FROM sessions WHERE id = ?")
      .get(sessionId) as Record<string, unknown>;
    expect(session.current_step).toBe("step2_human_gate");
    verifyDb.close();
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

  it("reviseで必須入力がない場合はバリデーションエラーになる", async () => {
    const sessionId = await reachGate();
    const badDeps: ConfirmDeps = {
      isTTY: () => true,
      ttyName: () => "/dev/test-tty",
      presentGate: async () => ({ decision: { value: "revise" } }),
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
      presentGate: async () => ({ decision: { value: "revise", input: longInput } }),
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

  it("reviseTargetStepなしのrevise選択肢はロード時に拒否される", async () => {
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

    // 人間が回答する前に定義エラーとして fail-fast する
    //（confirm 実行時まで遅延すると、全設問回答後に回答ごと破棄される）。
    await expect(init("no-revise-target-test", { title: "test-title" })).rejects.toThrow(
      /humanGate\.reviseTargetStep.*required/,
    );
  });

  it("ループを跨ぐreviseでループ反復状態が初期化される", async () => {
    const loop_revise_workflow_content = `
      const def = {
        id: 'loop-revise-test',
        steps: [
          {
            key: 'setup_task',
            phase: 'Setup',
            type: 'task',
            maxRetries: 0,
            onFail: { action: 'abort' },
            task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'setup' },
            check: () => ({ status: 'pass', reasons: [] }),
          },
          {
            key: 'work_loop',
            phase: 'Loop',
            type: 'loop',
            maxIterations: 3,
            onExhausted: 'abort',
            body: [
              {
                key: 'loop_task',
                phase: 'LoopTask',
                type: 'task',
                maxRetries: 0,
                onFail: { action: 'abort' },
                task: { action: 'run_subagent', subagentType: 'test', buildPrompt: (ctx) => 'loop iteration ' + (ctx.loop ? ctx.loop.iteration : -1) },
                check: (ctx) => ctx.loop && ctx.loop.iteration === 1
                  ? { status: 'continue', reasons: ['again'] }
                  : { status: 'pass', reasons: [] },
              },
            ],
          },
          {
            key: 'review_gate',
            phase: 'Review',
            type: 'human_gate',
            maxRetries: 1,
            onFail: { action: 'escalate' },
            humanGate: {
              presentArtifacts: [],
              outcomeQuestionKey: 'decision',
              reviseTargetStep: 'setup_task',
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
    setupWorkflowFromContent("loop-revise-test", loop_revise_workflow_content);
    const { sessionId } = await init("loop-revise-test", { title: "test-title" });

    await next(sessionId);
    await report(sessionId, { stepKey: "setup_task", status: "completed", subagentOutput: "done" });

    // 1周目は continue、2周目は pass で loop が完了する
    await next(sessionId);
    const repeat = await report(sessionId, {
      stepKey: "loop_task",
      status: "completed",
      subagentOutput: "loop 1",
    });
    expect(repeat.nextAction).toBe("repeat");
    await next(sessionId);
    await report(sessionId, {
      stepKey: "loop_task",
      status: "completed",
      subagentOutput: "loop 2",
    });

    const gate = await next(sessionId);
    expect(gate.stepKey).toBe("review_gate");

    // ループを跨いで setup_task へ差し戻す → loop_iteration は 1 に初期化される
    const result = await confirm(sessionId, mockConfirmDeps("revise"));
    expect(result.nextAction).toBe("revise");
    expect(result.targetStep).toBe("setup_task");

    const db = new Database(getWorkflowDbPath());
    const loopRow = db
      .query("SELECT loop_iteration FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "work_loop") as Record<string, unknown>;
    expect(loopRow.loop_iteration).toBe(1);
    const session = db
      .query("SELECT current_step FROM sessions WHERE id = ?")
      .get(sessionId) as Record<string, unknown>;
    expect(session.current_step).toBe("setup_task");
    db.close();

    const rerun = await next(sessionId);
    expect(rerun.stepKey).toBe("setup_task");
  });

  it("差し戻し先がループ本体の内部にある場合は祖先ループの反復状態も初期化される", async () => {
    const loop_inner_revise_workflow_content = `
      const def = {
        id: 'loop-inner-revise-test',
        steps: [
          {
            key: 'work_loop',
            phase: 'Loop',
            type: 'loop',
            maxIterations: 3,
            onExhausted: 'abort',
            body: [
              {
                key: 'plan',
                phase: 'Plan',
                type: 'task',
                maxRetries: 0,
                onFail: { action: 'abort' },
                task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'plan' },
                check: () => ({ status: 'pass', reasons: [] }),
              },
              {
                key: 'review',
                phase: 'Review',
                type: 'task',
                maxRetries: 0,
                onFail: { action: 'abort' },
                task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'review' },
                check: (ctx) => ctx.loop && ctx.loop.iteration < 3
                  ? { status: 'continue', reasons: ['again'] }
                  : { status: 'pass', reasons: [] },
              },
            ],
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
              reviseTargetStep: 'plan',
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
    setupWorkflowFromContent("loop-inner-revise-test", loop_inner_revise_workflow_content);
    const { sessionId } = await init("loop-inner-revise-test", { title: "test-title" });

    // iteration 1・2 は continue、3 で pass して loop が passed になる
    for (let iteration = 0; iteration < 2; iteration++) {
      await next(sessionId);
      await report(sessionId, { stepKey: "plan", status: "completed", subagentOutput: "plan" });
      await next(sessionId);
      const repeat = await report(sessionId, {
        stepKey: "review",
        status: "completed",
        subagentOutput: "review",
      });
      expect(repeat.nextAction).toBe("repeat");
    }
    await next(sessionId);
    await report(sessionId, { stepKey: "plan", status: "completed", subagentOutput: "plan" });
    await next(sessionId);
    const loopPassed = await report(sessionId, {
      stepKey: "review",
      status: "completed",
      subagentOutput: "review",
    });
    expect(loopPassed.nextAction).toBe("continue");

    const gate = await next(sessionId);
    expect(gate.stepKey).toBe("gate");

    // 差し戻し先が loop 本体の内部（plan）→ 祖先 loop 行も反復状態を初期化する
    const result = await confirm(sessionId, mockConfirmDeps("revise"));
    expect(result.nextAction).toBe("revise");
    expect(result.targetStep).toBe("plan");

    const db = new Database(getWorkflowDbPath());
    const loopRow = db
      .query("SELECT status, loop_iteration FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "work_loop") as Record<string, unknown>;
    expect(loopRow.status).toBe("pending");
    expect(loopRow.loop_iteration).toBe(1);
    const session = db
      .query("SELECT current_step FROM sessions WHERE id = ?")
      .get(sessionId) as Record<string, unknown>;
    expect(session.current_step).toBe("plan");
    db.close();

    // 反復予算が戻っているため、次の continue は onExhausted ではなく繰り返しになる
    const rerun = await next(sessionId);
    expect(rerun.stepKey).toBe("plan");
    expect(rerun.context.loop).toEqual({ key: "work_loop", iteration: 1, maxIterations: 3 });
    await report(sessionId, { stepKey: "plan", status: "completed", subagentOutput: "plan" });
    await next(sessionId);
    const afterRevise = await report(sessionId, {
      stepKey: "review",
      status: "completed",
      subagentOutput: "review",
    });
    expect(afterRevise.nextAction).toBe("repeat");
    expect(afterRevise.message).toContain("iteration 2/3");
  });

  it("差し戻し先がloop行の場合は本体先頭から再開する", async () => {
    const loop_target_revise_workflow_content = `
      const def = {
        id: 'loop-target-revise-test',
        steps: [
          {
            key: 'work_loop',
            phase: 'Loop',
            type: 'loop',
            maxIterations: 2,
            onExhausted: 'abort',
            body: [
              {
                key: 'loop_task',
                phase: 'LoopTask',
                type: 'task',
                maxRetries: 0,
                onFail: { action: 'abort' },
                task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'loop' },
                check: (ctx) => ctx.loop && ctx.loop.iteration === 1
                  ? { status: 'continue', reasons: ['again'] }
                  : { status: 'pass', reasons: [] },
              },
            ],
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
              reviseTargetStep: 'work_loop',
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
    setupWorkflowFromContent("loop-target-revise-test", loop_target_revise_workflow_content);
    const { sessionId } = await init("loop-target-revise-test", { title: "test-title" });

    await next(sessionId);
    const repeat = await report(sessionId, {
      stepKey: "loop_task",
      status: "completed",
      subagentOutput: "done",
    });
    expect(repeat.nextAction).toBe("repeat");
    await next(sessionId);
    await report(sessionId, { stepKey: "loop_task", status: "completed", subagentOutput: "done" });
    const gate = await next(sessionId);
    expect(gate.stepKey).toBe("gate");

    const result = await confirm(sessionId, mockConfirmDeps("revise"));
    expect(result.nextAction).toBe("revise");
    expect(result.targetStep).toBe("work_loop");

    // loop 行は実行されず、本体先頭（loop_task）から再開する
    const s = status(sessionId);
    expect(s.currentStep).toBe("loop_task");
    expect(s.steps.find((step) => step.key === "work_loop")?.status).toBe("pending");
    const db = new Database(getWorkflowDbPath());
    const loopRow = db
      .query("SELECT loop_iteration FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "work_loop") as Record<string, unknown>;
    expect(loopRow.loop_iteration).toBe(1);
    db.close();

    const rerun = await next(sessionId);
    expect(rerun.stepKey).toBe("loop_task");
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
