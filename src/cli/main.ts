#!/usr/bin/env bun
import * as fs from "node:fs";
import { Command } from "commander";
import {
  init,
  next,
  report,
  status,
  confirm,
  listWorkflows,
  EngineError,
} from "../engine/index.ts";
import type { WorkflowSummary } from "../engine/workflows.ts";
import type { ReportInput } from "../types/result.ts";
import { installCommand } from "./install.ts";
import { updateCommand } from "./update.ts";
import { runDashboardCommand } from "./dashboard.ts";

interface WorkflowOpts {
  workflow?: string;
}

interface InitOpts extends WorkflowOpts {
  workflow: string;
  title: string;
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

function formatWorkflowTable(workflows: WorkflowSummary[], verbose: boolean): string {
  if (workflows.length === 0) {
    return "No workflows found.\n";
  }
  const rows: string[][] = workflows.map((w) => {
    const desc = w.description ?? "-";
    if (verbose) {
      return [w.id, desc, String(w.stepsCount), w.path];
    }
    return [w.id, desc];
  });
  const headers = verbose ? ["ID", "DESCRIPTION", "STEPS", "PATH"] : ["ID", "DESCRIPTION"];
  const allRows = [headers, ...rows];
  const colWidths = headers.map((_, i) => Math.max(...allRows.map((r) => r[i].length)));
  const formatRow = (cols: string[]): string =>
    cols.map((c, i) => (i < cols.length - 1 ? c.padEnd(colWidths[i]) : c)).join("  ");
  const lines = allRows.map((r) => formatRow(r));
  return lines.join("\n") + "\n";
}

interface ListOpts {
  workflow?: boolean;
  json?: boolean;
  verbose?: boolean;
}

function buildProgram(): Command {
  const program = new Command();

  program.name("tado").description("Deterministic workflow engine for LLM orchestration");

  program
    .command("init")
    .description("Initialize a new workflow session from a workflow definition")
    .requiredOption("--workflow <id>", "Workflow ID (e.g. mt-plan-create)")
    .requiredOption("--title <title>", "Session title (1-100 characters, no newline)")
    .option("--session <id>", "Session ID")
    .action(async (opts: InitOpts) => {
      const result = await init(opts.workflow, {
        title: opts.title,
        sessionId: opts.session,
        cwd: process.cwd(),
      });
      output(result);
    });

  program
    .command("next")
    .description("Get the next step's prompt (advance the session)")
    .requiredOption("--session <id>", "Session ID")
    .option("--workflow <id>", "Workflow ID (e.g. mt-plan-create)")
    .action(async (opts: SessionOpts) => {
      const result = await next(opts.session, opts.workflow);
      output(result);
    });

  program
    .command("report")
    .description("Submit step results via stdin JSON and advance the session")
    .requiredOption("--session <id>", "Session ID")
    .option("--workflow <id>", "Workflow ID (e.g. mt-plan-create)")
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
    .command("confirm")
    .description("Record a human gate answer (interactive; requires a TTY)")
    .requiredOption("--session <id>", "Session ID")
    .action(async (opts: SessionOpts) => {
      const result = await confirm(opts.session);
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

  const listCommand = program
    .command("list")
    .description("List available workflows")
    .option("--workflow", "List workflows")
    .option("--json", "Output as JSON")
    .option("--verbose", "Show additional columns (steps, path)")
    .action(async (opts: ListOpts) => {
      if (!opts.workflow) {
        process.stdout.write(listCommand.helpInformation());
        return;
      }
      const workflows = await listWorkflows();
      if (opts.json) {
        output(workflows);
      } else {
        process.stdout.write(formatWorkflowTable(workflows, Boolean(opts.verbose)));
      }
    });

  program
    .command("dashboard")
    .description("Show workflow sessions dashboard (TUI)")
    .action(async () => {
      await runDashboardCommand();
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
      if (await updateCommand()) {
        process.exitCode = 1;
      }
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
