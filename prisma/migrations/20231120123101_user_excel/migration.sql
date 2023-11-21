/*
  Warnings:

  - Added the required column `user_id` to the `Excel_document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Excel_document" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Excel_document" ADD CONSTRAINT "Excel_document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
