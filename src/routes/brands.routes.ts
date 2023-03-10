import { Router } from "express";

import { createBrandsController } from "@modules/product/useCases/createBrands";
import { listBrandsController } from "@modules/product/useCases/listBrands";

const brandsRoutes = Router();

brandsRoutes.post('/', (request, response) => {
    return createBrandsController.handle(request, response);
  }
)

brandsRoutes.get('/', (request, response) => {
  return listBrandsController.handle(request, response);
})

export { brandsRoutes }
