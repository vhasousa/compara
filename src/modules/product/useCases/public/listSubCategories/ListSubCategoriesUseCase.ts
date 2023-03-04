import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { SubCategory } from "@prisma/client";

class ListSubCategoriesUseCase {
	private subCategoriesRepository: ISubCategoriesRepository;

	constructor(subCategoriesRepository: ISubCategoriesRepository) {
		this.subCategoriesRepository = subCategoriesRepository;
	}

	async execute(): Promise<SubCategory[]> {
		const subCategories = await this.subCategoriesRepository.list();

		return subCategories;
	}
}

export { ListSubCategoriesUseCase };
