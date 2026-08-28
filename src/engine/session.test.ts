import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { init, EngineError, getWorkflowDbPath, getWorkflowsDir, getSessionDir } from "./index.ts";
import { validateTitle } from "./session.ts";

const TEST_TADO_HOME = path.join(__dirname, "__test_sessions_session__");
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

function setupWorkflowFromFile(id: string, content: string): void {
  const dir = path.join(getWorkflowsDir(), id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.ts"), content);
}

describe("セッション", () => {
  describe("init", () => {
    it("セッションディレクトリと単一workflow.dbを作成する", async () => {
      setupSimpleWorkflow();
      const result = await init("test-simple", { title: "test-title" });
      expect(result.sessionId).toBeTruthy();
      expect(result.workflowId).toBe("test-simple");
      expect(fs.existsSync(getSessionDir(result.sessionId))).toBe(true);
      expect(fs.existsSync(path.join(getSessionDir(result.sessionId), "workflow.db"))).toBe(false);
      expect(fs.existsSync(getWorkflowDbPath())).toBe(true);

      const db = new Database(getWorkflowDbPath());
      const session = db
        .query("SELECT * FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(session).toBeTruthy();
      expect(session.status).toBe("running");
      expect(session.session_dir).toBe(getSessionDir(result.sessionId));

      const steps = db
        .query("SELECT * FROM steps WHERE session_id = ? ORDER BY step_index")
        .all(result.sessionId) as Record<string, unknown>[];
      expect(steps).toHaveLength(3);
      expect(steps[0].step_key).toBe("step1_task");
      expect(steps[1].step_key).toBe("step2_human_gate");
      expect(steps[2].step_key).toBe("step3_parallel");

      db.close();
    });

    it("指定されたsessionIdを使用する", async () => {
      setupSimpleWorkflow();
      const result = await init("test-simple", { title: "test-title", sessionId: "my-custom-id" });
      expect(result.sessionId).toBe("my-custom-id");
    });

    it("複数セッションを単一DBに共存させる", async () => {
      setupSimpleWorkflow();
      const first = await init("test-simple", { title: "test-title", sessionId: "session-one" });
      setupSimpleWorkflow();
      const second = await init("test-simple", { title: "test-title", sessionId: "session-two" });
      const db = new Database(getWorkflowDbPath());
      const sessions = db.query("SELECT id, session_dir FROM sessions ORDER BY id").all() as Record<
        string,
        unknown
      >[];

      expect(first.sessionId).toBe("session-one");
      expect(second.sessionId).toBe("session-two");
      expect(sessions).toHaveLength(2);
      expect(sessions.map((session) => session.id)).toEqual(["session-one", "session-two"]);
      db.close();
    });

    it("セッション行にworkflow_pathを保存する", async () => {
      setupSimpleWorkflow();
      const result = await init("test-simple", { title: "test-title" });
      const db = new Database(getWorkflowDbPath());
      const session = db
        .query("SELECT workflow_path FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(session.workflow_path).toBe(path.join(getWorkflowsDir(), "test-simple", "index.ts"));
      db.close();
    });

    it("存在しないワークフローファイルでEngineErrorをスローする", async () => {
      await expect(init("/nonexistent/workflow.ts", { title: "test-title" })).rejects.toThrow(
        EngineError,
      );
    });

    it("IDでワークフローを解決してinitできる", async () => {
      const dir = path.join(getWorkflowsDir(), "test-simple");
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(FIXTURE_WORKFLOW, path.join(dir, "index.ts"));
      const result = await init("test-simple", { title: "test-title" });
      expect(result.workflowId).toBe("test-simple");
      const db = new Database(getWorkflowDbPath());
      const session = db
        .query("SELECT workflow_path FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(session.workflow_path).toBe(path.join(getWorkflowsDir(), "test-simple", "index.ts"));
      db.close();
    });

    it("存在しないIDで Workflow not found エラーになる", async () => {
      await expect(init("nonexistent-id", { title: "test-title" })).rejects.toThrow(
        "Workflow not found: nonexistent-id",
      );
    });
  });

  describe("フック", () => {
    it("beforeInitとafterInitフックを実行する", async () => {
      const hookWorkflowContent = `
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
      `;
      setupWorkflowFromFile("hook-test", hookWorkflowContent);

      const result = await init("hook-test", { title: "test-title" });

      expect(fs.existsSync(path.join(getSessionDir(result.sessionId), "_hook_before"))).toBe(true);
      expect(fs.existsSync(path.join(getSessionDir(result.sessionId), "_hook_after"))).toBe(true);

      const db = new Database(getWorkflowDbPath());
      const session = db
        .query("SELECT artifact_db_path FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(session.artifact_db_path).toBe("/tmp/test-artifact.db");
      db.close();
    });

    it("フックなしで動作する", async () => {
      const noHookWorkflowContent = `
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
      `;
      setupWorkflowFromFile("no-hook-test", noHookWorkflowContent);

      const result = await init("no-hook-test", { title: "test-title" });
      expect(result.sessionId).toBeTruthy();
    });
  });

  describe("initアーティファクト", () => {
    it("afterInitフックからアーティファクトを登録する", async () => {
      const artifactHookWorkflowContent = `
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
      `;
      setupWorkflowFromFile("artifact-hook-test", artifactHookWorkflowContent);

      const { sessionId } = await init("artifact-hook-test", { title: "test-title" });

      const db = new Database(getWorkflowDbPath());
      const rows = db
        .query("SELECT * FROM artifacts WHERE session_id = ?")
        .all(sessionId) as Record<string, unknown>[];
      expect(rows).toHaveLength(1);
      expect(rows[0].artifact_key).toBe("init-artifact.txt");
      expect(rows[0].step_key).toBe("step1");
      db.close();
    });
  });

  describe("cwd/title保存", () => {
    it("sessions.cwd に process.cwd() の絶対パスと sessions.title を保存する", async () => {
      setupSimpleWorkflow();
      const expectedCwd = process.cwd();
      const result = await init("test-simple", { title: "my-title" });
      const db = new Database(getWorkflowDbPath());
      const row = db
        .query("SELECT cwd, title FROM sessions WHERE id = ?")
        .get(result.sessionId) as Record<string, unknown>;
      expect(row.cwd).toBe(path.resolve(expectedCwd));
      expect(row.title).toBe("my-title");
      db.close();
    });

    it("明示的なcwdオプションが絶対パスとして保存される", async () => {
      setupSimpleWorkflow();
      const result = await init("test-simple", { title: "explicit-cwd", cwd: "/tmp/custom-cwd" });
      const db = new Database(getWorkflowDbPath());
      const row = db.query("SELECT cwd FROM sessions WHERE id = ?").get(result.sessionId) as Record<
        string,
        unknown
      >;
      expect(row.cwd).toBe(path.resolve("/tmp/custom-cwd"));
      db.close();
    });

    it("相対cwdが絶対パスに解決されて保存される", async () => {
      setupSimpleWorkflow();
      const result = await init("test-simple", { title: "rel-cwd", cwd: "relative/path" });
      const db = new Database(getWorkflowDbPath());
      const row = db.query("SELECT cwd FROM sessions WHERE id = ?").get(result.sessionId) as Record<
        string,
        unknown
      >;
      expect(row.cwd).toBe(path.resolve("relative/path"));
      db.close();
    });
  });

  describe("titleバリデーション", () => {
    it("validateTitle は 1-100文字の正常タイトルを通す", () => {
      expect(() => validateTitle("a")).not.toThrow();
      expect(() => validateTitle("x".repeat(100))).not.toThrow();
      expect(() => validateTitle("hello world")).not.toThrow();
    });

    it("validateTitle は空文字でエラー", () => {
      expect(() => validateTitle("")).toThrow("1-100");
    });

    it("validateTitle は101文字でエラー", () => {
      expect(() => validateTitle("x".repeat(101))).toThrow("1-100");
    });

    it("validateTitle は改行 \\n を含むとエラー", () => {
      expect(() => validateTitle("a\nb")).toThrow("newline");
    });

    it("validateTitle は復帰 \\r を含むとエラー", () => {
      expect(() => validateTitle("a\rb")).toThrow("newline");
    });

    it("validateTitle は非文字列でエラー", () => {
      expect(() => validateTitle(null as unknown as string)).toThrow("Invalid --title");
      expect(() => validateTitle(undefined as unknown as string)).toThrow("Invalid --title");
    });

    it("init は --title なしでエラー", async () => {
      setupSimpleWorkflow();
      await expect(init("test-simple", undefined)).rejects.toThrow("Missing required --title");
    });

    it("init は空の --title でエラー", async () => {
      setupSimpleWorkflow();
      await expect(init("test-simple", { title: "" })).rejects.toThrow("1-100");
    });

    it("init は101文字の --title でエラー", async () => {
      setupSimpleWorkflow();
      await expect(init("test-simple", { title: "x".repeat(101) })).rejects.toThrow("1-100");
    });

    it("init は改行を含む --title でエラー", async () => {
      setupSimpleWorkflow();
      await expect(init("test-simple", { title: "a\nb" })).rejects.toThrow("newline");
      await expect(init("test-simple", { title: "a\rb" })).rejects.toThrow("newline");
    });

    it("init はレガシーな文字列 sessionId 呼び出しで --title 必須エラー", async () => {
      setupSimpleWorkflow();
      await expect(
        init("test-simple", "legacy-session-id" as unknown as { title: string }),
      ).rejects.toThrow("Missing required --title");
    });
  });
});
