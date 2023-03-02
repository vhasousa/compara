import slugify from "slugify";

import { Category, SubCategory } from "@prisma/client";

import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { CreateSubCategoryValidation } from "./CreateSubCategoryValidation";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";

interface IRequest {
  name: string
  description?: string
  categoryName: string
  originalName: string
  key: string
}

class CreateSubCategoryUseCase {
  private subCategoriesRepository: ISubCategoriesRepository;
  private categoriesRepository: ICategoriesRepository;
  private imagesRepository: IImagesRepository;
  private createSubCategoryValidation: CreateSubCategoryValidation;
  
  constructor(
    subCategoriesRepository: ISubCategoriesRepository,
    categoriesRepository: ICategoriesRepository,
    imagesRepository: IImagesRepository
    ) {
    this.subCategoriesRepository = subCategoriesRepository;
    this.categoriesRepository = categoriesRepository;
    this.imagesRepository = imagesRepository;
    this.createSubCategoryValidation = new CreateSubCategoryValidation();
  }

  async execute({ 
    name, 
    description,
    categoryName,
    originalName,
    key
  }: IRequest): Promise<IValidationMessage<Category>> {
    const category = await this.categoriesRepository.findByName(categoryName);

    if (!category) {
      const categoryExists = this.createSubCategoryValidation.categoryExists(category);

      if (!categoryExists.isSuccess) {
        return categoryExists;
      }
    }

    const image = await this.imagesRepository.create({ originalName, key })

    const slug = slugify(name, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@<>-?,]/g,
    });

    const createdSubcategory = await this.subCategoriesRepository.create({ 
      name, 
      description, 
      categoryId: category.id,
      category,
      imageId: image.id,
      slug,
      image
    });

    const result: IValidationMessage<Category> = {
      isSuccess: true,
      value: createdSubcategory
    }

    return result;
  }
}

export { CreateSubCategoryUseCase }
