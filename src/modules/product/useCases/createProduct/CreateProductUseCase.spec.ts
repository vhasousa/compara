import { v4 as uuidV4 } from 'uuid';

import { BrandsRepositoryInMemory } from "@modules/product/repositories/inMemory/BrandsRepositoryInMemory";
import { ProductsRepositoryInMemory } from "@modules/product/repositories/inMemory/ProductsRepositoryInMemory";
import { ICreateProductDTO } from "@modules/product/repositories/IProductsRepository";
import { CreateBrandsUseCase } from "../createBrands/CreateBrandsUseCase";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CategoriesRepositoryInMemory } from '@modules/product/repositories/inMemory/CategoriesRepositoryInMemory';
import { MeasurementUnit } from '@prisma/client';
import { MeasurementUnitsRepositoryInMemory } from '@modules/product/repositories/inMemory/MeasurementUnitRepositoryInMemory';

let createBrandUseCase: CreateBrandsUseCase;
let createProductUseCase: CreateProductUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let brandsRepositoryInMemory: BrandsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let measurementUnitsRepositoryInMemory: MeasurementUnitsRepositoryInMemory;

describe("Create product", () => {
  
  beforeEach(() => {
    brandsRepositoryInMemory = new BrandsRepositoryInMemory();
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    measurementUnitsRepositoryInMemory = new MeasurementUnitsRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
    createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(
      productsRepositoryInMemory, 
      brandsRepositoryInMemory,
      categoriesRepositoryInMemory,
      measurementUnitsRepositoryInMemory
      );
  })

  it("should be able to create a new product", async () => {
    const createdBrand = await createBrandUseCase.execute({
      name: "Brand"
    });

    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const measurementUnit: MeasurementUnit = {
      id: uuidV4(),
      name: 'gramas',
      abbreviation: 'g'
    }    

    const product: ICreateProductDTO = { 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.value.id,
      categoryId: createdCategory.value.id,
      description: "Product description", 
      measurementUnitId: measurementUnit.id, 
      volume: "80",
    }

    const createdProducts = await createProductUseCase.execute(product)

    expect(createdProducts.value).toHaveProperty("name");
    expect(createdProducts.value.name).toEqual("Product Name");
    expect(createdProducts.value.barCode).toEqual("1111111111111");
    expect(createdProducts.value.brandId).toEqual(createdBrand.value.id);
    expect(createdProducts.value.categoryId).toEqual(createdCategory.value.id);
    expect(createdProducts.value.description).toEqual("Product description");
    expect(createdProducts.value.measurementUnitId).toEqual(measurementUnit.id);
    expect(createdProducts.value.volume).toEqual("80");
  });

  it("should not be able to create a new product with a brand that not exists", async () => {
    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const measurementUnit: MeasurementUnit = {
      id: uuidV4(),
      name: 'gramas',
      abbreviation: 'g'
    }    

    const product: ICreateProductDTO = { 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: uuidV4(),
      categoryId: createdCategory.value.id,
      description: "Product description", 
      measurementUnitId: measurementUnit.id, 
      volume: "80",
    }

    const createdProducts = await createProductUseCase.execute(product)

    expect(createdProducts.isSuccess).toEqual(false);
    expect(createdProducts.error.type).toEqual("brand.not.found");
    expect(createdProducts.error.field).toEqual("brandId");
  });

  it("should not be able to create a new product with a category that not exists", async () => {
    const createdBrand = await createBrandUseCase.execute({
      name: "Brand"
    });

    const measurementUnit: MeasurementUnit = {
      id: uuidV4(),
      name: 'gramas',
      abbreviation: 'g'
    }    

    const product: ICreateProductDTO = { 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.value.id,
      categoryId: uuidV4(),
      description: "Product description", 
      measurementUnitId: measurementUnit.id, 
      volume: "80",
    }

    const createdProducts = await createProductUseCase.execute(product)

    expect(createdProducts.isSuccess).toEqual(false);
    expect(createdProducts.error.type).toEqual("category.not.found");
    expect(createdProducts.error.field).toEqual("categoryId");
  });
  

  it("should not be able to create a new product with a bar code that already exists", async () => {
    const createdBrand = await createBrandUseCase.execute({
      name: "Brand"
    });

    const createdCategory = await createCategoryUseCase.execute({
      name: "Category name",
      description: "Category description"
    });

    const measurementUnit: MeasurementUnit = {
      id: uuidV4(),
      name: 'gramas',
      abbreviation: 'g'
    }

    const product: ICreateProductDTO = { 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.value.id,
      categoryId: createdCategory.value.id,
      description: "Product description", 
      measurementUnitId: measurementUnit.id, 
      volume: "80",
    }

    const product2: ICreateProductDTO = { 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.value.id,
      categoryId: createdCategory.value.id,
      description: "Product description", 
      measurementUnitId: measurementUnit.id, 
      volume: "80",
    }

    await createProductUseCase.execute(product)
    const createdProducts = await createProductUseCase.execute(product2)

    expect(createdProducts.isSuccess).toEqual(false);
    expect(createdProducts.error.type).toEqual("product.already.exists");
    expect(createdProducts.error.field).toEqual("barCode");
  });
});