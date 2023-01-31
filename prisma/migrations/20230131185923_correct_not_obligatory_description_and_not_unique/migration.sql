-- DropIndex
DROP INDEX "categories_description_key";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "description" DROP NOT NULL;
