/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `sub_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sub_categories" ADD COLUMN     "image_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sub_categories_image_id_key" ON "sub_categories"("image_id");

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
