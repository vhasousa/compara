import { Request, Response } from "express";
import { ListProductsBySubCategoryUseCase } from "./ListProductsBySubCategoryUseCase";


class ListProductsBySubCategoryController {
  private listProductsBySubCategoryUseCase: ListProductsBySubCategoryUseCase;

  constructor(listProductsBySubCategoryUseCase: ListProductsBySubCategoryUseCase) {
    this.listProductsBySubCategoryUseCase = listProductsBySubCategoryUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { subCategorySlug } = request.params;

    const products = await this.listProductsBySubCategoryUseCase.execute(
      {subCategorySlug});

    return response.status(200).json(products);
  }
}

export { ListProductsBySubCategoryController };
