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

    const { originalname, filename } = request.file;

    const product = await this.createProductUseCase.execute({
      name,
      description,
      measurementUnitId,
      barCode,
      volume,
      brandId,
      subCategoryId,
      originalName: originalname,
      key: filename
    });

    if (!product.isSuccess) {
      return response.status(400).json(product.error);
    }

    return response.status(201).json(product.value);
  }
}

export { CreateProductController }
