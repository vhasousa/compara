import { BrandsRepositoryInMemory } from "@modules/product/repositories/inMemory/BrandsRepositoryInMemory";
import { CreateBrandsUseCase } from "../createBrands/CreateBrandsUseCase";
import { ListBrandsUseCase } from "./ListBrandsUseCase";

let createBrandUseCase: CreateBrandsUseCase;
let listBrandUseCase: ListBrandsUseCase;
let brandsRepositoryInMemory: BrandsRepositoryInMemory;

describe("List brand", () => {
  
  beforeEach(() => {
    brandsRepositoryInMemory = new BrandsRepositoryInMemory();
    createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
    listBrandUseCase = new ListBrandsUseCase(brandsRepositoryInMemory);
  })

  it("should be able to list all brands", async () => {
    await createBrandUseCase.execute({
      name: "Brand"
    });

    const createdBrand = await listBrandUseCase.execute()

    expect(createdBrand[0]).toHaveProperty("name");
    expect(createdBrand[0].name).toEqual("Brand");
  });
});