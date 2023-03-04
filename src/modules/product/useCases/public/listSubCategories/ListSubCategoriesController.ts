import { Request, Response } from "express";
import { ListSubCategoriesUseCase } from "./ListSubCategoriesUseCase";

class ListSubCategoriesController {
	private listSubCategoriesUseCase: ListSubCategoriesUseCase;

	constructor(listSubCategoriesUseCase: ListSubCategoriesUseCase) {
		this.listSubCategoriesUseCase = listSubCategoriesUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const subCategories = await this.listSubCategoriesUseCase.execute();

			return response.status(200).json(subCategories);
		} catch (error) {
			return response.status(200).json(error);
		}
	}
}

export { ListSubCategoriesController };
