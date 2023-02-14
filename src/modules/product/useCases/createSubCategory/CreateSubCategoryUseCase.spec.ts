import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { SubCategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let subCategoriesRepositoryInMemory: SubCategoriesRepositoryInMemory;

describe("Create sub category", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    subCategoriesRepositoryInMemory = new SubCategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    createSubCategoryUseCase = new CreateSubCategoryUseCase(
      subCategoriesRepositoryInMemory,
      categoriesRepositoryInMemory
      );
  })

  it("should be able to create a new sub category", async () => {
    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const createdSubCategory = await createSubCategoryUseCase.execute({
      name: "Sub Category",
      description: "Sub Category description",
      categoryName: createdCategory.value.name
    });

    expect(createdSubCategory.value).toHaveProperty("name");
    expect(createdSubCategory.value.name).toEqual("Sub Category");
    expect(createdSubCategory.value.description).toEqual("Sub Category description");
  });

  // it("should not be able to create a new category with a name that already exists", async () => {
  //   await createCategoryUseCase.execute({
  //     name: "Category name",
  //     description: "Category description"
  //   });

  //   const createdCategory = await createCategoryUseCase.execute({
  //     name: "Category name",
  //     description: "Category description"
  //   });

  //   expect(createdCategory.error.type).toEqual("category.already.exists");
  //   expect(createdCategory.error.field).toEqual("name");
  //   expect(createdCategory.isSuccess).toEqual(false);
  // });
});