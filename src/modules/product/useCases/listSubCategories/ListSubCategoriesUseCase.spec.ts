import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { SubCategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateSubCategoryUseCase } from "../createSubCategory/CreateSubCategoryUseCase";
import { ListSubCategoriesUseCase } from "./ListSubCategoriesUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let listSubCategoriesUseCase: ListSubCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let subCategoriesRepositoryInMemory: SubCategoriesRepositoryInMemory;

describe("List sub categories", () => {
  
  beforeEach(() => {
    subCategoriesRepositoryInMemory = new SubCategoriesRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory);
    createSubCategoryUseCase = new CreateSubCategoryUseCase(
      subCategoriesRepositoryInMemory,
      categoriesRepositoryInMemory
      );
    listSubCategoriesUseCase = new ListSubCategoriesUseCase(
      subCategoriesRepositoryInMemory);
  })

  it("should be able to list all brands", async () => {
    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    await createSubCategoryUseCase.execute({
      name: "Sub Category",
      description: "Sub Category description",
      categoryName: createdCategory.value.name,
    });

    const listOfSubCategories = await listSubCategoriesUseCase.execute()

    expect(listOfSubCategories[0]).toHaveProperty("name");
    expect(listOfSubCategories[0].name).toEqual("Sub Category");
    expect(listOfSubCategories[0].description).toEqual("Sub Category description");
  });
});