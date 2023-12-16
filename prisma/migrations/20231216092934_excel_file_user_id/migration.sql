/*
  Warnings:

  - You are about to drop the column `excel_document_id` on the `Error` table. All the data in the column will be lost.
  - You are about to drop the column `excel_document_id` on the `Meter_readings` table. All the data in the column will be lost.
  - You are about to drop the `Excel_document` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileId` to the `Error` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `Meter_readings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Error" DROP CONSTRAINT "Error_excel_document_id_fkey";

-- DropForeignKey
ALTER TABLE "Excel_document" DROP CONSTRAINT "Excel_document_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Meter_readings" DROP CONSTRAINT "Meter_readings_excel_document_id_fkey";

-- AlterTable
ALTER TABLE "Error" DROP COLUMN "excel_document_id",
ADD COLUMN     "fileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Meter_readings" DROP COLUMN "excel_document_id",
ADD COLUMN     "fileId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Excel_document";

-- CreateTable
CREATE TABLE "ExcelFile" (
    "fileId" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ExcelFile_pkey" PRIMARY KEY ("fileId")
);

-- AddForeignKey
ALTER TABLE "Meter_readings" ADD CONSTRAINT "Meter_readings_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "ExcelFile"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcelFile" ADD CONSTRAINT "ExcelFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "ExcelFile"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
