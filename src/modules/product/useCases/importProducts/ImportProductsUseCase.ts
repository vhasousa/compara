import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";
import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository";
import { IImportProducts, IProductsRepository } from "@modules/product/repositories/IProductsRepository";
import { Product } from "@prisma/client";

import fs from "fs";
import { parse } from 'csv-parse';



class ImportProductsUseCase {
  private productsRepository: IProductsRepository;
  private brandsRepository: IBrandsRepository;
  private measurementUnitsRepository: IMeasurementUnitsRepository;
  private categoriesRepository: ICategoriesRepository;
  
  constructor(
    productsRepository: IProductsRepository,
    // brandsRepository: IBrandsRepository,
    // categoriesRepository: ICategoriesRepository,
    // measurementUnitsRepository: IMeasurementUnitsRepository
    ) {
    this.productsRepository = productsRepository;
    // this.brandsRepository = brandsRepository;
    // this.categoriesRepository = categoriesRepository;
    // this.measurementUnitsRepository = measurementUnitsRepository;
  }

  async loadProducts(file: Express.Multer.File): Promise<IImportProducts[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const products: IImportProducts[] = [];

      const parseFile = parse({
        delimiter: ','
      });

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name,
          description,
          measurementUnitId,
          barCode,
          volume,
          brandId,
          categoryId] = line;
        
        const parsedMeasurementUnitId = parseInt(measurementUnitId)
        const parsedCategoryId = parseInt(categoryId)
        
        products.push({
          name,
          description,
          measurementUnitId: parsedMeasurementUnitId,
          barCode,
          volume,
          brandId,
          categoryId: parsedCategoryId
        });
      })
      .on("end", () => {
        resolve(products)
      })
      .on("error", (err) => {
        reject(err)
      })
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const products = await this.loadProducts(file);

    await this.productsRepository.createMany(products);

    console.log(products);

  }
}

export { ImportProductsUseCase }
