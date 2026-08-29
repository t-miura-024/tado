CREATE TABLE `gate_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`step_key` text NOT NULL,
	`attempt_number` integer,
	`event` text NOT NULL,
	`answers_json` text,
	`tty_name` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "gate_events_event_check" CHECK("gate_events"."event" IN ('confirmed','rejected'))
);
