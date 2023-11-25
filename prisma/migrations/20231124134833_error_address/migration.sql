/*
  Warnings:

  - You are about to drop the `Error_row` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Error_row" DROP CONSTRAINT "Error_row_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Error_row" DROP CONSTRAINT "Error_row_excel_document_id_fkey";

-- DropTable
DROP TABLE "Error_row";

-- CreateTable
CREATE TABLE "Error" (
    "eror_id" SERIAL NOT NULL,
    "address_id" INTEGER,
    "eror_content" TEXT NOT NULL,
    "excel_document_id" INTEGER NOT NULL,
    "document_row" INTEGER NOT NULL,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("eror_id")
);

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_excel_document_id_fkey" FOREIGN KEY ("excel_document_id") REFERENCES "Excel_document"("excel_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;
