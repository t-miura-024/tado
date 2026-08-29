import { sql } from "drizzle-orm";
// drizzle-orm/bun-sqlite only exports the bun:sqlite driver (BunSQLiteDatabase,
// SQLiteBunSession). Table definition APIs live in drizzle-orm/sqlite-core,
// which is driver-agnostic and works with the bun-sqlite driver.
import { check, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

/**
 * Drizzle schema definition.
 *
 * This is the source of truth for the database schema. It is equivalent to
 * the previous `schema.sql` (table names and column names keep snake_case).
 * The baseline migration in `drizzle/` creates all tables for new databases,
 * and existing databases (e.g. `~/.tado/workflow.db`) migrate without data loss.
 */

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    workflowId: text("workflow_id").notNull(),
    workflowPath: text("workflow_path").notNull(),
    sessionDir: text("session_dir").notNull(),
    cwd: text("cwd"),
    title: text("title"),
    artifactDbPath: text("artifact_db_path"),
    currentStep: text("current_step"),
    status: text("status").notNull().default("running"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text("updated_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (t) => [
    check("sessions_status_check", sql`${t.status} IN ('running','paused','done','aborted')`),
  ],
);

export const steps = sqliteTable(
  "steps",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sessionId: text("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    stepKey: text("step_key").notNull(),
    stepIndex: integer("step_index").notNull(),
    phase: text("phase"),
    type: text("type").notNull(),
    status: text("status").notNull().default("pending"),
    retryCount: integer("retry_count").notNull().default(0),
    maxRetries: integer("max_retries").notNull().default(3),
    onFailAction: text("on_fail_action"),
    onFailTarget: text("on_fail_target"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (t) => [
    check("steps_type_check", sql`${t.type} IN ('task','human_gate','parallel')`),
    check(
      "steps_status_check",
      sql`${t.status} IN ('pending','running','passed','failed','skipped')`,
    ),
    unique("steps_session_id_step_key_unique").on(t.sessionId, t.stepKey),
  ],
);

export const stepAttempts = sqliteTable(
  "step_attempts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    stepId: integer("step_id")
      .notNull()
      .references(() => steps.id, { onDelete: "cascade" }),
    attemptNumber: integer("attempt_number").notNull(),
    startedAt: text("started_at")
      .notNull()
      .default(sql`(datetime('now'))`),
    endedAt: text("ended_at"),
    resultJson: text("result_json"),
    subtaskResultsJson: text("subtask_results_json"),
    checkResultsJson: text("check_results_json"),
    checkStatus: text("check_status"),
  },
  (t) => [
    check("step_attempts_check_status_check", sql`${t.checkStatus} IN ('pass','fail','error')`),
    unique("step_attempts_step_id_attempt_number_unique").on(t.stepId, t.attemptNumber),
  ],
);

export const artifacts = sqliteTable("artifacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),
  stepKey: text("step_key").notNull(),
  artifactKey: text("artifact_key").notNull(),
  filePath: text("file_path").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

/**
 * human_gate の監査ログ。confirm の成立（confirmed）と、TTY なしで拒否された
 * 実行試行（rejected）の両方を記録する。エージェントによる回避工作はここに痕跡を残す。
 */
export const gateEvents = sqliteTable(
  "gate_events",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sessionId: text("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    stepKey: text("step_key").notNull(),
    attemptNumber: integer("attempt_number"),
    event: text("event").notNull(),
    answersJson: text("answers_json"),
    ttyName: text("tty_name"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (t) => [check("gate_events_event_check", sql`${t.event} IN ('confirmed','rejected')`)],
);

export type SessionRow = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type StepRow = typeof steps.$inferSelect;
export type NewStep = typeof steps.$inferInsert;
export type StepAttemptRow = typeof stepAttempts.$inferSelect;
export type NewStepAttempt = typeof stepAttempts.$inferInsert;
export type ArtifactRow = typeof artifacts.$inferSelect;
export type NewArtifact = typeof artifacts.$inferInsert;
export type GateEventRow = typeof gateEvents.$inferSelect;
