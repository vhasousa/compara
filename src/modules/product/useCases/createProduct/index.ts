import { BrandsRepository } from "@modules/product/repositories/prisma/BrandsRepository";
import { CategoriesRepository } from "@modules/product/repositories/prisma/CategoriesRepository";
import { MeasurementUnitsRepository } from "@modules/product/repositories/prisma/MeasurementUnitsRepository";
import { ProductsRepository } from "@modules/product/repositories/prisma/ProductsRepository";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const productsRepository = new ProductsRepository();
const brandsRepository = new BrandsRepository();
const measurementUnitsRepository = new MeasurementUnitsRepository();
const categoriesRepository = new CategoriesRepository();

const createProductUseCase = new CreateProductUseCase(
  productsRepository, brandsRepository, categoriesRepository, measurementUnitsRepository);
const createProductController = new CreateProductController(createProductUseCase);

export { createProductController }