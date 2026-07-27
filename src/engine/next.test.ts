import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { init, next, report, EngineError, ARTIFACT_PRESENT_INSTRUCTION } from "./index.ts";

const TEST_BASE_DIR = path.join(__dirname, "__test_sessions_next__");
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(baseDir: string): void {
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

describe("next", () => {
  it("最初のステップのタスクプロンプトを返す", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
    const result = await next(sessionId, TEST_BASE_DIR);

    expect(result.stepKey).toBe("step1_task");
    expect(result.stepType).toBe("task");
    expect(result.action).toBe("run_subagent");
    expect(result.subagentType).toBe("test-agent");
    expect(result.prompt).toContain("Execute step1_task");
    expect(result.context.attemptNumber).toBe(1);
    expect(result.context.retryCount).toBe(0);
    expect(result.context.maxRetries).toBe(2);

    const db = new Database(path.join(result.context.sessionDir, "workflow.db"));
    const step = db
      .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
      .get(sessionId, "step1_task") as Record<string, unknown>;
    expect(step.status).toBe("running");
    db.close();
  });

  it("human_gateのプロンプトを返す", async () => {
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

    const result = await next(sessionId, TEST_BASE_DIR);

    expect(result.stepKey).toBe("step2_human_gate");
    expect(result.stepType).toBe("human_gate");
    expect(result.action).toBe("human_gate");
    expect(result.prompt).toContain("approve");
    expect(result.prompt).toContain("revise");
    expect(result.prompt).toContain("abort");
  });

  it("並列サブタスクのプロンプトを返す", async () => {
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

    const result = await next(sessionId, TEST_BASE_DIR);

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
    await expect(next("nonexistent-session", TEST_BASE_DIR)).rejects.toThrow(EngineError);
  });

  it("完了済みセッションでEngineErrorをスローする", async () => {
    const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
    const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
    db.run("UPDATE sessions SET status = ? WHERE id = ?", ["done", sessionId]);
    db.close();
    await expect(next(sessionId, TEST_BASE_DIR)).rejects.toThrow(EngineError);
  });

  describe("DBにworkflow_pathがないワークフロー", () => {
    it("nextとreportで--workflowフラグを受け付ける", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);

      const result = await next(sessionId, TEST_BASE_DIR, FIXTURE_WORKFLOW);
      expect(result.stepKey).toBe("step1_task");

      const r = await report(
        sessionId,
        {
          stepKey: "step1_task",
          status: "completed",
          subagentOutput: "success task done",
        },
        TEST_BASE_DIR,
        FIXTURE_WORKFLOW,
      );

      expect(r.nextAction).toBe("continue");
    });
  });

  describe("条件付きステップスキップ", () => {
    it("conditionがfalseを返すときにステップをスキップする", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "condition-skip-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // step1 executes normally
      const r1 = await next(sessionId, TEST_BASE_DIR);
      expect(r1.stepKey).toBe("step1");
      await report(
        sessionId,
        { stepKey: "step1", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );

      // next should skip step2 (condition=false) and return step3
      const r2 = await next(sessionId, TEST_BASE_DIR);
      expect(r2.stepKey).toBe("step3");

      // verify step2 is marked as skipped in DB
      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
      const step2 = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step2_conditional") as Record<string, unknown>;
      expect(step2.status).toBe("skipped");
      db.close();
    });

    it("conditionがtrueを返すときにステップを実行する", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "condition-pass-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);
      const r1 = await next(sessionId, TEST_BASE_DIR);
      expect(r1.stepKey).toBe("step1");
      expect(r1.prompt).toBe("step1 prompt");
    });

    it("conditionがundefinedのときにステップを実行する（後方互換）", async () => {
      const { sessionId } = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
      const r1 = await next(sessionId, TEST_BASE_DIR);
      expect(r1.stepKey).toBe("step1_task");
    });

    it("false条件の連続ステップを複数スキップする", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "multi-skip-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "step1", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );

      // Should skip step2 and step3, land on step4
      const r = await next(sessionId, TEST_BASE_DIR);
      expect(r.stepKey).toBe("step4");

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
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
      const tmpDir = path.join(TEST_BASE_DIR, "all-skip-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "step1", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );

      // All remaining steps skipped → session done
      await expect(next(sessionId, TEST_BASE_DIR)).rejects.toThrow("All steps completed");

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
      const session = db.query("SELECT status FROM sessions WHERE id = ?").get(sessionId) as Record<
        string,
        unknown
      >;
      expect(session.status).toBe("done");
      db.close();
    });

    it("conditionコンテキストにgateChoicesを提供する", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "gate-choices-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // Pass the gate with 'approve'
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "gate_step", status: "completed", subagentOutput: "approve" },
        TEST_BASE_DIR,
      );

      // conditional_step should execute because gateChoices['gate_step'] === 'approve'
      const r = await next(sessionId, TEST_BASE_DIR);
      expect(r.stepKey).toBe("conditional_step");
    });

    it("gateChoices条件が満たされたときにステップを実行する", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "gate-execute-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // Gate approves → condition gateChoices['gate_step'] === 'approve' is true → step executes
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "gate_step", status: "completed", subagentOutput: "approve" },
        TEST_BASE_DIR,
      );

      const r = await next(sessionId, TEST_BASE_DIR);
      expect(r.stepKey).toBe("conditional_step");
    });

    it("conditionコンテキストにartifactsを提供する", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "condition-artifacts-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // step1 completes WITHOUT producing the needed artifact
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        { stepKey: "step1", status: "completed", subagentOutput: "done" },
        TEST_BASE_DIR,
      );

      // step2 should be skipped because artifact 'needed.txt' doesn't exist
      const r = await next(sessionId, TEST_BASE_DIR);
      expect(r.stepKey).toBe("step3");

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
      const s2 = db
        .query("SELECT status FROM steps WHERE session_id = ? AND step_key = ?")
        .get(sessionId, "step2_conditional") as Record<string, unknown>;
      expect(s2.status).toBe("skipped");
      db.close();
    });
  });

  describe("ヒューマンゲートのアーティファクト提示指示", () => {
    it("アーティファクト登録時にパスと提示指示を含める", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "gate-present-test");
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

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      // prepare step registers the issue-body.md artifact
      await next(sessionId, TEST_BASE_DIR);
      await report(
        sessionId,
        {
          stepKey: "prepare",
          status: "completed",
          subagentOutput: "done",
          artifacts: [{ key: "issue-body.md", path: "/tmp/plan/issue-body.md" }],
        },
        TEST_BASE_DIR,
      );

      // human gate prompt should present the artifact path AND the instruction
      const result = await next(sessionId, TEST_BASE_DIR);
      expect(result.stepKey).toBe("decompose_gate");
      expect(result.stepType).toBe("human_gate");
      expect(result.prompt).toContain("- issue-body.md: /tmp/plan/issue-body.md");
      expect(result.prompt).toContain(ARTIFACT_PRESENT_INSTRUCTION);
    });

    it("アーティファクト未登録時に提示指示を含めない", async () => {
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

      // step2_human_gate has presentArtifacts: [] → no artifacts presented
      const result = await next(sessionId, TEST_BASE_DIR);
      expect(result.stepKey).toBe("step2_human_gate");
      expect(result.stepType).toBe("human_gate");
      expect(result.prompt).toContain("(成果物なし)");
      expect(result.prompt).not.toContain(ARTIFACT_PRESENT_INSTRUCTION);
    });
  });
});
