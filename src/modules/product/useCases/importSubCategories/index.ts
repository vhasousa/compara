import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { ImportSubCategoriesController } from "./ImportSubCategoriesController";
import { ImportSubCategoriesUseCase } from "./ImportSubCategoriesUseCase";

const subCategoriesRepository = new SubCategoriesRepository();
const categoriesRepository = new CategoriesRepository();

const importCategoriesUseCase = new ImportSubCategoriesUseCase(
  categoriesRepository, 
  subCategoriesRepository
  );
const importSubCategoriesController = new ImportSubCategoriesController(
  importCategoriesUseCase);

export { importSubCategoriesController }