import { ProductsRepository } from "@modules/product/repositories/prisma/ProductsRepository";
import { ListProductsController } from "./ListProductsController";
import { ListProductsUseCase } from "./ListProductsUseCase";

const productsRepository = new ProductsRepository();

const listProductsUseCase = new ListProductsUseCase(productsRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

export { listProductsController }