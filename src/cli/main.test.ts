import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import type { InitResult } from "../types.ts";

const TEST_BASE_DIR = path.join(path.dirname(__filename), "__test_cli_sessions__");
const FIXTURE_WORKFLOW = path.join(__dirname, "..", "engine", "__fixtures__", "simple-workflow.ts");
const CLI_PATH = path.join(__dirname, "main.ts");

function cleanup(baseDir: string): void {
  if (fs.existsSync(baseDir)) {
    fs.rmSync(baseDir, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

describe("cli integration", () => {
  it("should output JSON on init", async () => {
    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW, "--base-dir", TEST_BASE_DIR],
      {
        stdout: "pipe",
        stderr: "pipe",
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

  it("should output JSON on next", async () => {
    const initProc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW, "--base-dir", TEST_BASE_DIR],
      { stdout: "pipe", stderr: "pipe" },
    );
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "next", "--session", sessionId, "--base-dir", TEST_BASE_DIR],
      { stdout: "pipe", stderr: "pipe" },
    );
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.stepKey).toBe("step1_task");
    expect(parsed.action).toBe("run_subagent");
  });

  it("should output JSON on status", async () => {
    const initProc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW, "--base-dir", TEST_BASE_DIR],
      { stdout: "pipe", stderr: "pipe" },
    );
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    const proc = Bun.spawn(
      ["bun", "run", CLI_PATH, "status", "--session", sessionId, "--base-dir", TEST_BASE_DIR],
      { stdout: "pipe", stderr: "pipe" },
    );
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.sessionId).toBe(sessionId);
    expect(parsed.steps).toHaveLength(3);
  });

  it("should handle report via stdin", async () => {
    const initProc = Bun.spawn(
      ["bun", "run", CLI_PATH, "init", "--workflow", FIXTURE_WORKFLOW, "--base-dir", TEST_BASE_DIR],
      { stdout: "pipe", stderr: "pipe" },
    );
    const initOut = await new Response(initProc.stdout).text();
    await initProc.exited;
    const { sessionId } = JSON.parse(initOut) as InitResult;

    await Bun.spawn([
      "bun",
      "run",
      CLI_PATH,
      "next",
      "--session",
      sessionId,
      "--base-dir",
      TEST_BASE_DIR,
    ]).exited;

    const input = JSON.stringify({
      stepKey: "step1_task",
      status: "completed",
      subagentOutput: "success task done",
    });

    const proc = Bun.spawn({
      cmd: ["bun", "run", CLI_PATH, "report", "--session", sessionId, "--base-dir", TEST_BASE_DIR],
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
    });

    proc.stdin.write(new TextEncoder().encode(input));
    proc.stdin.close();

    const out = await new Response(proc.stdout).text();
    const err = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    expect(exitCode).toBe(0);
    const parsed = JSON.parse(out);
    expect(parsed.nextAction).toBe("continue");
    expect(err).toBe("");
  });

  it("should error without required args", async () => {
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

  it("should error on unknown command", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "bogus"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const err = await new Response(proc.stderr).text();
    await proc.exited;

    expect(proc.exitCode).toBe(1);
    expect(err).toContain("error:");
  });

  it("should show help", async () => {
    const proc = Bun.spawn(["bun", "run", CLI_PATH, "--help"], { stdout: "pipe" });
    const out = await new Response(proc.stdout).text();
    await proc.exited;

    expect(proc.exitCode).toBe(0);
    expect(out).toContain("Usage:");
    expect(out).toContain("init");
    expect(out).toContain("next");
    expect(out).toContain("report");
    expect(out).toContain("status");
  });
});
