import { Router } from "express";
import multer from "multer";

import { createSubCategoryController } from "@modules/product/useCases/createSubCategory";
import { listSubCategoriesController } from "@modules/product/useCases/listSubCategories";
import { importSubCategoriesController } from "@modules/product/useCases/importSubCategories";
import { listSubCategoriesByCategoryController } from "@modules/product/useCases/listSubCategoriesByCategory";

const subCategoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

subCategoriesRoutes.post('/', (request, response) => {
  return createSubCategoryController.handle(request, response);
})

subCategoriesRoutes.get('/', (request, response) => {
  return listSubCategoriesController.handle(request, response);
})

subCategoriesRoutes.get('/:categoryName', (request, response) => {
  return listSubCategoriesByCategoryController.handle(request, response);
})

subCategoriesRoutes.post('/import', upload.single("file"), (request, response) => {
  return importSubCategoriesController.handle(request, response);
});

export { subCategoriesRoutes }
