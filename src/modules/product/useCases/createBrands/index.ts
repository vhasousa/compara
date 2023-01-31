import { BrandsRepository } from "../../repositories/prisma/BrandsRepository";
import { CreateBrandsController } from "./CreateBrandsController";
import { CreateBrandsUseCase } from "./CreateBrandsUseCase";

const brandsRepository = new BrandsRepository();

const createBrandsUseCase = new CreateBrandsUseCase(brandsRepository);
const createBrandsController = new CreateBrandsController(createBrandsUseCase);

export { createBrandsController }