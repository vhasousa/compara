import slugify from "slugify";

import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { CreateCategoryValidation } from "./CreateCategoryValidation";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { ICategoryDTO } from "@modules/product/interfaces/dtos/ICategoryDTO";

interface IRequest {
  name: string
  description?: string
  originalName: string
  key: string
}

class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;
  private imagesRepository: IImagesRepository;
  private createCategoryValidation: CreateCategoryValidation;
  
  constructor(
    createCategoryRepository: ICategoriesRepository,
    imagesRepository: IImagesRepository,
    ) {
    this.categoriesRepository = createCategoryRepository;
    this.imagesRepository = imagesRepository;
    this.createCategoryValidation = new CreateCategoryValidation();
  }

  async execute({ 
    name,
    description,
    originalName,
    key
  }: IRequest): Promise<IValidationMessage<ICategoryDTO>> {    
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      const categoryAlreadyExists = 
      this.createCategoryValidation.categoryExists(category);

      if (!categoryAlreadyExists.isSuccess) {
        return categoryAlreadyExists;
      }
    }

    const image = await this.imagesRepository.create({ originalName, key })

    const slug = slugify(name, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@<>-?,]/g,
    });

    const createdBrand = await this.categoriesRepository.create({ 
      name, description, imageId: image.id, slug, image });

    const result: IValidationMessage<ICategoryDTO> = {
      isSuccess: true,
      value: createdBrand
    }

    return result;
  }
}

export { CreateCategoryUseCase }
