#!/usr/bin/env bun
import * as fs from "node:fs";
import { Command } from "commander";
import { init, next, report, status, EngineError } from "../engine/index.ts";
import type { ReportInput } from "../types/result.ts";
import { installCommand } from "./install.ts";
import { updateCommand } from "./update.ts";

interface WorkflowOpts {
  workflow?: string;
}

interface InitOpts extends WorkflowOpts {
  workflow: string;
  session?: string;
}

interface SessionOpts extends WorkflowOpts {
  session: string;
}

function readStdin(): string {
  try {
    return fs.readFileSync(0, "utf-8").trim();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    process.stderr.write(`Warning: failed to read stdin: ${msg}\n`);
    return "";
  }
}

function output(result: unknown): void {
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
}

function buildProgram(): Command {
  const program = new Command();

  program.name("tado").description("Deterministic workflow engine for LLM orchestration");

  program
    .command("init")
    .description("Initialize a new workflow session from a workflow definition")
    .requiredOption("--workflow <path>", "Path to workflow.ts definition file")
    .option("--session <id>", "Session ID")
    .action(async (opts: InitOpts) => {
      const result = await init(opts.workflow, opts.session);
      output(result);
    });

  program
    .command("next")
    .description("Get the next step's prompt (advance the session)")
    .requiredOption("--session <id>", "Session ID")
    .option("--workflow <path>", "Path to workflow.ts definition file")
    .action(async (opts: SessionOpts) => {
      const result = await next(opts.session, opts.workflow);
      output(result);
    });

  program
    .command("report")
    .description("Submit step results via stdin JSON and advance the session")
    .requiredOption("--session <id>", "Session ID")
    .option("--workflow <path>", "Path to workflow.ts definition file")
    .action(async (opts: SessionOpts) => {
      const stdin = readStdin();
      if (!stdin) {
        program.error("report requires JSON input on stdin");
        return;
      }
      let input: ReportInput;
      try {
        input = JSON.parse(stdin) as ReportInput;
      } catch {
        program.error("invalid JSON on stdin");
        return;
      }
      if (!input.stepKey) {
        program.error('report JSON must include "stepKey" field');
        return;
      }
      const result = await report(opts.session, input, opts.workflow);
      output(result);
    });

  program
    .command("status")
    .description("Show the current session state")
    .requiredOption("--session <id>", "Session ID")
    .action((opts: SessionOpts) => {
      const result = status(opts.session);
      output(result);
    });

  program
    .command("install")
    .description("Install tado Skills into an LLM tool (interactive)")
    .action(async () => {
      await installCommand();
    });

  program
    .command("update")
    .description("Update all installed tado Skills to the latest version")
    .action(async () => {
      await updateCommand();
    });

  return program;
}

export async function run(args: readonly string[]): Promise<void> {
  const program = buildProgram();
  try {
    await program.parseAsync(args, { from: "user" });
  } catch (error) {
    if (error instanceof EngineError) {
      process.stderr.write(`${error.message}\n`);
    } else {
      const message = error instanceof Error ? error.message : String(error);
      process.stderr.write(`${message}\n`);
    }
    process.exitCode = 1;
  }
}

if (import.meta.path === Bun.main) {
  void run(process.argv.slice(2));
}
