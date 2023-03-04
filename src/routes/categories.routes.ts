import { Router } from "express";

import { createCategoryController } from "@modules/product/useCases/admin/createCategory";
import { listCategoriesController } from "@modules/product/useCases/public/listCategories";
import { importCategoriesController } from "@modules/product/useCases/admin/importCategories";

import multer from "multer";

import uploadConfig from "@config/upload";

const categoriesRoutes = Router();

const upload = multer(uploadConfig);

categoriesRoutes.post("/", upload.single("image"), (request, response) => {
	return createCategoryController.handle(request, response);
}
);

categoriesRoutes.get("/", (request, response) => {
	return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
	return importCategoriesController.handle(request, response);
});

export { categoriesRoutes };
