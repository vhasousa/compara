import { Router } from "express";

import { createProductController } from "@modules/product/useCases/createProduct";
import { listProductsController } from "@modules/product/useCases/listProducts";


const productsRoutes = Router();

productsRoutes.post('/', (request, response) => {
  return createProductController.handle(request, response);
})

productsRoutes.get('/', (request, response) => {
  return listProductsController.handle(request, response);
})

export { productsRoutes }
