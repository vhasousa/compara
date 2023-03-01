import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { SubCategory } from "@prisma/client";

interface IRequest {
  categoryName: string
}

class ListSubCategoriesByCategoryUseCase {
  private subCategoriesRepository: ISubCategoriesRepository;
  private categoriesRepository: ICategoriesRepository;

  constructor(
    subCategoriesRepository: ISubCategoriesRepository,
    categoriesRepository: ICategoriesRepository
    ) {
    this.subCategoriesRepository = subCategoriesRepository;
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ categoryName }: IRequest): Promise<SubCategory[]> {
    const category = await this.categoriesRepository.findByName(categoryName);

    const subCategories = await this.subCategoriesRepository.listByCategory(category.id);

    return subCategories;
  }
}

export { ListSubCategoriesByCategoryUseCase };
