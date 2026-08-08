CREATE TABLE IF NOT EXISTS `artifacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`step_key` text NOT NULL,
	`artifact_key` text NOT NULL,
	`file_path` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`workflow_id` text NOT NULL,
	`workflow_path` text NOT NULL,
	`session_dir` text NOT NULL,
	`artifact_db_path` text,
	`current_step` text,
	`status` text DEFAULT 'running' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL,
	CONSTRAINT "sessions_status_check" CHECK("sessions"."status" IN ('running','paused','done','aborted'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `step_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`step_id` integer NOT NULL,
	`attempt_number` integer NOT NULL,
	`started_at` text DEFAULT (datetime('now')) NOT NULL,
	`ended_at` text,
	`result_json` text,
	`subtask_results_json` text,
	`check_results_json` text,
	`check_status` text,
	FOREIGN KEY (`step_id`) REFERENCES `steps`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "step_attempts_check_status_check" CHECK("step_attempts"."check_status" IN ('pass','fail','error'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `step_attempts_step_id_attempt_number_unique` ON `step_attempts` (`step_id`,`attempt_number`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`step_key` text NOT NULL,
	`step_index` integer NOT NULL,
	`phase` text,
	`type` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`retry_count` integer DEFAULT 0 NOT NULL,
	`max_retries` integer DEFAULT 3 NOT NULL,
	`on_fail_action` text,
	`on_fail_target` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "steps_type_check" CHECK("steps"."type" IN ('task','human_gate','parallel')),
	CONSTRAINT "steps_status_check" CHECK("steps"."status" IN ('pending','running','passed','failed','skipped'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `steps_session_id_step_key_unique` ON `steps` (`session_id`,`step_key`);