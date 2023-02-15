import { ProductsRepository } from "@modules/product/repositories/prisma/ProductsRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { ImportProductsController } from "./ImportProductsController";
import { ImportProductsUseCase } from "./ImportProductsUseCase";

const productsRepository = new ProductsRepository();
const subCategoriesRepository = new SubCategoriesRepository();

const importProductsUseCase = new ImportProductsUseCase(
  productsRepository, 
  subCategoriesRepository
);
const importProductsController = new ImportProductsController(
  importProductsUseCase);

export { importProductsController }
