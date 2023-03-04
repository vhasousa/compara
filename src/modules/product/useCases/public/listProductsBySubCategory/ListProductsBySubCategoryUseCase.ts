import { IProductsRepository, IResponseProductDTO } from "@modules/product/repositories/IProductsRepository";
import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { ListSubCategoriesValidation } from "./ListProductsBySubCategoryValidation";
import { IValidationMessage } from "errors/IValidationMessage";

interface IRequest {
  subCategorySlug: string
}

class ListProductsBySubCategoryUseCase {
	private productsRepository: IProductsRepository;
	private subCategoriesRepository: ISubCategoriesRepository;
	private listSubCategoriesValidation: ListSubCategoriesValidation;

	constructor(
		productsRepository: IProductsRepository,
		subCategoriesRepository: ISubCategoriesRepository
	) {
		this.productsRepository = productsRepository;
		this.subCategoriesRepository = subCategoriesRepository;
		this.listSubCategoriesValidation = new ListSubCategoriesValidation();
	}

	async execute({ subCategorySlug }: IRequest): 
		Promise<IValidationMessage<IResponseProductDTO[]>> {
		const subCategory = await this.subCategoriesRepository.findBySlug(
			subCategorySlug);

		if (!subCategory) {
			const subCategoryExists = 
				this.listSubCategoriesValidation.subCategoryExists(subCategory);

			if (subCategoryExists.isFailure) {
				return subCategoryExists;
			}
		}

		const products = await this.productsRepository.listBySubCategory(
			subCategory.id);

		const mappedProducts = products.map(product => {
			const { id, name, description, image, subCategory } = product;

			const imageUrl = image ? `${process.env.APP_HOST}/${image.key}` : null;

			const mappedProduct: IResponseProductDTO = {
				id,
				name,
				description,
				subCategory: subCategory.name,
				imageUrl
			};

			return mappedProduct;
		});

		const result = {
			isFailure: false,
			isSuccess:true,
			value: mappedProducts
		};

		return result;
	}
}

export { ListProductsBySubCategoryUseCase };
