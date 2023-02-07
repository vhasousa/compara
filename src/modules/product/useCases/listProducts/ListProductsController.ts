import { Request, Response } from "express";
import { ListProductsUseCase } from "./ListProductsUseCase";


class ListProductsController {
  private listProductsUseCase: ListProductsUseCase;

  constructor(listProductsUseCase: ListProductsUseCase) {
    this.listProductsUseCase = listProductsUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const products = await this.listProductsUseCase.execute();

    return response.status(200).json(products);
  }
}

export { ListProductsController };
