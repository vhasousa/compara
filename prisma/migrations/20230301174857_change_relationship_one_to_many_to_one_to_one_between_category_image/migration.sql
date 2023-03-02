/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_image_id_key" ON "categories"("image_id");
