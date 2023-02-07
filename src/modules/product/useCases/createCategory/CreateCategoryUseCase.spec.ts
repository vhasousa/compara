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
    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    expect(createdCategory.value).toHaveProperty("name");
    expect(createdCategory.value.name).toEqual("Category name");
    expect(createdCategory.value.description).toEqual("Category description");
  });

  it("should not be able to create a new category with a name that already exists", async () => {
    await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    expect(createdCategory.error.type).toEqual("category.already.exists");
    expect(createdCategory.error.field).toEqual("name");
    expect(createdCategory.isSuccess).toEqual(false);
  });
});