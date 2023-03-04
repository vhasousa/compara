import { Request, Response } from "express";
import { ListProductsBySubCategoryUseCase } from "./ListProductsBySubCategoryUseCase";


class ListProductsBySubCategoryController {
	private listProductsBySubCategoryUseCase: ListProductsBySubCategoryUseCase;

	constructor(listProductsBySubCategoryUseCase: ListProductsBySubCategoryUseCase) {
		this.listProductsBySubCategoryUseCase = listProductsBySubCategoryUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const { subCategorySlug } = request.params;

		try {
			const products = await this.listProductsBySubCategoryUseCase.execute(
				{subCategorySlug});
	
			if (products.isFailure) {
				return response.status(400).json(products.error);
			}
	
			return response.status(200).json(products.value);
		} catch (error) {
			return response.status(200).json(error);
		}
	}
}

export { ListProductsBySubCategoryController };
