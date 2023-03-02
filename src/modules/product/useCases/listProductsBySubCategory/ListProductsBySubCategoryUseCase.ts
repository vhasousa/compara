import { Product } from "@prisma/client";

import { IProductsRepository, IResponseProductDTO } from "@modules/product/repositories/IProductsRepository";
import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";

interface IRequest {
  subCategorySlug: string
}

class ListProductsBySubCategoryUseCase {
  private productsRepository: IProductsRepository;
  private subCategoriesRepository: ISubCategoriesRepository;

  constructor(
    productsRepository: IProductsRepository,
    subCategoriesRepository: ISubCategoriesRepository
    ) {
    this.productsRepository = productsRepository;
    this.subCategoriesRepository = subCategoriesRepository;
  }

  async execute({ subCategorySlug }: IRequest): Promise<IResponseProductDTO[]> {
    const subCategory = await this.subCategoriesRepository.findBySlug(
      subCategorySlug);

    const products = await this.productsRepository.listBySubCategory(
      subCategory.id);

    const mappedProducts = products.map(product => {
      const { id, name, description, image } = product

      const imageUrl = `${process.env.APP_HOST}/${image.key}`

      const mappedProduct: IResponseProductDTO = {
        id,
        name,
        description,
        imageUrl
      }

      return mappedProduct
    })

    return mappedProducts;
  }
}

export { ListProductsBySubCategoryUseCase };
