import { app } from "../../../../app";
import request from 'supertest';

describe("List category", () => {

  it("should return all the category", async () => {
    await request(app).post('/categories').send({
      name: 'Category',
      description: 'Category description'
    }).expect(201);

    await request(app).post('/categories').send({
      name: 'Category 2',
      description: 'Category description'
    }).expect(201);

    const response = await request(app).get('/categories').expect(200);

    expect(response.body[0].name).toEqual('Category');
    expect(response.body[0].description).toEqual('Category description');
  });
});
