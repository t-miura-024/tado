import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { and, count, desc, eq, gt, gte, inArray, lte, ne, notInArray, sql } from "drizzle-orm";
import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { artifacts as artifactsTable, sessions, stepAttempts, steps } from "./schema.ts";
import type { StepRow } from "./schema.ts";
import type {
  ExecutableStepDef,
  GateAnswer,
  LoopStepDef,
  OnExhaustedStrategy,
  ParallelStepDef,
  StepDef,
  WorkflowDef,
} from "../types/workflow-def.ts";
import type { ConditionCtx, GateAnswers, LoopContext } from "../types/context.ts";
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

/** フラット化したステップ定義。`parentKey` は最内の loop 行の key（ルート直下は null）。 */
export interface FlattenedStepDef {
  def: StepDef;
  parentKey: string | null;
}

/**
 * ネストした loop 本体を DFS 先行順に平坦化する。
 *
 * init の steps 行採番とロード時検証が同じ順序を共有し、親子関係
 * （`parentStepId`）と stepIndex の対応を一致させる。
 */
export function flattenStepDefs(steps: StepDef[]): FlattenedStepDef[] {
  const flattened: FlattenedStepDef[] = [];
  const visit = (list: StepDef[], parentKey: string | null): void => {
    for (const step of list) {
      flattened.push({ def: step, parentKey });
      if (step.type === "loop") {
        visit(step.body ?? [], step.key);
      }
    }
  };
  visit(steps, null);
  return flattened;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * onFail 戦略を検証する。
 *
 * ワークフロー定義は動的 import で読み込まれ型検査が効かないため、削除済み
 * フィールド（goto の target / reset・旧 requeueSource）や未知の値をロード時に
 * EngineError で拒否し、無言の挙動変更を排除する。
 */
function validateOnFail(step: ExecutableStepDef, source: string): void {
  const onFail = (step as { onFail?: unknown }).onFail;
  if (!isRecord(onFail)) {
    throw new EngineError(`Invalid onFail in step "${step.key}" (${source}): must be an object`);
  }
  for (const field of Object.keys(onFail)) {
    if (field === "action") {
      continue;
    }
    if (field === "target" || field === "reset" || field === "requeueSource") {
      throw new EngineError(
        `Invalid onFail.${field} in step "${step.key}" (${source}): onFail.goto has been removed; use type: "loop" for repetition`,
      );
    }
    throw new EngineError(`Unknown onFail field "${field}" in step "${step.key}" (${source})`);
  }

  const action = onFail["action"];
  if (action !== "retry" && action !== "abort" && action !== "escalate") {
    throw new EngineError(
      `Invalid onFail.action "${String(action)}" in step "${step.key}" (${source}): must be one of retry | abort | escalate`,
    );
  }
}

/** loop ステップの定義を検証する。 */
function validateLoop(step: LoopStepDef, source: string): void {
  if (!Array.isArray(step.body) || step.body.length === 0) {
    throw new EngineError(
      `Invalid loop.body in step "${step.key}" (${source}): must be a non-empty array`,
    );
  }
  if (!Number.isInteger(step.maxIterations) || step.maxIterations < 1) {
    throw new EngineError(
      `Invalid loop.maxIterations "${String(step.maxIterations)}" in step "${step.key}" (${source}): must be a positive integer`,
    );
  }
  if (step.onExhausted !== "escalate" && step.onExhausted !== "abort") {
    throw new EngineError(
      `Invalid loop.onExhausted "${String(step.onExhausted)}" in step "${step.key}" (${source}): must be one of escalate | abort`,
    );
  }
}

/**
 * parallel ステップの定義を検証する。
 *
 * parallel のサブタスクは task 相当のみとし、loop を置けない（型では
 * SubtaskConfig が loop を表現できないが、動的 import された定義に対して
 * ロード時にも拒否する）。
 */
function validateParallel(step: ParallelStepDef, source: string): void {
  if (!step.parallel) {
    throw new EngineError(
      `Invalid parallel in step "${step.key}" (${source}): parallel step requires a "parallel" object`,
    );
  }
  if (!Array.isArray(step.parallel.subtasks)) {
    throw new EngineError(
      `Invalid parallel.subtasks in step "${step.key}" (${source}): must be an array`,
    );
  }
  for (const subtask of step.parallel.subtasks) {
    const raw = subtask as unknown;
    if (isRecord(raw) && (raw.type === "loop" || Array.isArray(raw.body))) {
      throw new EngineError(
        `Invalid parallel subtask in step "${step.key}" (${source}): loop cannot be nested in parallel`,
      );
    }
  }
}

/**
 * task ステップの定義を検証する。
 *
 * 動的 import された定義は型検査が効かないため、`task` の欠落をロード時に
 * EngineError で拒否する（buildPrompt 参照時の実行時 TypeError を防ぐ）。
 */
function validateTask(step: Extract<StepDef, { type: "task" }>, source: string): void {
  if (!step.task) {
    throw new EngineError(
      `Invalid task in step "${step.key}" (${source}): task step requires a "task" object`,
    );
  }
}

/**
 * human_gate ステップの定義を検証する。
 *
 * human_gate は確認と回答保存のみを責務とする。差し戻し機構
 * （`reviseTargetStep`）は撤去済みのため、定義に残っていた場合は
 * ロード時に EngineError で拒否する（無言の挙動変更を排除する）。
 * 回答値 "revise" 自体は通常の回答データとして許容する。
 * 分岐判断は loop 本体の check が `gateAnswers` を読んで行う。
 */
function validateHumanGate(step: Extract<StepDef, { type: "human_gate" }>, source: string): void {
  const hg = step.humanGate;
  if (!hg) {
    throw new EngineError(
      `Invalid humanGate in step "${step.key}" (${source}): human_gate step requires a "humanGate" object`,
    );
  }
  if (typeof hg !== "object" || hg === null) {
    throw new EngineError(
      `Invalid humanGate in step "${step.key}" (${source}): humanGate must be an object`,
    );
  }
  if (Object.hasOwn(hg, "reviseTargetStep")) {
    throw new EngineError(
      `Invalid humanGate.reviseTargetStep in step "${step.key}" (${source}): human_gate revise has been removed. Remove reviseTargetStep; to rewind instead, place the human_gate inside a loop body and have the body check read gateAnswers to return continue (applied as repeat)`,
    );
  }
  if (!Array.isArray(hg.presentArtifacts)) {
    throw new EngineError(
      `Invalid humanGate.presentArtifacts in step "${step.key}" (${source}): must be an array`,
    );
  }
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
}

function validateWorkflowDef(def: WorkflowDef, source: string): void {
  const flattened = flattenStepDefs(def.steps);
  const stepIndexByKey = new Map<string, number>();
  flattened.forEach(({ def: step }, index) => {
    if (!step.key || typeof step.key !== "string") {
      throw new EngineError(`Invalid step key in ${source}: must be a non-empty string`);
    }
    if (stepIndexByKey.has(step.key)) {
      throw new EngineError(
        `Duplicate step key "${step.key}" (${source}): step keys must be unique across the whole workflow including loop bodies`,
      );
    }
    stepIndexByKey.set(step.key, index);
  });

  for (const { def: step } of flattened) {
    switch (step.type) {
      case "loop":
        validateLoop(step, source);
        break;
      case "task":
        validateOnFail(step, source);
        validateTask(step, source);
        break;
      case "human_gate":
        validateOnFail(step, source);
        validateHumanGate(step, source);
        break;
      case "parallel":
        validateOnFail(step, source);
        validateParallel(step, source);
        break;
      default: {
        const rawType = String((step as { type?: unknown }).type);
        throw new EngineError(
          `Invalid step type "${rawType}" in ${source}: must be one of task | human_gate | parallel | loop`,
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
  let db: TadoDb;
  try {
    const sqlite = new Database(dbPath);
    // 以下の PRAGMA（busy_timeout / journal_mode）は Drizzle では表現できない
    // 接続設定のため raw 実行を維持する。データアクセスは全て Drizzle API で行う。
    sqlite.exec(`PRAGMA busy_timeout = ${BUSY_TIMEOUT_MS};`);
    const journalMode = sqlite.query("PRAGMA journal_mode").get() as Record<string, unknown>;
    if (journalMode.journal_mode !== "wal") {
      sqlite.exec("PRAGMA journal_mode = WAL;");
    }
    db = drizzle(sqlite);
  } catch (error) {
    const reason = error instanceof Error ? `: ${error.message}` : `: ${String(error)}`;
    throw new EngineError(`Unable to open session database: ${dbPath}${reason}`);
  }

  // 全コマンド（next / report / confirm / status / answers / dashboard）が loop
  // 関連カラムを読み書きするため、旧スキーマの DB でも init を経由せずに読める
  // よう、接続のたびに未適用の migration を適用する（適用済み管理で冪等）。
  try {
    migrateDb(db);
  } catch (error) {
    db.$client.close();
    const reason = error instanceof Error ? `: ${error.message}` : `: ${String(error)}`;
    throw new EngineError(
      `Unable to migrate session database: ${dbPath}${reason}. ` +
        "既存の workflow.db を最新スキーマへ移行できませんでした。ファイルの権限・破損を確認するか、tado init で新しいセッションを作成してください",
    );
  }
  return db;
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
 * no-op when the tables already exist. `openDb` calls this on every connection
 * so all commands (including read-only ones and the dashboard) see the current
 * schema; drizzle skips migrations that are already recorded as applied.
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
 * 指定範囲のステップを pending + retryCount=0 に巻き戻す。
 *
 * 巻き戻しは loop 本体 check の判定 `continue` に基づく遷移 `repeat` でのみ
 * 行う（`fromStepIndex` から `toStepIndex` までの両端を含む範囲指定が必須）。
 * 範囲内の loop 行は `loopIteration=1` に戻るため、ネストした内側 loop の
 * 反復状態も初期化される。範囲外の祖先（外側）loop 行の反復状態は変更しない。
 */
export function rewindSteps(
  db: TadoDb,
  sessionId: string,
  fromStepIndex: number,
  toStepIndex: number,
): void {
  if (
    !Number.isInteger(fromStepIndex) ||
    !Number.isInteger(toStepIndex) ||
    fromStepIndex < 0 ||
    toStepIndex < fromStepIndex
  ) {
    throw new EngineError(
      `Invalid rewind range: from=${String(fromStepIndex)} to=${String(toStepIndex)}: expected integers with 0 <= from <= to`,
    );
  }
  db.update(steps)
    .set({ status: "pending", retryCount: 0, loopIteration: 1 })
    .where(
      and(
        eq(steps.sessionId, sessionId),
        gte(steps.stepIndex, fromStepIndex),
        lte(steps.stepIndex, toStepIndex),
      ),
    )
    .run();
}

/** セッションの全ステップ行を stepIndex 順に返す。 */
function selectStepRows(db: TadoDb, sessionId: string): StepRow[] {
  return db
    .select()
    .from(steps)
    .where(eq(steps.sessionId, sessionId))
    .orderBy(steps.stepIndex)
    .all();
}

/** `ancestorId` の子孫（ネストした loop 本体を含む）を深さ優先で収集する。 */
function collectDescendants(rows: StepRow[], ancestorId: number): StepRow[] {
  const childrenByParent = new Map<number, StepRow[]>();
  for (const row of rows) {
    if (row.parentStepId === null) {
      continue;
    }
    const children = childrenByParent.get(row.parentStepId);
    if (children) {
      children.push(row);
    } else {
      childrenByParent.set(row.parentStepId, [row]);
    }
  }
  const descendants: StepRow[] = [];
  const visited = new Set<number>();
  const stack = [...(childrenByParent.get(ancestorId) ?? [])];
  while (stack.length > 0) {
    const row = stack.pop()!;
    // parent_step_id が循環した破損行（手動 UPDATE・移行不具合）で無限に
    // 辿り続けて書き込みトランザクションのロックを保持し続けないよう fail-fast する。
    if (visited.has(row.id)) {
      throw new EngineError(
        `Cycle detected in steps.parent_step_id chain at step "${row.stepKey}" (id ${row.id}): the session step rows are corrupted`,
      );
    }
    visited.add(row.id);
    descendants.push(row);
    stack.push(...(childrenByParent.get(row.id) ?? []));
  }
  return descendants;
}

/**
 * `step` から親方向に祖先を辿り、各祖先を `visit` に渡す。
 * 破損した `parent_step_id` 循環を検出したら EngineError で fail-fast する。
 */
function visitAncestors(rows: StepRow[], step: StepRow, visit: (ancestor: StepRow) => void): void {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const visited = new Set<number>();
  let current: StepRow | undefined = step;
  while (current && current.parentStepId !== null) {
    if (visited.has(current.id)) {
      throw new EngineError(
        `Cycle detected in steps.parent_step_id chain at step "${current.stepKey}" (id ${current.id}): the session step rows are corrupted`,
      );
    }
    visited.add(current.id);
    const parent = byId.get(current.parentStepId);
    if (!parent) {
      return;
    }
    visit(parent);
    current = parent;
  }
}

/** 指定ステップを包む最も内側の loop 行を返す。ループ外なら null。 */
function findEnclosingLoopRow(rows: StepRow[], stepKey: string): StepRow | null {
  const start = rows.find((row) => row.stepKey === stepKey);
  if (!start) {
    return null;
  }
  let enclosing: StepRow | null = null;
  visitAncestors(rows, start, (ancestor) => {
    if (enclosing === null && ancestor.type === "loop") {
      enclosing = ancestor;
    }
  });
  return enclosing;
}

/** 指定ステップを包む最も内側の loop 行を返す（`continue` の帰属先解決）。 */
export function getInnermostEnclosingLoop(
  db: TadoDb,
  sessionId: string,
  stepKey: string,
): StepRow | null {
  return findEnclosingLoopRow(selectStepRows(db, sessionId), stepKey);
}

/**
 * loop 行スナップショットの maxIterations を読み出す。
 *
 * NULL・非整数・0 以下は移行漏れや手動 UPDATE によるスナップショット欠落として
 * EngineError で fail-fast する（無言で 1 に丸めると、実在しない上限で
 * onExhausted が発火して原因が残らない。onFail ドリフト検出と同方針）。
 */
export function getLoopMaxIterations(loopRow: Pick<StepRow, "stepKey" | "maxIterations">): number {
  const value = loopRow.maxIterations;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new EngineError(
      `Invalid loop snapshot for step "${loopRow.stepKey}": maxIterations is "${String(value)}"; expected a positive integer. Start a new session or repair the step row`,
    );
  }
  return value;
}

/**
 * loop 行スナップショットの onExhausted を読み出す。
 * escalate / abort 以外の欠落・未知値は EngineError で fail-fast する。
 */
export function getLoopOnExhausted(
  loopRow: Pick<StepRow, "stepKey" | "onExhausted">,
): OnExhaustedStrategy {
  const value = loopRow.onExhausted;
  if (value !== "escalate" && value !== "abort") {
    throw new EngineError(
      `Invalid loop snapshot for step "${loopRow.stepKey}": onExhausted is "${String(value)}"; expected one of escalate | abort. Start a new session or repair the step row`,
    );
  }
  return value;
}

/** 指定ステップが属する最も内側のループ文脈を返す。ループ外なら null。 */
export function getLoopContext(db: TadoDb, sessionId: string, stepKey: string): LoopContext | null {
  const loop = findEnclosingLoopRow(selectStepRows(db, sessionId), stepKey);
  if (!loop) {
    return null;
  }
  return {
    key: loop.stepKey,
    iteration: loop.loopIteration,
    maxIterations: getLoopMaxIterations(loop),
  };
}

/** loop 本体（全子孫）の stepIndex 範囲。本体行が無ければ null。 */
export function getLoopBodyRange(
  db: TadoDb,
  sessionId: string,
  loopStepKey: string,
): { fromStepIndex: number; toStepIndex: number } | null {
  const rows = selectStepRows(db, sessionId);
  const loop = rows.find((row) => row.stepKey === loopStepKey && row.type === "loop");
  if (!loop) {
    return null;
  }
  const descendants = collectDescendants(rows, loop.id);
  if (descendants.length === 0) {
    return null;
  }
  const indexes = descendants.map((row) => row.stepIndex);
  return { fromStepIndex: Math.min(...indexes), toStepIndex: Math.max(...indexes) };
}

/**
 * 本体の全ステップが終端（passed / skipped）に達した loop 行を確定する。
 *
 * 1つでも passed があれば passed、全て skipped なら skipped にする。ネストした
 * loop は内側から順に確定するため、確定が連鎖する間は繰り返す。loop 行を実行
 * 対象にしない規則（resolveExecutableStep / resolveNextExecutableStep）と
 * 合わせて 1 module に閉じる（呼び出し側で確定を忘れない）。
 */
function completeFinishedLoops(db: TadoDb, sessionId: string): void {
  const rows = selectStepRows(db, sessionId);
  let changed = true;
  while (changed) {
    changed = false;
    for (const loop of rows) {
      if (loop.type !== "loop" || loop.status !== "pending") {
        continue;
      }
      const descendants = collectDescendants(rows, loop.id);
      if (descendants.length === 0) {
        continue;
      }
      if (descendants.some((row) => row.status !== "passed" && row.status !== "skipped")) {
        continue;
      }
      const status = descendants.some((row) => row.status === "passed") ? "passed" : "skipped";
      db.update(steps).set({ status }).where(eq(steps.id, loop.id)).run();
      loop.status = status;
      changed = true;
    }
  }
}

/** 指定ステップより後ろで最初の pending な非 loop 行を返す（loop 行は実行対象外）。 */
function selectNextPendingStep(
  db: TadoDb,
  sessionId: string,
  afterStepIndex: number,
): StepRow | null {
  return (
    db
      .select()
      .from(steps)
      .where(
        and(
          eq(steps.sessionId, sessionId),
          gt(steps.stepIndex, afterStepIndex),
          eq(steps.status, "pending"),
          ne(steps.type, "loop"),
        ),
      )
      .orderBy(steps.stepIndex)
      .limit(1)
      .get() ?? null
  );
}

/**
 * loop 行の本体先頭から再開する最初の実行可能ステップを解決する
 * （loop 内再開位置の解決。next / confirm / report で共有する唯一の実装）。
 * 本体に実行可能な pending ステップが無ければ null。
 */
export function findLoopResumeStep(
  db: TadoDb,
  sessionId: string,
  loopRow: Pick<StepRow, "stepIndex">,
): StepRow | null {
  return selectNextPendingStep(db, sessionId, loopRow.stepIndex);
}

/**
 * 現在地（currentStep）から次に実行する非 loop ステップを解決する。
 *
 * - loop 行は実行対象にならない。currentStep が loop 行を指す場合は本体先頭の
 *   実行可能ステップへ解決する（本体に実行可能なステップが無ければ null）。
 * - currentStep が未設定・不明な場合は、セッション全体で最初の pending / running
 *   な非 loop 行を返す。
 * - 本体が終端に達した loop 行は先に確定する（確定漏れで pending のまま残り、
 *   「No pending steps found」や完了判定のずれを起こさないようここで所有する）。
 */
export function resolveExecutableStep(
  db: TadoDb,
  sessionId: string,
  currentStepKey: string | null,
): StepRow | null {
  completeFinishedLoops(db, sessionId);
  if (currentStepKey) {
    const row = db
      .select()
      .from(steps)
      .where(and(eq(steps.sessionId, sessionId), eq(steps.stepKey, currentStepKey)))
      .get();
    if (row) {
      if (row.type === "loop") {
        return findLoopResumeStep(db, sessionId, row);
      }
      return row;
    }
  }
  return (
    db
      .select()
      .from(steps)
      .where(
        and(
          eq(steps.sessionId, sessionId),
          inArray(steps.status, ["pending", "running"]),
          ne(steps.type, "loop"),
        ),
      )
      .orderBy(steps.stepIndex)
      .limit(1)
      .get() ?? null
  );
}

/**
 * `afterStepIndex` より後ろの次に実行する非 loop ステップを解決する。
 * 本体が終端に達した loop 行の確定もこの関数が所有する。
 */
export function resolveNextExecutableStep(
  db: TadoDb,
  sessionId: string,
  afterStepIndex: number,
): StepRow | null {
  completeFinishedLoops(db, sessionId);
  return selectNextPendingStep(db, sessionId, afterStepIndex);
}

/**
 * 実行可能なステップが残っていない場合のセッション終端判定。
 * 全ステップが passed / skipped なら sessions.status を done にして true を返す。
 * 非終端の行が残っていれば false を返し、呼び出し側は失敗として扱う。
 */
export function completeSessionIfDone(db: TadoDb, sessionId: string): boolean {
  const remaining = db
    .select({ cnt: count() })
    .from(steps)
    .where(and(eq(steps.sessionId, sessionId), notInArray(steps.status, ["passed", "skipped"])))
    .get();
  if ((remaining?.cnt ?? 0) > 0) {
    return false;
  }
  db.update(sessions)
    .set({ status: "done", updatedAt: sql`datetime('now')` })
    .where(eq(sessions.id, sessionId))
    .run();
  return true;
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
 * 返す。ステップの状態や試行の checkStatus には依存しないため、loop の
 * 次イテレーション再実行中でも回答を参照できる。
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

export function buildConditionCtx(db: TadoDb, sessionId: string, stepKey: string): ConditionCtx {
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
    loop: getLoopContext(db, sessionId, stepKey),
    artifacts: getArtifacts(db, sessionId),
  };
}
