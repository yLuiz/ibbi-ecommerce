/*
  Warnings:

  - Added the required column `quantity` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Purchase` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `total_price` DOUBLE NOT NULL;
