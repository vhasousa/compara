import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { IResponseSubCategoryDTO, ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { SubCategory } from "@prisma/client";

interface IRequest {
  categorySlug: string
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

  async execute({ categorySlug }: IRequest): Promise<IResponseSubCategoryDTO[]> {
    const category = await this.categoriesRepository.findBySlug(categorySlug);

    const subCategories = await this.subCategoriesRepository.listByCategory(category.id);

    const subCategoriesMapped = subCategories.map(subCategory => {
      const { id, name, description, image, slug } = subCategory

      const imageUrl = `${process.env.APP_HOST}/${image.key}`

      const subCategoriesMapped: IResponseSubCategoryDTO = { 
        id,
        name,
        description,
        imageUrl,
        slug
      }

      return subCategoriesMapped
    })

    return subCategoriesMapped;
  }
}

export { ListSubCategoriesByCategoryUseCase };
