import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { SubCategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory";
import slugify from "slugify";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateSubCategoryUseCase } from "../createSubCategory/CreateSubCategoryUseCase";
import { ListSubCategoriesByCategoryUseCase } from "./ListSubCategoriesByCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let listSubCategoriesByCategoryUseCase: ListSubCategoriesByCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let subCategoriesRepositoryInMemory: SubCategoriesRepositoryInMemory;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;

describe("Create sub category", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    imagesRepositoryInMemory = new ImagesRepositoryInMemory();
    subCategoriesRepositoryInMemory = new SubCategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory, imagesRepositoryInMemory);
    createSubCategoryUseCase = new CreateSubCategoryUseCase(
      subCategoriesRepositoryInMemory,
      categoriesRepositoryInMemory,
      imagesRepositoryInMemory
    );
    listSubCategoriesByCategoryUseCase = new ListSubCategoriesByCategoryUseCase(
      subCategoriesRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  })

  it("should be able to create a new sub category", async () => {
    const key = "6e7921f2bcc01efc3c769a8a4fd43417-doces.png"

    const [, originalName] = key.split('-')

    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description",
      key,
      originalName
    });

    const createdSubCategory = await createSubCategoryUseCase.execute({
      name: "Sub Category",
      description: "Sub Category description",
      categoryName: createdCategory.value.name,
      key,
      originalName
    });

    const slug = slugify(createdSubCategory.value.name, {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@<>-?,]/g,
    });

    const listOfSubCategories = await 
      listSubCategoriesByCategoryUseCase.execute({ 
        categorySlug: createdCategory.value.slug 
      });

    expect(listOfSubCategories[0]).toHaveProperty("name");
    expect(listOfSubCategories[0].name).toEqual("Sub Category");
    expect(listOfSubCategories[0].description).toEqual("Sub Category description");
    expect(listOfSubCategories[0].slug).toEqual(slug);
  });
});