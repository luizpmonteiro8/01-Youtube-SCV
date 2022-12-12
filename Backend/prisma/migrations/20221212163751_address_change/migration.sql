/*
  Warnings:

  - You are about to drop the column `addressId` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sellerId]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_addressId_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_addressId_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "clientId" BIGINT,
ADD COLUMN     "sellerId" BIGINT;

-- AlterTable
ALTER TABLE "client" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "address_sellerId_key" ON "address"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "address_clientId_key" ON "address"("clientId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
