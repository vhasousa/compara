import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { ListSubCategoriesByCategoryController } from "./ListSubCategoriesByCategoryController";
import { ListSubCategoriesByCategoryUseCase } from "./ListSubCategoriesByCategoryUseCase";

const subCategoriesRepository = new SubCategoriesRepository();
const categoriesRepository = new CategoriesRepository();

const listSubCategoriesByCategoryUseCase = new ListSubCategoriesByCategoryUseCase(
  subCategoriesRepository, categoriesRepository);
const listSubCategoriesByCategoryController = new ListSubCategoriesByCategoryController(
  listSubCategoriesByCategoryUseCase);

export { listSubCategoriesByCategoryController }