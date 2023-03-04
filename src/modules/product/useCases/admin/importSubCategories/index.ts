import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { ImportSubCategoriesController } from "./ImportSubCategoriesController";
import { ImportSubCategoriesUseCase } from "./ImportSubCategoriesUseCase";

const subCategoriesRepository = new SubCategoriesRepository();
const categoriesRepository = new CategoriesRepository();
const storageProvider =  new LocalStorageProvider();

const importCategoriesUseCase = new ImportSubCategoriesUseCase(
	categoriesRepository, 
	subCategoriesRepository,
	storageProvider
);
const importSubCategoriesController = new ImportSubCategoriesController(
	importCategoriesUseCase);

export { importSubCategoriesController };
