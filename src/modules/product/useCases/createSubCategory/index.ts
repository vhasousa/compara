import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { CreateSubCategoryController } from "./CreateSubCategoryController";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

const subCategoriesRepository = new SubCategoriesRepository();
const categoriesRepository = new CategoriesRepository();
const imagesRepository = new ImagesRepository();

const createSubCategoryUseCase = new CreateSubCategoryUseCase(
  subCategoriesRepository,
  categoriesRepository,
  imagesRepository
  );
const createSubCategoryController = new CreateSubCategoryController(createSubCategoryUseCase);

export { createSubCategoryController }