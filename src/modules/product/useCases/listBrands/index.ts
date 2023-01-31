import { BrandsRepository } from "../../repositories/prisma/BrandsRepository";
import { ListBrandsController } from "./ListBrandsController";
import { ListBrandsUseCase } from "./ListBrandsUseCase";

const brandsRepository = new BrandsRepository();

const listBrandsUseCase = new ListBrandsUseCase(brandsRepository);
const listBrandsController = new ListBrandsController(listBrandsUseCase);

export { listBrandsController }