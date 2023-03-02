import { resolve } from 'path';

import { app } from "../../../../app";
import request from 'supertest';
import { IStorageProvider } from '@shared/StorageProvider/IStorageProvider';
import { IImagesRepository } from '@modules/product/repositories/IImagesRepository';
import { LocalStorageProvider } from '@shared/StorageProvider/implementations/LocalStorageProvider';
import { ImagesRepository } from '@modules/product/repositories/prisma/ImagesRepository';

let localStorage: IStorageProvider
let imagesRepository: IImagesRepository;

describe("Create sub category", () => {
  beforeEach(() => {
    localStorage = new LocalStorageProvider();
    imagesRepository = new ImagesRepository();
  })

  it("should return the sub category", async () => {
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

    const categoryImage = await imagesRepository.findById(category.body.imageId)
    const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId)

    await localStorage.unlinkImage(categoryImage.key);
    await localStorage.unlinkImage(subCategoryImage.key);

    expect(subCategory.body.name).toEqual('Sub Category name');
    expect(subCategory.body.description).toEqual('Sub Category description');
    expect(subCategory.body.categoryId).toEqual(1);
  });

  // it("should not be able to create a new sub category with a name that already exists", async () => {
  //   const filePath = resolve(
  //     __dirname, 
  //     '..', 
  //     '..', 
  //     '..', 
  //     '..', 
  //     '..', 
  //     'imageTest', 
  //     'test.png'
  //   );

  //   const category = await request(app).post('/categories')
  //     .set('content-type', 'multipart/form-data')
  //     .field('name', 'Category name')
  //     .field('description', 'Category description')
  //     .attach('image', filePath)
  //     .expect(201);
    
  //   const subCategory = await request(app).post('/sub_categories')
  //     .set('content-type', 'multipart/form-data')
  //     .field('name', 'Sub Category name')
  //     .field('description', 'Sub Category description')
  //     .field('categoryName', category.body.name)
  //     .attach('image', filePath)
  //     .expect(201);

  //   const categoryImage = await imagesRepository.findById(category.body.imageId)
  //   const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId)

  //   await localStorage.unlinkImage(categoryImage.key);
  //   await localStorage.unlinkImage(subCategoryImage.key);

  //   expect(response.body.type).toEqual("category.already.exists");
  //   expect(response.body.field).toEqual("name");
  // });
});