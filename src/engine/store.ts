import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { artifacts as artifactsTable, sessions, stepAttempts, steps } from "./schema.ts";
import type { GateAnswer, StepDef, WorkflowDef } from "../types/workflow-def.ts";
import type { ConditionCtx, GateAnswers } from "../types/context.ts";
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
  validateWorkflowDef(def, resolved);
  return def;
}

/**
 * onFail 戦略を検証する（ADR-0025）。
 *
 * ワークフロー定義は動的 import で読み込まれ型検査が効かないため、削除済み
 * フィールド（requeueSource）・未知の値・解決不能な分岐先をロード時に
 * EngineError で拒否し、無言の挙動変更を排除する。
 */
function validateOnFail(step: StepDef, stepIndexByKey: Map<string, number>, source: string): void {
  const onFail = step.onFail as unknown as Record<string, unknown> | undefined;
  if (!onFail || typeof onFail !== "object") {
    throw new EngineError(`Invalid onFail in step "${step.key}" (${source}): must be an object`);
  }
  for (const field of Object.keys(onFail)) {
    if (field === "requeueSource") {
      // 旧実装は requeueSource === true のときだけ再キューし、false / 未指定は
      // 失敗元を failed のまま残していた。値によって正しい移行手順が異なるため、
      // 案内メッセージを値で分岐する（ADR-0025）。
      if (onFail.requeueSource === true) {
        throw new EngineError(
          `Invalid onFail.requeueSource in step "${step.key}" (${source}): requeueSource has been replaced by reset: "downstream". Replace requeueSource: true with reset: "downstream" before deploying this engine version`,
        );
      }
      throw new EngineError(
        `Invalid onFail.requeueSource in step "${step.key}" (${source}): requeueSource has been removed. Remove the field; the default behavior (the failing step stays failed, no reset) is unchanged`,
      );
    }
    if (field !== "action" && field !== "target" && field !== "reset") {
      throw new EngineError(`Unknown onFail field "${field}" in step "${step.key}" (${source})`);
    }
  }

  const action = onFail.action;
  if (action !== "retry" && action !== "goto" && action !== "abort" && action !== "escalate") {
    throw new EngineError(
      `Invalid onFail.action "${String(action)}" in step "${step.key}" (${source}): must be one of retry | goto | abort | escalate`,
    );
  }

  // human_gate の revise は onFail.target を差し戻し先のフォールバックとして
  // 参照する（confirm.ts の revise 経路）。onFail.reset はゲートではどこからも
  // 参照されない死んだ設定のため、無言で無視せずロード時に拒否する（ADR-0025）。
  if (step.type === "human_gate") {
    if (onFail.reset !== undefined) {
      throw new EngineError(
        `Invalid onFail.reset in step "${step.key}" (${source}): reset is not supported on human_gate steps; use humanGate.reviseTargetStep to control revise rewinding`,
      );
    }
    const gateTarget = onFail.target;
    if (gateTarget !== undefined) {
      if (typeof gateTarget !== "string" || gateTarget === "") {
        throw new EngineError(
          `Invalid onFail.target in step "${step.key}" (${source}): must be a non-empty string`,
        );
      }
      const targetIndex = stepIndexByKey.get(gateTarget);
      if (targetIndex === undefined) {
        throw new EngineError(
          `Invalid onFail.target "${gateTarget}" in step "${step.key}" (${source}): step not found`,
        );
      }
      const gateIndex = stepIndexByKey.get(step.key);
      if (gateIndex !== undefined && targetIndex > gateIndex) {
        throw new EngineError(
          `Invalid onFail.target "${gateTarget}" in step "${step.key}" (${source}): target must not be after the gate step`,
        );
      }
    }
    return;
  }

  if (action !== "goto") {
    // target / reset は goto のときのみ意味を持つ。併記された設定ミスを
    // 無言で無視せず、ロード時に拒否する（ADR-0025）。
    if (onFail.reset !== undefined) {
      throw new EngineError(
        `Invalid onFail.reset in step "${step.key}" (${source}): reset is only valid when action is "goto"`,
      );
    }
    if (onFail.target !== undefined) {
      throw new EngineError(
        `Invalid onFail.target in step "${step.key}" (${source}): target is only valid when action is "goto"`,
      );
    }
    return;
  }

  const target = onFail.target;
  if (typeof target !== "string" || target === "") {
    throw new EngineError(
      `Invalid onFail.target in step "${step.key}" (${source}): must be a non-empty string when action is "goto"`,
    );
  }
  const targetIndex = stepIndexByKey.get(target);
  if (targetIndex === undefined) {
    throw new EngineError(
      `Invalid onFail.target "${target}" in step "${step.key}" (${source}): step not found`,
    );
  }
  const reset = onFail.reset;
  if (reset !== undefined && reset !== "downstream") {
    throw new EngineError(
      `Invalid onFail.reset "${String(reset)}" in step "${step.key}" (${source}): must be "downstream"`,
    );
  }
  const stepIndex = stepIndexByKey.get(step.key);
  if (reset === "downstream" && stepIndex !== undefined && targetIndex > stepIndex) {
    throw new EngineError(
      `Invalid onFail.target "${target}" in step "${step.key}" (${source}): target must not be after the failing step when reset is "downstream"`,
    );
  }
  // 後方 goto（分岐先が失敗元より前）で reset を省略すると、失敗元が failed の
  // まま残り、後続が pending なら未解決の失敗を無視して先へ進めてしまう。
  // 巻き戻しを伴わない後方 goto はロード時に拒否する（ADR-0025）。
  if (reset !== "downstream" && stepIndex !== undefined && targetIndex < stepIndex) {
    throw new EngineError(
      `Invalid onFail.target "${target}" in step "${step.key}" (${source}): backward goto requires reset: "downstream" so the failing step is rewound with the target`,
    );
  }
}

