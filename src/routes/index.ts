import { Router } from "express";
import { brandsRoutes } from "./brands.routes";

const router = Router();

router.use('/brands', brandsRoutes);

export { router };
