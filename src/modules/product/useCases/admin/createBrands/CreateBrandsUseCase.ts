import { Brand } from "@prisma/client";

import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository";
import { CreateBrandsValidation } from "./CreateBrandsValidation";
import { IValidationMessage } from "errors/IValidationMessage";

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
		const brand = name ? await this.brandsRepository.findByName(name) : "";

		if (brand) {
			const brandAlreadyExists = this.createBrandsValidation.brandExists(brand.name);
			const nameInformed = this.createBrandsValidation.nameInformed(name);

			if(nameInformed.isFailure) {
				return nameInformed;
			}

			if (brandAlreadyExists.isFailure) {
				return brandAlreadyExists;
			}
		}

		if (!name) {
			const nameInformed = this.createBrandsValidation.nameInformed(name);

			if(nameInformed.isFailure) {
				return nameInformed;
			}
		}

		const createdBrand = await this.brandsRepository.create({ name });

		const result: IValidationMessage<Brand> = {
			isFailure: false,
			isSuccess: true,
			value: createdBrand
		};

		return result;
	}
}

export { CreateBrandsUseCase };
