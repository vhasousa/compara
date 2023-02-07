/*
  Warnings:

  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "quantity",
DROP COLUMN "weight",
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "volume" SET DATA TYPE TEXT;
