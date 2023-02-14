import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { CreateSubCategoryController } from "./CreateSubCategoryController";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

const subCategoriesRepository = new SubCategoriesRepository();
const categoriesRepository = new CategoriesRepository();

const createSubCategoryUseCase = new CreateSubCategoryUseCase(
  subCategoriesRepository,
  categoriesRepository
  );
const createSubCategoryController = new CreateSubCategoryController(createSubCategoryUseCase);

export { createSubCategoryController }