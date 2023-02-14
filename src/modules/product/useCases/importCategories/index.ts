import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { ProductsRepository } from "@modules/product/repositories/prisma/ProductsRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const categoriesRepository = new CategoriesRepository();

const importCategoriesUseCase = new ImportCategoriesUseCase(categoriesRepository);
const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase);

export { importCategoriesController }
