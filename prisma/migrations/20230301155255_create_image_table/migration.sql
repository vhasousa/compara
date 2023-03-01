-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "image_id" TEXT;

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
