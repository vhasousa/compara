import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async () => {
    const createdBrand = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    expect(createdBrand.value).toHaveProperty("name");
    expect(createdBrand.value.name).toEqual("Category name");
    expect(createdBrand.value.description).toEqual("Category description");
  });

  it("should not be able to create a new category with a name that already exists", async () => {
    await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const createdBrand = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    expect(createdBrand.error.type).toEqual("category.already.exists");
    expect(createdBrand.error.field).toEqual("name");
    expect(createdBrand.isSuccess).toEqual(false);
  });
});