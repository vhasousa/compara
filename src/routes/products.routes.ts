import { Router } from "express";

import multer from 'multer';

import { createProductController } from "@modules/product/useCases/createProduct";
import { listProductsController } from "@modules/product/useCases/listProducts";
import { importProductsController } from "@modules/product/useCases/importProducts";


const productsRoutes = Router();

const upload = multer({
  dest: './tmp',
});

productsRoutes.post('/', (request, response) => {
  return createProductController.handle(request, response);
});

productsRoutes.get('/', (request, response) => {
  return listProductsController.handle(request, response);
});

productsRoutes.post('/import', upload.single("file"), (request, response) => {
  return importProductsController.handle(request, response);
});

export { productsRoutes }
