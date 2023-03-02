import { resolve } from 'path';

import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { PrismaClient } from '@prisma/client';
import { app } from "../../../../app";
import { IStorageProvider } from '@shared/StorageProvider/IStorageProvider';
import { IImagesRepository } from '@modules/product/repositories/IImagesRepository';
import { LocalStorageProvider } from '@shared/StorageProvider/implementations/LocalStorageProvider';
import { ImagesRepository } from '@modules/product/repositories/prisma/ImagesRepository';

const prisma = new PrismaClient();

let localStorage: IStorageProvider
let imagesRepository: IImagesRepository;

describe("Create products", () => {

  beforeEach(() => {
    localStorage = new LocalStorageProvider();
    imagesRepository = new ImagesRepository();
  })

  it("should be able to create a product", async () => {
    const measurementUnits = await prisma.measurementUnit.create({
      data: {
        name: 'gramas',
        abbreviation: 'g'
      },
    });

    const filePath = resolve(
      __dirname, 
      '..', 
      '..', 
      '..', 
      '..', 
      '..', 
      'imageTest', 
      'test.png'
    );

    const category = await request(app).post('/categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Category name')
      .field('description', 'Category description')
      .attach('image', filePath)
      .expect(201);
    
    const subCategory = await request(app).post('/sub_categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Sub Category name')
      .field('description', 'Sub Category description')
      .field('categoryName', category.body.name)
      .attach('image', filePath)
      .expect(201);

    const createdBrand = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    const response = await request(app).post('/products')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Product Name')
      .field('description', 'Product description')
      .field('barCode', '1111111111111')
      .field('volume', '80')
      .field('subCategoryId', subCategory.body.id)
      .field('brandId', createdBrand.body.id)
      .field('measurementUnitId', measurementUnits.id)
      .attach('image', filePath)
      .expect(201);

    const categoryImage = await imagesRepository.findById(category.body.imageId)
    const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId)
    const productImage = await imagesRepository.findById(response.body.imageId)

    await localStorage.unlinkImage(categoryImage.key);
    await localStorage.unlinkImage(subCategoryImage.key);
    await localStorage.unlinkImage(productImage.key);

    expect(response.body.name).toEqual("Product Name");
    expect(response.body.barCode).toEqual("1111111111111");
    expect(response.body.brandId).toEqual(createdBrand.body.id);
    expect(response.body.description).toEqual("Product description");
    expect(response.body.measurementUnitId).toEqual(measurementUnits.id);
    expect(response.body.volume).toEqual("80");
  });

  it("should not be able to create a new product with a brand that not exists", async () => {
    const measurementUnits = await prisma.measurementUnit.create({
      data: {
        name: 'gramas',
        abbreviation: 'g'
      },
    });

    const filePath = resolve(
      __dirname, 
      '..', 
      '..', 
      '..', 
      '..', 
      '..', 
      'imageTest', 
      'test.png'
    );

    const category = await request(app).post('/categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Category name')
      .field('description', 'Category description')
      .attach('image', filePath)
      .expect(201);
    
    const subCategory = await request(app).post('/sub_categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Sub Category name')
      .field('description', 'Sub Category description')
      .field('categoryName', category.body.name)
      .attach('image', filePath)
      .expect(201);

    const createdBrand = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    const response = await request(app).post('/products')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Product Name')
      .field('description', 'Product description')
      .field('barCode', '1111111111111')
      .field('volume', '80')
      .field('subCategoryId', subCategory.body.id)
      .field('brandId', uuidV4())
      .field('measurementUnitId', measurementUnits.id)
      .attach('image', filePath)
      .expect(400);

    const categoryImage = await imagesRepository.findById(category.body.imageId)
    const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId)

    await localStorage.unlinkImage(categoryImage.key);
    await localStorage.unlinkImage(subCategoryImage.key);

    expect(response.body.type).toEqual("brand.not.found");
    expect(response.body.field).toEqual("brandId");
  });

  it("should not be able to create a new product with a sub category that not exists", async () => {
    const measurementUnits = await prisma.measurementUnit.create({
      data: {
        name: 'gramas',
        abbreviation: 'g'
      },
    });

    const filePath = resolve(
      __dirname, 
      '..', 
      '..', 
      '..', 
      '..', 
      '..', 
      'imageTest', 
      'test.png'
    );

    const category = await request(app).post('/categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Category name')
      .field('description', 'Category description')
      .attach('image', filePath)
      .expect(201);
    
    const subCategory = await request(app).post('/sub_categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Sub Category name')
      .field('description', 'Sub Category description')
      .field('categoryName', category.body.name)
      .attach('image', filePath)
      .expect(201);

    const createdBrand = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    const response = await request(app).post('/products')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Product Name')
      .field('description', 'Product description')
      .field('barCode', '1111111111111')
      .field('volume', '80')
      .field('subCategoryId', 100)
      .field('brandId', createdBrand.body.id)
      .field('measurementUnitId', measurementUnits.id)
      .attach('image', filePath)
      .expect(400);

    const categoryImage = await imagesRepository.findById(category.body.imageId)
    const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId)

    await localStorage.unlinkImage(categoryImage.key);
    await localStorage.unlinkImage(subCategoryImage.key);

    expect(response.body.type).toEqual("subCategory.not.found");
    expect(response.body.field).toEqual("subCategoryId");
  });
});