/*
  Warnings:

  - Changed the type of `upload_date` on the `Excel_document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Excel_document" DROP COLUMN "upload_date",
ADD COLUMN     "upload_date" TIMESTAMP(3) NOT NULL;
