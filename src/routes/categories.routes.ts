import { createCategoryController } from "@modules/product/useCases/createCategory";
import { importCategoriesController } from "@modules/product/useCases/importCategories";
import { listCategoriesController } from "@modules/product/useCases/listCategories";
import { Router } from "express";

import multer from 'multer';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
  }
)

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
})

categoriesRoutes.post('/import', upload.single("file"), (request, response) => {
  return importCategoriesController.handle(request, response);
});

export { categoriesRoutes }
