import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { eq } from "drizzle-orm";
import {
  EngineError,
  importWorkflowDef,
  importWorkflowDefFromPath,
  openDb,
  migrateDb,
  getPreviousAttempts,
  getArtifacts,
  getGateAnswers,
  readGateAnswersHistory,
  buildConditionCtx,
  getTadoHome,
  getWorkflowDbPath,
  getWorkflowsDir,
  openSessionDb,
} from "./store.ts";
import { artifacts, sessions, stepAttempts, steps } from "./schema.ts";

const TEST_BASE_DIR = path.join(__dirname, "__test_sessions_store__");
process.env.TADO_HOME = TEST_BASE_DIR;
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(tadoHome: string): void {
  if (fs.existsSync(tadoHome)) {
    fs.rmSync(tadoHome, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

function newSessionDir(name: string): string {
  const dir = path.join(TEST_BASE_DIR, name);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Raw SQLite handle for test setup / assertions (drizzle handle is for helpers). */
function openRawDb(): Database {
  return new Database(getWorkflowDbPath());
}

describe("ストア", () => {
  describe("TADO_HOME", () => {
    it("TADO_HOMEを絶対パスとして解決する", () => {
      const previous = process.env.TADO_HOME;
      process.env.TADO_HOME = "relative-tado-home";
      expect(getTadoHome()).toBe(path.resolve("relative-tado-home"));
      expect(getWorkflowDbPath()).toBe(
        path.join(path.resolve("relative-tado-home"), "workflow.db"),
      );
      process.env.TADO_HOME = previous;
    });

    it("DBオープン時にWALとbusy_timeoutを設定する", () => {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      const db = openDb();
      const journalMode = db.$client.query("PRAGMA journal_mode").get() as Record<string, unknown>;
      const busyTimeout = db.$client.query("PRAGMA busy_timeout").get() as Record<string, unknown>;

      expect(journalMode.journal_mode).toBe("wal");
      expect(busyTimeout.timeout).toBe(5000);
      db.$client.close();
    });

    it("既存DBのオープンエラーをSession not foundに変換しない", () => {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      fs.writeFileSync(getWorkflowDbPath(), "not a sqlite database");

      expect(() => openSessionDb("missing-session")).toThrow(
        `Unable to open session database: ${getWorkflowDbPath()}`,
      );
    });
  });

  describe("importWorkflowDef", () => {
    it("IDで有効なワークフロー定義を読み込む", async () => {
      const dir = path.join(getWorkflowsDir(), "test-simple");
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(FIXTURE_WORKFLOW, path.join(dir, "index.ts"));
      const def = await importWorkflowDef("test-simple");
      expect(def.id).toBe("test-simple");
      expect(def.steps).toHaveLength(3);
    });

    it("存在しないIDで Workflow not found エラーをスローする", async () => {
      await expect(importWorkflowDef("nonexistent-wf")).rejects.toThrow(
        "Workflow not found: nonexistent-wf",
      );
    });

    it("存在しないワークフローファイルでEngineErrorをスローする（path指定）", async () => {
      await expect(importWorkflowDefFromPath("/nonexistent/workflow.ts")).rejects.toThrow(
        EngineError,
      );
    });

    it("有効なワークフロー定義をパスから読み込む", async () => {
      const def = await importWorkflowDefFromPath(FIXTURE_WORKFLOW);
      expect(def.id).toBe("test-simple");
      expect(def.steps).toHaveLength(3);
    });
  });

  describe("ワークフロー定義検証", () => {
    function writeWorkflowFile(name: string, content: string): string {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      const filePath = path.join(TEST_BASE_DIR, `${name}.ts`);
      fs.writeFileSync(filePath, content);
      return filePath;
    }

    it("onFailのrequeueSource: trueをreset: downstreamへの置換を促して拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-requeue-source",
        `
        const def = {
          id: 'onfail-requeue-source',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'collect', requeueSource: true },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /requeueSource has been replaced by reset: "downstream"/,
      );
      // 移行が完了するまで本エンジンを導入できないことをメッセージで明示する
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Replace requeueSource: true with reset: "downstream" before deploying this engine version/,
      );
    });

    it("onFailのrequeueSource: falseはフィールド削除のみを案内して拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-requeue-source-false",
        `
        const def = {
          id: 'onfail-requeue-source-false',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort', requeueSource: false },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      // requeueSource: false は旧デフォルトと同じ挙動のため、reset の追加ではなく
      // フィールド削除のみを案内する
      let error: Error | undefined;
      try {
        await importWorkflowDefFromPath(filePath);
      } catch (e) {
        error = e as Error;
      }
      expect(error?.message).toMatch(
        /requeueSource has been removed\. Remove the field; the default behavior \(the failing step stays failed, no reset\) is unchanged/,
      );
      expect(error?.message).not.toMatch(/reset: "downstream"/);
    });

    it("goto以外に指定されたresetを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-non-goto-reset",
        `
        const def = {
          id: 'onfail-non-goto-reset',
          steps: [
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'retry', reset: 'downstream' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.reset in step "review".*reset is only valid when action is "goto"/,
      );
    });

    it("goto以外に指定されたtargetを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-non-goto-target",
        `
        const def = {
          id: 'onfail-non-goto-target',
          steps: [
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort', target: 'x' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.target in step "review".*target is only valid when action is "goto"/,
      );
    });

    it("onFailの未知のreset値を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-unknown-reset",
        `
        const def = {
          id: 'onfail-unknown-reset',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'execute', reset: 'upstream' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.reset "upstream"/,
      );
    });

    it("onFailのgoto先がstepsに存在しない場合に拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-missing-target",
        `
        const def = {
          id: 'onfail-missing-target',
          steps: [
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'missing_step' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.target "missing_step".*step not found/,
      );
    });

    it("reset指定で分岐先が失敗元より後方の定義を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-forward-target",
        `
        const def = {
          id: 'onfail-forward-target',
          steps: [
            {
              key: 'first',
              phase: 'First',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'second', reset: 'downstream' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'second',
              phase: 'Second',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /target must not be after the failing step when reset is "downstream"/,
      );
    });

    it("resetなしの後方gotoをロード時に拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-backward-without-reset",
        `
        const def = {
          id: 'onfail-backward-without-reset',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'execute' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.target "execute" in step "review".*backward goto requires reset: "downstream"/,
      );
    });

    it("reset: downstreamの有効な定義を受理する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-valid-reset",
        `
        const def = {
          id: 'onfail-valid-reset',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'review',
              phase: 'Review',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto', target: 'execute', reset: 'downstream' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      const def = await importWorkflowDefFromPath(filePath);
      expect(def.steps).toHaveLength(2);
      expect(def.steps[1].onFail.reset).toBe("downstream");
    });

    it("humanGate.reviseTargetStepがstepsに存在しない場合に拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-missing-revise-target",
        `
        const def = {
          id: 'human-gate-missing-revise-target',
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
                reviseTargetStep: 'ghost',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate.reviseTargetStep "ghost" in step "gate".*step not found/,
      );
    });

    it("humanGate.reviseTargetStepがゲートより後方のステップを指す場合に拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-forward-revise-target",
        `
        const def = {
          id: 'human-gate-forward-revise-target',
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
                reviseTargetStep: 'later',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'later',
              phase: 'Later',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate.reviseTargetStep "later" in step "gate".*target must not be after the gate step/,
      );
    });

    it("human_gateのonFail.targetをreviseの差し戻し先フォールバックとして受理する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-onfail-target",
        `
        const def = {
          id: 'human-gate-onfail-target',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate', target: 'execute' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      const def = await importWorkflowDefFromPath(filePath);
      expect(def.steps[1].onFail.target).toBe("execute");
    });

    it("human_gateのonFail.resetをreviseTargetStepの使用を促して拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-onfail-reset",
        `
        const def = {
          id: 'human-gate-onfail-reset',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'goto', target: 'execute', reset: 'downstream' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.reset in step "gate".*reset is not supported on human_gate steps; use humanGate.reviseTargetStep/,
      );
    });

    it("human_gateのonFail.targetがゲートより後方の場合は拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-forward-onfail-target",
        `
        const def = {
          id: 'human-gate-forward-onfail-target',
          steps: [
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate', target: 'later' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'later',
              phase: 'Later',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.target "later" in step "gate".*target must not be after the gate step/,
      );
    });
  });

  describe("スキーマ初期化", () => {
    it("sessions・steps・step_attempts・artifactsテーブルを作成する", () => {
      newSessionDir("schema");
      const db = openDb();
      migrateDb(db);

      const raw = openRawDb();
      const tables = raw
        .query(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`)
        .all() as { name: string }[];
      const names = tables.map((t) => t.name);

      expect(names).toContain("sessions");
      expect(names).toContain("steps");
      expect(names).toContain("step_attempts");
      expect(names).toContain("artifacts");
      raw.close();
      db.$client.close();
    });

    it("既存DBに対してベースラインmigrationを無傷適用する", () => {
      const dir = newSessionDir("existing-db");
      const raw = openRawDb();
      raw.exec(
        `CREATE TABLE sessions (id text PRIMARY KEY NOT NULL, workflow_id text NOT NULL,
         workflow_path text NOT NULL, session_dir text NOT NULL, artifact_db_path text,
         current_step text, status text DEFAULT 'running' NOT NULL,
         created_at text DEFAULT (datetime('now')) NOT NULL,
         updated_at text DEFAULT (datetime('now')) NOT NULL)`,
      );
      raw.exec(
        `CREATE TABLE steps (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, session_id text NOT NULL,
         step_key text NOT NULL, step_index integer NOT NULL, phase text, type text NOT NULL,
         status text DEFAULT 'pending' NOT NULL, retry_count integer DEFAULT 0 NOT NULL,
         max_retries integer DEFAULT 3 NOT NULL, on_fail_action text, on_fail_target text,
         created_at text DEFAULT (datetime('now')) NOT NULL)`,
      );
      raw.exec(
        `CREATE TABLE step_attempts (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
         step_id integer NOT NULL, attempt_number integer NOT NULL,
         started_at text DEFAULT (datetime('now')) NOT NULL, ended_at text, result_json text,
         subtask_results_json text, check_results_json text, check_status text)`,
      );
      raw.exec(
        `CREATE TABLE artifacts (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
         session_id text NOT NULL, step_key text NOT NULL, artifact_key text NOT NULL,
         file_path text NOT NULL, created_at text DEFAULT (datetime('now')) NOT NULL)`,
      );
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-existing", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, status, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-existing", "step1", 0, "Phase", "task", "running", 2, "goto", "step2"],
      );
      const existingStep = raw
        .query("SELECT id FROM steps WHERE session_id = ?")
        .get("sid-existing") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [existingStep.id as number, 1, "{}", "pass"],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-existing", "step1", "out.md", "/tmp/out.md", "2026-01-01 00:00:00"],
      );
      raw.close();

      const db = openDb();
      migrateDb(db);

      // 全テーブルの既存データが無傷で、migration 管理テーブルが記録されている
      const afterRaw = openRawDb();
      const counts = afterRaw
        .query(
          `SELECT
            (SELECT COUNT(*) FROM sessions) AS sessions_cnt,
            (SELECT COUNT(*) FROM steps) AS steps_cnt,
            (SELECT COUNT(*) FROM step_attempts) AS step_attempts_cnt,
            (SELECT COUNT(*) FROM artifacts) AS artifacts_cnt`,
        )
        .get() as Record<string, number>;
      expect(counts.sessions_cnt).toBe(1);
      expect(counts.steps_cnt).toBe(1);
      expect(counts.step_attempts_cnt).toBe(1);
      expect(counts.artifacts_cnt).toBe(1);

      const session = afterRaw
        .query("SELECT id, status FROM sessions WHERE id = ?")
        .get("sid-existing") as Record<string, unknown>;
      expect(session).toBeTruthy();
      expect(session.status).toBe("running");

      const step = afterRaw
        .query(
          "SELECT step_key, type, status, on_fail_action, on_fail_target, on_fail_reset FROM steps WHERE session_id = ?",
        )
        .get("sid-existing") as Record<string, unknown>;
      expect(step).toBeTruthy();
      expect(step.step_key).toBe("step1");
      expect(step.type).toBe("task");
      expect(step.status).toBe("running");
      expect(step.on_fail_action).toBe("goto");
      expect(step.on_fail_target).toBe("step2");
      expect(step.on_fail_reset).toBeNull();

      const attempt = afterRaw
        .query(
          "SELECT attempt_number, result_json, check_status FROM step_attempts WHERE step_id = ?",
        )
        .get(existingStep.id as number) as Record<string, unknown>;
      expect(attempt).toBeTruthy();
      expect(attempt.attempt_number).toBe(1);
      expect(attempt.result_json).toBe("{}");
      expect(attempt.check_status).toBe("pass");

      const artifact = afterRaw
        .query("SELECT artifact_key, file_path FROM artifacts WHERE session_id = ?")
        .get("sid-existing") as Record<string, unknown>;
      expect(artifact).toBeTruthy();
      expect(artifact.artifact_key).toBe("out.md");
      expect(artifact.file_path).toBe("/tmp/out.md");

      const migrations = afterRaw
        .query("SELECT COUNT(*) AS cnt FROM __drizzle_migrations")
        .get() as Record<string, unknown>;
      expect(migrations.cnt).toBe(4);
      const columns = afterRaw
        .query("SELECT name FROM pragma_table_info('sessions') ORDER BY name")
        .all() as { name: string }[];
      const columnNames = columns.map((c) => c.name);
      expect(columnNames).toContain("cwd");
      expect(columnNames).toContain("title");
      const stepColumns = afterRaw
        .query("SELECT name FROM pragma_table_info('steps') ORDER BY name")
        .all() as { name: string }[];
      expect(stepColumns.map((c) => c.name)).toContain("on_fail_reset");
      const migratedSession = afterRaw
        .query("SELECT cwd, title FROM sessions WHERE id = ?")
        .get("sid-existing") as Record<string, unknown>;
      expect(migratedSession.cwd).toBeNull();
      expect(migratedSession.title).toBeNull();
      afterRaw.close();
      db.$client.close();
    });
  });

  describe("Drizzle 行マッピング", () => {
    it("セッションのDB行をSessionRowにマッピングする", () => {
      const dir = newSessionDir("session-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.close();

      const row = db.select().from(sessions).where(eq(sessions.id, "sid-1")).get();
      expect(row?.id).toBe("sid-1");
      expect(row?.workflowId).toBe("wf-1");
      expect(row?.sessionDir).toBe(dir);
      expect(row?.artifactDbPath).toBeNull();
      expect(row?.currentStep).toBeNull();
      expect(row?.status).toBe("running");
      db.$client.close();
    });

    it("ステップのDB行をStepRow（onFailAction/onFailTarget/onFailReset含む）にマッピングする", () => {
      const dir = newSessionDir("step-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target, on_fail_reset)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "goto", "step3", "downstream"],
      );
      raw.close();

      const row = db.select().from(steps).where(eq(steps.stepKey, "step1")).get();
      expect(row?.sessionId).toBe("sid-1");
      expect(row?.stepIndex).toBe(0);
      expect(row?.phase).toBe("Phase");
      expect(row?.type).toBe("task");
      expect(row?.status).toBe("pending");
      expect(row?.retryCount).toBe(0);
      expect(row?.maxRetries).toBe(2);
      expect(row?.onFailAction).toBe("goto");
      expect(row?.onFailTarget).toBe("step3");
      expect(row?.onFailReset).toBe("downstream");
      db.$client.close();
    });

    it("ステップ試行のDB行をStepAttemptRowにマッピングする", () => {
      const dir = newSessionDir("attempt-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort", null],
      );
      const stepRaw = raw.query("SELECT id FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      raw.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        stepRaw.id as number,
        1,
      ]);
      raw.close();

      const row = db
        .select()
        .from(stepAttempts)
        .where(eq(stepAttempts.stepId, stepRaw.id as number))
        .get();
      expect(row?.stepId).toBe(stepRaw.id as number);
      expect(row?.attemptNumber).toBe(1);
      expect(row?.endedAt).toBeNull();
      expect(row?.resultJson).toBeNull();
      expect(row?.checkStatus).toBeNull();
      db.$client.close();
    });

    it("アーティファクトのDB行をArtifactRowにマッピングする", () => {
      const dir = newSessionDir("artifact-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "out.md", "/tmp/out.md", "2026-01-01 00:00:00"],
      );
      raw.close();

      const row = db.select().from(artifacts).where(eq(artifacts.artifactKey, "out.md")).get();
      expect(row?.sessionId).toBe("sid-1");
      expect(row?.stepKey).toBe("step1");
      expect(row?.artifactKey).toBe("out.md");
      expect(row?.filePath).toBe("/tmp/out.md");
      db.$client.close();
    });
  });

  describe("クエリヘルパー", () => {
    it("getArtifactsはセッションのアーティファクトレコードを返す", () => {
      const dir = newSessionDir("get-artifacts");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "a.txt", "/tmp/a.txt", "2026-01-01 00:00:00"],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "b.txt", "/tmp/b.txt", "2026-01-01 00:00:00"],
      );
      raw.close();

      const artifactsResult = getArtifacts(db, "sid-1");
      expect(artifactsResult).toHaveLength(2);
      expect(artifactsResult[0].artifactKey).toBe("a.txt");
      expect(artifactsResult[1].artifactKey).toBe("b.txt");
      db.$client.close();
    });

    it("getPreviousAttemptsは試行番号順に試行サマリーを返す", () => {
      const dir = newSessionDir("get-attempts");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort", null],
      );
      const stepRaw = raw.query("SELECT id FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      const stepId = stepRaw.id as number;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)",
        [stepId, 1, "fail"],
      );
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)",
        [stepId, 2, "pass"],
      );
      raw.close();

      const attempts = getPreviousAttempts(db, stepId);
      expect(attempts).toHaveLength(2);
      expect(attempts[0].attemptNumber).toBe(1);
      expect(attempts[0].checkStatus).toBe("fail");
      expect(attempts[1].attemptNumber).toBe(2);
      expect(attempts[1].checkStatus).toBe("pass");
      db.$client.close();
    });

    it("buildConditionCtxはゲートの選択とアーティファクトを収集する", () => {
      const dir = newSessionDir("condition-ctx");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate", null],
      );
      raw.run(
        `UPDATE steps SET status = 'passed' WHERE session_id = 'sid-1' AND step_key = 'gate_step'`,
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "gate_step", "doc.md", "/tmp/doc.md", "2026-01-01 00:00:00"],
      );
      raw.close();

      const ctx = buildConditionCtx(db, "sid-1");
      const ans = ctx.gateAnswers["gate_step"]?.["decision"] as { value: string };
      expect(ans.value).toBe("approve");
      expect(ctx.artifacts).toHaveLength(1);
      expect(ctx.artifacts[0].artifactKey).toBe("doc.md");
      expect(ctx.sessionDir).toBe(dir);
      expect(ctx.sessionId).toBe("sid-1");
      db.$client.close();
    });

    it("getGateAnswersは最新試行の回答を返す（巻き戻し中でも参照できる）", () => {
      const dir = newSessionDir("gate-answers-latest");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      // revise の巻き戻しでゲートは pending に戻っている
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, status, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", "pending", 1, "escalate"],
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [
          gateRaw.id as number,
          2,
          JSON.stringify({ decision: { value: "revise", input: "要修正" } }),
          "fail",
        ],
      );
      raw.close();

      const answers = getGateAnswers(db, "sid-1");
      expect(answers["gate_step"]?.["decision"]).toEqual({ value: "revise", input: "要修正" });
      db.$client.close();
    });

    it("getGateAnswersは未回答の最新試行があるゲートを含めない", () => {
      const dir = newSessionDir("gate-answers-unanswered");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate"],
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      // 再実行された最新試行はまだ未回答
      raw.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        gateRaw.id as number,
        2,
      ]);
      raw.close();

      const answers = getGateAnswers(db, "sid-1");
      expect(answers["gate_step"]).toBeUndefined();
      db.$client.close();
    });

    it("getGateAnswersはhuman_gate以外のステップの結果を含めない", () => {
      const dir = newSessionDir("gate-answers-non-gate");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "task_step", 0, "Task", "task", 1, "abort"],
      );
      const stepRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "task_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [stepRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.close();

      expect(getGateAnswers(db, "sid-1")).toEqual({});
      db.$client.close();
    });

    it("readGateAnswersHistoryはhuman_gateの全試行の回答をattemptNumber昇順で返す", () => {
      const dir = newSessionDir("gate-answers-history");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate"],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "task_step", 1, "Task", "task", 0, "abort"],
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      const taskRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "task_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      // 未回答の試行は履歴に含めない
      raw.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        gateRaw.id as number,
        2,
      ]);
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [
          gateRaw.id as number,
          3,
          JSON.stringify({ decision: { value: "revise", input: "要修正" } }),
          "fail",
        ],
      );
      // human_gate以外のステップの回答は履歴に含めない
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [taskRaw.id as number, 1, JSON.stringify({ note: "ignored" }), "pass"],
      );
      raw.close();
      db.$client.close();

      const history = readGateAnswersHistory("sid-1");
      expect(history).toHaveLength(2);
      expect(history[0]).toEqual({
        stepKey: "gate_step",
        attemptNumber: 1,
        answers: { decision: { value: "approve" } },
      });
      expect(history[1]).toEqual({
        stepKey: "gate_step",
        attemptNumber: 3,
        answers: { decision: { value: "revise", input: "要修正" } },
      });
    });

    it("readGateAnswersHistoryは存在しないセッションでEngineErrorをスローする", () => {
      newSessionDir("gate-answers-history-missing");
      const db = openDb();
      migrateDb(db);
      db.$client.close();

      expect(() => readGateAnswersHistory("no-such-session")).toThrow(EngineError);
      expect(() => readGateAnswersHistory("no-such-session")).toThrow(
        "Session not found: no-such-session",
      );
    });
  });
});
