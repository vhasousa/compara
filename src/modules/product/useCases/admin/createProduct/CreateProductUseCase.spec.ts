import { BrandsRepositoryInMemory } from "@modules/product/repositories/inMemory/BrandsRepositoryInMemory";
import { ProductsRepositoryInMemory } from "@modules/product/repositories/inMemory/ProductsRepositoryInMemory";
import { CreateBrandsUseCase } from "../createBrands/CreateBrandsUseCase";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { MeasurementUnitsRepositoryInMemory } from "@modules/product/repositories/inMemory/MeasurementUnitRepositoryInMemory";
import { CreateSubCategoryUseCase } from "../createSubCategory/CreateSubCategoryUseCase";
import { SubCategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory";
import { ImagesRepositoryInMemory } from "@modules/product/repositories/inMemory/ImagesRepositoryInMemory";
import { ICreateMeasurementUnitDTO } from "@modules/product/repositories/IMeasurementUnitsRepository";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";

let storageProvider: IStorageProvider;
let createBrandUseCase: CreateBrandsUseCase;
let createProductUseCase: CreateProductUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;
let brandsRepositoryInMemory: BrandsRepositoryInMemory;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let subCategoriesRepositoryInMemory: SubCategoriesRepositoryInMemory;
let measurementUnitsRepositoryInMemory: MeasurementUnitsRepositoryInMemory;

describe("Create product", () => {
  
	beforeEach(() => {
		storageProvider = new LocalStorageProvider();
		brandsRepositoryInMemory = new BrandsRepositoryInMemory();
		productsRepositoryInMemory = new ProductsRepositoryInMemory();
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		subCategoriesRepositoryInMemory = new SubCategoriesRepositoryInMemory();
		measurementUnitsRepositoryInMemory = new MeasurementUnitsRepositoryInMemory();
		imagesRepositoryInMemory = new ImagesRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory,
			imagesRepositoryInMemory,
			storageProvider
		);
		createSubCategoryUseCase = new CreateSubCategoryUseCase(
			subCategoriesRepositoryInMemory,
			categoriesRepositoryInMemory,
			imagesRepositoryInMemory,
			storageProvider
		);
		createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
		createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
		createProductUseCase = new CreateProductUseCase(
			productsRepositoryInMemory, 
			brandsRepositoryInMemory,
			categoriesRepositoryInMemory,
			subCategoriesRepositoryInMemory,
			measurementUnitsRepositoryInMemory,
			imagesRepositoryInMemory,
			storageProvider
		);
	});

	it("should be able to create a new product", async () => {
		const createdBrand = await createBrandUseCase.execute({
			name: "Brand"
		});

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
    
		const measurementUnit: ICreateMeasurementUnitDTO = {
			name: "gramas",
			abbreviation: "g"
		};

		const createdMeasurementUnit = 
    await measurementUnitsRepositoryInMemory.create(measurementUnit);

		const product = { 
			name: "Product Name", 
			barCode: "1111111111111", 
			brandId: createdBrand.value.id,
			categoryId: createdCategory.value.id,
			subCategoryId: createdSubCategory.value.id,
			description: "Product description", 
			measurementUnitId: createdMeasurementUnit.id, 
			volume: "80",
			key,
			originalName
		};

		const createdProducts = await createProductUseCase.execute(product);

		expect(createdProducts.value).toHaveProperty("name");
		expect(createdProducts.value.name).toEqual("Product Name");
		expect(createdProducts.value.barCode).toEqual("1111111111111");
		expect(createdProducts.value.brandId).toEqual(createdBrand.value.id);
		expect(createdProducts.value.categoryId).toEqual(createdCategory.value.id);
		expect(createdProducts.value.subCategoryId).toEqual(createdSubCategory.value.id);
		expect(createdProducts.value.description).toEqual("Product description");
		expect(createdProducts.value.measurementUnitId).toEqual(createdMeasurementUnit.id);
		expect(createdProducts.value.volume).toEqual("80");
	});
});