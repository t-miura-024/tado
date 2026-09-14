PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_step_attempts` (
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
	CONSTRAINT "step_attempts_check_status_check" CHECK(check_status IN ('pass','fail','error','continue'))
);
--> statement-breakpoint
INSERT INTO `__new_step_attempts`("id", "step_id", "attempt_number", "started_at", "ended_at", "result_json", "subtask_results_json", "check_results_json", "check_status") SELECT "id", "step_id", "attempt_number", "started_at", "ended_at", "result_json", "subtask_results_json", "check_results_json", "check_status" FROM `step_attempts`;--> statement-breakpoint
DROP TABLE `step_attempts`;--> statement-breakpoint
ALTER TABLE `__new_step_attempts` RENAME TO `step_attempts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `step_attempts_step_id_attempt_number_unique` ON `step_attempts` (`step_id`,`attempt_number`);--> statement-breakpoint
CREATE TABLE `__new_steps` (
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
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "steps_type_check" CHECK(type IN ('task','human_gate','parallel','loop')),
	CONSTRAINT "steps_status_check" CHECK(status IN ('pending','running','passed','failed','skipped'))
);
--> statement-breakpoint
INSERT INTO `__new_steps`("id", "session_id", "step_key", "step_index", "phase", "type", "status", "retry_count", "max_retries", "on_fail_action", "created_at") SELECT "id", "session_id", "step_key", "step_index", "phase", "type", "status", "retry_count", "max_retries", "on_fail_action", "created_at" FROM `steps`;--> statement-breakpoint
DROP TABLE `steps`;--> statement-breakpoint
ALTER TABLE `__new_steps` RENAME TO `steps`;--> statement-breakpoint
CREATE UNIQUE INDEX `steps_session_id_step_key_unique` ON `steps` (`session_id`,`step_key`);