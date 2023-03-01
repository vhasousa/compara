import fs from 'fs';
import { resolve } from 'path';
import mime from 'mime';

import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;

describe("Create category", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    imagesRepositoryInMemory = new ImagesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
      imagesRepositoryInMemory
    );
  })

  it("should be able to create a new category", async () => {
    // const imageFolder = resolve(__dirname, '..', '..', '..', '..', '..', 'imageTest');

    const file = "6e7921f2bcc01efc3c769a8a4fd43417-doces.png"

    const splitedFileName = file.split('-')

    const originalName = splitedFileName[0];
    const key = splitedFileName[1];

    // const filepath = resolve(imageFolder, file);

    // const fileContent = await fs.promises.readFile(filepath);

    
    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description",
      key,
      originalName
    });

    console.log(createdCategory.value.image);

    expect(createdCategory.value).toHaveProperty("name");
    expect(createdCategory.value.name).toEqual("Category name");
    expect(createdCategory.value.description).toEqual("Category description");
    expect(createdCategory.value.image.key).toEqual(key);
    expect(createdCategory.value.image.originalName).toEqual(originalName);
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