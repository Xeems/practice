/*
  Warnings:

  - The primary key for the `Error` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eror_content` on the `Error` table. All the data in the column will be lost.
  - You are about to drop the column `eror_id` on the `Error` table. All the data in the column will be lost.
  - Added the required column `error_content` to the `Error` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Error" DROP CONSTRAINT "Error_pkey",
DROP COLUMN "eror_content",
DROP COLUMN "eror_id",
ADD COLUMN     "error_content" TEXT NOT NULL,
ADD COLUMN     "error_id" SERIAL NOT NULL,
ADD CONSTRAINT "Error_pkey" PRIMARY KEY ("error_id");
