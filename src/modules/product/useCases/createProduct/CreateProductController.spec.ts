import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { main } from '../../../../../prisma/seed';

import { app } from "../../../../app";

const prisma = new PrismaClient();

describe("Create products", () => {

  it("should be able to create a product", async () => {
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

    const response = await request(app).post('/products').send({ 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.body.id,
      subCategoryId: subCategory.body.id,
      description: "Product description", 
      measurementUnitId: measurementUnits.id, 
      volume: "80",
    }).expect(201);

    expect(response.body.name).toEqual("Product Name");
    expect(response.body.barCode).toEqual("1111111111111");
    expect(response.body.brandId).toEqual(createdBrand.body.id);
    expect(response.body.description).toEqual("Product description");
    expect(response.body.measurementUnitId).toEqual(measurementUnits.id);
    expect(response.body.volume).toEqual("80");
  });

  it("should not be able to create a new product with a brand that not exists", async () => {
    const measurementUnits = await prisma.measurementUnit.create({
      data: {
        name: 'gramas',
        abbreviation: 'g'
      },
    });

    const category = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description'
    }).expect(201);

    const subCategory = await request(app).post('/sub_categories').send({
      name: 'Sub Category name',
      description: 'Sub Category description',
      categoryName: category.body.name
    }).expect(201);

    const response = await request(app).post('/products').send({ 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: uuidV4(),
      subCategoryId: subCategory.body.id,
      description: "Product description", 
      measurementUnitId: measurementUnits.id, 
      volume: "80",
    }).expect(400);

    expect(response.body.type).toEqual("brand.not.found");
    expect(response.body.field).toEqual("brandId");
  });

  it("should not be able to create a new product with a sub category that not exists", async () => {
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

    const response = await request(app).post('/products').send({ 
      name: "Product Name", 
      barCode: "1111111111111", 
      brandId: createdBrand.body.id,
      subCategoryId: subCategory.body.id,
      description: "Product description", 
      measurementUnitId: measurementUnits.id, 
      volume: "80",
    }).expect(400);

    expect(response.body.type).toEqual("product.already.exists");
    expect(response.body.field).toEqual("barCode");
  });
});