CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`avatar_url` text,
	`is_pro` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `completions` (
	`id` text PRIMARY KEY NOT NULL,
	`habit_id` text NOT NULL,
	`date` text NOT NULL,
	`value` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`frequency` text NOT NULL,
	`color` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE TABLE `group_activity` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`user_id` text NOT NULL,
	`user_name` text NOT NULL,
	`habit_id` text NOT NULL,
	`habit_name` text NOT NULL,
	`action_type` text NOT NULL,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `group_members` (
	`group_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`joined_at` integer NOT NULL,
	PRIMARY KEY(`group_id`, `user_id`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`owner_id` text NOT NULL,
	`image_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weekly_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`week_start_date` text NOT NULL,
	`score` integer,
	`reflection_notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sync_queue` (
	`id` text PRIMARY KEY NOT NULL,
	`table_name` text NOT NULL,
	`operation` text NOT NULL,
	`record_id` text NOT NULL,
	`payload` text,
	`retry_count` integer DEFAULT 0 NOT NULL,
	`last_attempted_at` integer,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` integer NOT NULL
);
