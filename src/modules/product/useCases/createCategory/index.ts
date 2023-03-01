import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";

const categoriesRepository = new CategoriesRepository();
const imagesRepository = new ImagesRepository();
const storageRepository = new LocalStorageProvider()

const createCategoryUseCase = new CreateCategoryUseCase(
  categoriesRepository, imagesRepository, storageRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController }