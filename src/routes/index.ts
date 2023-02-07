import { Router } from "express";
import { brandsRoutes } from "./brands.routes";
import { categoriesRoutes } from "./categories.routes";
import { measurementUnitsRoutes } from "./measurementUnits.routes";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use('/brands', brandsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/measurement_units', measurementUnitsRoutes);

export { router };
