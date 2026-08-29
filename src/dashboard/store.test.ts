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

  it("limit指定で最新N件のみ返す（totalSessionsは全件数）", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    for (let i = 0; i < 5; i++) {
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `s${i}`,
          "wf1",
          "/tmp/wf/wf1/index.ts",
          path.join(TEST_BASE, `s${i}`),
          "/tmp/proj",
          `t${i}`,
          "running",
          `2026-01-01 0${i}:00:00`,
        ],
      );
    }
    raw.close();
    db.$client.close();
    const snap = loadDashboardSnapshot("/tmp/proj", undefined, { limit: 2 });
    expect(snap.sessions).toHaveLength(2);
    expect(snap.totalSessions).toBe(5);
    // 最新2件（s4, s3）が updatedAt降順で返る
    expect(snap.sessions[0].id).toBe("s4");
    expect(snap.sessions[1].id).toBe("s3");
  });

  it("limit時も選択中セッションが上限外なら必ず含める", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    // s0が最も古いが、focusで指定
    for (let i = 0; i < 5; i++) {
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `s${i}`,
          "wf1",
          "/tmp/wf/wf1/index.ts",
          path.join(TEST_BASE, `s${i}`),
          "/tmp/proj",
          `t${i}`,
          "running",
          `2026-01-01 0${i}:00:00`,
        ],
      );
    }
    raw.close();
    db.$client.close();
    // 最新2件は s4,s3だが、s0をfocus指定すると s4+s0 の2件になる（最新1件＋選択中1件）
    const snap = loadDashboardSnapshot("/tmp/proj", "s0", { limit: 2 });
    expect(snap.sessions).toHaveLength(2);
    expect(snap.totalSessions).toBe(5);
    const ids = snap.sessions.map((s) => s.id);
    expect(ids).toContain("s0");
    expect(ids).toContain("s4");
  });

  it("limitなしなら全件返す", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    for (let i = 0; i < 3; i++) {
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `s${i}`,
          "wf1",
          "/tmp/wf/wf1/index.ts",
          path.join(TEST_BASE, `s${i}`),
          "/tmp/proj",
          `t${i}`,
          "running",
          `2026-01-01 0${i}:00:00`,
        ],
      );
    }
    raw.close();
    db.$client.close();
    const snap = loadDashboardSnapshot("/tmp/proj");
    expect(snap.sessions).toHaveLength(3);
    expect(snap.totalSessions).toBe(3);
  });

  it("limit時に選択中セッションのsteps/artifactsが取得できる", () => {
    const db = setupDb();
    const raw = new Database(getWorkflowDbPath());
    for (let i = 0; i < 5; i++) {
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, cwd, title, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `s${i}`,
          "wf1",
          "/tmp/wf/wf1/index.ts",
          path.join(TEST_BASE, `s${i}`),
          "/tmp/proj",
          `t${i}`,
          "running",
          `2026-01-01 0${i}:00:00`,
        ],
      );
    }
    // s0（古い）にsteps/artifactsを紐付け
    raw.run(
      `INSERT INTO steps (session_id, step_key, step_index, type, status, max_retries) VALUES (?, ?, ?, ?, ?, ?)`,
      ["s0", "step1", 0, "task", "passed", 3],
    );
    raw.run(
      `INSERT INTO artifacts (session_id, step_key, artifact_key, file_path) VALUES (?, ?, ?, ?)`,
      ["s0", "step1", "out.md", "/tmp/out.md"],
    );
    raw.close();
    db.$client.close();
    const snap = loadDashboardSnapshot("/tmp/proj", "s0", { limit: 2 });
    expect(snap.sessions.map((s) => s.id)).toContain("s0");
    expect(snap.stepsBySession.get("s0")).toHaveLength(1);
    expect(snap.stepsBySession.get("s0")![0].stepKey).toBe("step1");
    expect(snap.artifactsBySession.get("s0")).toHaveLength(1);
    // hiddenセッション（s1）は表示されないのでmapに含めない（空表示の原因だった不統一を解消）
    expect(snap.stepsBySession.has("s1")).toBe(false);
  });
});
