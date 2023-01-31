import { Brand } from "@prisma/client";

import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository";
import { CreateBrandsValidation } from "./CreateBrandsValidation";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";

interface IRequest {
  name: string;
}

class CreateBrandsUseCase {
  private brandsRepository: IBrandsRepository;
  private createBrandsValidation: CreateBrandsValidation;
  
  constructor(
    createServiceRepository: IBrandsRepository, 
    ) {
    this.brandsRepository = createServiceRepository;
    this.createBrandsValidation = new CreateBrandsValidation();
  }

  async execute({ name }: IRequest): Promise<IValidationMessage<Brand>> {
    const brand = await this.brandsRepository.findByName(name);

    if (brand) {
      const brandAlreadyExists = this.createBrandsValidation.brandExists(brand);

      if (!brandAlreadyExists.isSuccess) {
        return brandAlreadyExists;
      }
    }

    const createdBrand = await this.brandsRepository.create({ name });

    const result: IValidationMessage<Brand> = {
      isSuccess: true,
      value: createdBrand
    }

    return result;
  }
}

export { CreateBrandsUseCase }
