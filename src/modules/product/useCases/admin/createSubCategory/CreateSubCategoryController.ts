import { IValidationError } from "errors/IValidationMessage";
import { Request, Response } from "express";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

class CreateSubCategoryController {
	private createSubCategoryUseCase: CreateSubCategoryUseCase;

	constructor(createSubCategoryUseCase: CreateSubCategoryUseCase) {
		this.createSubCategoryUseCase = createSubCategoryUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const { name, description, categoryName } = request.body;

		if (!request.file) {
			const errorMessage: IValidationError = {
				field: "image",
				message: "Imagem não encontrada",
				type: "image.not.found"
			};
      
			return response.status(400).json(errorMessage);
		}

		const { originalname, filename } = request.file;

		try {
			const subCategory = await this.createSubCategoryUseCase.execute({ 
				name, 
				description,
				categoryName,
				originalName: originalname,
				key: filename
			});
	
			if (!subCategory.isSuccess) {
				return response.status(400).json(subCategory.error);
			}
	
			return response.status(201).json(subCategory.value);
		} catch (error) {
			return response.status(201).json(error);
		}
	}
}

export { CreateSubCategoryController };
