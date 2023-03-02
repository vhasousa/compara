import { Request, Response } from "express";
import { ImportSubCategoriesUseCase } from "./ImportSubCategoriesUseCase";

class ImportSubCategoriesController {
  private importSubCategoriesUseCase: ImportSubCategoriesUseCase;

  constructor(importSubCategoriesUseCase: ImportSubCategoriesUseCase) {
    this.importSubCategoriesUseCase = importSubCategoriesUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request; 

    const imported = await this.importSubCategoriesUseCase.execute(file);

    return response.status(201).json(imported);
  }
}

export { ImportSubCategoriesController }
