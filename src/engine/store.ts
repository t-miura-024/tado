import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { and, desc, eq } from "drizzle-orm";
import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { artifacts as artifactsTable, sessions, stepAttempts, steps } from "./schema.ts";
import type { WorkflowDef } from "../types/workflow-def.ts";
import type { ConditionCtx } from "../types/context.ts";
import type { ArtifactInput, ArtifactRecord } from "../types/artifact.ts";
import type { AttemptSummary } from "../types/result.ts";

export class EngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EngineError";
  }
}

const BUSY_TIMEOUT_MS = 5000;

/** Directory that contains the drizzle migration files (`drizzle/` at repo root). */
const MIGRATIONS_FOLDER = path.join(__dirname, "..", "..", "drizzle");

/** Resolve the root directory used for all tado state and session artifacts. */
export function getTadoHome(): string {
  const configuredHome = process.env.TADO_HOME?.trim();
  return path.resolve(configuredHome || path.join(os.homedir(), ".tado"));
}

/** Resolve the single SQLite database used by all sessions. */
export function getWorkflowDbPath(): string {
  return path.join(getTadoHome(), "workflow.db");
}

export type { ArtifactRow, SessionRow, StepAttemptRow, StepRow } from "./schema.ts";

/**
 * Drizzle database handle for tado.
 *
 * `TadoDb` exposes the query builder APIs; the underlying
 * `bun:sqlite` connection is reachable through `$client` (used for `close()`
 * and PRAGMA inspection).
 */
export type TadoDb = BunSQLiteDatabase & { $client: Database };

export function getWorkflowsDir(): string {
  return path.join(getTadoHome(), "workflows");
}

export function getSessionsDir(): string {
  return path.join(getTadoHome(), "sessions");
}

export function getSessionDir(sessionId: string): string {
  return path.join(getSessionsDir(), sessionId);
}

export function resolveWorkflowPath(workflowId: string): string {
  return path.join(getWorkflowsDir(), workflowId, "index.ts");
}

export function isPathLike(value: string): boolean {
  return value.includes("/") || value.includes("\\");
}

export function ensureTadoHomePackage(): void {
  const home = getTadoHome();
  try {
    fs.mkdirSync(home, { recursive: true });
    const pkgPath = path.join(home, "package.json");
    if (!fs.existsSync(pkgPath)) {
      fs.writeFileSync(pkgPath, '{"private":true}\n');
    }
  } catch (error) {
    console.warn(`[tado] ensureTadoHomePackage failed: ${String(error)}`);
  }
}

export async function importWorkflowDef(workflowId: string): Promise<WorkflowDef> {
  ensureTadoHomePackage();
  const resolved = resolveWorkflowPath(workflowId);
  if (!fs.existsSync(resolved)) {
    let available = "";
    try {
      const dir = getWorkflowsDir();
      const entries = fs.readdirSync(dir);
      const lines: string[] = [];
      for (const entry of entries) {
        const wp = path.join(dir, entry, "index.ts");
        if (!fs.existsSync(wp)) {
          continue;
        }
        try {
          const mod = await import(wp);
          const def: WorkflowDef = mod.default ?? mod;
          if (!def || typeof def.id !== "string" || !Array.isArray(def.steps)) {
            continue;
          }
          if (def.id !== entry) {
            continue;
          }
          lines.push(def.description ? `- ${def.id}: ${def.description}` : `- ${def.id}`);
        } catch {
          console.warn(`[tado] failed to load workflow ${entry} for available list`);
        }
      }
      lines.sort();
      if (lines.length === 0) {
        available =
          "\nAvailable workflows: none\n利用可能なワークフローがありません。ワークフローを作成してから実行してください";
      } else {
        available = `\nAvailable workflows:\n${lines.join("\n")}`;
      }
    } catch {
      available =
        "\nAvailable workflows: none\n利用可能なワークフローがありません。ワークフローを作成してから実行してください";
    }
    throw new EngineError(`Workflow not found: ${workflowId} (tried ${resolved})${available}`);
  }
  const mod = await import(resolved);
  const def: WorkflowDef = mod.default ?? mod;
  if (!def || !def.id || !def.steps) {
    throw new EngineError(`Invalid workflow definition in: ${resolved}`);
  }
  if (def.id !== workflowId) {
    throw new EngineError(
      `Workflow ID mismatch: directory "${workflowId}" contains workflow with id "${def.id}"`,
    );
  }
  return def;
}

