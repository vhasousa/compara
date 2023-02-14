import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { IImportCategories, IImportProducts } from "@modules/product/repositories/IProductsRepository";

import fs from "fs";
import { parse } from 'csv-parse';

class ImportCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;
  
  constructor(
    categoriesRepository: ICategoriesRepository,
    ) {
    this.categoriesRepository = categoriesRepository;
  }

  async loadProducts(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const products: IImportCategories[] = [];

      const parseFile = parse({
        delimiter: ','
      });

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name] = line;
        
        products.push({
          name,
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
    const categories = await this.loadProducts(file);

    console.log(categories);

    await this.categoriesRepository.createMany(categories);
  }
}

export { ImportCategoriesUseCase }
