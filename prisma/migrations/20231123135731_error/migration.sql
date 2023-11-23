/*
  Warnings:

  - You are about to drop the `Eror` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Eror" DROP CONSTRAINT "Eror_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Eror" DROP CONSTRAINT "Eror_excel_document_id_fkey";

-- DropTable
DROP TABLE "Eror";

-- CreateTable
CREATE TABLE "Eror_row" (
    "eror_id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "eror_content" TEXT NOT NULL,
    "excel_document_id" INTEGER NOT NULL,
    "document_row" INTEGER NOT NULL,

    CONSTRAINT "Eror_row_pkey" PRIMARY KEY ("eror_id")
);

-- AddForeignKey
ALTER TABLE "Eror_row" ADD CONSTRAINT "Eror_row_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eror_row" ADD CONSTRAINT "Eror_row_excel_document_id_fkey" FOREIGN KEY ("excel_document_id") REFERENCES "Excel_document"("excel_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;
