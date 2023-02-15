import { app } from "../../../../app";
import request from 'supertest';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("List products", () => {

  it("should return all the products", async () => {
    const measurementUnits = await prisma.measurementUnit.create({
      data: {
        name: 'gramas',
        abbreviation: 'g'
      },
    });

    const createdBrand = await request(app).post('/brands').send({
      name: 'Brand'
    }).expect(201);

    const category = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(201);

    const subCategory = await request(app).post('/sub_categories').send({
      name: 'Sub Category name',
      description: 'Sub Category description',
      categoryName: category.body.name
    }).expect(201);

    await request(app).post('/products').send({ 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.body.id,
      subCategoryId: subCategory.body.id,
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
