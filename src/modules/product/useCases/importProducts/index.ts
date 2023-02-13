import { ProductsRepository } from "@modules/product/repositories/prisma/ProductsRepository";
import { ImportProductsController } from "./ImportProductsController";
import { ImportProductsUseCase } from "./ImportProductsUseCase";

const productsRepository = new ProductsRepository();

const importProductsUseCase = new ImportProductsUseCase(productsRepository);
const importProductsController = new ImportProductsController(
  importProductsUseCase);

export { importProductsController }
