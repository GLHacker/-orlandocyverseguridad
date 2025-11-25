CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fileId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fileLikes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fileId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `fileLikes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`fileUrl` text NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileSize` int NOT NULL,
	`mimeType` varchar(127) NOT NULL,
	`fileType` enum('image','video','document') NOT NULL,
	`category` varchar(100),
	`likes` int NOT NULL DEFAULT 0,
	`views` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
