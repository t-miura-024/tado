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
import { mockConfirmDeps } from "./__fixtures__/confirm-helper.ts";

const TEST_TADO_HOME = path.join(__dirname, "__test_sessions_report__");
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

describe("レポート", () => {
  it("ステップを合格としてマークし次に進む", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);

    const result = await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    expect(result.checkResult.status).toBe("pass");
    expect(result.nextAction).toBe("continue");

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("passed");
    db.close();
  });

  it("maxRetries内で失敗時にリトライする", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);

    const result = await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "failure output",
    });

    expect(result.checkResult.status).toBe("fail");
    expect(result.nextAction).toBe("retry");

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status, retry_count FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("pending");
    expect(step.retry_count).toBe(1);
    db.close();
  });

  it("maxRetries超過後にonFail abortを発動する", async () => {
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

    const db = new Database(getWorkflowDbPath());
    const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
      string,
      unknown
    >;
    expect(session.status).toBe("aborted");
    db.close();
  });

  it("human_gateのapproveをconfirmで処理する", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });

    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    await next(sessionId);
    const result = await confirm(sessionId, mockConfirmDeps("approve"));

    expect((result.answers.decision as any)?.value ?? result.answers.decision).toBe("approve");
    expect(result.nextAction).toBe("continue");

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(step.status).toBe("passed");
    db.close();
  });

  it("human_gateのreviseをconfirmで処理する", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });

    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    await next(sessionId);
    const result = await confirm(sessionId, mockConfirmDeps("revise"));

    expect(result.nextAction).toBe("goto");
    expect(result.targetStep).toBe("step1_task");
  });

  it("human_gateのabortをconfirmで処理する", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });

    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    await next(sessionId);
    const result = await confirm(sessionId, mockConfirmDeps("abort"));

    expect(result.nextAction).toBe("abort");
  });

  it("human_gateへのreportを拒否する", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });

    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    await next(sessionId);
    await expect(
      report(sessionId, {
        stepKey: "step2_human_gate",
        status: "completed",
        subagentOutput: "approve",
      }),
    ).rejects.toThrow(EngineError);

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();
  });

  it("全ステップ完了時にセッションを完了する", async () => {
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

    const db = new Database(getWorkflowDbPath());
    const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
      string,
      unknown
    >;
    expect(session.status).toBe("done");
    db.close();
  });

  describe("onFail戦略付きリトライ", () => {
    it("maxRetries超過後にonFail gotoをサポートする", async () => {
      const goto_test_workflow_content = `
        const def = {
          id: 'goto-test',
          steps: [
            {
              key: 'failing_step',
              phase: 'test',
              type: 'task',
              maxRetries: 1,
              onFail: { action: 'goto', target: 'fallback_step' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'test',
              },
              check: (ctx) => ({ status: 'fail', reasons: ['always fail'] }),
            },
            {
              key: 'fallback_step',
              phase: 'fallback',
              type: 'task',
              maxRetries: 1,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'fallback',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("goto-test", goto_test_workflow_content);

      const { sessionId } = await init("goto-test", { title: "test-title" });

      await next(sessionId);
      const r1 = await report(sessionId, {
        stepKey: "failing_step",
        status: "completed",
        subagentOutput: "failed",
      });

      expect(r1.nextAction).toBe("retry");

      await next(sessionId);
      const r2 = await report(sessionId, {
        stepKey: "failing_step",
        status: "completed",
        subagentOutput: "failed again",
      });

      expect(r2.nextAction).toBe("goto");
      expect(r2.targetStep).toBe("fallback_step");
    });

    it("onFail escalateをサポートする", async () => {
      const escalate_test_workflow_content = `
        const def = {
          id: 'escalate-test',
          steps: [
            {
              key: 'failing_step',
              phase: 'test',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'escalate' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'test',
              },
              check: (ctx) => ({ status: 'fail', reasons: ['need human'] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("escalate-test", escalate_test_workflow_content);

      const { sessionId } = await init("escalate-test", { title: "test-title" });

      await next(sessionId);
      const r1 = await report(sessionId, {
        stepKey: "failing_step",
        status: "completed",
        subagentOutput: "help",
      });

      expect(r1.nextAction).toBe("escalate");

      const db = new Database(getWorkflowDbPath());
      const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
        string,
        unknown
      >;
      expect(session.status).toBe("paused");
      db.close();
    });
  });

  describe("アーティファクト", () => {
    it("レポート入力からアーティファクトを登録する", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });
      await next(sessionId);

      await report(sessionId, {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
        artifacts: [
          { key: "output.md", path: "/tmp/output.md" },
          { key: "log.txt", path: "/tmp/log.txt" },
        ],
      });

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ? ORDER BY id")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(2);
      expect(rows[0].artifact_key).toBe("output.md");
      expect(rows[0].file_path).toBe("/tmp/output.md");
      expect(rows[1].artifact_key).toBe("log.txt");
      expect(rows[1].file_path).toBe("/tmp/log.txt");
      db.close();
    });
  });

  describe("afterStepフック", () => {
    it("返却artifactsをDBに登録する", async () => {
      const after_step_test_workflow_content = `
        const def = {
          id: 'after-step-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              afterStep: async (ctx) => [
                { key: 'post.txt', path: '/tmp/post.txt' },
              ],
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("after-step-test", after_step_test_workflow_content);

      const { sessionId } = await init("after-step-test", { title: "test-title" });
      await next(sessionId);
      const r = await report(sessionId, {
        stepKey: "step1",
        status: "completed",
        subagentOutput: "done",
      });
      expect(r.checkResult.status).toBe("pass");

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("post.txt");
      expect(rows[0].file_path).toBe("/tmp/post.txt");
      expect(rows[0].step_key).toBe("step1");
      db.close();
    });

    it("StepCtxにstepKeyとattemptNumberを提供する", async () => {
      const after_step_ctx_test_workflow_content = `
        const def = {
          id: 'after-step-ctx-test',
          steps: [
            {
              key: 'render',
              phase: 'render',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              afterStep: async (ctx) => [
                { key: 'ctx-' + ctx.stepKey + '-' + ctx.attemptNumber, path: ctx.sessionDir },
              ],
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("after-step-ctx-test", after_step_ctx_test_workflow_content);

      const { sessionId } = await init("after-step-ctx-test", { title: "test-title" });
      await next(sessionId);
      await report(sessionId, { stepKey: "render", status: "completed", subagentOutput: "done" });

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("ctx-render-1");
      db.close();
    });

    it("返却artifactsをcheckのCheckCtx.artifactsにマージし同名キーを上書きする", async () => {
      const after_step_merge_test_workflow_content = `
        const def = {
          id: 'after-step-merge-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              afterStep: async (ctx) => [
                { key: 'out.md', path: '/tmp/new.md' },
              ],
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'prompt',
              },
              check: (ctx) => {
                const out = ctx.artifacts.find((a) => a.artifactKey === 'out.md');
                return out && out.filePath === '/tmp/new.md'
                  ? { status: 'pass', reasons: ['merged'] }
                  : { status: 'fail', reasons: ['out.md not overwritten: ' + JSON.stringify(ctx.artifacts)] };
              },
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("after-step-merge-test", after_step_merge_test_workflow_content);

      const { sessionId } = await init("after-step-merge-test", { title: "test-title" });
      await next(sessionId);

      // Report input registers out.md with the OLD path
      const r = await report(sessionId, {
        stepKey: "step1",
        status: "completed",
        subagentOutput: "done",
        artifacts: [{ key: "out.md", path: "/tmp/old.md" }],
      });

      // afterStep overwrote out.md → check sees the merged value and passes
      expect(r.checkResult.status).toBe("pass");

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("out.md");
      expect(rows[0].file_path).toBe("/tmp/new.md");
      db.close();
    });

    it("afterStepの例外をreport()から伝播させる", async () => {
      const after_step_failure_test_workflow_content = `
        const def = {
          id: 'after-step-failure-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              afterStep: async (ctx) => {
                throw new Error('intentional afterStep failure');
              },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("after-step-failure-test", after_step_failure_test_workflow_content);

      const { sessionId } = await init("after-step-failure-test", { title: "test-title" });
      await next(sessionId);

      // afterStep の失敗は check には至らず、例外が report() から伝播する。
      await expect(
        report(sessionId, { stepKey: "step1", status: "completed", subagentOutput: "done" }),
      ).rejects.toThrow("intentional afterStep failure");
    });
  });

  describe("subtaskResults付き並列レポート", () => {
    it("レポート時にサブタスク結果を保存する", async () => {
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

      const parResult = await next(sessionId);
      expect(parResult.stepType).toBe("parallel");

      await report(sessionId, {
        stepKey: "step3_parallel",
        status: "completed",
        subagentOutput: "done all subtasks",
        subtaskResults: [
          { subtaskKey: "sub_a", subagentOutput: "sub A finished", status: "completed" },
          { subtaskKey: "sub_b", subagentOutput: "sub B finished", status: "completed" },
        ],
      });

      const db = new Database(getWorkflowDbPath());
      const attempts = db
        .query(
          "SELECT subtask_results_json FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) ORDER BY attempt_number DESC LIMIT 1",
        )
        .get(sessionId, "step3_parallel") as Record<string, unknown>;
      expect(attempts).toBeTruthy();
      const subtaskResults = JSON.parse(attempts.subtask_results_json as string);
      expect(subtaskResults).toHaveLength(2);
      expect(subtaskResults[0].subtaskKey).toBe("sub_a");
      expect(subtaskResults[0].status).toBe("completed");
      expect(subtaskResults[1].subtaskKey).toBe("sub_b");
      db.close();
    });

    it("サブタスクの部分失敗を処理する", async () => {
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

      const r = await report(sessionId, {
        stepKey: "step3_parallel",
        status: "completed",
        subagentOutput: "partial",
        subtaskResults: [
          { subtaskKey: "sub_a", subagentOutput: "ok", status: "completed" },
          { subtaskKey: "sub_b", subagentOutput: "error", status: "failed", error: "timeout" },
        ],
      });

      expect(r.stepKey).toBe("step3_parallel");

      const db = new Database(getWorkflowDbPath());
      const attempts = db
        .query(
          "SELECT subtask_results_json FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) ORDER BY attempt_number DESC LIMIT 1",
        )
        .get(sessionId, "step3_parallel") as Record<string, unknown>;
      const subtaskResults = JSON.parse(attempts.subtask_results_json as string);
      expect(subtaskResults).toHaveLength(2);
      expect(subtaskResults[1].status).toBe("failed");
      expect(subtaskResults[1].error).toBe("timeout");
      db.close();
    });
  });

  describe("check例外処理", () => {
    it("check関数の例外をキャッチしステータスをerrorに設定する", async () => {
      const check_exception_test_workflow_content = `
        const def = {
          id: 'check-exception-test',
          steps: [
            {
              key: 'broken_step',
              phase: 'test',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'do it',
              },
              check: (ctx) => { throw new Error('intentional check failure'); },
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("check-exception-test", check_exception_test_workflow_content);

      const { sessionId } = await init("check-exception-test", { title: "test-title" });
      await next(sessionId);

      const r = await report(sessionId, {
        stepKey: "broken_step",
        status: "completed",
        subagentOutput: "done",
      });

      expect(r.checkResult.status).toBe("error");
      expect(r.checkResult.reasons).toContain("intentional check failure");
    });
  });

  describe("reviseによる後続ステップのリセット", () => {
    it("revise時に対象ステップと後続すべてをpendingにリセットする", async () => {
      const revise_reset_test_workflow_content = `
        const def = {
          id: 'revise-reset-test',
          steps: [
            {
              key: 'grill',
              phase: 'Grill',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'grill prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'prepare',
              phase: 'Prepare',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'prepare prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'refined_gate',
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
                      { value: 'abort', label: 'Abort' },
                    ],
                  },
                ],
                reviseTargetStep: 'grill',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'finalize',
              phase: 'Finalize',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'finalize prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("revise-reset-test", revise_reset_test_workflow_content);

      const { sessionId } = await init("revise-reset-test", { title: "test-title" });

      // Execute grill → prepare → gate
      await next(sessionId);
      await report(sessionId, { stepKey: "grill", status: "completed", subagentOutput: "done" });

      await next(sessionId);
      await report(sessionId, { stepKey: "prepare", status: "completed", subagentOutput: "done" });

      await next(sessionId);
      const gateResult = await confirm(sessionId, mockConfirmDeps("revise"));

      expect(gateResult.nextAction).toBe("goto");
      expect(gateResult.targetStep).toBe("grill");

      // Verify all steps from grill onwards are reset to pending
      const db = new Database(getWorkflowDbPath());
      const steps = db
        .query(
          "SELECT step_key, status, retry_count FROM steps WHERE session_id = ? ORDER BY step_index",
        )
        .all(sessionId) as Record<string, unknown>[];

      expect(steps[0].step_key).toBe("grill");
      expect(steps[0].status).toBe("pending");
      expect(steps[0].retry_count).toBe(0);

      expect(steps[1].step_key).toBe("prepare");
      expect(steps[1].status).toBe("pending");
      expect(steps[1].retry_count).toBe(0);

      expect(steps[2].step_key).toBe("refined_gate");
      expect(steps[2].status).toBe("pending");
      expect(steps[2].retry_count).toBe(0);

      expect(steps[3].step_key).toBe("finalize");
      expect(steps[3].status).toBe("pending");
      expect(steps[3].retry_count).toBe(0);
      db.close();

      // Verify we can re-execute from grill
      const r = await next(sessionId);
      expect(r.stepKey).toBe("grill");
    });

    it("revise後の完全な再実行を許可する", async () => {
      const revise_full_test_workflow_content = `
        const def = {
          id: 'revise-full-test',
          steps: [
            {
              key: 'work',
              phase: 'Work',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'work',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
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
                reviseTargetStep: 'work',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'done_step',
              phase: 'Done',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'done',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("revise-full-test", revise_full_test_workflow_content);

      const { sessionId } = await init("revise-full-test", { title: "test-title" });

      // First pass: work → gate (revise)
      await next(sessionId);
      await report(sessionId, { stepKey: "work", status: "completed", subagentOutput: "done" });
      await next(sessionId);
      await confirm(sessionId, mockConfirmDeps("revise"));

      // Second pass: work → gate (approve) → done_step
      await next(sessionId);
      await report(sessionId, {
        stepKey: "work",
        status: "completed",
        subagentOutput: "done again",
      });
      await next(sessionId);
      await confirm(sessionId, mockConfirmDeps("approve"));

      const r = await next(sessionId);
      expect(r.stepKey).toBe("done_step");

      await report(sessionId, {
        stepKey: "done_step",
        status: "completed",
        subagentOutput: "finished",
      });

      const s = status(sessionId);
      expect(s.sessionStatus).toBe("done");
    });
  });

  describe("requeueSource付きレビューループ", () => {
    it("must>0の失敗後にレビューステップをpendingで再キューし、修正後に再実行する", async () => {
      const requeue_test_workflow_content = `
        let fixPass = false;
        const def = {
          id: 'requeue-test',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'fix the issues',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'execute', requeueSource: true },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'review the work',
              },
              check: (ctx) => {
                if (!fixPass) {
                  fixPass = true;
                  return { status: 'fail', reasons: ['must: 3 issues found'] };
                }
                return { status: 'pass', reasons: ['must: 0'] };
              },
            },
            {
              key: 'followup',
              phase: 'Followup',
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
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("requeue-test", requeue_test_workflow_content);

      const { sessionId } = await init("requeue-test", { title: "test-title" });

      // execute → pass
      await next(sessionId);
      const r1 = await report(sessionId, {
        stepKey: "execute",
        status: "completed",
        subagentOutput: "work done",
      });
      expect(r1.nextAction).toBe("continue");

      // review → fail (must>0), goto execute with requeue
      await next(sessionId);
      const r2 = await report(sessionId, {
        stepKey: "review",
        status: "completed",
        subagentOutput: "review result with must",
      });
      expect(r2.nextAction).toBe("goto");
      expect(r2.targetStep).toBe("execute");
      expect(r2.message).toContain("review will re-run after fix");

      // verify review is pending (not failed)
      const s1 = status(sessionId);
      const reviewStep = s1.steps.find((s) => s.key === "review");
      expect(reviewStep?.status).toBe("pending");

      // execute → pass again
      await next(sessionId);
      const r3 = await report(sessionId, {
        stepKey: "execute",
        status: "completed",
        subagentOutput: "fixes applied",
      });
      expect(r3.nextAction).toBe("continue");

      // review → pass (must=0, fixPass=true)
      const lookAhead = await next(sessionId);
      expect(lookAhead.stepKey).toBe("review");

      const r4 = await report(sessionId, {
        stepKey: "review",
        status: "completed",
        subagentOutput: "must: 0",
      });
      expect(r4.nextAction).toBe("continue");
      expect(r4.message).toContain("followup");
    });
  });

  describe("ステータス", () => {
    it("セッション情報を返す", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });

      const result = status(sessionId);

      expect(result.sessionId).toBe(sessionId);
      expect(result.workflowId).toBe("test-simple");
      expect(result.sessionStatus).toBe("running");
      expect(result.steps).toHaveLength(3);
      expect(result.steps[0].key).toBe("step1_task");
      expect(result.steps[0].status).toBe("pending");
    });

    it("進行後のステップステータスを表示する", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });

      await next(sessionId);
      const s1 = status(sessionId);
      expect(s1.steps[0].status).toBe("running");

      await report(sessionId, {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      });

      const s2 = status(sessionId);
      expect(s2.steps[0].status).toBe("passed");
    });

    it("存在しないセッションでEngineErrorをスローする", () => {
      expect(() => status("nonexistent-session")).toThrow(EngineError);
    });
  });
});
