import { Request, Response } from "express";

import { ListBrandsUseCase } from "./ListBrandsUseCase";

class ListBrandsController {
  private listBrandsUseCase: ListBrandsUseCase;

  constructor(listServiceUseCase: ListBrandsUseCase) {
    this.listBrandsUseCase = listServiceUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const brands = await this.listBrandsUseCase.execute();

    return response.status(200).json(brands);
  }
}

export { ListBrandsController };
