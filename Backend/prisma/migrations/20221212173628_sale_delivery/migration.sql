/*
  Warnings:

  - Added the required column `delivered` to the `sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDelivery` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "delivered" BOOLEAN NOT NULL,
ADD COLUMN     "toDelivery" BOOLEAN NOT NULL;
