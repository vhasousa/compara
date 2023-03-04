import { IValidationError } from "errors/IValidationMessage";
import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
	private createProductUseCase: CreateProductUseCase;

	constructor(createProductUseCase: CreateProductUseCase) {
		this.createProductUseCase = createProductUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const {
			name,
			description,
			measurementUnitId,
			barCode,
			volume,
			brandId,
			subCategoryId
		} = request.body;

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
			const product = await this.createProductUseCase.execute({
				name,
				description,
				measurementUnitId: parseInt(measurementUnitId),
				barCode,
				volume,
				brandId,
				subCategoryId: parseInt(subCategoryId),
				originalName: originalname,
				key: filename
			});
	
			if (!product.isSuccess) {
				return response.status(400).json(product.error);
			}
	
			return response.status(201).json(product.value);
		} catch (error) {
			return response.status(500).json(error);
		}
	}
}

export { CreateProductController };
