import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	private listCategoriesUseCase: ListCategoriesUseCase;

	constructor(listCategoriesUseCase: ListCategoriesUseCase) {
		this.listCategoriesUseCase = listCategoriesUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const categories = await this.listCategoriesUseCase.execute();

			return response.status(200).json(categories);
		} catch (error) {
			return response.status(500).json(error);
		}
	}
}

export { ListCategoriesController };
