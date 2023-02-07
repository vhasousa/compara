/*
  Warnings:

  - You are about to drop the column `unit` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "unit",
ADD COLUMN     "measurement_unit_id" TEXT;

-- CreateTable
CREATE TABLE "measurement_unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "measurement_unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measurement_unit_name_key" ON "measurement_unit"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_measurement_unit_id_fkey" FOREIGN KEY ("measurement_unit_id") REFERENCES "measurement_unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