export async function importWorkflowDefFromPath(filePath: string): Promise<WorkflowDef> {
  const resolved = path.resolve(filePath);
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

export function openDb(): TadoDb {
  const dbPath = getWorkflowDbPath();
  try {
    const sqlite = new Database(dbPath);
    // 以下の PRAGMA（busy_timeout / journal_mode）は Drizzle では表現できない
    // 接続設定のため raw 実行を維持する。データアクセスは全て Drizzle API で行う。
    sqlite.exec(`PRAGMA busy_timeout = ${BUSY_TIMEOUT_MS};`);
    const journalMode = sqlite.query("PRAGMA journal_mode").get() as Record<string, unknown>;
    if (journalMode.journal_mode !== "wal") {
      sqlite.exec("PRAGMA journal_mode = WAL;");
    }
    return drizzle(sqlite);
  } catch (error) {
    const reason = error instanceof Error ? `: ${error.message}` : `: ${String(error)}`;
    throw new EngineError(`Unable to open session database: ${dbPath}${reason}`);
  }
}

/**
 * Open the shared database.
 *
 * A missing database means that no session has been initialized yet. Once the
 * file exists, however, opening or reading it can fail for operational
 * reasons (permissions, corruption, or a lock timeout), which must not be
 * reported as a missing session.
 */
export function openSessionDb(sessionId: string): TadoDb {
  const dbPath = getWorkflowDbPath();
  try {
    fs.statSync(dbPath);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "ENOENT") {
      throw new EngineError(`Session not found: ${sessionId}`);
    }
    const reason = error instanceof Error ? `: ${error.message}` : `: ${String(error)}`;
    throw new EngineError(`Unable to access session database: ${dbPath}${reason}`);
  }

  let db: TadoDb | undefined;
  try {
    db = openDb();
    db.select({ id: sessions.id }).from(sessions).limit(1).all();
    return db;
  } catch (error) {
    db?.$client.close();
    if (error instanceof EngineError) {
      throw error;
    }
    const reason = error instanceof Error ? `: ${error.message}` : `: ${String(error)}`;
    throw new EngineError(`Unable to read session database: ${dbPath}${reason}`);
  }
}

/**
 * Apply all pending drizzle migrations.
 *
 * Existing databases (e.g. `~/.tado/workflow.db`) are migrated in place
 * without data loss; the baseline migration is idempotent so it becomes a
 * no-op when the tables already exist.
 */
export function migrateDb(db: TadoDb): void {
  migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
}

export function getPreviousAttempts(db: TadoDb, stepId: number): AttemptSummary[] {
  const rows = db
    .select()
    .from(stepAttempts)
    .where(eq(stepAttempts.stepId, stepId))
    .orderBy(stepAttempts.attemptNumber)
    .all();
  return rows.map((r) => ({
    attemptNumber: r.attemptNumber,
    startedAt: r.startedAt,
    endedAt: r.endedAt ?? undefined,
    checkStatus: r.checkStatus ?? undefined,
    checkResults: r.checkResultsJson,
  }));
}

export function getArtifacts(db: TadoDb, sessionId: string): ArtifactRecord[] {
  return db.select().from(artifactsTable).where(eq(artifactsTable.sessionId, sessionId)).all();
}

/**
 * beforeStep / afterStep フックが返した成果物を DB へ登録する。
 * 既存の同名キーの成果物はフック返却値で上書きする（削除してから挿入）。
 *
 * 変換履歴（上書きの記録）は DB には残さない。同名キー衝突が発生したときに
 * ログ出力のみ行う（README「ステップフック」節参照）。
 */
export function registerHookArtifacts(
  db: TadoDb,
  sessionId: string,
  stepKey: string,
  artifacts: ArtifactInput[],
  source: "beforeStep" | "afterStep",
): void {
  if (artifacts.length === 0) {
    return;
  }
  const now = new Date().toISOString().replace("T", " ").substring(0, 19);
  for (const a of artifacts) {
    const existing = db
      .select({ filePath: artifactsTable.filePath })
      .from(artifactsTable)
      .where(and(eq(artifactsTable.sessionId, sessionId), eq(artifactsTable.artifactKey, a.key)))
      .get();
    if (existing) {
      console.warn(
        `[tado] ${source} artifact overwritten: session=${sessionId} step=${stepKey} key=${a.key} (${existing.filePath} -> ${a.path})`,
      );
    }
    db.delete(artifactsTable)
      .where(and(eq(artifactsTable.sessionId, sessionId), eq(artifactsTable.artifactKey, a.key)))
      .run();
    db.insert(artifactsTable)
      .values({
        sessionId,
        stepKey,
        artifactKey: a.key,
        filePath: a.path,
        createdAt: now,
      })
      .run();
  }
}

export function buildConditionCtx(db: TadoDb, sessionId: string): ConditionCtx {
  const artifacts = getArtifacts(db, sessionId);
  const gateChoices: Record<string, string> = {};

  const gateStepRows = db
    .select({ id: steps.id, stepKey: steps.stepKey })
    .from(steps)
    .where(
      and(eq(steps.sessionId, sessionId), eq(steps.type, "human_gate"), eq(steps.status, "passed")),
    )
    .all();

  for (const gs of gateStepRows) {
    const attempt = db
      .select({ resultJson: stepAttempts.resultJson })
      .from(stepAttempts)
      .where(and(eq(stepAttempts.stepId, gs.id), eq(stepAttempts.checkStatus, "pass")))
      .orderBy(desc(stepAttempts.attemptNumber))
      .limit(1)
      .get();
    if (attempt?.resultJson) {
      gateChoices[gs.stepKey] = attempt.resultJson.trim();
    }
  }

  return { gateChoices, artifacts };
}
