import { Router } from "express";
import multer from "multer";

import { createSubCategoryController } from "@modules/product/useCases/admin/createSubCategory";
import { listSubCategoriesByCategoryController } from "@modules/product/useCases/public/listSubCategoriesByCategory";
import { listSubCategoriesController } from "@modules/product/useCases/public/listSubCategories";
import { importSubCategoriesController } from "@modules/product/useCases/admin/importSubCategories";

import uploadConfig from "@config/upload";

const subCategoriesRoutes = Router();

const upload = multer(uploadConfig);

subCategoriesRoutes.post("/", upload.single("image"), (request, response) => {
	return createSubCategoryController.handle(request, response);
});

subCategoriesRoutes.get("/:categorySlug", (request, response) => {
	return listSubCategoriesByCategoryController.handle(request, response);
});

subCategoriesRoutes.get("/", (request, response) => {
	return listSubCategoriesController.handle(request, response);
});

subCategoriesRoutes.post("/import", upload.single("file"), (request, response) => {
	return importSubCategoriesController.handle(request, response);
});

export { subCategoriesRoutes };
