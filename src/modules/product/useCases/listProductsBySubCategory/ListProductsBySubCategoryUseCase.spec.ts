import { v4 as uuidV4 } from 'uuid';

import { CreateBrandsUseCase } from "../createBrands/CreateBrandsUseCase";
import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CreateSubCategoryUseCase } from '../createSubCategory/CreateSubCategoryUseCase';
import { ICreateMeasurementUnitDTO } from '@modules/product/repositories/IMeasurementUnitsRepository';
import { ImagesRepositoryInMemory } from '@modules/product/repositories/inMemory/ImagesRepositoryInMemory';
import { BrandsRepositoryInMemory } from "@modules/product/repositories/inMemory/BrandsRepositoryInMemory";
import { ProductsRepositoryInMemory } from "@modules/product/repositories/inMemory/ProductsRepositoryInMemory";
import { CategoriesRepositoryInMemory } from '@modules/product/repositories/inMemory/CategoriesRepositoryInMemory';
import { SubCategoriesRepositoryInMemory } from '@modules/product/repositories/inMemory/SubCategoriesRepositoryInMemory';
import { MeasurementUnitsRepositoryInMemory } from '@modules/product/repositories/inMemory/MeasurementUnitRepositoryInMemory';
import { ListProductsBySubCategoryUseCase } from './ListProductsBySubCategoryUseCase';

let createBrandUseCase: CreateBrandsUseCase;
let createProductUseCase: CreateProductUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let createSubCategoryUseCase: CreateSubCategoryUseCase;
let listProductsBySubCategoryUseCase: ListProductsBySubCategoryUseCase;
let imagesRepositoryInMemory: ImagesRepositoryInMemory;
let brandsRepositoryInMemory: BrandsRepositoryInMemory;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let subCategoriesRepositoryInMemory: SubCategoriesRepositoryInMemory;
let measurementUnitsRepositoryInMemory: MeasurementUnitsRepositoryInMemory;

describe("List product by sub category", () => {
  
  beforeEach(() => {
    brandsRepositoryInMemory = new BrandsRepositoryInMemory();
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    subCategoriesRepositoryInMemory = new SubCategoriesRepositoryInMemory();
    measurementUnitsRepositoryInMemory = new MeasurementUnitsRepositoryInMemory();
    imagesRepositoryInMemory = new ImagesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
      imagesRepositoryInMemory
    );
    createSubCategoryUseCase = new CreateSubCategoryUseCase(
      subCategoriesRepositoryInMemory,
      categoriesRepositoryInMemory,
      imagesRepositoryInMemory
    );
    createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
    listProductsBySubCategoryUseCase = new ListProductsBySubCategoryUseCase(
      productsRepositoryInMemory,
      subCategoriesRepositoryInMemory
    );
    createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(
      productsRepositoryInMemory, 
      brandsRepositoryInMemory,
      categoriesRepositoryInMemory,
      subCategoriesRepositoryInMemory,
      measurementUnitsRepositoryInMemory,
      imagesRepositoryInMemory
      );
  })

  it("should be able to list all products by sub category", async () => {
    const createdBrand = await createBrandUseCase.execute({
      name: "Brand"
    });

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
    
    const measurementUnit: ICreateMeasurementUnitDTO = {
      name: 'gramas',
      abbreviation: 'g'
    }

    const createdMeasurementUnit = 
    await measurementUnitsRepositoryInMemory.create(measurementUnit)

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
    }

    const createdProducts = await createProductUseCase.execute(product)

    const listOfProducts = await listProductsBySubCategoryUseCase.execute({
      subCategorySlug: createdSubCategory.value.slug
    })

    expect(listOfProducts[0].name).toEqual(createdProducts.value.name);
    expect(listOfProducts[0].description).toEqual(createdProducts.value.description);
    expect(listOfProducts[0]).toHaveProperty('imageUrl');
  });
});