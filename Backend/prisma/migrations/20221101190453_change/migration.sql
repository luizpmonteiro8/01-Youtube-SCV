/*
  Warnings:

  - Changed the type of `priceSale` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "priceSale",
ADD COLUMN     "priceSale" MONEY NOT NULL;
