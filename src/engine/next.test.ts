import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import type { NextResult } from "../types/result.ts";
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

const TEST_TADO_HOME = path.join(__dirname, "__test_sessions_next__");
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

describe("next", () => {
  it("最初のステップのタスクプロンプトを返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    const result = await next(sessionId);

    expect(result.stepKey).toBe("step1_task");
    expect(result.stepType).toBe("task");
    expect(result.action).toBe("run_subagent");
    expect(result.subagentType).toBe("test-agent");
    expect(result.prompt).toContain("Execute step1_task");
    expect(result.prompt).toContain("## セッション情報");
    expect(result.prompt).toContain("- セッションディレクトリ: ");
    expect(result.prompt).toContain("- 試行: 1/2");
    expect(result.context.attemptNumber).toBe(1);
    expect(result.context.retryCount).toBe(0);
    expect(result.context.maxRetries).toBe(2);

    const db = new Database(getWorkflowDbPath());
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();
  });

  it("同一セッションへの同時実行で試行を二重に割り当てない", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    const results = await Promise.allSettled([next(sessionId), next(sessionId)]);

    // A concurrent second call idempotently reissues the same prompt instead of
    // allocating a second attempt. The invariant to protect is that the attempt
    // is never duplicated (the step_attempts row count must stay at 1).
    const fulfilled = results.filter((result) => result.status === "fulfilled");
    expect(fulfilled.length).toBeGreaterThan(0);
    for (const result of fulfilled) {
      const nextResult = (result as PromiseFulfilledResult<NextResult>).value;
      expect(nextResult.stepKey).toBe("step1_task");
      expect(nextResult.context.attemptNumber).toBe(1);
    }

    const db = new Database(getWorkflowDbPath());
    const attempts = db
      .query(
        "SELECT COUNT(*) AS count FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?)",
      )
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(attempts.count).toBe(1);
    db.close();
  });

  it("runningステップを新規アテンプトなしで冪等に再開する", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    const first = await next(sessionId);
    expect(first.stepKey).toBe("step1_task");
    expect(first.context.attemptNumber).toBe(1);

    // Simulate an interrupted session: `next` committed but `report` never arrived.
    // Re-running `next` must reissue the same prompt without a new attempt.
    const resumed = await next(sessionId);
    expect(resumed.stepKey).toBe("step1_task");
    expect(resumed.context.attemptNumber).toBe(1);
    expect(resumed.prompt).toBe(first.prompt);

    const db = new Database(getWorkflowDbPath());
    const attempts = db
      .query(
        "SELECT COUNT(*) AS count FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?)",
      )
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(attempts.count).toBe(1);
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();

    // The reissued prompt is still reported against the running attempt.
    const r = await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });
    expect(r.nextAction).toBe("continue");
  });

  it("リトライ後のrunningステップも冪等に再開する", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "failure output",
    });

    // Retry allocates attempt 2.
    const first = await next(sessionId);
    expect(first.context.attemptNumber).toBe(2);
    expect(first.context.retryCount).toBe(1);
    expect(first.prompt).toContain("- 試行: 2/2");
    expect(first.prompt).toContain("## 前回の試行フィードバック");
    expect(first.prompt).toContain("Output does not contain success");

    // Resuming attempt 2 reissues the same prompt without allocating attempt 3.
    const resumed = await next(sessionId);
    expect(resumed.context.attemptNumber).toBe(2);
    expect(resumed.context.retryCount).toBe(1);
    expect(resumed.prompt).toBe(first.prompt);

    const db = new Database(getWorkflowDbPath());
    const attempts = db
      .query(
        "SELECT COUNT(*) AS count FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?)",
      )
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(attempts.count).toBe(2);
    db.close();
  });

  it("human_gate承認後は前ステップへ戻らず次へ進む", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });

    // step1_task を成功させる（checkStatus='pass' の試行が残る）
    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    // step2_human_gate で承認 → 後続ステップへ進む（巻き戻しは行わない）
    await next(sessionId);
    await confirm(sessionId, mockConfirmDeps("approve"));

    // 次は後続の step3_parallel で、前ステップは passed のまま
    const result = await next(sessionId);
    expect(result.stepKey).toBe("step3_parallel");
    expect(result.context.attemptNumber).toBe(1);
  });

  it("human_gateのプロンプトを返す", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });

    await next(sessionId);

    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    const result = await next(sessionId);

    expect(result.stepKey).toBe("step2_human_gate");
    expect(result.stepType).toBe("human_gate");
    expect(result.action).toBe("human_gate");
    expect(result.constraints.reportAfterCompletion).toBe(false);
    expect(result.prompt).toContain("approve");
    expect(result.prompt).toContain("abort");
    expect(result.prompt).toContain(`tado confirm --session ${sessionId}`);
    expect(result.prompt).toContain("設問一覧");
    expect(result.prompt).toContain("decision");
    expect(result.prompt).toContain("判定");
    expect(result.prompt).toContain("choice_with_input");
    expect(result.prompt).toContain("判定設問");
    expect(result.prompt).not.toContain("回答は選択肢の value を入力してください");
  });

  it("並列サブタスクのプロンプトを返す", async () => {
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

    expect(result.stepKey).toBe("step3_parallel");
    expect(result.stepType).toBe("parallel");
    expect(result.parallel).not.toBeNull();
    expect(result.parallel!.subtasks).toHaveLength(2);
    expect(result.parallel!.subtasks[0].key).toBe("sub_a");
    expect(result.parallel!.subtasks[0].prompt).toContain("Subtask A");
    expect(result.parallel!.subtasks[0].prompt).toContain("## セッション情報");
    expect(result.parallel!.subtasks[1].key).toBe("sub_b");
    expect(result.parallel!.subtasks[1].prompt).toContain("Subtask B");
    expect(result.parallel!.subtasks[1].prompt).toContain("## セッション情報");
  });

  it("存在しないセッションでEngineErrorをスローする", async () => {
    await expect(next("nonexistent-session")).rejects.toThrow(EngineError);
  });

  it("旧レイアウトのセッションDBを自動読み込みしない", async () => {
    const oldSessionDir = path.join(
      TEST_TADO_HOME,
      "old-repository",
      "tmp",
      "tado",
      "legacy-session",
    );
    fs.mkdirSync(oldSessionDir, { recursive: true });
    const oldDb = new Database(path.join(oldSessionDir, "workflow.db"));
    oldDb.exec("CREATE TABLE sessions (id TEXT PRIMARY KEY)");
    oldDb.run("INSERT INTO sessions (id) VALUES (?)", ["legacy-session"]);
    oldDb.close();

    await expect(next("legacy-session")).rejects.toThrow("Session not found: legacy-session");
    expect(fs.existsSync(getWorkflowDbPath())).toBe(false);
  });

  it("完了済みセッションでEngineErrorをスローする", async () => {
    setupSimpleWorkflow();
    const { sessionId } = await init("test-simple", { title: "test-title" });
    const db = new Database(getWorkflowDbPath());
    db.run("UPDATE sessions SET status = ? WHERE id = ?", ["done", sessionId]);
    db.close();
    await expect(next(sessionId)).rejects.toThrow(EngineError);
  });

  describe("DBにworkflow_pathがないワークフロー", () => {
    it("nextとreportで--workflowフラグを受け付ける", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });

      const result = await next(sessionId, FIXTURE_WORKFLOW);
      expect(result.stepKey).toBe("step1_task");

      const r = await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "success task done",
        },
        FIXTURE_WORKFLOW,
      );

      expect(r.nextAction).toBe("continue");
    });
  });

  describe("条件付きステップスキップ", () => {
    it("conditionがfalseを返すときにステップをスキップする", async () => {
      const condition_skip_test_workflow_content = `
        const def = {
          id: 'condition-skip-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step1 prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step2_conditional',
              phase: 'conditional',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => false,
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step2 prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step3',
              phase: 'third',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step3 prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("condition-skip-test", condition_skip_test_workflow_content);

      const { sessionId } = await init("condition-skip-test", { title: "test-title" });

      // step1 executes normally
      const r1 = await next(sessionId);
      expect(r1.stepKey).toBe("step1");
      await report(sessionId, { stepKey: "step1", status: "completed", subagentOutput: "done" });

      // next should skip step2 (condition=false) and return step3
      const r2 = await next(sessionId);
      expect(r2.stepKey).toBe("step3");

      // verify step2 is marked as skipped in DB
      const db = new Database(getWorkflowDbPath());
      const step2 = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step2_conditional") as Record<string, unknown>;
      expect(step2.status).toBe("skipped");
      db.close();
    });

    it("conditionがtrueを返すときにステップを実行する", async () => {
      const condition_pass_test_workflow_content = `
        const def = {
          id: 'condition-pass-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => true,
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step1 prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("condition-pass-test", condition_pass_test_workflow_content);

      const { sessionId } = await init("condition-pass-test", { title: "test-title" });
      const r1 = await next(sessionId);
      expect(r1.stepKey).toBe("step1");
      expect(r1.prompt).toContain("step1 prompt");
    });

    it("conditionがundefinedのときにステップを実行する（後方互換）", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });
      const r1 = await next(sessionId);
      expect(r1.stepKey).toBe("step1_task");
    });

    it("false条件の連続ステップを複数スキップする", async () => {
      const multi_skip_test_workflow_content = `
        const def = {
          id: 'multi-skip-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step1',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step2_skip',
              phase: 'skip1',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => false,
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step2',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step3_skip',
              phase: 'skip2',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => false,
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step3',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step4',
              phase: 'last',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step4',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("multi-skip-test", multi_skip_test_workflow_content);

      const { sessionId } = await init("multi-skip-test", { title: "test-title" });

      await next(sessionId);
      await report(sessionId, { stepKey: "step1", status: "completed", subagentOutput: "done" });

      // Should skip step2 and step3, land on step4
      const r = await next(sessionId);
      expect(r.stepKey).toBe("step4");

      const db = new Database(getWorkflowDbPath());
      const s2 = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step2_skip") as Record<string, unknown>;
      const s3 = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step3_skip") as Record<string, unknown>;
      expect(s2.status).toBe("skipped");
      expect(s3.status).toBe("skipped");
      db.close();
    });

    it("残りステップすべてがスキップされたときにセッションを完了にする", async () => {
      const all_skip_test_workflow_content = `
        const def = {
          id: 'all-skip-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step1',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step2_skip',
              phase: 'skip',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => false,
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step2',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("all-skip-test", all_skip_test_workflow_content);

      const { sessionId } = await init("all-skip-test", { title: "test-title" });

      await next(sessionId);
      await report(sessionId, { stepKey: "step1", status: "completed", subagentOutput: "done" });

      // All remaining steps skipped → session done
      await expect(next(sessionId)).rejects.toThrow("All steps completed");

      const db = new Database(getWorkflowDbPath());
      const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
        string,
        unknown
      >;
      expect(session.status).toBe("done");
      db.close();
    });

    it("conditionコンテキストにgateAnswersを提供する", async () => {
      const gate_choices_test_workflow_content = `
        let capturedCtx = null;
        const def = {
          id: 'gate-choices-test',
          steps: [
            {
              key: 'gate_step',
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
              key: 'conditional_step',
              phase: 'conditional',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => {
                capturedCtx = ctx;
                return ((ans => typeof ans === 'string' ? ans : (ans as any)?.value)(ctx.gateAnswers['gate_step']?.['decision']) === 'approve');
              },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'conditional',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'final_step',
              phase: 'final',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'final',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        export function getCapturedCtx() { return capturedCtx; }
            `;
      setupWorkflowFromContent("gate-choices-test", gate_choices_test_workflow_content);

      const { sessionId } = await init("gate-choices-test", { title: "test-title" });

      // Pass the gate with 'approve'
      await next(sessionId);
      await confirm(sessionId, mockConfirmDeps("approve"));

      // conditional_step should execute because gateAnswers['gate_step'] === 'approve'
      const r = await next(sessionId);
      expect(r.stepKey).toBe("conditional_step");
    });

    it("gateAnswers条件が満たされたときにステップを実行する", async () => {
      const gate_execute_test_workflow_content = `
        const def = {
          id: 'gate-execute-test',
          steps: [
            {
              key: 'gate_step',
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
              key: 'conditional_step',
              phase: 'conditional',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => ((ans => typeof ans === 'string' ? ans : (ans as any)?.value)(ctx.gateAnswers['gate_step']?.['decision']) === 'approve'),
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'conditional',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'final_step',
              phase: 'final',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'final',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("gate-execute-test", gate_execute_test_workflow_content);

      const { sessionId } = await init("gate-execute-test", { title: "test-title" });

      // Gate approves → condition gateAnswers['gate_step'] === 'approve' is true → step executes
      await next(sessionId);
      await confirm(sessionId, mockConfirmDeps("approve"));

      const r = await next(sessionId);
      expect(r.stepKey).toBe("conditional_step");
    });

    it("conditionコンテキストにartifactsを提供する", async () => {
      const condition_artifacts_test_workflow_content = `
        const def = {
          id: 'condition-artifacts-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step1',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step2_conditional',
              phase: 'conditional',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              condition: (ctx) => ctx.artifacts.some(a => a.artifactKey === 'needed.txt'),
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step2',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step3',
              phase: 'last',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step3',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent(
        "condition-artifacts-test",
        condition_artifacts_test_workflow_content,
      );

      const { sessionId } = await init("condition-artifacts-test", { title: "test-title" });

      // step1 completes WITHOUT producing the needed artifact
      await next(sessionId);
      await report(sessionId, { stepKey: "step1", status: "completed", subagentOutput: "done" });

      // step2 should be skipped because artifact 'needed.txt' doesn't exist
      const r = await next(sessionId);
      expect(r.stepKey).toBe("step3");

      const db = new Database(getWorkflowDbPath());
      const s2 = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step2_conditional") as Record<string, unknown>;
      expect(s2.status).toBe("skipped");
      db.close();
    });
  });

  describe("ループステップ", () => {
    it("loop行を飛ばして本体先頭から実行し、next返却値にループ文脈を含める", async () => {
      const loop_next_test_workflow_content = `
        const def = {
          id: 'loop-next-test',
          steps: [
            {
              key: 'before_task',
              phase: 'Before',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'before' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'work_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 4,
              onExhausted: 'escalate',
              body: [
                {
                  key: 'loop_task',
                  phase: 'LoopTask',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: (ctx) => 'iteration=' + (ctx.loop ? ctx.loop.iteration : 'none') + '/' + (ctx.loop ? ctx.loop.maxIterations : 'none') },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
            {
              key: 'after_task',
              phase: 'After',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'after' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-next-test", loop_next_test_workflow_content);
      const { sessionId } = await init("loop-next-test", { title: "test-title" });

      await next(sessionId);
      await report(sessionId, {
        stepKey: "before_task",
        status: "completed",
        subagentOutput: "done",
      });

      // loop 行ではなく本体先頭のステップが返る
      const result = await next(sessionId);
      expect(result.stepKey).toBe("loop_task");
      expect(result.stepType).toBe("task");
      expect(result.context.loop).toEqual({ key: "work_loop", iteration: 1, maxIterations: 4 });
      expect(result.prompt).toContain("iteration=1/4");

      const db = new Database(getWorkflowDbPath());
      const loopRow = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "work_loop") as Record<string, unknown>;
      expect(loopRow.status).toBe("pending");
      db.close();

      await report(sessionId, {
        stepKey: "loop_task",
        status: "completed",
        subagentOutput: "done",
      });
      const nextResult = await next(sessionId);
      expect(nextResult.stepKey).toBe("after_task");
      expect(nextResult.context.loop).toBeNull();
    });

    it("conditionがfalseの本体ステップをスキップしてloopを完了させる", async () => {
      const loop_condition_test_workflow_content = `
        const def = {
          id: 'loop-condition-test',
          steps: [
            {
              key: 'work_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'skip_me',
                  phase: 'Skip',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  condition: () => false,
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'skip' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
                {
                  key: 'run_me',
                  phase: 'Run',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  condition: () => true,
                  task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'run' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
            {
              key: 'after_task',
              phase: 'After',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', subagentType: 'test', buildPrompt: () => 'after' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("loop-condition-test", loop_condition_test_workflow_content);
      const { sessionId } = await init("loop-condition-test", { title: "test-title" });

      // skip_me は condition=false でスキップされ、run_me が返る
      const first = await next(sessionId);
      expect(first.stepKey).toBe("run_me");

      const db = new Database(getWorkflowDbPath());
      const skipped = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "skip_me") as Record<string, unknown>;
      expect(skipped.status).toBe("skipped");
      db.close();

      await report(sessionId, { stepKey: "run_me", status: "completed", subagentOutput: "done" });

      // 本体が完了した loop は passed になり、後続ステップへ進む
      const after = await next(sessionId);
      expect(after.stepKey).toBe("after_task");

      const s = status(sessionId);
      expect(s.steps.find((step) => step.key === "work_loop")?.status).toBe("passed");
    });

    it("parent_step_idが循環した破損セッションでEngineErrorを返しトランザクションを残さない", async () => {
      const cycle_next_workflow_content = `
        const def = {
          id: 'cycle-next-test',
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
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
          ],
        };
        export default def;
      `;
      setupWorkflowFromContent("cycle-next-test", cycle_next_workflow_content);
      const { sessionId } = await init("cycle-next-test", { title: "test-title" });

      // loop 行の親を自分の本体に向けて循環させる（破損 DB の再現）。
      // ガードが無いと BEGIN IMMEDIATE 内で無限ループしロックを保持し続ける。
      const raw = new Database(getWorkflowDbPath());
      raw.run(
        "UPDATE steps SET parent_step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) WHERE session_id = ? AND step_key = ?",
        [sessionId, "loop_task", sessionId, "work_loop"],
      );
      raw.close();

      await expect(next(sessionId)).rejects.toThrow(
        /Cycle detected in steps\.parent_step_id chain/,
      );

      // トランザクションはロールバックされ、セッションは running のまま
      const s = status(sessionId);
      expect(s.sessionStatus).toBe("running");
    });
  });

  describe("ヒューマンゲートのアーティファクト提示", () => {
    it("アーティファクト登録時にパスとconfirmコマンドを含める", async () => {
      const gate_present_test_workflow_content = `
        const def = {
          id: 'gate-present-test',
          steps: [
            {
              key: 'prepare',
              phase: 'Prepare',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'prepare artifacts',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'decompose_gate',
              phase: 'Decompose',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              humanGate: {
                presentArtifacts: ['issue-body.md'],
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'choice_with_input',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'request_changes', label: 'Revise', input: { required: true, placeholder: '理由', maxLength: 500 } },
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
      setupWorkflowFromContent("gate-present-test", gate_present_test_workflow_content);

      const { sessionId } = await init("gate-present-test", { title: "test-title" });

      // prepare step registers the issue-body.md artifact
      await next(sessionId);
      await report(sessionId, {
        stepKey: "prepare",
        status: "completed",
        subagentOutput: "done",
        artifacts: [{ key: "issue-body.md", path: "/tmp/plan/issue-body.md" }],
      });

      // human gate prompt should present the artifact path AND the confirm command
      const result = await next(sessionId);
      expect(result.stepKey).toBe("decompose_gate");
      expect(result.stepType).toBe("human_gate");
      expect(result.prompt).toContain("- issue-body.md: /tmp/plan/issue-body.md");
      expect(result.prompt).toContain(`tado confirm --session ${sessionId}`);
    });

    it("アーティファクト未登録時に成果物なしを表示する", async () => {
      setupSimpleWorkflow();
      const { sessionId } = await init("test-simple", { title: "test-title" });

      await next(sessionId);
      await report(sessionId, {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      });

      // step2_human_gate has presentArtifacts: [] → no artifacts presented
      const result = await next(sessionId);
      expect(result.stepKey).toBe("step2_human_gate");
      expect(result.stepType).toBe("human_gate");
      expect(result.prompt).toContain("(成果物なし)");
      expect(result.prompt).toContain(`tado confirm --session ${sessionId}`);
    });
  });

  describe("beforeStepフック", () => {
    it("返却artifactsがPromptCtx.artifactsに反映されDBに登録される", async () => {
      const before_step_test_workflow_content = `
        const def = {
          id: 'before-step-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 2,
              onFail: { action: 'abort' },
              beforeStep: async (ctx) => [
                { key: 'prep.md', path: '/tmp/prep.md' },
              ],
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'artifacts: ' + JSON.stringify(ctx.artifacts.map((a) => a.artifactKey + '=' + a.filePath)),
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("before-step-test", before_step_test_workflow_content);

      const { sessionId } = await init("before-step-test", { title: "test-title" });
      const result = await next(sessionId);

      expect(result.prompt).toContain("prep.md=/tmp/prep.md");

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("prep.md");
      expect(rows[0].file_path).toBe("/tmp/prep.md");
      expect(rows[0].step_key).toBe("step1");
      db.close();
    });

    it("既存の同名キーをbeforeStepの返却値で上書きする", async () => {
      const before_step_overwrite_test_workflow_content = `
        const def = {
          id: 'before-step-overwrite-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'step1',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'step2',
              phase: 'second',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              beforeStep: async (ctx) => [
                { key: 'shared.md', path: '/tmp/new.md' },
              ],
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'artifacts: ' + JSON.stringify(ctx.artifacts.map((a) => a.artifactKey + '=' + a.filePath)),
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent(
        "before-step-overwrite-test",
        before_step_overwrite_test_workflow_content,
      );

      const { sessionId } = await init("before-step-overwrite-test", { title: "test-title" });

      // step1 registers shared.md with the OLD path
      await next(sessionId);
      await report(sessionId, {
        stepKey: "step1",
        status: "completed",
        subagentOutput: "done",
        artifacts: [{ key: "shared.md", path: "/tmp/old.md" }],
      });

      // beforeStep of step2 overwrites shared.md with the NEW path
      const result = await next(sessionId);
      expect(result.stepKey).toBe("step2");
      expect(result.prompt).toContain("shared.md=/tmp/new.md");
      expect(result.prompt).not.toContain("/tmp/old.md");

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("shared.md");
      expect(rows[0].file_path).toBe("/tmp/new.md");
      db.close();
    });

    it("失敗時にmaxRetriesまでリトライし成功時に続行する", async () => {
      const before_step_retry_test_workflow_content = `
        let callCount = 0;
        const def = {
          id: 'before-step-retry-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 2,
              onFail: { action: 'abort' },
              beforeStep: async (ctx) => {
                callCount++;
                if (callCount < 2) {
                  throw new Error('temporary failure');
                }
                return [{ key: 'retry.md', path: '/tmp/retry.md' }];
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
      setupWorkflowFromContent("before-step-retry-test", before_step_retry_test_workflow_content);

      const { sessionId } = await init("before-step-retry-test", { title: "test-title" });
      const result = await next(sessionId);
      expect(result.stepKey).toBe("step1");

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("retry.md");
      db.close();
    });

    it("リトライ枯渇時にステップをfailedにしてワークフローを停止する", async () => {
      const before_step_exhaust_test_workflow_content = `
        const def = {
          id: 'before-step-exhaust-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 2,
              onFail: { action: 'abort' },
              beforeStep: async (ctx) => {
                throw new Error('always boom');
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
      setupWorkflowFromContent(
        "before-step-exhaust-test",
        before_step_exhaust_test_workflow_content,
      );

      const { sessionId } = await init("before-step-exhaust-test", { title: "test-title" });
      await expect(next(sessionId)).rejects.toThrow(EngineError);
      await expect(next(sessionId)).rejects.toThrow("Session is aborted");

      const db = new Database(getWorkflowDbPath());
      const step = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step1") as Record<string, unknown>;
      expect(step.status).toBe("failed");
      const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
        string,
        unknown
      >;
      expect(session.status).toBe("aborted");
      db.close();
    });

    it("runningステップの冪等な再開時にbeforeStepを再実行しない", async () => {
      const before_step_resume_test_workflow_content = `
        import * as fs from 'node:fs';
        import * as path from 'node:path';
        const def = {
          id: 'before-step-resume-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 2,
              onFail: { action: 'abort' },
              beforeStep: async (ctx) => {
                fs.appendFileSync(path.join(ctx.sessionDir, 'hook-count.log'), 'x');
                return [{ key: 'resume.md', path: '/tmp/resume.md' }];
              },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'artifacts: ' + JSON.stringify(ctx.artifacts.map((a) => a.artifactKey + '=' + a.filePath)),
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("before-step-resume-test", before_step_resume_test_workflow_content);

      const { sessionId, sessionDir } = await init("before-step-resume-test", {
        title: "test-title",
      });

      // First next: hook runs once and registers its artifacts
      const first = await next(sessionId);
      expect(first.context.attemptNumber).toBe(1);
      expect(first.prompt).toContain("resume.md=/tmp/resume.md");

      // Idempotent resume: reissues the same prompt WITHOUT re-running the hook
      const resumed = await next(sessionId);
      expect(resumed.prompt).toBe(first.prompt);

      const hookLog = path.join(sessionDir, "hook-count.log");
      expect(fs.readFileSync(hookLog, "utf-8")).toBe("x");

      // Reported against the running attempt, the artifacts survive
      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("resume.md");
      db.close();
    });

    it("beforeStep付きステップの同時実行でも試行を二重に割り当てず同一プロンプトを返す", async () => {
      // beforeStep はトランザクション外で実行されるため、フックの非同期待機中に
      // 別の next() が割り込める。再検証（resume パス）でアテンプト重複を防ぎ、
      // DB 上の artifacts から同一プロンプトを再発行することを確認する。
      const before_step_concurrent_test_workflow_content = `
        const def = {
          id: 'before-step-concurrent-test',
          steps: [
            {
              key: 'step1',
              phase: 'first',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              beforeStep: async (ctx) => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                return [{ key: 'slow.md', path: '/tmp/slow.md' }];
              },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'artifacts: ' + JSON.stringify(ctx.artifacts.map((a) => a.artifactKey + '=' + a.filePath)),
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent(
        "before-step-concurrent-test",
        before_step_concurrent_test_workflow_content,
      );

      const { sessionId } = await init("before-step-concurrent-test", { title: "test-title" });
      const results = await Promise.allSettled([next(sessionId), next(sessionId)]);

      const fulfilled = results.filter((result) => result.status === "fulfilled");
      expect(fulfilled.length).toBe(2);
      const prompts = new Set(
        fulfilled.map((result) => (result as PromiseFulfilledResult<NextResult>).value.prompt),
      );
      expect(prompts.size).toBe(1);
      for (const result of fulfilled) {
        const nextResult = (result as PromiseFulfilledResult<NextResult>).value;
        expect(nextResult.context.attemptNumber).toBe(1);
        expect(nextResult.prompt).toContain("slow.md=/tmp/slow.md");
      }

      const db = new Database(getWorkflowDbPath());
      const attempts = db
        .query(
          "SELECT COUNT(*) AS count FROM step_attempts WHERE step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?)",
        )
        .get(sessionId, "step1") as Record<string, unknown>;
      expect(attempts.count).toBe(1);
      db.close();
    });
  });

  describe("フックctxのゲート回答公開", () => {
    it("condition / buildPrompt / beforeStepのctxからgateAnswersとsessionIdを参照できる", async () => {
      const hook_ctx_test_workflow_content = `
        import * as fs from 'node:fs';
        import * as path from 'node:path';
        const capture = (name, ctx) => {
          fs.writeFileSync(path.join(ctx.sessionDir, name), JSON.stringify({
            sessionId: ctx.sessionId,
            gateAnswers: ctx.gateAnswers,
          }));
        };
        const def = {
          id: 'hook-ctx-test',
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
              condition: (ctx) => { capture('condition.json', ctx); return true; },
              beforeStep: async (ctx) => { capture('before-step.json', ctx); return []; },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => { capture('build-prompt.json', ctx); return 'hooked'; },
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("hook-ctx-test", hook_ctx_test_workflow_content);

      const { sessionId, sessionDir } = await init("hook-ctx-test", { title: "test-title" });
      await next(sessionId);
      await confirm(sessionId, mockConfirmDeps("approve"));
      const result = await next(sessionId);
      expect(result.stepKey).toBe("hooked");

      for (const name of ["condition.json", "build-prompt.json", "before-step.json"]) {
        const captured = JSON.parse(fs.readFileSync(path.join(sessionDir, name), "utf-8")) as {
          sessionId: string;
          gateAnswers: Record<string, unknown>;
        };
        expect(captured.sessionId).toBe(sessionId);
        expect(captured.gateAnswers).toEqual({ gate: { decision: { value: "approve" } } });
      }
    });

    it("confirm後の後続ステップでもbuildPromptから最新のゲート回答を参照できる", async () => {
      const rewind_answers_test_workflow_content = `
        const def = {
          id: 'rewind-answers-test',
          steps: [
            {
              key: 'execute',
              phase: 'execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'session=' + ctx.sessionId + ' answers=' + JSON.stringify(ctx.gateAnswers),
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'review_gate',
              phase: 'review',
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
                      { value: 'request_changes', label: 'Revise', input: { required: true, placeholder: '理由', maxLength: 500 } },
                    ],
                  },
                ],
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'followup',
              phase: 'followup',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'session=' + ctx.sessionId + ' answers=' + JSON.stringify(ctx.gateAnswers),
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
            `;
      setupWorkflowFromContent("rewind-answers-test", rewind_answers_test_workflow_content);

      const { sessionId } = await init("rewind-answers-test", { title: "test-title" });
      const first = await next(sessionId);
      expect(first.stepKey).toBe("execute");
      expect(first.prompt).toContain(`session=${sessionId}`);
      expect(first.prompt).toContain("answers={}");

      await report(sessionId, { stepKey: "execute", status: "completed", subagentOutput: "done" });
      const gate = await next(sessionId);
      expect(gate.stepKey).toBe("review_gate");

      await confirm(
        sessionId,
        mockConfirmDeps({ decision: { value: "request_changes", input: "要修正" } }),
      );

      // confirm は巻き戻さず後続へ進み、後続の buildPrompt から最新回答を参照できる
      const followed = await next(sessionId);
      expect(followed.stepKey).toBe("followup");
      expect(followed.prompt).toContain('"decision":{"value":"request_changes","input":"要修正"}');
    });
  });
});
