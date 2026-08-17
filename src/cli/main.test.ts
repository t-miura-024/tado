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

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

describe("CLI統合", () => {
  it("init時にJSONを出力する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW], {
      stdout: "pipe",
      stderr: "pipe",
    });

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
    const initProc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    const proc = Bun.spawn(["bun", "run", CLI_PATH, "next", "--session", sessionId], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.stepKey).toBe("step1_task");
    expect(parsed.action).toBe("run_subagent");
  });

  it("status時にJSONを出力する", async () => {
    const initProc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    const proc = Bun.spawn(["bun", "run", CLI_PATH, "status", "--session", sessionId], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.sessionId).toBe(sessionId);
    expect(parsed.steps).toHaveLength(3);
  });

  it("stdin経由でreportを処理する", async () => {
    const initProc = Bun.spawn(["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    await Bun.spawn(["bun", "run", CLI_PATH, "next", "--session", sessionId]).exited;

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
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("error:");
    expect(err).toContain("--workflow");
  });

  it("不明なコマンドでエラーになる", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "bogus"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("error:");
  });

  it("ヘルプを表示する", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "--help"], { stdout: "pipe" });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("Usage:");
    expect(out).toContain("init");
    expect(out).toContain("next");
    expect(out).toContain("report");
    expect(out).toContain("status");
    expect(out).toContain("install");
    expect(out).toContain("update");
  });

  it("セッションコマンドのヘルプから--base-dirを削除している", async () => {
    for (const command of ["init", "next", "report", "status"]) {
      const proc = Bun.spawn(["bun", "run", CLI_PATH, command, "--help"], { stdout: "pipe" });
      const out = await new Response(proc.stdout).text();
      await proc.exited;

      expect(out).not.toContain("--base-dir");
    }
  });
});
