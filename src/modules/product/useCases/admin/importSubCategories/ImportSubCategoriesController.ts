import { IValidationError } from "errors/IValidationMessage";
import { Request, Response } from "express";
import { ImportSubCategoriesUseCase } from "./ImportSubCategoriesUseCase";

class ImportSubCategoriesController {
	private importSubCategoriesUseCase: ImportSubCategoriesUseCase;

	constructor(importSubCategoriesUseCase: ImportSubCategoriesUseCase) {
		this.importSubCategoriesUseCase = importSubCategoriesUseCase;
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

		try {
			const imported = await this.importSubCategoriesUseCase.execute(file);

			return response.status(201).json(imported);
		} catch (error) {
			return response.status(201).json(error);
			
		}
	}
}

export { ImportSubCategoriesController };
