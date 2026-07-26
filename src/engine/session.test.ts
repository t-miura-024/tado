import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { init, EngineError } from "./index.ts";

const TEST_BASE_DIR = path.join(__dirname, "__test_sessions_session__");
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(baseDir: string): void {
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

describe("session", () => {
  describe("init", () => {
    it("should create session directory and workflow.db", async () => {
      const result = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
      expect(result.sessionId).toBeTruthy();
      expect(result.workflowId).toBe("test-simple");
      expect(fs.existsSync(path.join(TEST_BASE_DIR, result.sessionId))).toBe(true);
      expect(fs.existsSync(path.join(TEST_BASE_DIR, result.sessionId, "workflow.db"))).toBe(true);

      const db = new Database(path.join(TEST_BASE_DIR, result.sessionId, "workflow.db"));
      const session = db
        .query("SELECT * FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(session).toBeTruthy();
      expect(session.status).toBe("running");

      const steps = db
        .query("SELECT * FROM steps WHERE session_id = ? ORDER BY step_index")
        .all(result.sessionId) as Record<string, unknown>[];
      expect(steps).toHaveLength(3);
      expect(steps[0].step_key).toBe("step1_task");
      expect(steps[1].step_key).toBe("step2_human_gate");
      expect(steps[2].step_key).toBe("step3_parallel");

      db.close();
    });

    it("should use provided sessionId", async () => {
      const result = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR, "my-custom-id");
      expect(result.sessionId).toBe("my-custom-id");
    });

    it("should store workflow_path in session row", async () => {
      const result = await init(FIXTURE_WORKFLOW, TEST_BASE_DIR);
      const db = new Database(path.join(TEST_BASE_DIR, result.sessionId, "workflow.db"));
      const session = db
        .query("SELECT workflow_path FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(path.resolve(session.workflow_path as string)).toBe(path.resolve(FIXTURE_WORKFLOW));
      db.close();
    });

    it("should throw EngineError for missing workflow file", async () => {
      await expect(init("/nonexistent/workflow.ts", TEST_BASE_DIR)).rejects.toThrow(EngineError);
    });
  });

  describe("hooks", () => {
    it("should run beforeInit and afterInit hooks", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "hook-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "hook-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
        const def = {
          id: 'hook-test',
          steps: [
            {
              key: 'step1',
              phase: 'test',
              type: 'task',
              maxRetries: 1,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'test prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
          beforeInit: async (ctx) => {
            const fs = require('node:fs');
            fs.writeFileSync(ctx.sessionDir + '/_hook_before', 'called');
          },
          afterInit: async (ctx) => {
            const fs = require('node:fs');
            fs.writeFileSync(ctx.sessionDir + '/_hook_after', 'called');
            return { artifactDbPath: '/tmp/test-artifact.db' };
          },
        };
        export default def;
      `,
      );

      const result = await init(workflowPath, TEST_BASE_DIR);

      expect(fs.existsSync(path.join(TEST_BASE_DIR, result.sessionId, "_hook_before"))).toBe(true);
      expect(fs.existsSync(path.join(TEST_BASE_DIR, result.sessionId, "_hook_after"))).toBe(true);

      const db = new Database(path.join(TEST_BASE_DIR, result.sessionId, "workflow.db"));
      const session = db
        .query("SELECT artifact_db_path FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(session.artifact_db_path).toBe("/tmp/test-artifact.db");
      db.close();
    });

    it("should work without hooks", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "no-hook-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "no-hook-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
        const def = {
          id: 'no-hook-test',
          steps: [
            {
              key: 'step1',
              phase: 'test',
              type: 'task',
              maxRetries: 1,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'test prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
      `,
      );

      const result = await init(workflowPath, TEST_BASE_DIR);
      expect(result.sessionId).toBeTruthy();
    });
  });

  describe("init artifacts", () => {
    it("should register artifacts from afterInit hook", async () => {
      const tmpDir = path.join(TEST_BASE_DIR, "artifact-hook-test");
      fs.mkdirSync(tmpDir, { recursive: true });
      const workflowPath = path.join(tmpDir, "artifact-hook-workflow.ts");
      fs.writeFileSync(
        workflowPath,
        `
        const def = {
          id: 'artifact-hook-test',
          steps: [
            {
              key: 'step1',
              phase: 'test',
              type: 'task',
              maxRetries: 1,
              onFail: { action: 'abort' },
              task: {
                action: 'run_subagent',
                subagentType: 'test',
                buildPrompt: (ctx) => 'test prompt',
              },
              check: (ctx) => ({ status: 'pass', reasons: [] }),
            },
          ],
          afterInit: async (ctx) => {
            return { artifacts: [{ key: 'init-artifact.txt', path: '/tmp/init.txt' }] };
          },
        };
        export default def;
      `,
      );

      const { sessionId } = await init(workflowPath, TEST_BASE_DIR);

      const db = new Database(path.join(TEST_BASE_DIR, sessionId, "workflow.db"));
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("init-artifact.txt");
      expect(rows[0].step_key).toBe("step1");
      db.close();
    });
  });
});
