import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { SubCategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import slugify from "slugify";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateSubCategoryUseCase } from "./CreateSubCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let subCategoriesRepositoryInMemory: SubCategoriesRepositoryInMemory;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;
let storageProvider: IStorageProvider;

describe("Create sub category", () => {
  
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		imagesRepositoryInMemory = new ImagesRepositoryInMemory();
		subCategoriesRepositoryInMemory = new SubCategoriesRepositoryInMemory();
		storageProvider = process.env.disk === "local" 
			? new LocalStorageProvider() : new LocalStorageProvider();
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory, imagesRepositoryInMemory, storageProvider);
		createSubCategoryUseCase = new CreateSubCategoryUseCase(
			subCategoriesRepositoryInMemory,
			categoriesRepositoryInMemory,
			imagesRepositoryInMemory,
			storageProvider
		);
	});

	it("should be able to create a new sub category", async () => {
		const key = "6e7921f2bcc01efc3c769a8a4fd43417-doces.png";

		const [, originalName] = key.split("-");

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
			replacement: "-",
			lower: true,
			remove: /[*+~.()'"!:@<>-?,]/g,
		});

		expect(createdSubCategory.value).toHaveProperty("name");
		expect(createdSubCategory.value.name).toEqual("Sub Category");
		expect(createdSubCategory.value.description).toEqual("Sub Category description");
		expect(createdSubCategory.value.slug).toEqual(slug);
	});
});