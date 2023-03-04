import slugify from "slugify";
import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { SubCategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { CreateCategoryUseCase } from "../../admin/createCategory/CreateCategoryUseCase";
import { CreateSubCategoryUseCase } from "../../admin/createSubCategory/CreateSubCategoryUseCase";
import { ListSubCategoriesByCategoryUseCase } from "./ListSubCategoriesByCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let listSubCategoriesByCategoryUseCase: ListSubCategoriesByCategoryUseCase;
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
		listSubCategoriesByCategoryUseCase = new ListSubCategoriesByCategoryUseCase(
			subCategoriesRepositoryInMemory,
			categoriesRepositoryInMemory
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

		const listOfSubCategories = await 
		listSubCategoriesByCategoryUseCase.execute({ 
			categorySlug: createdCategory.value.slug 
		});

		expect(listOfSubCategories.value[0]).toHaveProperty("name");
		expect(listOfSubCategories.value[0].name).toEqual("Sub Category");
		expect(listOfSubCategories.value[0].description).toEqual("Sub Category description");
		expect(listOfSubCategories.value[0].slug).toEqual(slug);
	});

	it("should be able to create a new sub category", async () => {
		const listOfSubCategories = await 
		listSubCategoriesByCategoryUseCase.execute({ 
			categorySlug: "teste"
		});

		expect(listOfSubCategories.error.type).toEqual("category.not.found");
		expect(listOfSubCategories.error.field).toEqual("categorySlug");
	});
});