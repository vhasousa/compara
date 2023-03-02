import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";

const categoriesRepository = new CategoriesRepository();
const imagesRepository = new ImagesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoriesRepository, imagesRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController }