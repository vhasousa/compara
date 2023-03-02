import { resolve } from 'path';

import { app } from "../../../../app";
import request from 'supertest';
import slugify from 'slugify';

describe("List category", () => {

  it("should return all the categories", async () => {
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

    const slug = slugify('Category name', {
      replacement: '-',
      lower: true,
      remove: /[*+~.()'"!:@<>-?,]/g,
    });

    const response = await request(app).get('/categories').expect(200);

    expect(response.body[0].name).toEqual('Category name');
    expect(response.body[0].description).toEqual('Category description');
    expect(response.body[0].slug).toEqual(slug);
    expect(response.body[0]).toHaveProperty('imageUrl');
    expect(response.body[0]).toHaveProperty('slug');
  });
});
