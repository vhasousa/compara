import { Request, Response } from "express";
import { ListSubCategoriesByCategoryUseCase } from "./ListSubCategoriesByCategoryUseCase";

class ListSubCategoriesByCategoryController {
  private listSubCategoriesByCategoryUseCase: ListSubCategoriesByCategoryUseCase;

  constructor(listSubCategoriesByCategoryUseCase: ListSubCategoriesByCategoryUseCase) {
    this.listSubCategoriesByCategoryUseCase = listSubCategoriesByCategoryUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { categoryName } = request.params

    const subCategories = await this.listSubCategoriesByCategoryUseCase.execute({
      categoryName
    });

    return response.status(200).json(subCategories);
  }
}

export { ListSubCategoriesByCategoryController };
