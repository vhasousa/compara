import { Router } from "express";
import { brandsRoutes } from "./brands.routes";
import { categoriesRoutes } from "./categories.routes";

const router = Router();

router.use('/brands', brandsRoutes);
router.use('/categories', categoriesRoutes);

export { router };
