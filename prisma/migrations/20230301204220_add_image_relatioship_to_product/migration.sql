/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "image_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "products_image_id_key" ON "products"("image_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
