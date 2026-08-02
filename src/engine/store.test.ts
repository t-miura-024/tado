import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  EngineError,
  importWorkflowDef,
  openDb,
  initDb,
  dbRowToSessionRow,
  dbRowToStepRow,
  dbRowToStepAttemptRow,
  dbRowToArtifactRow,
  getPreviousAttempts,
  getArtifacts,
  buildConditionCtx,
  getTadoHome,
  getWorkflowDbPath,
  openSessionDb,
} from "./store.ts";

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
      const journalMode = db.query("PRAGMA journal_mode").get() as Record<string, unknown>;
      const busyTimeout = db.query("PRAGMA busy_timeout").get() as Record<string, unknown>;

      expect(journalMode.journal_mode).toBe("wal");
      expect(busyTimeout.timeout).toBe(5000);
      db.close();
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
    it("有効なワークフロー定義を読み込む", async () => {
      const def = await importWorkflowDef(FIXTURE_WORKFLOW);
      expect(def.id).toBe("test-simple");
      expect(def.steps).toHaveLength(3);
    });

    it("存在しないワークフローファイルでEngineErrorをスローする", async () => {
      await expect(importWorkflowDef("/nonexistent/workflow.ts")).rejects.toThrow(EngineError);
    });
  });

  describe("スキーマ初期化", () => {
    it("sessions・steps・step_attempts・artifactsテーブルを作成する", () => {
      newSessionDir("schema");
      const db = openDb();
      initDb(db);

      const tables = db
        .query(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`)
        .all() as { name: string }[];
      const names = tables.map((t) => t.name);

      expect(names).toContain("sessions");
      expect(names).toContain("steps");
      expect(names).toContain("step_attempts");
      expect(names).toContain("artifacts");
      db.close();
    });
  });

  describe("行マッパー", () => {
    it("セッションのDB行をSessionRowにマッピングする", () => {
      const dir = newSessionDir("session-row");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );

      const raw = db.query("SELECT * FROM sessions WHERE id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      const row = dbRowToSessionRow(raw);
      expect(row.id).toBe("sid-1");
      expect(row.workflowId).toBe("wf-1");
      expect(row.sessionDir).toBe(dir);
      expect(row.artifactDbPath).toBeNull();
      expect(row.currentStep).toBeNull();
      expect(row.status).toBe("running");
      db.close();
    });

    it("ステップのDB行をStepRowにマッピングする", () => {
      const dir = newSessionDir("step-row");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      db.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort", null],
      );

      const raw = db.query("SELECT * FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      const row = dbRowToStepRow(raw);
      expect(row.sessionId).toBe("sid-1");
      expect(row.stepKey).toBe("step1");
      expect(row.stepIndex).toBe(0);
      expect(row.phase).toBe("Phase");
      expect(row.type).toBe("task");
      expect(row.status).toBe("pending");
      expect(row.retryCount).toBe(0);
      expect(row.maxRetries).toBe(2);
      db.close();
    });

    it("ステップ試行のDB行をStepAttemptRowにマッピングする", () => {
      const dir = newSessionDir("attempt-row");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      db.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort", null],
      );
      const stepRaw = db.query("SELECT id FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      db.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        stepRaw.id as number,
        1,
      ]);

      const raw = db
        .query("SELECT * FROM step_attempts WHERE step_id = ?")
        .get(stepRaw.id as number) as Record<string, unknown>;
      const row = dbRowToStepAttemptRow(raw);
      expect(row.stepId).toBe(stepRaw.id as number);
      expect(row.attemptNumber).toBe(1);
      expect(row.endedAt).toBeNull();
      expect(row.resultJson).toBeNull();
      expect(row.checkStatus).toBeNull();
      db.close();
    });

    it("アーティファクトのDB行をArtifactRowにマッピングする", () => {
      const dir = newSessionDir("artifact-row");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      db.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "out.md", "/tmp/out.md", "2026-01-01 00:00:00"],
      );

      const raw = db.query("SELECT * FROM artifacts WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      const row = dbRowToArtifactRow(raw);
      expect(row.sessionId).toBe("sid-1");
      expect(row.stepKey).toBe("step1");
      expect(row.artifactKey).toBe("out.md");
      expect(row.filePath).toBe("/tmp/out.md");
      db.close();
    });
  });

  describe("クエリヘルパー", () => {
    it("getArtifactsはセッションのアーティファクトレコードを返す", () => {
      const dir = newSessionDir("get-artifacts");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      db.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "a.txt", "/tmp/a.txt", "2026-01-01 00:00:00"],
      );
      db.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "b.txt", "/tmp/b.txt", "2026-01-01 00:00:00"],
      );

      const artifacts = getArtifacts(db, "sid-1");
      expect(artifacts).toHaveLength(2);
      expect(artifacts[0].artifactKey).toBe("a.txt");
      expect(artifacts[1].artifactKey).toBe("b.txt");
      db.close();
    });

    it("getPreviousAttemptsは試行番号順に試行サマリーを返す", () => {
      const dir = newSessionDir("get-attempts");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      db.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort", null],
      );
      const stepRaw = db.query("SELECT id FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      const stepId = stepRaw.id as number;
      db.run("INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)", [
        stepId,
        1,
        "fail",
      ]);
      db.run("INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)", [
        stepId,
        2,
        "pass",
      ]);

      const attempts = getPreviousAttempts(db, stepId);
      expect(attempts).toHaveLength(2);
      expect(attempts[0].attemptNumber).toBe(1);
      expect(attempts[0].checkStatus).toBe("fail");
      expect(attempts[1].attemptNumber).toBe(2);
      expect(attempts[1].checkStatus).toBe("pass");
      db.close();
    });

    it("buildConditionCtxはゲートの選択とアーティファクトを収集する", () => {
      const dir = newSessionDir("condition-ctx");
      const db = openDb();
      initDb(db);
      db.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      db.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate", null],
      );
      db.run(
        `UPDATE steps SET status = 'passed' WHERE session_id = 'sid-1' AND step_key = 'gate_step'`,
      );
      const gateRaw = db
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      db.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, "approve", "pass"],
      );
      db.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "gate_step", "doc.md", "/tmp/doc.md", "2026-01-01 00:00:00"],
      );

      const ctx = buildConditionCtx(db, "sid-1");
      expect(ctx.gateChoices["gate_step"]).toBe("approve");
      expect(ctx.artifacts).toHaveLength(1);
      expect(ctx.artifacts[0].artifactKey).toBe("doc.md");
      db.close();
    });
  });
});
