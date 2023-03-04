import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { IResponseSubCategoryDTO, ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { IValidationMessage } from "errors/IValidationMessage";
import { ListSubCategoriesByCategoryValidation } from "./ListSubCategoriesByCategoryValidation";

interface IRequest {
  categorySlug: string
}

class ListSubCategoriesByCategoryUseCase {
	private subCategoriesRepository: ISubCategoriesRepository;
	private categoriesRepository: ICategoriesRepository;
	private listSubCategoriesByCategoryValidation: ListSubCategoriesByCategoryValidation;

	constructor(
		subCategoriesRepository: ISubCategoriesRepository,
		categoriesRepository: ICategoriesRepository
	) {
		this.subCategoriesRepository = subCategoriesRepository;
		this.categoriesRepository = categoriesRepository;
		this.listSubCategoriesByCategoryValidation = new ListSubCategoriesByCategoryValidation();
	}

	async execute({ categorySlug }: IRequest): 
		Promise<IValidationMessage<IResponseSubCategoryDTO[]>> {
		const category = await this.categoriesRepository.findBySlug(categorySlug);

		if(!category) {
			const categoryExists = this.listSubCategoriesByCategoryValidation.categoryExists(category);

			if (categoryExists.isFailure) {
				return categoryExists;
			}
		}

		const subCategories = await this.subCategoriesRepository.listByCategory(category.id);

		const subCategoriesMapped = subCategories.map(subCategory => {
			const { id, name, description, image, slug } = subCategory;

			const imageUrl = `${process.env.APP_HOST}/${image.key}`;

			const subCategoriesMapped: IResponseSubCategoryDTO = { 
				id,
				name,
				description,
				imageUrl,
				slug
			};

			return subCategoriesMapped;
		});

		const result = {
			isSuccess: true,
			isFailure: false,
			value: subCategoriesMapped
		};

		return result;
	}
}

export { ListSubCategoriesByCategoryUseCase };
