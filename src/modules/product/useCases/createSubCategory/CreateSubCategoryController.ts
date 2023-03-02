import { Request, Response } from "express";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

class CreateSubCategoryController {
  private createSubCategoryUseCase: CreateSubCategoryUseCase;

  constructor(createSubCategoryUseCase: CreateSubCategoryUseCase) {
    this.createSubCategoryUseCase = createSubCategoryUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, categoryName } = request.body;

    const { originalname, filename } = request.file;

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
  }
}

export { CreateSubCategoryController }
