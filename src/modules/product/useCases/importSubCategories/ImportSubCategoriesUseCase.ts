import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";

import fs from "fs";
import { parse } from 'csv-parse';
import { ICreateSubCategoryDTO, IImportSubCategories, ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import slugify from "slugify";

class ImportSubCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;
  private subCategoriesRepository: ISubCategoriesRepository;
  
  constructor(
    categoriesRepository: ICategoriesRepository,
    subCategoriesRepository: ISubCategoriesRepository
    ) {
    this.categoriesRepository = categoriesRepository;
    this.subCategoriesRepository = subCategoriesRepository;
  }

  async loadProducts(file: Express.Multer.File): Promise<IImportSubCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const subCategories: IImportSubCategories[] = [];

      const parseFile = parse({
        delimiter: ','
      });

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, categoryName] = line;

        subCategories.push({
          name,
          categoryName
        });
      })
      .on("end", () => {
        resolve(subCategories)
      })
      .on("error", (err) => {
        reject(err)
      })
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const subCategories = await this.loadProducts(file);
    const listOfSubCategoriesToCreate: ICreateSubCategoryDTO[] = []

    for (let i = 0; i < subCategories.length; i++) {
      const { name, categoryName } = subCategories[i];

      const category = await this.categoriesRepository.findByName(categoryName)
      
      const createdCategory = category ? category : await this.categoriesRepository.create({
        name: categoryName,
        slug: slugify(categoryName, {
          replacement: '-',
          lower: true,
          remove: /[*+~.()'"!:@<>-?,]/g,
        })
      })

      const slug = slugify(name, {
        replacement: '-',
        lower: true,
        remove: /[*+~.()'"!:@<>-?,]/g,
      })

      listOfSubCategoriesToCreate.push({ 
        name, 
        categoryId: createdCategory.id, 
        slug
      });
    }

    await this.subCategoriesRepository.createMany(listOfSubCategoriesToCreate);
  }
}

export { ImportSubCategoriesUseCase }
