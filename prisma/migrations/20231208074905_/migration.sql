/*
  Warnings:

  - The `user_role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_role",
ADD COLUMN     "user_role" TEXT NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "ROLE";
