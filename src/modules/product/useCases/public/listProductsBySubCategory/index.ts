import { ProductsRepository } from "@modules/product/repositories/prisma/ProductsRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { ListProductsBySubCategoryController } from "./ListProductsBySubCategoryController";
import { ListProductsBySubCategoryUseCase } from "./ListProductsBySubCategoryUseCase";

const productsRepository = new ProductsRepository();
const subCategoriesRepository = new SubCategoriesRepository();

const listProductsBySubCategoryUseCase = new ListProductsBySubCategoryUseCase(
	productsRepository, subCategoriesRepository
);
const listProductsBySubCategoryController = new ListProductsBySubCategoryController(
	listProductsBySubCategoryUseCase
);

export { listProductsBySubCategoryController };