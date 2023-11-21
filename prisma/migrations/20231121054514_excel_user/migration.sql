-- DropForeignKey
ALTER TABLE "Excel_document" DROP CONSTRAINT "Excel_document_user_id_fkey";

-- AlterTable
ALTER TABLE "Excel_document" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Excel_document" ADD CONSTRAINT "Excel_document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
