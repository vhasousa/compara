import { resolve } from 'path';

import { app } from "../../../../app";
import request from 'supertest';

describe("Create sub category", () => {

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

    expect(subCategory.body.name).toEqual('Sub Category name');
    expect(subCategory.body.description).toEqual('Sub Category description');
    expect(subCategory.body.categoryId).toEqual(1);
  });

  // it("should not be able to create a new category with a name that already exists", async () => {
  //   await request(app).post('/categories').send({
  //     name: 'Category name',
  //     description: 'Category description'
  //   }).expect(201);
    
  //   const response = await request(app).post('/categories').send({
  //     name: 'Category name',
  //     description: 'Category description'
  //   }).expect(400);

  //   expect(response.body.type).toEqual("category.already.exists");
  //   expect(response.body.field).toEqual("name");
  // });
});