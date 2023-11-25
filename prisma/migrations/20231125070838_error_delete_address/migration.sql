/*
  Warnings:

  - You are about to drop the column `address_id` on the `Error` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Error" DROP CONSTRAINT "Error_address_id_fkey";

-- AlterTable
ALTER TABLE "Error" DROP COLUMN "address_id";
