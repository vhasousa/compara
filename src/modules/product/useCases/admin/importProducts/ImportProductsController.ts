import { IValidationError } from "errors/IValidationMessage";
import { Request, Response } from "express";
import { ImportProductsUseCase } from "./ImportProductsUseCase";

class ImportProductsController {
	private importProductsUseCase: ImportProductsUseCase;

	constructor(importProductsUseCase: ImportProductsUseCase) {
		this.importProductsUseCase = importProductsUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const { file } = request;

		if (!file) {
			const errorMessage: IValidationError = {
				field: "file",
				message: "Arquivo não encontrada",
				type: "file.not.found"
			};
      
			return response.status(400).json(errorMessage);
		}

		const imported = await this.importProductsUseCase.execute(file);

		return response.status(201).json(imported);
	}
}

export { ImportProductsController };
