import { Router } from "express";

import multer from 'multer';

import { createProductController } from "@modules/product/useCases/createProduct";
import { importProductsController } from "@modules/product/useCases/importProducts";

import uploadConfig from '@config/upload'
import { ListProductsBySubCategoryController } from "@modules/product/useCases/listProductsBySubCategory/ListProductsBySubCategoryController";
import { listProductsBySubCategoryController } from "@modules/product/useCases/listProductsBySubCategory";

const productsRoutes = Router();

const upload = multer(uploadConfig);

productsRoutes.post('/', upload.single('image'), (request, response) => {
  return createProductController.handle(request, response);
});

productsRoutes.get('/:subCategorySlug', (request, response) => {
  return listProductsBySubCategoryController.handle(request, response);
});

productsRoutes.post('/import', upload.single("file"), (request, response) => {
  return importProductsController.handle(request, response);
});

export { productsRoutes }
