import { app } from "../../../../app";
import request from 'supertest';

describe("List brand", () => {

  it("should return all the brands", async () => {
    await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    const response = await request(app).get('/brands').send({
      name: 'Brand'
    }).expect(200);

    expect(response.body[0].name).toEqual('Brand');
  });
});
