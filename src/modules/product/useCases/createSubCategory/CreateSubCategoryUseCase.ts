import { Category, SubCategory } from "@prisma/client";

import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { CreateSubCategoryValidation } from "./CreateSubCategoryValidation";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";

interface IRequest {
  name: string
  description?: string
  categoryName: string
}

class CreateSubCategoryUseCase {
  private subCategoriesRepository: ISubCategoriesRepository;
  private categoriesRepository: ICategoriesRepository;
  private createSubCategoryValidation: CreateSubCategoryValidation;
  
  constructor(
    subCategoriesRepository: ISubCategoriesRepository,
    categoriesRepository: ICategoriesRepository,
    ) {
    this.subCategoriesRepository = subCategoriesRepository;
    this.categoriesRepository = categoriesRepository;
    this.createSubCategoryValidation = new CreateSubCategoryValidation();
  }

  async execute({ 
    name, 
    description,
    categoryName,
  }: IRequest): Promise<IValidationMessage<Category>> {
    const category = await this.categoriesRepository.findByName(categoryName);

    if (!category) {
      const categoryExists = this.createSubCategoryValidation.categoryExists(category);

      if (!categoryExists.isSuccess) {
        return categoryExists;
      }
    }

    const createdSubcategory = await this.subCategoriesRepository.create({ 
      name, 
      description, 
      categoryId: category.id,
      category
    });

    const result: IValidationMessage<Category> = {
      isSuccess: true,
      value: createdSubcategory
    }

    return result;
  }
}

export { CreateSubCategoryUseCase }
