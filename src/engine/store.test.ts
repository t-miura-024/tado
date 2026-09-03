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
          "SELECT step_key, type, status, on_fail_action, on_fail_target FROM steps WHERE session_id = ?",
        )
        .get("sid-existing") as Record<string, unknown>;
      expect(step).toBeTruthy();
      expect(step.step_key).toBe("step1");
      expect(step.type).toBe("task");
      expect(step.status).toBe("running");
      expect(step.on_fail_action).toBe("goto");
      expect(step.on_fail_target).toBe("step2");

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
      expect(migrations.cnt).toBe(3);
      const columns = afterRaw
        .query("SELECT name FROM pragma_table_info('sessions') ORDER BY name")
        .all() as { name: string }[];
      const columnNames = columns.map((c) => c.name);
      expect(columnNames).toContain("cwd");
      expect(columnNames).toContain("title");
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

    it("ステップのDB行をStepRow（onFailAction/onFailTarget含む）にマッピングする", () => {
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
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "goto", "step3"],
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
      db.$client.close();
    });
  });
});
