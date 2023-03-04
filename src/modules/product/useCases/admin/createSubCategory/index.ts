import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { StorageProvider } from "@shared/StorageProvider/implementations/StorageProvider";
import { CreateSubCategoryController } from "./CreateSubCategoryController";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

const subCategoriesRepository = new SubCategoriesRepository();
const categoriesRepository = new CategoriesRepository();
const imagesRepository = new ImagesRepository();
const storageProviver = 
	process.env.disk ? new LocalStorageProvider() : new StorageProvider();

const createSubCategoryUseCase = new CreateSubCategoryUseCase(
	subCategoriesRepository,
	categoriesRepository,
	imagesRepository,
	storageProviver
);
const createSubCategoryController = 
	new CreateSubCategoryController(createSubCategoryUseCase);

export { createSubCategoryController };