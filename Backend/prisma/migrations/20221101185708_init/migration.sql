-- CreateTable
CREATE TABLE "unity" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "unity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "priceSale" DOUBLE PRECISION NOT NULL,
    "unity_id" BIGINT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unity_name_key" ON "unity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_unity_id_fkey" FOREIGN KEY ("unity_id") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
