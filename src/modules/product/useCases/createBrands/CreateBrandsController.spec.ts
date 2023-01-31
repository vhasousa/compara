import { app } from "../../../../app";
import request from 'supertest';

describe("Create brand", () => {

  it("should return the brand", async () => {
    const response = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    expect(response.body.name).toEqual('Brand')
  });

  it("should not be able to create a new brand with a name that already exists", async () => {
    await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);
    
    const response = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(400);

    expect(response.body.type).toEqual("brand.already.exists");
    expect(response.body.field).toEqual("name");
  });
});