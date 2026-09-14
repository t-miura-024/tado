import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";

/**
 * 0004/0005 適用前（旧リリース相当）の workflow.db を作るテスト fixture。
 *
 * drizzle の適用済み管理（`__drizzle_migrations`）も 0003 適用済みの状態に揃える。
 * したがって次の `openDb` では実際のアップグレードと同じく 0004/0005 だけが
 * 適用される。
 */

/** `drizzle/meta/_journal.json` の 0003 エントリの `when`。 */
const APPLIED_THROUGH_0003_WHEN = 1789262704607;

/** migration 0003 適用直後のスキーマ（loop 関連カラムを持たない）。 */
const LEGACY_SCHEMA = `
CREATE TABLE sessions (
  id text PRIMARY KEY NOT NULL,
  workflow_id text NOT NULL,
  workflow_path text NOT NULL,
  session_dir text NOT NULL,
  artifact_db_path text,
  current_step text,
  status text DEFAULT 'running' NOT NULL,
  created_at text DEFAULT (datetime('now')) NOT NULL,
  updated_at text DEFAULT (datetime('now')) NOT NULL,
  cwd text,
  title text,
  CONSTRAINT "sessions_status_check" CHECK("sessions"."status" IN ('running','paused','done','aborted'))
);
CREATE TABLE steps (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  session_id text NOT NULL,
  step_key text NOT NULL,
  step_index integer NOT NULL,
  phase text,
  type text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  retry_count integer DEFAULT 0 NOT NULL,
  max_retries integer DEFAULT 3 NOT NULL,
  on_fail_action text,
  on_fail_target text,
  created_at text DEFAULT (datetime('now')) NOT NULL,
  on_fail_reset text,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON UPDATE no action ON DELETE cascade,
  CONSTRAINT "steps_type_check" CHECK("steps"."type" IN ('task','human_gate','parallel')),
  CONSTRAINT "steps_status_check" CHECK("steps"."status" IN ('pending','running','passed','failed','skipped'))
);
CREATE UNIQUE INDEX steps_session_id_step_key_unique ON steps (session_id, step_key);
CREATE TABLE step_attempts (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  step_id integer NOT NULL,
  attempt_number integer NOT NULL,
  started_at text DEFAULT (datetime('now')) NOT NULL,
  ended_at text,
  result_json text,
  subtask_results_json text,
  check_results_json text,
  check_status text,
  FOREIGN KEY (step_id) REFERENCES steps(id) ON UPDATE no action ON DELETE cascade,
  CONSTRAINT "step_attempts_check_status_check" CHECK("step_attempts"."check_status" IN ('pass','fail','error'))
);
CREATE UNIQUE INDEX step_attempts_step_id_attempt_number_unique ON step_attempts (step_id, attempt_number);
CREATE TABLE artifacts (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  session_id text NOT NULL,
  step_key text NOT NULL,
  artifact_key text NOT NULL,
  file_path text NOT NULL,
  created_at text DEFAULT (datetime('now')) NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON UPDATE no action ON DELETE cascade
);
CREATE TABLE gate_events (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  session_id text NOT NULL,
  step_key text NOT NULL,
  attempt_number integer,
  event text NOT NULL,
  answers_json text,
  tty_name text,
  created_at text DEFAULT (datetime('now')) NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON UPDATE no action ON DELETE cascade,
  CONSTRAINT "gate_events_event_check" CHECK("gate_events"."event" IN ('confirmed','rejected'))
);
CREATE TABLE __drizzle_migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hash text NOT NULL,
  created_at numeric
);
`;

export interface LegacyStepSeed {
  key: string;
  index: number;
  phase: string;
  type: "task" | "human_gate" | "parallel";
  maxRetries: number;
  onFailAction: string | null;
  status?: string;
}

export interface LegacySessionSeed {
  sessionId: string;
  workflowId: string;
  workflowPath: string;
  sessionDir: string;
  title: string;
  status?: string;
  currentStep?: string | null;
  steps: LegacyStepSeed[];
}

/**
 * 旧スキーマの workflow.db を `tadoHome` に作成し、セッションとステップ行を
 * 投入する（migration 0004/0005 は未適用のまま）。
 */
export function createLegacyWorkflowDb(tadoHome: string, session: LegacySessionSeed): string {
  fs.mkdirSync(tadoHome, { recursive: true });
  const dbPath = path.join(tadoHome, "workflow.db");
  const raw = new Database(dbPath);
  raw.exec(LEGACY_SCHEMA);
  raw.run(`INSERT INTO __drizzle_migrations ("hash", "created_at") VALUES (?, ?)`, [
    "legacy-applied-through-0003",
    APPLIED_THROUGH_0003_WHEN,
  ]);
  raw.run(
    `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, title, status, current_step)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      session.sessionId,
      session.workflowId,
      session.workflowPath,
      session.sessionDir,
      session.title,
      session.status ?? "running",
      session.currentStep ?? null,
    ],
  );
  for (const step of session.steps) {
    raw.run(
      `INSERT INTO steps (session_id, step_key, step_index, phase, type, status, max_retries, on_fail_action)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.sessionId,
        step.key,
        step.index,
        step.phase,
        step.type,
        step.status ?? "pending",
        step.maxRetries,
        step.onFailAction,
      ],
    );
  }
  raw.close();
  return dbPath;
}
