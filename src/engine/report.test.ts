import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { init, next, report, status, EngineError } from "./index.ts";

const TEST_BASE_DIR = path.join(__dirname, "__test_sessions_report__");
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(baseDir: string): void {
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

describe("report", () => {
  it("should mark step as passed and advance", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
    await next(sessionId, TEST_BASE_DIR);

    const result = await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      },
      TEST_BASE_DIR,
    );

    expect(result.checkResult.status).toBe("pass");
    expect(result.nextAction).toBe("continue");

    const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("passed");
    db.close();
  });

  it("should retry on failure within maxRetries", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
    await next(sessionId, TEST_BASE_DIR);

    const result = await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "failure output",
      },
      TEST_BASE_DIR,
    );

    expect(result.checkResult.status).toBe("fail");
    expect(result.nextAction).toBe("retry");

    const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
    const step = db
      .query("SELECT status, retry_count FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("pending");
    expect(step.retry_count).toBe(1);
    db.close();
  });

  it("should trigger onFail abort after maxRetries", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

    for (let i = 0; i < 2; i++) {
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "failure output",
        },
        TEST_BASE_DIR,
      );
    }

    await next(sessionId, TEST_BASE_DIR);
    const result = await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "failure output",
      },
      TEST_BASE_DIR,
    );

    expect(result.nextAction).toBe("abort");

    const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
    const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
      string,
      unknown
    >;
    expect(session.status).toBe("aborted");
    db.close();
  });

  it("should handle human_gate approve", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

    await next(sessionId, TEST_BASE_DIR);
    await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      },
      TEST_BASE_DIR,
    );

    await next(sessionId, TEST_BASE_DIR);
    const result = await report(
      sessionId,
      {
        stepKey: "step2_human_gate",
        status: "completed",
        subagentOutput: "approve",
      },
      TEST_BASE_DIR,
    );

    expect(result.nextAction).toBe("continue");

    const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step2_human_gate") as Record<string, unknown>;
    expect(step.status).toBe("passed");
    db.close();
  });

  it("should handle human_gate revise", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

    await next(sessionId, TEST_BASE_DIR);
    await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      },
      TEST_BASE_DIR,
    );

    await next(sessionId, TEST_BASE_DIR);
    const result = await report(
      sessionId,
      {
        stepKey: "step2_human_gate",
        status: "completed",
        subagentOutput: "revise",
      },
      TEST_BASE_DIR,
    );

    expect(result.nextAction).toBe("goto");
    expect(result.targetStep).toBe("step1_task");
  });

  it("should handle human_gate abort", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

    await next(sessionId, TEST_BASE_DIR);
    await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      },
      TEST_BASE_DIR,
    );

    await next(sessionId, TEST_BASE_DIR);
    const result = await report(
      sessionId,
      {
        stepKey: "step2_human_gate",
        status: "completed",
        subagentOutput: "abort",
      },
      TEST_BASE_DIR,
    );

    expect(result.nextAction).toBe("abort");
  });

  it("should complete session when all steps done", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

    await next(sessionId, TEST_BASE_DIR);
    await report(
      sessionId,
      {
        stepKey: "step1_task",
        status: "completed",
        subagentOutput: "success task done",
      },
      TEST_BASE_DIR,
    );

    await next(sessionId, TEST_BASE_DIR);
    await report(
      sessionId,
      {
        stepKey: "step2_human_gate",
        status: "completed",
        subagentOutput: "approve",
      },
      TEST_BASE_DIR,
    );

    await next(sessionId, TEST_BASE_DIR);
    const result = await report(
      sessionId,
      {
        stepKey: "step3_parallel",
        status: "completed",
        subagentOutput: "done all subtasks",
      },
      TEST_BASE_DIR,
    );

    expect(result.nextAction).toBe("done");

    const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
    const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
      string,
      unknown
    >;
    expect(session.status).toBe("done");
    db.close();
  });

  describe("retry with onFail strategies", () => {
    it("should support onFail goto after maxRetries", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "goto-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "goto-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      const r1 = await report(
        sessionId,
        {
          stepKey: "failing_step",
          status: "completed",
          subagentOutput: "failed",
        },
        TEST_BASE_DIR,
      );

      expect(r1.nextAction).toBe("retry");

      await next(sessionId, TEST_BASE_DIR);
      const r2 = await report(
        sessionId,
        {
          stepKey: "failing_step",
          status: "completed",
          subagentOutput: "failed again",
        },
        TEST_BASE_DIR,
      );

      expect(r2.nextAction).toBe("goto");
      expect(r2.targetStep).toBe("fallback_step");
    });

    it("should support onFail escalate", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "escalate-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "escalate-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      const r1 = await report(
        sessionId,
        {
          stepKey: "failing_step",
          status: "completed",
          subagentOutput: "help",
        },
        TEST_BASE_DIR,
      );

      expect(r1.nextAction).toBe("escalate");

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
      const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
        string,
        unknown
      >;
      expect(session.status).toBe("paused");
      db.close();
    });
  });

  describe("artifacts", () => {
    it("should register artifacts from report input", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
      await next(sessionId, TEST_BASE_DIR);

      await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "success task done",
          artifacts: [
            { key: "output.md", path: "/tmp/output.md" },
            { key: "log.txt", path: "/tmp/log.txt" },
          ],
        },
        TEST_BASE_DIR,
      );

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
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

  describe("parallel report with subtaskResults", () => {
    it("should store subtask results on report", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "success task done",
        },
        TEST_BASE_DIR,
      );

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        {
          stepKey: "step2_human_gate",
          status: "completed",
          subagentOutput: "approve",
        },
        TEST_BASE_DIR,
      );

      const parResult = await next(sessionId, TEST_BASE_DIR);
      expect(parResult.stepType).toBe("parallel");

      await report(
        sessionId,
        {
          stepKey: "step3_parallel",
          status: "completed",
          subagentOutput: "done all subtasks",
          subtaskResults: [
            { subtaskKey: "sub_a", subagentOutput: "sub A finished", status: "completed" },
            { subtaskKey: "sub_b", subagentOutput: "sub B finished", status: "completed" },
          ],
        },
        TEST_BASE_DIR,
      );

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
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

    it("should handle partial subtask failures", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "success task done",
        },
        TEST_BASE_DIR,
      );

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        {
          stepKey: "step2_human_gate",
          status: "completed",
          subagentOutput: "approve",
        },
        TEST_BASE_DIR,
      );

      await next(sessionId, TEST_BASE_DIR);

      const r = await report(
        sessionId,
        {
          stepKey: "step3_parallel",
          status: "completed",
          subagentOutput: "partial",
          subtaskResults: [
            { subtaskKey: "sub_a", subagentOutput: "ok", status: "completed" },
            { subtaskKey: "sub_b", subagentOutput: "error", status: "failed", error: "timeout" },
          ],
        },
        TEST_BASE_DIR,
      );

      expect(r.stepKey).toBe("step3_parallel");

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
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

  describe("check exception handling", () => {
    it("should catch check function exceptions and set status to error", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "check-exception-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "check-exception-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);
      await next(sessionId, TEST_BASE_DIR);

      const r = await report(
        sessionId,
        {
          stepKey: "broken_step",
          status: "completed",
          subagentOutput: "done",
        },
        TEST_BASE_DIR,
      );

      expect(r.checkResult.status).toBe("error");
      expect(r.checkResult.reasons).toContain("intentional check failure");
    });
  });

  describe("revise resets subsequent steps", () => {
    it("should reset target and all subsequent steps to pending on revise", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "revise-reset-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "revise-reset-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
                choices: [
                  { value: 'approve', label: 'OK' },
                  { value: 'revise', label: 'Revise' },
                  { value: 'abort', label: 'Abort' },
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
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // Execute grill → prepare → gate
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "grill", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "prepare", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );

      await next(sessionId, TEST_BASE_DIR);
      const gateResult = await report(
        sessionId,
        { stepKey: "refined_gate", status: "completed", subagentOutput: "revise" },
        TEST_BASE_DIR,
      );

      expect(gateResult.nextAction).toBe("goto");
      expect(gateResult.targetStep).toBe("grill");

      // Verify all steps from grill onwards are reset to pending
      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
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
      const r = await next(sessionId, TEST_BASE_DIR);
      expect(r.stepKey).toBe("grill");
    });

    it("should allow full re-execution after revise", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "revise-full-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "revise-full-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
                choices: [
                  { value: 'approve', label: 'OK' },
                  { value: 'revise', label: 'Revise' },
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
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // First pass: work → gate (revise)
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "work", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "gate", status: "completed", subagentOutput: "revise" },
        TEST_BASE_DIR,
      );

      // Second pass: work → gate (approve) → done_step
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "work", status: "completed", subagentOutput: "done again" },
        TEST_BASE_DIR,
      );
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "gate", status: "completed", subagentOutput: "approve" },
        TEST_BASE_DIR,
      );

      const r = await next(sessionId, TEST_BASE_DIR);
      expect(r.stepKey).toBe("done_step");

      await report(
        sessionId,
        { stepKey: "done_step", status: "completed", subagentOutput: "finished" },
        TEST_BASE_DIR,
      );

      const s = status(sessionId, TEST_BASE_DIR);
      expect(s.sessionStatus).toBe("done");
    });
  });

  describe("review loop with requeueSource", () => {
    it("should requeue review step as pending after must>0 failure, and re-run it after fix", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "requeue-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "requeue-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
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
                choices: [
                  { value: 'approve', label: 'OK' },
                  { value: 'abort', label: 'Abort' },
                ],
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // execute → pass
      await next(sessionId, TEST_BASE_DIR);
      const r1 = await report(
        sessionId,
        {
          stepKey: "execute",
          status: "completed",
          subagentOutput: "work done",
        },
        TEST_BASE_DIR,
      );
      expect(r1.nextAction).toBe("continue");

      // review → fail (must>0), goto execute with requeue
      await next(sessionId, TEST_BASE_DIR);
      const r2 = await report(
        sessionId,
        {
          stepKey: "review",
          status: "completed",
          subagentOutput: "review result with must",
        },
        TEST_BASE_DIR,
      );
      expect(r2.nextAction).toBe("goto");
      expect(r2.targetStep).toBe("execute");
      expect(r2.message).toContain("review will re-run after fix");

      // verify review is pending (not failed)
      const s1 = status(sessionId, TEST_BASE_DIR);
      const reviewStep = s1.steps.find((s) => s.key === "review");
      expect(reviewStep?.status).toBe("pending");

      // execute → pass again
      await next(sessionId, TEST_BASE_DIR);
      const r3 = await report(
        sessionId,
        {
          stepKey: "execute",
          status: "completed",
          subagentOutput: "fixes applied",
        },
        TEST_BASE_DIR,
      );
      expect(r3.nextAction).toBe("continue");

      // review → pass (must=0, fixPass=true)
      await next(sessionId, TEST_BASE_DIR);
      const lookAhead = await next(sessionId, TEST_BASE_DIR);
      expect(lookAhead.stepKey).toBe("review");

      const r4 = await report(
        sessionId,
        {
          stepKey: "review",
          status: "completed",
          subagentOutput: "must: 0",
        },
        TEST_BASE_DIR,
      );
      expect(r4.nextAction).toBe("continue");
      expect(r4.message).toContain("followup");
    });
  });

  describe("status", () => {
    it("should return session info", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

      const result = status(sessionId, TEST_BASE_DIR);

      expect(result.sessionId).toBe(sessionId);
      expect(result.workflowId).toBe("test-simple");
      expect(result.sessionStatus).toBe("running");
      expect(result.steps).toHaveLength(3);
      expect(result.steps[0].key).toBe("step1_task");
      expect(result.steps[0].status).toBe("pending");
    });

    it("should show step statuses after progression", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      const s1 = status(sessionId, TEST_BASE_DIR);
      expect(s1.steps[0].status).toBe("running");

      await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "success task done",
        },
        TEST_BASE_DIR,
      );

      const s2 = status(sessionId, TEST_BASE_DIR);
      expect(s2.steps[0].status).toBe("passed");
    });

    it("should throw EngineError for non-existent session", () => {
      expect(() => status("nonexistent-session", TEST_BASE_DIR)).toThrow(EngineError);
    });
  });
});
