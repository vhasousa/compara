import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { Category } from "@prisma/client";

interface IResponseDTO {
  id: number
  name: string
  description: string
  imageUrl: string
  slug: string
}

class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<IResponseDTO[]> {
    const categories = await this.categoriesRepository.list();

    const categoriesMapped = categories.map(category => {
      const { id, name, description, image, slug } = category

      const imageUrl = `${process.env.APP_HOST}/${image.key}`

      const categoryMapped: IResponseDTO = { id, name, description, imageUrl, slug }

      return categoryMapped
    })

    return categoriesMapped;
  }
}

export { ListCategoriesUseCase };
