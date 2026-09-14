ALTER TABLE `steps` ADD `parent_step_id` integer REFERENCES steps(id);--> statement-breakpoint
ALTER TABLE `steps` ADD `loop_iteration` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `steps` ADD `max_iterations` integer;--> statement-breakpoint
ALTER TABLE `steps` ADD `on_exhausted` text;