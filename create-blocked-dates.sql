-- Adds the blocked_dates table used by the admin "Delivery Dates" panel.
-- Purely additive: creates one new table, touches nothing that already exists.
-- Generated from prisma/schema.prisma via `prisma migrate diff`.

CREATE TABLE `blocked_dates` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `reason` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `blocked_dates_date_key`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
