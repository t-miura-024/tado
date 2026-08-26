import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import type { InitResult } from "../types/result.ts";

const TEST_BASE_DIR = path.join(path.dirname(__filename), "__test_cli_sessions__");
process.env.TADO_HOME = TEST_BASE_DIR;
const FIXTURE_WORKFLOW = path.join(__dirname, "..", "engine", "__fixtures__", "simple-workflow.ts");
const CLI_PATH = path.join(__dirname, "main.ts");

function cleanup(tadoHome: string): void {
  if (fs.existsSync(tadoHome)) {
    fs.rmSync(tadoHome, { recursive: true, force: true });
  }
}

function setupWorkflow(id = "test-simple"): void {
  const dir = path.join(TEST_BASE_DIR, "workflows", id);
  fs.mkdirSync(dir, { recursive: true });
  const content = fs.readFileSync(FIXTURE_WORKFLOW, "utf-8");
  fs.writeFileSync(path.join(dir, "index.ts"), content);
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

describe("CLI統合", () => {
  it("init時にJSONを出力する（ID解決）", async () => {
    setupWorkflow();
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", "test-title"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );

    const out = await new Response(proc.stdout).text();
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out) as InitResult;
    expect(parsed.sessionId).toBeTruthy();
    expect(parsed.workflowId).toBe("test-simple");
    expect(err).toBe("");
  });

  it("next時にJSONを出力する", async () => {
    setupWorkflow();
    const initProc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", "test-title"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    const proc = Bun.spawn(["bun", "run", CLI_PATH, "next", "--session", sessionId], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.stepKey).toBe("step1_task");
    expect(parsed.action).toBe("run_subagent");
  });

  it("status時にJSONを出力する", async () => {
    setupWorkflow();
    const initProc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", "test-title"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    const proc = Bun.spawn(["bun", "run", CLI_PATH, "status", "--session", sessionId], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.sessionId).toBe(sessionId);
    expect(parsed.steps).toHaveLength(3);
  });

  it("stdin経由でreportを処理する", async () => {
    setupWorkflow();
    const initProc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", "test-title"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    await Bun.spawn(["bun", "run", CLI_PATH, "next", "--session", sessionId], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    }).exited;

    const input = JSON.stringify({
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    const proc = Bun.spawn({
      cmd: ["bun", "run", CLI_PATH, "report", "--session", sessionId],
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });

    proc.stdin.write(new TextEncoder().encode(input));
    proc.stdin.end();

    const out = await new Response(proc.stdout).text();
    const err = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    expect(exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.nextAction).toBe("continue");
    expect(err).toBe("");
  });

  it("必須引数なしでエラーになる", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "init"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("error:");
    expect(err).toContain("--workflow");
  });

  it("--title なしでエラーになる", async () => {
    setupWorkflow();
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--workflow", "test-simple"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("--title");
  });

  it("--workflow ありで --title だけ欠けた場合も --title エラー", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--workflow", "any"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("--title");
  });

  it("空の --title でエラーになる", async () => {
    setupWorkflow();
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", ""],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("Invalid --title");
  });

  it("101文字の --title でエラーになる", async () => {
    setupWorkflow();
    const longTitle = "x".repeat(101);
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", longTitle],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("Invalid --title");
  });

  it("改行を含む --title でエラーになる", async () => {
    setupWorkflow();
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", "a\nb"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("Invalid --title");
  });

  it("復帰を含む --title でエラーになる", async () => {
    setupWorkflow();
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", "a\rb"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("Invalid --title");
  });

  it("--title 指定時に cwd と title が DB に保存される", async () => {
    setupWorkflow();
    const title = "my-cli-title";
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "test-simple", "--title", title],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out) as InitResult;
    const { Database } = await import("bun:sqlite");
    const db = new Database(`${TEST_BASE_DIR}/workflow.db`);
    const row = db
      .query("SELECT cwd, title FROM sessions WHERE id = ?")
      .get(parsed.sessionId) as Record<string, unknown>;
    expect(row.title).toBe(title);
    expect(typeof row.cwd).toBe("string");
    expect((row.cwd as string).length).toBeGreaterThan(0);
    expect(path.isAbsolute(row.cwd as string)).toBe(true);
    db.close();
  });

  it("--title と --session 同時指定で両方が保存される", async () => {
    setupWorkflow();
    const title = "custom-session-title";
    const proc = Bun.spawn(
      [
        "bun",
        "run",
        CLI_PATH,
        "init",
        "--workflow",
        "test-simple",
        "--title",
        title,
        "--session",
        "my-session-id",
      ],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out) as InitResult;
    expect(parsed.sessionId).toBe("my-session-id");
    const { Database } = await import("bun:sqlite");
    const db = new Database(`${TEST_BASE_DIR}/workflow.db`);
    const row = db.query("SELECT title FROM sessions WHERE id = ?").get("my-session-id") as Record<
      string,
      unknown
    >;
    expect(row.title).toBe(title);
    db.close();
  });

  it("--title ヘルプが init --help に表示される", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--help"], {
      stdout: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(out).toContain("--title");
  });

  it("不明なコマンドでエラーになる", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "bogus"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("error:");
  });

  it("ヘルプを表示する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "--help"], {
      stdout: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("Usage:");
    expect(out).toContain("init");
    expect(out).toContain("next");
    expect(out).toContain("report");
    expect(out).toContain("confirm");
    expect(out).toContain("status");
    expect(out).toContain("install");
    expect(out).toContain("update");
  });

  it("セッションコマンドのヘルプから--base-dirを削除している", async () => {
    for (const command of ["init", "next", "report", "status"]) {
      const proc = Bun.spawn(["bun", "run", CLI_PATH, command, "--help"], {
        stdout: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      });
      const out = await new Response(proc.stdout).text();
      await proc.exited;

      expect(out).not.toContain("--base-dir");
    }
  });

  it("存在しないワークフローIDで Workflow not found エラーになる", async () => {
    setupWorkflow();
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", "nonexistent", "--title", "test-title"],
      {
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
      },
    );
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("Workflow not found: nonexistent");
    expect(err).toContain("tried");
    expect(err).toContain("Available workflows");
  });

  it("--workflow オプションのヘルプが Workflow ID を説明する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--help"], {
      stdout: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(out).toContain("Workflow ID");
  });

  it("ヘルプに list を含む", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "--help"], {
      stdout: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(out).toContain("list");
  });

  it("list --help でオプションを表示する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--help"], {
      stdout: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("--workflow");
    expect(out).toContain("--json");
    expect(out).toContain("--verbose");
  });

  it("tado list 単体でヘルプを表示する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("List available workflows");
    expect(out).toContain("--workflow");
  });

  it("list --workflow で0件時にメッセージを出力する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--workflow"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toBe("No workflows found.\n");
  });

  it("list --workflow --json で0件時に空配列を出力する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--workflow", "--json"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(JSON.parse(out)).toEqual([]);
  });

  it("list --workflow でワークフロー一覧をテーブル出力する", async () => {
    setupWorkflow();
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--workflow"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("ID");
    expect(out).toContain("DESCRIPTION");
    expect(out).toContain("test-simple");
  });

  it("list --workflow --json で全フィールドを出力する", async () => {
    setupWorkflow();
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--workflow", "--json"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe("test-simple");
    expect(parsed[0].stepsCount).toBe(3);
    expect(parsed[0].path).toContain(path.join("test-simple", "index.ts"));
  });

  it("list --workflow --verbose で追加列を表示する", async () => {
    setupWorkflow();
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--workflow", "--verbose"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("STEPS");
    expect(out).toContain("PATH");
  });

  it("list --workflow --json --verbose で全フィールドを出力する（verboseは無視）", async () => {
    setupWorkflow();
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "list", "--workflow", "--json", "--verbose"], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, TADO_HOME: TEST_BASE_DIR },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].id).toBe("test-simple");
  });
});
