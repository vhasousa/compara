import fs from 'fs';
import { resolve } from 'path';

import { app } from "../../../../app";
import request from 'supertest';

describe("Create category", () => {

  it("should return the category", async () => {
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

    const response = await request(app).post('/categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Category name')
      .field('description', 'Category description')
      .attach('image', filePath)
      .expect(201);

    expect(response.body.name).toEqual('Category name');
    expect(response.body.description).toEqual('Category description');
  });

  it("should not be able to create a new category with a name that already exists", async () => {
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

    await request(app).post('/categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Category name')
      .field('description', 'Category description')
      .attach('image', filePath)
      .expect(201);

    const response = await request(app).post('/categories')
      .set('content-type', 'multipart/form-data')
      .field('name', 'Category name')
      .field('description', 'Category description')
      .attach('image', filePath)
      .expect(400);

    expect(response.body.type).toEqual("category.already.exists");
    expect(response.body.field).toEqual("name");
  });
});