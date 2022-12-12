-- DropForeignKey
ALTER TABLE "sale_item" DROP CONSTRAINT "sale_item_saleId_fkey";

-- AddForeignKey
ALTER TABLE "sale_item" ADD CONSTRAINT "sale_item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
