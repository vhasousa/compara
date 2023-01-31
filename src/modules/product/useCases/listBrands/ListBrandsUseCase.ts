import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository";
import { Brand } from "@prisma/client";

class ListBrandsUseCase {
  private brandsRepository: IBrandsRepository;

  constructor(listBrandsRepository: IBrandsRepository) {
    this.brandsRepository = listBrandsRepository;
  }

  async execute(): Promise<Brand[]> {
    const brands = await this.brandsRepository.list();

    return brands;
  }
}

export { ListBrandsUseCase };
