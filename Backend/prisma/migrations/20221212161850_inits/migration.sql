-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_addressId_fkey";

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
