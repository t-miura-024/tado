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

    expect(result.nextAction).toBe("revise");
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

  describe("フックctxのゲート回答公開", () => {
    it("check / afterStepのctxからgateAnswersとsessionIdを参照できる", async () => {
      const report_hook_ctx_test_workflow_content = `
        import * as fs from 'node:fs';
        import * as path from 'node:path';
        const capture = (name, ctx) => {
          fs.writeFileSync(path.join(ctx.sessionDir, name), JSON.stringify({
            sessionId: ctx.sessionId,
            gateAnswers: ctx.gateAnswers,
          }));
        };
        const def = {
          id: 'report-hook-ctx-test',
          steps: [
            {
              key: 'gate',
              phase: 'gate',
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
            {
              key: 'hooked',
              phase: 'hooked',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              afterStep: async (ctx) => { capture('after-step.json', ctx); return []; },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'hooked',
              },
              check: (ctx) => { capture('check.json', ctx); return { status: 'pass', reasons: [] }; },
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("report-hook-ctx-test", report_hook_ctx_test_workflow_content);

      const { sessionId, sessionDir } = await init("report-hook-ctx-test", { title: "test-title" });
      await next(sessionId);
      await confirm(sessionId, mockConfirmDeps("approve"));
      const nextResult = await next(sessionId);
      expect(nextResult.stepKey).toBe("hooked");

      await report(sessionId, { stepKey: "hooked", status: "completed", subagentOutput: "done" });

      for (const name of ["check.json", "after-step.json"]) {
        const captured = JSON.parse(fs.readFileSync(path.join(sessionDir, name), "utf-8")) as {
          sessionId: string;
          gateAnswers: Record<string, unknown>;
        };
        expect(captured.sessionId).toBe(sessionId);
        expect(captured.gateAnswers).toEqual({ gate: { decision: { value: "approve" } } });
      }
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

  describe("係属ステップ一致", () => {
    it("係属外ステップのreportを拒否する", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });
      await next(sessionId);

      await expect(
        report(sessionId, {
          stepKey: "step3_parallel",
          status: "completed",
          subagentOutput: "done",
        }),
      ).rejects.toThrow(/Step mismatch: current step is 'step1_task'/);
    });

    it("係属ステップのreportは受理する", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });
      await next(sessionId);

      const result = await report(sessionId, {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      });

      expect(result.checkResult.status).toBe("pass");
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

      expect(gateResult.nextAction).toBe("revise");
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

  describe("ループ（type: loop）", () => {
    it("continueで本体先頭へ巻き戻り、次イテレーションのpassで脱出する", async () => {
      const loop_rewind_workflow_content = `
        let reviewRuns = 0;
        const def = {
          id: 'loop-rewind-test',
          steps: [
            {
              key: 'intake',
              phase: 'Intake',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'intake' },
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
                  key: 'execute',
                  phase: 'Execute',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'execute' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
                {
                  key: 'review',
                  phase: 'Review',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'review' },
                  check: () => {
                    reviewRuns++;
                    return reviewRuns === 1
                      ? { status: 'continue', reasons: ['must: 3 issues'] }
                      : { status: 'pass', reasons: ['must: 0'] };
                  },
                },
              ],
            },
            {
              key: 'followup',
              phase: 'Followup',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'followup' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-rewind-test", loop_rewind_workflow_content);

      const { sessionId } = await init("loop-rewind-test", { title: "test-title" });
      await next(sessionId);
      await report(sessionId, { stepKey: "intake", status: "completed", subagentOutput: "done" });

      // 1周目: execute → review が continue
      await next(sessionId);
      await report(sessionId, { stepKey: "execute", status: "completed", subagentOutput: "draft" });
      await next(sessionId);
      const repeatResult = await report(sessionId, {
        stepKey: "review",
        status: "completed",
        subagentOutput: "must: 3",
      });

      expect(repeatResult.checkResult.status).toBe("continue");
      expect(repeatResult.nextAction).toBe("repeat");
      expect(repeatResult.message).toContain("iteration 2/3");

      // 本体が pending + retryCount=0 に巻き戻り、currentStep は本体先頭になる
      const s1 = status(sessionId);
      expect(s1.currentStep).toBe("execute");
      const byKey1 = new Map(s1.steps.map((step) => [step.key, step]));
      expect(byKey1.get("execute")?.status).toBe("pending");
      expect(byKey1.get("execute")?.retryCount).toBe(0);
      expect(byKey1.get("review")?.status).toBe("pending");
      expect(byKey1.get("review")?.retryCount).toBe(0);
      // loop 行は実行されず pending のまま、反復回数だけ進む
      expect(byKey1.get("work_loop")?.status).toBe("pending");
      // ループ外のステップは変更しない
      expect(byKey1.get("intake")?.status).toBe("passed");
      expect(byKey1.get("followup")?.status).toBe("pending");

      const db = new Database(getWorkflowDbPath());
      const loopRow = db
        .query(
          "SELECT id, loop_iteration, max_iterations, parent_step_id FROM steps WHERE session_id = ? AND step_key = ?",
        )
        .get(sessionId, "work_loop") as Record<string, unknown>;
      expect(loopRow.loop_iteration).toBe(2);
      expect(loopRow.max_iterations).toBe(3);
      expect(loopRow.parent_step_id).toBeNull();

      const executeRow = db
        .query("SELECT parent_step_id FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "execute") as Record<string, unknown>;
      expect(executeRow.parent_step_id).toBe(loopRow.id);

      const reviewAttempt = db
        .query(
          "SELECT check_status FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) ORDER BY attempt_number DESC LIMIT 1",
        )
        .get(sessionId, "review") as Record<string, unknown>;
      expect(reviewAttempt.check_status).toBe("continue");
      db.close();

      // 2周目: execute → review が pass → loop は passed になり followup へ抜ける
      const rerun = await next(sessionId);
      expect(rerun.stepKey).toBe("execute");
      await report(sessionId, { stepKey: "execute", status: "completed", subagentOutput: "fix" });
      await next(sessionId);
      const passResult = await report(sessionId, {
        stepKey: "review",
        status: "completed",
        subagentOutput: "must: 0",
      });
      expect(passResult.checkResult.status).toBe("pass");
      expect(passResult.nextAction).toBe("continue");
      expect(passResult.message).toContain("followup");

      const s2 = status(sessionId);
      expect(s2.steps.find((step) => step.key === "work_loop")?.status).toBe("passed");
      expect(s2.steps.find((step) => step.key === "followup")?.status).toBe("pending");

      const last = await next(sessionId);
      expect(last.stepKey).toBe("followup");
      await report(sessionId, { stepKey: "followup", status: "completed", subagentOutput: "done" });
      const s3 = status(sessionId);
      expect(s3.sessionStatus).toBe("done");
    });

    it("ループ本体のfailはmaxRetries内でリトライされる", async () => {
      const loop_retry_workflow_content = `
        let failOnce = true;
        const def = {
          id: 'loop-retry-test',
          steps: [
            {
              key: 'work_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'body_task',
                  phase: 'Body',
                  type: 'task',
                  maxRetries: 1,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'body' },
                  check: () => {
                    if (failOnce) {
                      failOnce = false;
                      return { status: 'fail', reasons: ['once'] };
                    }
                    return { status: 'pass', reasons: [] };
                  },
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-retry-test", loop_retry_workflow_content);
      const { sessionId } = await init("loop-retry-test", { title: "test-title" });

      await next(sessionId);
      const retried = await report(sessionId, {
        stepKey: "body_task",
        status: "completed",
        subagentOutput: "first",
      });
      expect(retried.nextAction).toBe("retry");

      const rerun = await next(sessionId);
      expect(rerun.stepKey).toBe("body_task");
      expect(rerun.context.loop).toEqual({ key: "work_loop", iteration: 1, maxIterations: 2 });
      const passed = await report(sessionId, {
        stepKey: "body_task",
        status: "completed",
        subagentOutput: "second",
      });
      expect(passed.nextAction).toBe("done");

      const s = status(sessionId);
      expect(s.sessionStatus).toBe("done");
      expect(s.steps.find((step) => step.key === "work_loop")?.status).toBe("passed");
    });

    it("ループ外のcontinueはfail-fastする", async () => {
      const continue_outside_workflow_content = `
        const def = {
          id: 'continue-outside-test',
          steps: [
            {
              key: 'solo',
              phase: 'Solo',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'solo' },
              check: () => ({ status: 'continue', reasons: ['never valid here'] }),
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("continue-outside-test", continue_outside_workflow_content);

      const { sessionId } = await init("continue-outside-test", { title: "test-title" });
      await next(sessionId);

      await expect(
        report(sessionId, { stepKey: "solo", status: "completed", subagentOutput: "done" }),
      ).rejects.toThrow(/continue.*outside a loop/);

      // fail-fast: 失敗元は failed、セッションは aborted になる
      const s = status(sessionId);
      expect(s.sessionStatus).toBe("aborted");
      expect(s.steps.find((step) => step.key === "solo")?.status).toBe("failed");
    });

    it("maxIterations到達時にonExhausted=escalateを適用する", async () => {
      const loop_exhaust_escalate_workflow_content = `
        const def = {
          id: 'loop-exhaust-escalate-test',
          steps: [
            {
              key: 'retry_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'escalate',
              body: [
                {
                  key: 'attempt_task',
                  phase: 'Attempt',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'attempt' },
                  check: () => ({ status: 'continue', reasons: ['not yet'] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent(
        "loop-exhaust-escalate-test",
        loop_exhaust_escalate_workflow_content,
      );
      const { sessionId } = await init("loop-exhaust-escalate-test", { title: "test-title" });

      await next(sessionId);
      const first = await report(sessionId, {
        stepKey: "attempt_task",
        status: "completed",
        subagentOutput: "try 1",
      });
      expect(first.nextAction).toBe("repeat");

      await next(sessionId);
      const exhausted = await report(sessionId, {
        stepKey: "attempt_task",
        status: "completed",
        subagentOutput: "try 2",
      });
      expect(exhausted.nextAction).toBe("escalate");
      expect(exhausted.message).toContain("maxIterations 2");

      const db = new Database(getWorkflowDbPath());
      const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
        string,
        unknown
      >;
      expect(session.status).toBe("paused");
      db.close();
      const s = status(sessionId);
      expect(s.steps.find((step) => step.key === "attempt_task")?.status).toBe("failed");
    });

    it("maxIterations到達時にonExhausted=abortを適用する", async () => {
      const loop_exhaust_abort_workflow_content = `
        const def = {
          id: 'loop-exhaust-abort-test',
          steps: [
            {
              key: 'retry_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 1,
              onExhausted: 'abort',
              body: [
                {
                  key: 'attempt_task',
                  phase: 'Attempt',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'attempt' },
                  check: () => ({ status: 'continue', reasons: ['not yet'] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-exhaust-abort-test", loop_exhaust_abort_workflow_content);
      const { sessionId } = await init("loop-exhaust-abort-test", { title: "test-title" });

      await next(sessionId);
      const exhausted = await report(sessionId, {
        stepKey: "attempt_task",
        status: "completed",
        subagentOutput: "try 1",
      });
      expect(exhausted.nextAction).toBe("abort");

      const s = status(sessionId);
      expect(s.sessionStatus).toBe("aborted");
      expect(s.steps.find((step) => step.key === "attempt_task")?.status).toBe("failed");
    });

    it("loop行のmaxIterationsが欠落したスナップショットはEngineErrorで拒否する", async () => {
      const loop_snapshot_null_workflow_content = `
        const def = {
          id: 'loop-snapshot-null-test',
          steps: [
            {
              key: 'retry_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'attempt_task',
                  phase: 'Attempt',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'attempt' },
                  check: () => ({ status: 'continue', reasons: ['not yet'] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-snapshot-null-test", loop_snapshot_null_workflow_content);
      const { sessionId } = await init("loop-snapshot-null-test", { title: "test-title" });

      await next(sessionId);
      // スナップショット欠落（移行漏れ・手動 UPDATE）を再現する
      const raw = new Database(getWorkflowDbPath());
      raw.run("UPDATE steps SET max_iterations = NULL WHERE session_id = ? AND step_key = ?", [
        sessionId,
        "retry_loop",
      ]);
      raw.close();

      // 「上限 1」へ丸めて onExhausted を誤発火させず、EngineError で fail-fast する
      await expect(
        report(sessionId, {
          stepKey: "attempt_task",
          status: "completed",
          subagentOutput: "try 1",
        }),
      ).rejects.toThrow(
        /Invalid loop snapshot for step "retry_loop": maxIterations is "null"; expected a positive integer/,
      );
    });

    it("loop行のonExhaustedが未知値の場合はEngineErrorで拒否する", async () => {
      const loop_snapshot_unknown_workflow_content = `
        const def = {
          id: 'loop-snapshot-unknown-test',
          steps: [
            {
              key: 'retry_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 1,
              onExhausted: 'abort',
              body: [
                {
                  key: 'attempt_task',
                  phase: 'Attempt',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'attempt' },
                  check: () => ({ status: 'continue', reasons: ['not yet'] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent(
        "loop-snapshot-unknown-test",
        loop_snapshot_unknown_workflow_content,
      );
      const { sessionId } = await init("loop-snapshot-unknown-test", { title: "test-title" });

      await next(sessionId);
      // max_iterations はそのままに on_exhausted だけ未知値へ壊す
      const raw = new Database(getWorkflowDbPath());
      raw.run("UPDATE steps SET on_exhausted = 'retry' WHERE session_id = ? AND step_key = ?", [
        sessionId,
        "retry_loop",
      ]);
      raw.close();

      // escalate が無言で abort に丸められない（step は failed に確定する）
      await expect(
        report(sessionId, {
          stepKey: "attempt_task",
          status: "completed",
          subagentOutput: "try 1",
        }),
      ).rejects.toThrow(
        /Invalid loop snapshot for step "retry_loop": onExhausted is "retry"; expected one of escalate \| abort/,
      );

      const s = status(sessionId);
      expect(s.steps.find((step) => step.key === "attempt_task")?.status).toBe("failed");
    });

    it("ネストloopのcontinueは最内ループに帰属し、外側の巻き戻しで内側の反復状態が初期化される", async () => {
      const nested_loop_workflow_content = `
        let innerRuns = 0;
        let outerTailRuns = 0;
        const def = {
          id: 'nested-loop-test',
          steps: [
            {
              key: 'outer_loop',
              phase: 'Outer',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'inner_loop',
                  phase: 'Inner',
                  type: 'loop',
                  maxIterations: 3,
                  onExhausted: 'abort',
                  body: [
                    {
                      key: 'inner_task',
                      phase: 'InnerTask',
                      type: 'task',
                      maxRetries: 0,
                      onFail: { action: 'abort' },
                      task: { action: 'run_subagent', subagentType: 'test', buildPrompt: (ctx) => 'inner loop=' + JSON.stringify(ctx.loop) },
                      check: () => {
                        innerRuns++;
                        return innerRuns === 1
                          ? { status: 'continue', reasons: ['inner again'] }
                          : { status: 'pass', reasons: [] };
                      },
                    },
                  ],
                },
                {
                  key: 'outer_tail',
                  phase: 'OuterTail',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: (ctx) => 'outer loop=' + JSON.stringify(ctx.loop) },
                  check: () => {
                    outerTailRuns++;
                    return outerTailRuns === 1
                      ? { status: 'continue', reasons: ['outer again'] }
                      : { status: 'pass', reasons: [] };
                  },
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("nested-loop-test", nested_loop_workflow_content);
      const { sessionId } = await init("nested-loop-test", { title: "test-title" });

      // 1周目 inner_task: 最内ループの iteration 1 が ctx.loop から見える
      const first = await next(sessionId);
      expect(first.stepKey).toBe("inner_task");
      expect(first.context.loop).toEqual({ key: "inner_loop", iteration: 1, maxIterations: 3 });
      expect(first.prompt).toContain('loop={"key":"inner_loop","iteration":1,"maxIterations":3}');

      // inner の continue は最内ループ（inner_loop）に帰属する
      const innerRepeat = await report(sessionId, {
        stepKey: "inner_task",
        status: "completed",
        subagentOutput: "inner 1",
      });
      expect(innerRepeat.nextAction).toBe("repeat");
      expect(innerRepeat.message).toContain('"inner_loop" iteration 2/3');

      let db = new Database(getWorkflowDbPath());
      let loopRows = db
        .query(
          "SELECT step_key, loop_iteration FROM steps WHERE session_id = ? AND type = 'loop' ORDER BY step_index",
        )
        .all(sessionId) as Record<string, unknown>[];
      db.close();
      expect(loopRows).toEqual([
        { step_key: "outer_loop", loop_iteration: 1 },
        { step_key: "inner_loop", loop_iteration: 2 },
      ]);

      // 2周目 inner_task: pass して outer_tail へ
      const second = await next(sessionId);
      expect(second.stepKey).toBe("inner_task");
      expect(second.context.loop).toEqual({ key: "inner_loop", iteration: 2, maxIterations: 3 });
      await report(sessionId, {
        stepKey: "inner_task",
        status: "completed",
        subagentOutput: "inner 2",
      });

      const tail = await next(sessionId);
      expect(tail.stepKey).toBe("outer_tail");
      expect(tail.context.loop).toEqual({ key: "outer_loop", iteration: 1, maxIterations: 2 });

      // outer の continue は inner_loop の反復状態も初期化する
      const outerRepeat = await report(sessionId, {
        stepKey: "outer_tail",
        status: "completed",
        subagentOutput: "outer 1",
      });
      expect(outerRepeat.nextAction).toBe("repeat");
      expect(outerRepeat.message).toContain('"outer_loop" iteration 2/2');

      db = new Database(getWorkflowDbPath());
      loopRows = db
        .query(
          "SELECT step_key, loop_iteration FROM steps WHERE session_id = ? AND type = 'loop' ORDER BY step_index",
        )
        .all(sessionId) as Record<string, unknown>[];
      db.close();
      expect(loopRows).toEqual([
        { step_key: "outer_loop", loop_iteration: 2 },
        { step_key: "inner_loop", loop_iteration: 1 },
      ]);

      // 3周目: inner_task(iteration 1) → pass → outer_tail → pass で完了
      const third = await next(sessionId);
      expect(third.stepKey).toBe("inner_task");
      expect(third.context.loop).toEqual({ key: "inner_loop", iteration: 1, maxIterations: 3 });
      await report(sessionId, {
        stepKey: "inner_task",
        status: "completed",
        subagentOutput: "inner 3",
      });

      await next(sessionId);
      const tailPass = await report(sessionId, {
        stepKey: "outer_tail",
        status: "completed",
        subagentOutput: "outer 2",
      });
      expect(tailPass.nextAction).toBe("done");

      const s = status(sessionId);
      expect(s.sessionStatus).toBe("done");
      expect(s.steps.find((step) => step.key === "outer_loop")?.status).toBe("passed");
      expect(s.steps.find((step) => step.key === "inner_loop")?.status).toBe("passed");
    });

    it("本体が全てconditionでスキップされたloopはskippedになる", async () => {
      const loop_skip_workflow_content = `
        const def = {
          id: 'loop-skip-test',
          steps: [
            {
              key: 'maybe_loop',
              phase: 'Maybe',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'skippable',
                  phase: 'Skippable',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  condition: () => false,
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'skippable' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-skip-test", loop_skip_workflow_content);
      const { sessionId } = await init("loop-skip-test", { title: "test-title" });

      await expect(next(sessionId)).rejects.toThrow("All steps completed");

      const s = status(sessionId);
      expect(s.sessionStatus).toBe("done");
      expect(s.steps.find((step) => step.key === "maybe_loop")?.status).toBe("skipped");
      expect(s.steps.find((step) => step.key === "skippable")?.status).toBe("skipped");
    });

    it("repeatの巻き戻しはcurrentStep更新と同一トランザクションで確定する", async () => {
      const loop_atomic_workflow_content = `
        const def = {
          id: 'loop-atomic-test',
          steps: [
            {
              key: 'review_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 3,
              onExhausted: 'abort',
              body: [
                {
                  key: 'execute',
                  phase: 'Execute',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'execute' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
                {
                  key: 'review',
                  phase: 'Review',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'review' },
                  check: () => ({ status: 'continue', reasons: ['again'] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-atomic-test", loop_atomic_workflow_content);
      const { sessionId } = await init("loop-atomic-test", { title: "test-title" });

      await next(sessionId);
      await report(sessionId, { stepKey: "execute", status: "completed", subagentOutput: "done" });
      await next(sessionId);

      // currentStep の更新を失敗させ、トランザクション途中での失敗を再現する
      const db = new Database(getWorkflowDbPath());
      db.run(`
        CREATE TRIGGER fail_loop_commit
        BEFORE UPDATE OF current_step ON sessions
        WHEN NEW.current_step = 'execute'
        BEGIN
          SELECT RAISE(ABORT, 'simulated loop failure');
        END;
      `);
      db.close();

      await expect(
        report(sessionId, {
          stepKey: "review",
          status: "completed",
          subagentOutput: "review result",
        }),
      ).rejects.toThrow(/simulated loop failure/);

      // 巻き戻し（rewindSteps）も loop_iteration の更新もロールバックされ、
      // 「本体は pending だが反復回数だけ進む」半端な状態が残らない
      const verifyDb = new Database(getWorkflowDbPath());
      const sessionRow = verifyDb
        .query("SELECT current_step FROM sessions WHERE id = ?")
        .get(sessionId) as Record<string, unknown>;
      expect(sessionRow.current_step).toBe("review");
      const executeStep = verifyDb
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "execute") as Record<string, unknown>;
      expect(executeStep.status).toBe("passed");
      const reviewStep = verifyDb
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "review") as Record<string, unknown>;
      expect(reviewStep.status).toBe("running");
      const loopRow = verifyDb
        .query("SELECT loop_iteration FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "review_loop") as Record<string, unknown>;
      expect(loopRow.loop_iteration).toBe(1);
      verifyDb.close();
    });

    it("定義変更でonFail.actionが食い違う場合はEngineErrorになり失敗元はfailedになる", async () => {
      const drift_action_workflow_content = `
        const def = {
          id: 'drift-action-test',
          steps: [
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'review' },
              check: () => ({ status: 'fail', reasons: ['always fail'] }),
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("drift-action-test", drift_action_workflow_content);

      const { sessionId } = await init("drift-action-test", { title: "test-title" });
      await next(sessionId);

      // セッション作成後に定義の onFail.action とセッション行が食い違った状態を再現する
      const db = new Database(getWorkflowDbPath());
      db.run("UPDATE steps SET on_fail_action = 'escalate' WHERE session_id = ? AND step_key = ?", [
        sessionId,
        "review",
      ]);
      db.close();

      await expect(
        report(sessionId, {
          stepKey: "review",
          status: "completed",
          subagentOutput: "review result",
        }),
      ).rejects.toThrow(
        /onFail drift detected for step "review".*action "abort".*action "escalate"/,
      );

      const s = status(sessionId);
      expect(s.steps.find((step) => step.key === "review")?.status).toBe("failed");
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
