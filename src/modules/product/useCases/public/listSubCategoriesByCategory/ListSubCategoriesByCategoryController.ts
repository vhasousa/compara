import { Request, Response } from "express";
import { ListSubCategoriesByCategoryUseCase } from "./ListSubCategoriesByCategoryUseCase";

class ListSubCategoriesByCategoryController {
	private listSubCategoriesByCategoryUseCase: ListSubCategoriesByCategoryUseCase;

	constructor(listSubCategoriesByCategoryUseCase: ListSubCategoriesByCategoryUseCase) {
		this.listSubCategoriesByCategoryUseCase = listSubCategoriesByCategoryUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const { categorySlug } = request.params;

		try {
			const subCategories = await this.listSubCategoriesByCategoryUseCase.execute({
				categorySlug
			});

			if (subCategories.isFailure) {
				return response.status(400).json(subCategories.error);
			}

			return response.status(200).json(subCategories.value);
		}catch (err) {
			return response.status(200).send();
		}

	}
}

export { ListSubCategoriesByCategoryController };
