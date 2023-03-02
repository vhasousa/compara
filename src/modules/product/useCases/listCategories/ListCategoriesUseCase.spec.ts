import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;

describe("List brand", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    imagesRepositoryInMemory = new ImagesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory, imagesRepositoryInMemory);
    listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to list all brands", async () => {
    const key = "6e7921f2bcc01efc3c769a8a4fd43417-doces.png"

    const [, originalName] = key.split('-')

    await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description",
      key,
      originalName
    });

    const createdCategories = await listCategoriesUseCase.execute()

    expect(createdCategories[0]).toHaveProperty("name");
    expect(createdCategories[0].name).toEqual("Category name");
    expect(createdCategories[0].description).toEqual("Category description");
    expect(createdCategories[0].imageUrl).toEqual(`${process.env.APP_HOST}/${key}`);
  });
});