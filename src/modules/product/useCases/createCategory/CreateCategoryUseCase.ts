import { Category } from "@prisma/client";

import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { CreateCategoryValidation } from "./CreateCategoryValidation";

interface IRequest {
  name: string
  description?: string
}

class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;
  private createCategoryValidation: CreateCategoryValidation;
  
  constructor(
    createCategoryRepository: ICategoriesRepository, 
    ) {
    this.categoriesRepository = createCategoryRepository;
    this.createCategoryValidation = new CreateCategoryValidation();
  }

  async execute({ name, description }: IRequest): Promise<IValidationMessage<Category>> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      const categoryAlreadyExists = this.createCategoryValidation.categoryExists(category);

      if (!categoryAlreadyExists.isSuccess) {
        return categoryAlreadyExists;
      }
    }

    const createdBrand = await this.categoriesRepository.create({ name, description });

    const result: IValidationMessage<Category> = {
      isSuccess: true,
      value: createdBrand
    }

    return result;
  }
}

export { CreateCategoryUseCase }
