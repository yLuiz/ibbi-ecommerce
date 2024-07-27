/*
  Warnings:

  - You are about to drop the column `user_id` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_id` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_user_id_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `seller_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Purchase` DROP COLUMN `user_id`,
    ADD COLUMN `client_id` INTEGER NOT NULL,
    ADD COLUMN `observation` VARCHAR(191) NULL,
    ADD COLUMN `seller_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
