import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { StorageProvider } from "@shared/StorageProvider/implementations/StorageProvider";

const categoriesRepository = new CategoriesRepository();
const storageProviver = 
	process.env.disk ? new LocalStorageProvider() : new StorageProvider();
const imagesRepository = new ImagesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
	categoriesRepository, imagesRepository, storageProviver);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };