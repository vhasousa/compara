import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("List brand", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to list all brands", async () => {
    await createCategoryUseCase.execute({
      name: "Category",
      description: "Category description"
    });

    const createdBrand = await listCategoriesUseCase.execute()

    expect(createdBrand[0]).toHaveProperty("name");
    expect(createdBrand[0].name).toEqual("Category");
    expect(createdBrand[0].description).toEqual("Category description");
  });
});