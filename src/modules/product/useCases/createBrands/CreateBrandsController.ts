import { Request, Response } from "express";
import { CreateBrandsUseCase } from "./CreateBrandsUseCase";

class CreateBrandsController {
  private createBrandsUseCase: CreateBrandsUseCase;

  constructor(createServiceUseCase: CreateBrandsUseCase) {
    this.createBrandsUseCase = createServiceUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body; 

    const brand = await this.createBrandsUseCase.execute({ name });

    if (!brand.isSuccess) {
      return response.status(400).json(brand.error);
    }

    return response.status(201).json(brand.value);
  }
}

export { CreateBrandsController }
