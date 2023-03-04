import { IValidationError } from "errors/IValidationMessage";
import { Request, Response } from "express";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
	private importCategoriesUseCase: ImportCategoriesUseCase;

	constructor(importCategoriesUseCase: ImportCategoriesUseCase) {
		this.importCategoriesUseCase = importCategoriesUseCase;
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

		const imported = await this.importCategoriesUseCase.execute(file);

		return response.status(201).json(imported);
	}
}

export { ImportCategoriesController };
