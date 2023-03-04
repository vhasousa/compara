import { IValidationError } from "errors/IValidationMessage";
import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
	private createCategoryUseCase: CreateCategoryUseCase;

	constructor(createCategoryUseCase: CreateCategoryUseCase) {
		this.createCategoryUseCase = createCategoryUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
    
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
			const category = await this.createCategoryUseCase.execute({ 
				name,
				description,
				originalName: originalname,
				key: filename
			});
	
			if (!category.isSuccess) {
				return response.status(400).json(category.error);
			}
	
			return response.status(201).json(category.value);
		} catch (error) {
			return response.status(201).json(error);
		}
	}
}

export { CreateCategoryController };
