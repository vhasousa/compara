import { Request, Response } from "express";
import { ImportProductsUseCase } from "./ImportProductsUseCase";

class ImportProductsController {
  private importProductsUseCase: ImportProductsUseCase;

  constructor(importProductsUseCase: ImportProductsUseCase) {
    this.importProductsUseCase = importProductsUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request; 

    const imported = await this.importProductsUseCase.execute(file);

    return response.status(201).json(imported);
  }
}

export { ImportProductsController }
