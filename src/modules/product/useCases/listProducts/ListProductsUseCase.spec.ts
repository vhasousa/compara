import { MeasurementUnit } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import { BrandsRepositoryInMemory } from "@modules/product/repositories/inMemory/BrandsRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/product/repositories/inMemory/CategoriesRepositoryInMemory";
import { ProductsRepositoryInMemory } from "@modules/product/repositories/inMemory/ProductsRepositoryInMemory";
import { ICreateProductDTO } from "@modules/product/repositories/IProductsRepository";
import { CreateBrandsUseCase } from "../createBrands/CreateBrandsUseCase";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListProductsUseCase } from "./ListProductsUseCase";
import { MeasurementUnitsRepositoryInMemory } from "@modules/product/repositories/inMemory/MeasurementUnitRepositoryInMemory";
import { CreateMeasurementUnitUseCase } from "../createMeasurementUnit/CreateMeasurementUnitUseCase";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";

let createBrandUseCase: CreateBrandsUseCase;
let createProductUseCase: CreateProductUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let createMeasurementUnitUseCase: CreateMeasurementUnitUseCase;
let listProductsUseCase: ListProductsUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let brandsRepositoryInMemory: BrandsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let measurementUnitsRepositoryInMemory: MeasurementUnitsRepositoryInMemory;

describe("List brand", () => {
  
  beforeEach(() => {
    brandsRepositoryInMemory = new BrandsRepositoryInMemory();
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    measurementUnitsRepositoryInMemory = new MeasurementUnitsRepositoryInMemory();
    createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    createMeasurementUnitUseCase = new CreateMeasurementUnitUseCase(measurementUnitsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(
      productsRepositoryInMemory, 
      brandsRepositoryInMemory, 
      categoriesRepositoryInMemory, 
      measurementUnitsRepositoryInMemory);
    listProductsUseCase = new ListProductsUseCase(productsRepositoryInMemory);
  })

  it("should be able to list all brands", async () => {
    const createdBrand = await createBrandUseCase.execute({
      name: "Brand"
    });

    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const createdMeasurementUnit = await createMeasurementUnitUseCase.execute({
      name: 'gramas',
      abbreviation: 'g'
    })

    const product: ICreateProductDTO = { 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.value.id,
      categoryId: createdCategory.value.id,
      description: "Product description", 
      measurementUnitId: createdMeasurementUnit.id, 
      volume: "80",
      brand: createdBrand.value,
      category: createdCategory.value,
      measurementUnit: createdMeasurementUnit
    }

    await createProductUseCase.execute(product);

    const listOfProducts = await listProductsUseCase.execute();

    expect(listOfProducts[0]).toHaveProperty("name");
    expect(listOfProducts[0].name).toEqual("Product Name");
    expect(listOfProducts[0].barCode).toEqual("1111111111111");
    expect(listOfProducts[0].brand).toEqual(createdBrand.value);
    expect(listOfProducts[0].category).toEqual(createdCategory.value);
    expect(listOfProducts[0].description).toEqual("Product description");
    expect(listOfProducts[0].measurementUnit).toEqual(createdMeasurementUnit);
    expect(listOfProducts[0].volume).toEqual("80");
  });
});