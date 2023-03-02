import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { IStorageProvider } from '@shared/StorageProvider/IStorageProvider';
import { IImagesRepository } from '@modules/product/repositories/IImagesRepository';
import { LocalStorageProvider } from '@shared/StorageProvider/implementations/LocalStorageProvider';
import { ImagesRepository } from '@modules/product/repositories/prisma/ImagesRepository';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;
let localStorage: IStorageProvider;
let imagesRepository: IImagesRepository;

describe("Create category", () => {

  beforeEach(() => {
    localStorage = new LocalStorageProvider();
    imagesRepository = new ImagesRepository();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    imagesRepositoryInMemory = new ImagesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
      imagesRepositoryInMemory
    );
  })

  it("should be able to create a new category", async () => {
    const key = "6e7921f2bcc01efc3c769a8a4fd43417-test.png"

    const [, originalName] = key.split('-')

    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description",
      key,
      originalName
    });

    expect(createdCategory.value).toHaveProperty("name");
    expect(createdCategory.value.name).toEqual("Category name");
    expect(createdCategory.value.description).toEqual("Category description");
    expect(createdCategory.value.image.key).toEqual(key);
    expect(createdCategory.value.image.originalName).toEqual(originalName);
  });
});