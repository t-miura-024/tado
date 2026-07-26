import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import type { WorkflowDef, AttemptSummary, ArtifactRecord, ConditionCtx } from "../types.ts";

export class EngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EngineError";
  }
}

/**
 * Default base directory for session storage.
 * Each session lives in `{DEFAULT_BASE_DIR}/{sessionId}/` with its `workflow.db`.
 */
export const DEFAULT_BASE_DIR = path.resolve("tmp", "tado");

export interface SessionRow {
  id: string;
  workflowId: string;
  sessionDir: string;
  artifactDbPath: string | null;
  currentStep: string | null;
  status: "running" | "paused" | "done" | "aborted";
  createdAt: string;
  updatedAt: string;
}

export interface StepRow {
  id: number;
  sessionId: string;
  stepKey: string;
  stepIndex: number;
  phase: string | null;
  type: "task" | "human_gate" | "parallel";
  status: "pending" | "running" | "passed" | "failed" | "skipped";
  retryCount: number;
  maxRetries: number;
  createdAt: string;
}

export interface StepAttemptRow {
  id: number;
  stepId: number;
  attemptNumber: number;
  startedAt: string;
  endedAt: string | null;
  resultJson: string | null;
  subtaskResultsJson: string | null;
  checkResultsJson: string | null;
  checkStatus: "pass" | "fail" | "error" | null;
}

export interface ArtifactRow {
  id: number;
  sessionId: string;
  stepKey: string;
  artifactKey: string;
  filePath: string;
  createdAt: string;
}

export async function importWorkflowDef(workflowPath: string): Promise<WorkflowDef> {
  const resolved = path.resolve(workflowPath);
  if (!fs.existsSync(resolved)) {
    throw new EngineError(`Workflow file not found: ${resolved}`);
  }
  const mod = await import(resolved);
  const def: WorkflowDef = mod.default ?? mod;
  if (!def || !def.id || !def.steps) {
    throw new EngineError(`Invalid workflow definition in: ${resolved}`);
  }
  return def;
}

export function openDb(sessionDir: string): Database {
  const dbPath = path.join(sessionDir, "workflow.db");
  try {
    return new Database(dbPath);
  } catch {
    throw new EngineError(`Session database not found: ${sessionDir}`);
  }
}

export function initDb(db: Database): void {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(schema);
}

export function dbRowToSessionRow(row: Record<string, unknown>): SessionRow {
  return {
    id: row.id as string,
    workflowId: row.workflow_id as string,
    sessionDir: row.session_dir as string,
    artifactDbPath: row.artifact_db_path as string | null,
    currentStep: row.current_step as string | null,
    status: row.status as SessionRow["status"],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function dbRowToStepRow(row: Record<string, unknown>): StepRow {
  return {
    id: row.id as number,
    sessionId: row.session_id as string,
    stepKey: row.step_key as string,
    stepIndex: row.step_index as number,
    phase: row.phase as string | null,
    type: row.type as StepRow["type"],
    status: row.status as StepRow["status"],
    retryCount: row.retry_count as number,
    maxRetries: row.max_retries as number,
    createdAt: row.created_at as string,
  };
}

export function dbRowToStepAttemptRow(row: Record<string, unknown>): StepAttemptRow {
  return {
    id: row.id as number,
    stepId: row.step_id as number,
    attemptNumber: row.attempt_number as number,
    startedAt: row.started_at as string,
    endedAt: row.ended_at as string | null,
    resultJson: row.result_json as string | null,
    subtaskResultsJson: row.subtask_results_json as string | null,
    checkResultsJson: row.check_results_json as string | null,
    checkStatus: row.check_status as StepAttemptRow["checkStatus"],
  };
}

export function dbRowToArtifactRow(row: Record<string, unknown>): ArtifactRow {
  return {
    id: row.id as number,
    sessionId: row.session_id as string,
    stepKey: row.step_key as string,
    artifactKey: row.artifact_key as string,
    filePath: row.file_path as string,
    createdAt: row.created_at as string,
  };
}

export function getPreviousAttempts(db: Database, stepId: number): AttemptSummary[] {
  const rows = db
    .query("SELECT * FROM step_attempts WHERE step_id = ? ORDER BY attempt_number")
    .all(stepId) as Record<string, unknown>[];
  return rows.map((r) => ({
    attemptNumber: r.attempt_number as number,
    startedAt: r.started_at as string,
    endedAt: r.ended_at as string | null,
    checkStatus: r.check_status as string | null,
    checkResults: r.check_results_json as string | null,
  }));
}

export function getArtifacts(db: Database, sessionId: string): ArtifactRecord[] {
  const rows = db.query("SELECT * FROM artifacts WHERE session_id = ?").all(sessionId) as Record<
    string,
    unknown
  >[];
  return rows.map((r) => dbRowToArtifactRow(r));
}

export function buildConditionCtx(db: Database, sessionId: string): ConditionCtx {
  const artifacts = getArtifacts(db, sessionId);
  const gateChoices: Record<string, string> = {};

  const gateStepRows = db
    .query(
      `SELECT id, step_key FROM steps WHERE session_id = ? AND type = 'human_gate' AND status = 'passed'`,
    )
    .all(sessionId) as Record<string, unknown>[];

  for (const gs of gateStepRows) {
    const attempt = db
      .query(
        `SELECT result_json FROM step_attempts WHERE step_id = ? AND check_status = 'pass' ORDER BY attempt_number DESC LIMIT 1`,
      )
      .get(gs.id as number) as Record<string, unknown> | undefined;
    if (attempt?.result_json) {
      gateChoices[gs.step_key as string] = (attempt.result_json as string).trim();
    }
  }

  return { gateChoices, artifacts };
}
