import { app } from "../../../../app";
import request from 'supertest';

describe("List category", () => {

  it("should return all the category", async () => {
    const category = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(201);

    await request(app).post('/sub_categories').send({
      name: 'Sub Category name',
      description: 'Sub Category description',
      categoryName: category.body.name
    }).expect(201);

    await request(app).post('/sub_categories').send({
      name: 'Sub Category name 2',
      description: 'Sub Category description',
      categoryName: category.body.name
    }).expect(201);

    const response = await request(app).get('/sub_categories').expect(200);

    expect(response.body[0].name).toEqual('Sub Category name');
    expect(response.body[0].description).toEqual('Sub Category description');
  });
});
