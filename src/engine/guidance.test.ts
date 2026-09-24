import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { init, next, report, confirm, getWorkflowsDir } from "./index.ts";
import { mockConfirmDeps } from "./__fixtures__/confirm-helper.ts";

const TEST_TADO_HOME = path.join(__dirname, "__test_sessions_guidance__");
process.env.TADO_HOME = TEST_TADO_HOME;
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(): void {
  if (fs.existsSync(TEST_TADO_HOME)) {
    fs.rmSync(TEST_TADO_HOME, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup();
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

describe("次操作案内（nextCommand＋## 次の操作）", () => {
  it("initはnextコマンドを返す", async () => {
    setupSimpleWorkflow();
    const result = await init("test-simple", { title: "test-title" });
    expect(result.nextCommand).toBe(`tado next --session ${result.sessionId}`);
  });

  it("next(task)はreport案内を返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    const result = await next(sessionId);
    expect(result.stepKey).toBe("step1_task");
    expect(result.nextCommand).toBe(`tado report --session ${sessionId}`);
    expect(result.prompt).toContain("## 次の操作");
    expect(result.prompt).toContain("作業を完遂してください");
    expect(result.prompt).toContain("report の前に next を呼ばないでください");
    expect(result.prompt).toContain(`"stepKey":"step1_task"`);
    expect(result.prompt).toContain(`tado report --session ${sessionId}`);
  });

  it("next(human_gate)はconfirm案内を一本化して返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    const result = await next(sessionId);
    expect(result.stepType).toBe("human_gate");
    expect(result.nextCommand).toBe(`tado confirm --session ${sessionId}`);
    expect(result.prompt).toContain("## 次の操作");
    expect(result.prompt).toContain("あなた自身では完了できません");
    expect(result.prompt).toContain(`tado confirm --session ${sessionId}`);
    expect(result.prompt).toContain("あなたは confirm を実行しないでください");
    expect(result.prompt).toContain("next を再実行するとこのプロンプトが再表示されます");
  });

  it("next(parallel)はsubtaskResults雛形を返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    await next(sessionId);
    await confirm(sessionId, mockConfirmDeps("approve"));
    const result = await next(sessionId);
    expect(result.stepType).toBe("parallel");
    expect(result.nextCommand).toBe(`tado report --session ${sessionId}`);
    expect(result.prompt).toContain("## 次の操作");
    expect(result.prompt).toContain("subtaskResults");
    expect(result.prompt).toContain("sub_a");
    expect(result.prompt).toContain("sub_b");
    expect(result.prompt).toContain(`"stepKey":"step3_parallel"`);
  });

  it("report(continue)はnext案内を返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    const result = await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    expect(result.nextAction).toBe("continue");
    expect(result.nextCommand).toBe(`tado next --session ${sessionId}`);
    expect(result.message).toContain("## 次の操作");
    expect(result.message).toContain(`tado next --session ${sessionId}`);
  });

  it("report(retry)はnext案内を返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    const result = await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "failure output",
    });
    expect(result.nextAction).toBe("retry");
    expect(result.nextCommand).toBe(`tado next --session ${sessionId}`);
    expect(result.message).toContain("## 次の操作");
  });

  it("report(done)は完了文でnullを返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    await next(sessionId);
    await confirm(sessionId, mockConfirmDeps("approve"));
    await next(sessionId);
    const result = await report(sessionId, {
      stepKey: "step3_parallel",
      status: "completed",
      subagentOutput: "done all subtasks",
    });
    expect(result.nextAction).toBe("done");
    expect(result.nextCommand).toBeNull();
    expect(result.message).toContain("## 次の操作");
    expect(result.message).toContain("tadoセッションが完了しました");
  });

  it("report(abort)は中断文でnullを返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    for (let i = 0; i < 2; i++) {
      await next(sessionId);
      await report(sessionId, {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "failure output",
      });
    }
    await next(sessionId);
    const result = await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "failure output",
    });
    expect(result.nextAction).toBe("abort");
    expect(result.nextCommand).toBeNull();
    expect(result.message).toContain("tadoセッションを中断しました");
  });

  it("report(escalate)は対応待ち文でnullを返す", async () => {
    setupWorkflowFromContent(
      "escalate-guidance-test",
      `
        const def = {
          id: 'escalate-guidance-test',
          steps: [
            {
              key: 'failing_step',
              phase: 'test',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'escalate' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'test' },
              check: () => ({ status: 'fail', reasons: ['need human'] }),
            },
          ],
        };
        export default def;
      `,
    );
    const { sessionId } = await init("escalate-guidance-test", { title: "test-title" });
    await next(sessionId);
    const result = await report(sessionId, {
      stepKey: "failing_step",
      status: "completed",
      subagentOutput: "help",
    });
    expect(result.nextAction).toBe("escalate");
    expect(result.nextCommand).toBeNull();
    expect(result.message).toContain("人間の対応待ちです");
  });

  it("confirm(continue)はnext案内、abort/doneはnullを返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    await next(sessionId);
    const continued = await confirm(sessionId, mockConfirmDeps("approve"));
    expect(continued.nextAction).toBe("continue");
    expect(continued.nextCommand).toBe(`tado next --session ${sessionId}`);
    expect(continued.message).toContain("## 次の操作");
  });
});
