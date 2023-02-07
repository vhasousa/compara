import { Product } from "@prisma/client";

import { IProductsRepository, IResponseProductDTO } from "@modules/product/repositories/IProductsRepository";

class ListProductsUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(): Promise<IResponseProductDTO[]> {
    const products = await this.productsRepository.list();

    return products;
  }
}

export { ListProductsUseCase };
