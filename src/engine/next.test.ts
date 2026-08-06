import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import type { NextResult } from "../types/result.ts";
import {
  init,
  next,
  report,
  EngineError,
  ARTIFACT_PRESENT_INSTRUCTION,
  getWorkflowDbPath,
} from "./index.ts";

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

describe("next", () => {
  it("最初のステップのタスクプロンプトを返す", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW);
    const result = await next(sessionId);

    expect(result.stepKey).toBe("step1_task");
    expect(result.stepType).toBe("task");
    expect(result.action).toBe("run_subagent");
    expect(result.subagentType).toBe("test-agent");
    expect(result.prompt).toContain("Execute step1_task");
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
    const { sessionId } = await init(FIXTURE_WORKFLOW);
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
    const { sessionId } = await init(FIXTURE_WORKFLOW);
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
    const { sessionId } = await init(FIXTURE_WORKFLOW);
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

  it("human_gateのプロンプトを返す", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW);

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
    expect(result.prompt).toContain("approve");
    expect(result.prompt).toContain("revise");
    expect(result.prompt).toContain("abort");
  });

  it("並列サブタスクのプロンプトを返す", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW);

    await next(sessionId);
    await report(sessionId, {
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    await next(sessionId);
    await report(sessionId, {
      stepKey: "step2_human_gate",
      status: "completed",
      subagentOutput: "approve",
    });

    const result = await next(sessionId);

    expect(result.stepKey).toBe("step3_parallel");
    expect(result.stepType).toBe("parallel");
    expect(result.parallel).not.toBeNull();
    expect(result.parallel!.subtasks).toHaveLength(2);
    expect(result.parallel!.subtasks[0].key).toBe("sub_a");
    expect(result.parallel!.subtasks[0].prompt).toContain("Subtask A");
    expect(result.parallel!.subtasks[1].key).toBe("sub_b");
    expect(result.parallel!.subtasks[1].prompt).toContain("Subtask B");
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
    const { sessionId } = await init(FIXTURE_WORKFLOW);
    const db = new Database(getWorkflowDbPath());
    db.run("UPDATE sessions SET status = ? WHERE id = ?", ["done", sessionId]);
    db.close();
    await expect(next(sessionId)).rejects.toThrow(EngineError);
  });

  describe("DBにworkflow_pathがないワークフロー", () => {
    it("nextとreportで--workflowフラグを受け付ける", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW);

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
      const tmpDir = path.join(TEST_TADO_HOME, "condition-skip-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "condition-skip-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);

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
      const tmpDir = path.join(TEST_TADO_HOME, "condition-pass-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "condition-pass-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);
      const r1 = await next(sessionId);
      expect(r1.stepKey).toBe("step1");
      expect(r1.prompt).toBe("step1 prompt");
    });

    it("conditionがundefinedのときにステップを実行する（後方互換）", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW);
      const r1 = await next(sessionId);
      expect(r1.stepKey).toBe("step1_task");
    });

    it("false条件の連続ステップを複数スキップする", async () => {
      const tmpDir = path.join(TEST_TADO_HOME, "multi-skip-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "multi-skip-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);

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
      const tmpDir = path.join(TEST_TADO_HOME, "all-skip-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "all-skip-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);

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

    it("conditionコンテキストにgateChoicesを提供する", async () => {
      const tmpDir = path.join(TEST_TADO_HOME, "gate-choices-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "gate-choices-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
                choices: [
                  { value: 'approve', label: 'OK' },
                  { value: 'abort', label: 'Abort' },
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
                return ctx.gateChoices['gate_step'] === 'approve';
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
      `,
      );

      const { sessionId } = await init(workflowPath);

      // Pass the gate with 'approve'
      await next(sessionId);
      await report(sessionId, {
        stepKey: "gate_step",
        status: "completed",
        subagentOutput: "approve",
      });

      // conditional_step should execute because gateChoices['gate_step'] === 'approve'
      const r = await next(sessionId);
      expect(r.stepKey).toBe("conditional_step");
    });

    it("gateChoices条件が満たされたときにステップを実行する", async () => {
      const tmpDir = path.join(TEST_TADO_HOME, "gate-execute-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "gate-execute-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
                choices: [
                  { value: 'approve', label: 'OK' },
                  { value: 'abort', label: 'Abort' },
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
              condition: (ctx) => ctx.gateChoices['gate_step'] === 'approve',
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
      `,
      );

      const { sessionId } = await init(workflowPath);

      // Gate approves → condition gateChoices['gate_step'] === 'approve' is true → step executes
      await next(sessionId);
      await report(sessionId, {
        stepKey: "gate_step",
        status: "completed",
        subagentOutput: "approve",
      });

      const r = await next(sessionId);
      expect(r.stepKey).toBe("conditional_step");
    });

    it("conditionコンテキストにartifactsを提供する", async () => {
      const tmpDir = path.join(TEST_TADO_HOME, "condition-artifacts-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "condition-artifacts-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);

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

  describe("ヒューマンゲートのアーティファクト提示指示", () => {
    it("アーティファクト登録時にパスと提示指示を含める", async () => {
      const tmpDir = path.join(TEST_TADO_HOME, "gate-present-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "gate-present-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
                choices: [
                  { value: 'approve', label: 'OK' },
                  { value: 'revise', label: 'Revise' },
                  { value: 'abort', label: 'Abort' },
                ],
                reviseTargetStep: 'prepare',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
      `,
      );

      const { sessionId } = await init(workflowPath);

      // prepare step registers the issue-body.md artifact
      await next(sessionId);
      await report(sessionId, {
        stepKey: "prepare",
        status: "completed",
        subagentOutput: "done",
        artifacts: [{ key: "issue-body.md", path: "/tmp/plan/issue-body.md" }],
      });

      // human gate prompt should present the artifact path AND the instruction
      const result = await next(sessionId);
      expect(result.stepKey).toBe("decompose_gate");
      expect(result.stepType).toBe("human_gate");
      expect(result.prompt).toContain("- issue-body.md: /tmp/plan/issue-body.md");
      expect(result.prompt).toContain(ARTIFACT_PRESENT_INSTRUCTION);
    });

    it("アーティファクト未登録時に提示指示を含めない", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW);

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
      expect(result.prompt).not.toContain(ARTIFACT_PRESENT_INSTRUCTION);
    });
  });

  describe("beforeStepフック", () => {
    it("返却artifactsがPromptCtx.artifactsに反映されDBに登録される", async () => {
      const tmpDir = path.join(TEST_TADO_HOME, "before-step-inject-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "before-step-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);
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
      const tmpDir = path.join(TEST_TADO_HOME, "before-step-overwrite-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "before-step-overwrite-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);

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
      const tmpDir = path.join(TEST_TADO_HOME, "before-step-retry-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "before-step-retry-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);
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
      const tmpDir = path.join(TEST_TADO_HOME, "before-step-exhaust-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "before-step-exhaust-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);
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
      const tmpDir = path.join(TEST_TADO_HOME, "before-step-resume-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "before-step-resume-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId, sessionDir } = await init(workflowPath);

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
      const tmpDir = path.join(TEST_TADO_HOME, "before-step-concurrent-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "before-step-concurrent-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath);
      const results = await Promise.allSettled([next(sessionId), next(sessionId)]);

      const fulfilled = results.filter((result) => result.status === "fulfilled");
      expect(fulfilled.length).toBe(2);
      const prompts = new Set(
        fulfilled.map(
          (result) => (result as PromiseFulfilledResult<NextResult>).value.prompt,
        ),
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
});
