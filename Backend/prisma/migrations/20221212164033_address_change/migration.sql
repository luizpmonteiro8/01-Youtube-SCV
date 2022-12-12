-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_clientId_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_sellerId_fkey";

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
