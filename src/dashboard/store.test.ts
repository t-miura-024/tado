import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { checkWorkflowFileExists, loadDashboardSnapshot } from "./store.ts";
import { calcProgress, getDisplayBasename, getDisplayTitle } from "./logic.ts";
import { getWorkflowDbPath, getTadoHome } from "../engine/store.ts";
import { migrateDb, openDb } from "../engine/store.ts";

const TEST_BASE = path.join(import.meta.dir, "__test_dashboard_store__");
process.env.TADO_HOME = TEST_BASE;

function cleanup(): void {
  if (fs.existsSync(TEST_BASE)) fs.rmSync(TEST_BASE, { recursive: true, force: true });
}

afterEach(() => {
  cleanup();
});

function setupDb(): ReturnType<typeof openDb> {
  fs.mkdirSync(TEST_BASE, { recursive: true });
  const db = openDb();
  migrateDb(db);
  return db;
}

describe("dashboard store", () => {
  it("DB不在なら dbMissing=true と空一覧を返す", () => {
    cleanup();
    expect(fs.existsSync(getWorkflowDbPath())).toBe(false);
    const snap = loadDashboardSnapshot("/tmp/any");
    expect(snap.dbMissing).toBe(true);
    expect(snap.sessions).toHaveLength(0);
    expect(snap.selectedSession).toBeUndefined();
  });

  it("0件なら dbMissing=false で (no sessions) 相当の空を返す", () => {
    const db = setupDb();
    db.$client.close();
    const snap = loadDashboardSnapshot("/tmp");
    expect(snap.dbMissing).toBe(false);
    expect(snap.sessions).toHaveLength(0);
    expect(snap.selectedSession).toBeUndefined();
  });

  it("起動時CWDに前方一致するセッションのうち updated_at 最新を選択する", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    // s1: cwd=/tmp/proj, older
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s1",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s1"),
        "/tmp/proj",
        "t1",
        "running",
        "2026-01-01 10:00:00",
      ],
    );
    // s2: cwd=/tmp/proj/sub, newer -> should be selected when launch=/tmp/proj
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s2",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s2"),
        "/tmp/proj/sub",
        "t2",
        "running",
        "2026-01-01 11:00:00",
      ],
    );
    // s3: unrelated, newest overall but not prefix
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s3",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s3"),
        "/tmp/other",
        "t3",
        "running",
        "2026-01-01 12:00:00",
      ],
    );
    raw.close();
    db.$client.close();

    const snap = loadDashboardSnapshot("/tmp/proj");
    expect(snap.selectedSession?.id).toBe("s2");
    expect(snap.stepsBySession.get("s2")).toBeDefined();
  });

  it("該当なしなら全体最新を選択する", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s1",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s1"),
        "/a",
        "t1",
        "running",
        "2026-01-01 10:00:00",
      ],
    );
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s2",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s2"),
        "/b",
        "t2",
        "running",
        "2026-01-01 12:00:00",
      ],
    );
    raw.close();
    db.$client.close();
    const snap = loadDashboardSnapshot("/nomatch");
    expect(snap.selectedSession?.id).toBe("s2");
  });

  it("cwd が null のセッションは workflowPath 親で前方一致判定する", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s1",
        "wf1",
        "/tmp/workflows/proj-a/index.ts",
        path.join(TEST_BASE, "s1"),
        null,
        null,
        "running",
        "2026-01-01 10:00:00",
      ],
    );
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s2",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s2"),
        "/tmp/other",
        "t2",
        "running",
        "2026-01-01 09:00:00",
      ],
    );
    raw.close();
    db.$client.close();
    const snap = loadDashboardSnapshot("/tmp/workflows/proj-a/sub");
    expect(snap.selectedSession?.id).toBe("s1");
    // fallback表示確認: cwd null -> workflowId / workflowPath で代替
    expect(
      getDisplayTitle({
        title: snap.selectedSession!.title,
        workflowId: snap.selectedSession!.workflowId,
      }),
    ).toBe("wf1");
    expect(
      getDisplayBasename({
        cwd: snap.selectedSession!.cwd,
        workflowPath: snap.selectedSession!.workflowPath,
      }),
    ).toBe("proj-a");
  });

  it("steps を sessionId ごとに stepIndex でソートして読み込む", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    raw.run(
      `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "s1",
        "wf1",
        "/tmp/wf/wf1/index.ts",
        path.join(TEST_BASE, "s1"),
        "/tmp/proj",
        "t1",
        "running",
        "2026-01-01 10:00:00",
      ],
    );
    // insert steps out of order
    raw.run(
      `INSERT INTO steps (session_id, step_key, step_index, type, status, max_retries) VALUES (?, ?, ?, ?, ?, ?)`,
      ["s1", "step2", 1, "task", "pending", 3],
    );
    raw.run(
      `INSERT INTO steps (session_id, step_key, step_index, type, status, max_retries) VALUES (?, ?, ?, ?, ?, ?)`,
      ["s1", "step1", 0, "task", "passed", 3],
    );
    raw.close();
    db.$client.close();
    const snap = loadDashboardSnapshot("/tmp/proj");
    const steps = snap.stepsBySession.get("s1")!;
    expect(steps[0].stepKey).toBe("step1");
    expect(steps[1].stepKey).toBe("step2");
    // 進捗率は passed/total (skipped は分子に含めない)  -> 1/2
    const prog = calcProgress(steps);
    expect(prog.passed).toBe(1);
    expect(prog.total).toBe(2);
    expect(prog.text).toBe("1/2");
  });

  it("workflow ファイル不在は checkWorkflowFileExists で検出できる", () => {
    const missing = "/tmp/not-exist-zzz/index.ts";
    expect(checkWorkflowFileExists(missing)).toBe(false);
    const tmpFile = path.join(TEST_BASE, "exists.ts");
    fs.mkdirSync(TEST_BASE, { recursive: true });
    fs.writeFileSync(tmpFile, "export default {}");
    expect(checkWorkflowFileExists(tmpFile)).toBe(true);
  });

  it("TADO_HOME はテストごとに隔離される", () => {
    expect(getTadoHome()).toBe(path.resolve(TEST_BASE));
  });
});
