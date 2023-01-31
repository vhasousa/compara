import { app } from "../../../../app";
import request from 'supertest';

describe("Create category", () => {

  it("should return the category", async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(201);

    expect(response.body.name).toEqual('Category name');
    expect(response.body.description).toEqual('Category description');
  });

  it("should not be able to create a new category with a name that already exists", async () => {
    await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(201);
    
    const response = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(400);

    expect(response.body.type).toEqual("category.already.exists");
    expect(response.body.field).toEqual("name");
  });
});