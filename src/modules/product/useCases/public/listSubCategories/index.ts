import { SubCategoriesRepository } from "@modules/product/repositories/prisma/SubCategoriesRepository";
import { ListSubCategoriesController } from "./ListSubCategoriesController";
import { ListSubCategoriesUseCase } from "./ListSubCategoriesUseCase";

const subCategoriesRepository = new SubCategoriesRepository();

const listSubCategoriesUseCase = new ListSubCategoriesUseCase(subCategoriesRepository);
const listSubCategoriesController = new ListSubCategoriesController(listSubCategoriesUseCase);

export { listSubCategoriesController };