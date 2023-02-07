import { app } from "../../../../app";
import request from 'supertest';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("List brand", () => {

  it("should return all the brands", async () => {
    const measurementUnits = await prisma.measurementUnit.create({
      data: {
        name: 'gramas',
        abbreviation: 'g'
      },
    });

    const createdBrand = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    const createdCategory = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(201);

    await request(app).post('/products').send({ 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.body.id,
      categoryId: createdCategory.body.id,
      description: "Product description", 
      measurementUnitId: measurementUnits.id, 
      volume: "80",
    }).expect(201);

    const response = await request(app).get('/products').expect(200);

    expect(response.body[0].name).toEqual("Product Name");
    expect(response.body[0].barCode).toEqual("1111111111111");
    expect(response.body[0].brandId).toEqual(createdBrand.body.id);
    expect(response.body[0].description).toEqual("Product description");
    expect(response.body[0].measurementUnitId).toEqual(measurementUnits.id);
    expect(response.body[0].volume).toEqual("80");
    expect(response.body[0]).toHaveProperty("brand");
  });
});
