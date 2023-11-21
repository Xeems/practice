/*
  Warnings:

  - Added the required column `excel_document_id` to the `Meter_readings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meter_readings" ADD COLUMN     "excel_document_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Excel_document" (
    "excel_document_id" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "upload_date" TEXT NOT NULL,

    CONSTRAINT "Excel_document_pkey" PRIMARY KEY ("excel_document_id")
);

-- CreateTable
CREATE TABLE "Eror" (
    "eror_id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "eror_content" TEXT NOT NULL,
    "excel_document_id" INTEGER NOT NULL,
    "document_row" INTEGER NOT NULL,

    CONSTRAINT "Eror_pkey" PRIMARY KEY ("eror_id")
);

-- AddForeignKey
ALTER TABLE "Meter_readings" ADD CONSTRAINT "Meter_readings_excel_document_id_fkey" FOREIGN KEY ("excel_document_id") REFERENCES "Excel_document"("excel_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eror" ADD CONSTRAINT "Eror_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eror" ADD CONSTRAINT "Eror_excel_document_id_fkey" FOREIGN KEY ("excel_document_id") REFERENCES "Excel_document"("excel_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;