function validateWorkflowDef(def: WorkflowDef, source: string): void {
  const stepIndexByKey = new Map<string, number>();
  def.steps.forEach((step, index) => stepIndexByKey.set(step.key, index));

  for (const step of def.steps) {
    validateOnFail(step, stepIndexByKey, source);
    if (step.type !== "human_gate" || !step.humanGate) continue;
    const hg = step.humanGate;
    if (!hg.outcomeQuestionKey || typeof hg.outcomeQuestionKey !== "string") {
      throw new EngineError(
        `Invalid humanGate.outcomeQuestionKey in step "${step.key}" (${source}): must be non-empty string`,
      );
    }
    if (!Array.isArray(hg.questions) || hg.questions.length === 0) {
      throw new EngineError(
        `Invalid humanGate.questions in step "${step.key}" (${source}): must be non-empty array`,
      );
    }
    const keys = new Set<string>();
    for (const q of hg.questions) {
      if (!q.key || typeof q.key !== "string") {
        throw new EngineError(`Invalid GateQuestion.key in step "${step.key}" (${source})`);
      }
      if (keys.has(q.key)) {
        throw new EngineError(
          `Duplicate GateQuestion.key "${q.key}" in step "${step.key}" (${source})`,
        );
      }
      keys.add(q.key);
      if (q.type !== "single_choice" && q.type !== "free_text" && q.type !== "choice_with_input") {
        throw new EngineError(
          `Invalid GateQuestion.type "${q.type}" in step "${step.key}" key "${q.key}" (${source})`,
        );
      }
      if (
        (q.type === "single_choice" || q.type === "choice_with_input") &&
        (!q.choices || q.choices.length === 0)
      ) {
        throw new EngineError(
          `GateQuestion "${q.key}" in step "${step.key}" (${source}) requires non-empty choices`,
        );
      }
      if (q.choices) {
        const cvals = new Set<string>();
        for (const c of q.choices) {
          if (!c.value || typeof c.value !== "string") {
            throw new EngineError(
              `Invalid GateChoice.value in step "${step.key}" question "${q.key}" (${source})`,
            );
          }
          if (cvals.has(c.value)) {
            throw new EngineError(
              `Duplicate GateChoice.value "${c.value}" in step "${step.key}" question "${q.key}" (${source})`,
            );
          }
          cvals.add(c.value);
        }
      }
    }
    if (!keys.has(hg.outcomeQuestionKey)) {
      throw new EngineError(
        `humanGate.outcomeQuestionKey "${hg.outcomeQuestionKey}" not found in questions for step "${step.key}" (${source})`,
      );
    }
    const outcomeQ = hg.questions.find((q) => q.key === hg.outcomeQuestionKey)!;
    if (outcomeQ.type !== "single_choice" && outcomeQ.type !== "choice_with_input") {
      throw new EngineError(
        `outcomeQuestion "${hg.outcomeQuestionKey}" in step "${step.key}" (${source}) must be single_choice or choice_with_input`,
      );
    }
    if (hg.reviseTargetStep !== undefined) {
      if (typeof hg.reviseTargetStep !== "string" || hg.reviseTargetStep === "") {
        throw new EngineError(
          `Invalid humanGate.reviseTargetStep in step "${step.key}" (${source}): must be a non-empty string`,
        );
      }
      const reviseTargetIndex = stepIndexByKey.get(hg.reviseTargetStep);
      if (reviseTargetIndex === undefined) {
        throw new EngineError(
          `Invalid humanGate.reviseTargetStep "${hg.reviseTargetStep}" in step "${step.key}" (${source}): step not found`,
        );
      }
      const gateStepIndex = stepIndexByKey.get(step.key);
      if (gateStepIndex !== undefined && reviseTargetIndex > gateStepIndex) {
        throw new EngineError(
          `Invalid humanGate.reviseTargetStep "${hg.reviseTargetStep}" in step "${step.key}" (${source}): target must not be after the gate step`,
        );
      }
    }
  }
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
  validateWorkflowDef(def, resolved);
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

/**
 * 指定範囲のステップを pending + retryCount=0 に巻き戻す（ADR-0025）。
 *
 * `fromStepIndex` から `toStepIndex`（両端を含む）までの範囲を対象とする。
 * `toStepIndex` を省略した場合は `fromStepIndex` 以降の全ステップを対象とする
 * （confirm の revise 巻き戻し）。
 */
export function rewindSteps(
  db: TadoDb,
  sessionId: string,
  fromStepIndex: number,
  toStepIndex?: number,
): void {
  const conditions = [eq(steps.sessionId, sessionId), gte(steps.stepIndex, fromStepIndex)];
  if (toStepIndex !== undefined) {
    conditions.push(lte(steps.stepIndex, toStepIndex));
  }
  db.update(steps)
    .set({ status: "pending", retryCount: 0 })
    .where(and(...conditions))
    .run();
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

/**
 * resultJson をゲート回答として解釈する。オブジェクト以外・壊れた JSON は
 * 警告して null を返し、読み出し側は当該試行を読み飛ばす。
 */
function parseGateAnswers(resultJson: string, stepKey: string): Record<string, GateAnswer> | null {
  try {
    const parsed = JSON.parse(resultJson);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, GateAnswer>;
    }
    console.warn(
      `[tado] malformed gateAnswers for step ${stepKey}: not an object, resultJson=${resultJson.slice(0, 200)}`,
    );
  } catch (e) {
    console.warn(
      `[tado] malformed gateAnswers JSON for step ${stepKey}: ${String(e)}, resultJson=${resultJson.slice(0, 200)}`,
    );
  }
  return null;
}

/**
 * ゲートごとの最新試行の回答を収集する（ADR-0024）。
 *
 * human_gate ステップの最新試行（attempt_number 最大）に記録された回答のみを
 * 返す。approve / revise を問わず、ステップの状態や試行の checkStatus には
 * 依存しないため、revise で巻き戻されたサイクルの再実行中でも回答を参照できる。
 * 回答がまだ記録されていないゲートは含めない。
 */
export function getGateAnswers(db: TadoDb, sessionId: string): GateAnswers {
  const gateAnswers: GateAnswers = {};

  const gateStepRows = db
    .select({ id: steps.id, stepKey: steps.stepKey })
    .from(steps)
    .where(and(eq(steps.sessionId, sessionId), eq(steps.type, "human_gate")))
    .all();

  for (const gs of gateStepRows) {
    const attempt = db
      .select({ resultJson: stepAttempts.resultJson })
      .from(stepAttempts)
      .where(eq(stepAttempts.stepId, gs.id))
      .orderBy(desc(stepAttempts.attemptNumber))
      .limit(1)
      .get();
    if (!attempt?.resultJson) {
      continue;
    }
    const answers = parseGateAnswers(attempt.resultJson, gs.stepKey);
    if (answers) {
      gateAnswers[gs.stepKey] = answers;
    }
  }

  return gateAnswers;
}

/**
 * セッションの存在を確認した上で、ゲートごとの最新回答を返す（ADR-0024）。
 *
 * engine の外側（CLI など）が使う読み出し専用 API。DB のオープンとクローズは
 * 内部で完結し、存在しないセッションは EngineError として明示する。
 */
export function readGateAnswers(sessionId: string): GateAnswers {
  const db = openSessionDb(sessionId);
  try {
    const session = db
      .select({ id: sessions.id })
      .from(sessions)
      .where(eq(sessions.id, sessionId))
      .get();
    if (!session) {
      throw new EngineError(`Session not found: ${sessionId}`);
    }
    return getGateAnswers(db, sessionId);
  } finally {
    db.$client.close();
  }
}

/** human_gate の1試行分の回答（`readGateAnswersHistory` の要素）。 */
export interface GateAnswersHistoryEntry {
  stepKey: string;
  attemptNumber: number;
  answers: Record<string, GateAnswer>;
}

/**
 * human_gate の全試行の回答を attemptNumber 昇順で収集する。
 *
 * resultJson が記録済みの試行のみを対象とする（未回答の試行は含めない）。
 * malformed な JSON は getGateAnswers と同じ方針で警告して読み飛ばす。
 */
function getGateAnswersHistory(db: TadoDb, sessionId: string): GateAnswersHistoryEntry[] {
  const history: GateAnswersHistoryEntry[] = [];

  const gateStepRows = db
    .select({ id: steps.id, stepKey: steps.stepKey })
    .from(steps)
    .where(and(eq(steps.sessionId, sessionId), eq(steps.type, "human_gate")))
    .orderBy(steps.stepIndex)
    .all();

  for (const gs of gateStepRows) {
    const attemptRows = db
      .select({ attemptNumber: stepAttempts.attemptNumber, resultJson: stepAttempts.resultJson })
      .from(stepAttempts)
      .where(eq(stepAttempts.stepId, gs.id))
      .orderBy(stepAttempts.attemptNumber)
      .all();
    for (const attempt of attemptRows) {
      if (!attempt.resultJson) {
        continue;
      }
      const answers = parseGateAnswers(attempt.resultJson, gs.stepKey);
      if (answers) {
        history.push({
          stepKey: gs.stepKey,
          attemptNumber: attempt.attemptNumber,
          answers,
        });
      }
    }
  }

  return history;
}

/**
 * セッションの存在を確認した上で、ゲートごとの全試行の回答履歴を返す。
 *
 * engine の外側（CLI など）が使う読み出し専用 API。DB のオープンとクローズは
 * 内部で完結し、存在しないセッションは EngineError として明示する。
 */
export function readGateAnswersHistory(sessionId: string): GateAnswersHistoryEntry[] {
  const db = openSessionDb(sessionId);
  try {
    const session = db
      .select({ id: sessions.id })
      .from(sessions)
      .where(eq(sessions.id, sessionId))
      .get();
    if (!session) {
      throw new EngineError(`Session not found: ${sessionId}`);
    }
    return getGateAnswersHistory(db, sessionId);
  } finally {
    db.$client.close();
  }
}

export function buildConditionCtx(db: TadoDb, sessionId: string): ConditionCtx {
  const session = db
    .select({ sessionDir: sessions.sessionDir })
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .get();
  if (!session) {
    throw new EngineError(`Session not found: ${sessionId}`);
  }
  return {
    sessionDir: session.sessionDir,
    sessionId,
    gateAnswers: getGateAnswers(db, sessionId),
    artifacts: getArtifacts(db, sessionId),
  };
}
