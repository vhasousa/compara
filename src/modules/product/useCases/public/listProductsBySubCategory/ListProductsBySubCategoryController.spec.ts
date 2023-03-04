import { resolve } from "path";

import request from "supertest";

import { PrismaClient } from "@prisma/client";
import { app } from "../../../../../app";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";

const prisma = new PrismaClient();

let localStorage: IStorageProvider;
let imagesRepository: IImagesRepository;

describe("List product by sub category", () => {

	beforeEach(() => {
		localStorage = new LocalStorageProvider();
		imagesRepository = new ImagesRepository();
	});

	it("should be able to list all products by sub category", async () => {
		const measurementUnits = await prisma.measurementUnit.create({
			data: {
				name: "gramas",
				abbreviation: "g"
			},
		});

		const filePath = resolve(
			__dirname, 
			"..", 
			"..", 
			"..", 
			"..", 
			"..",  
			"..",
			"imageTest", 
			"test.png"
		);

		const category = await request(app).post("/categories")
			.set("content-type", "multipart/form-data")
			.field("name", "Category name")
			.field("description", "Category description")
			.attach("image", filePath)
			.expect(201);
    
		const subCategory = await request(app).post("/sub_categories")
			.set("content-type", "multipart/form-data")
			.field("name", "Sub Category name")
			.field("description", "Sub Category description")
			.field("categoryName", category.body.name)
			.attach("image", filePath)
			.expect(201);

		const createdBrand = await request(app).post("/brands").send({
			name: "Brand"
		}).expect(201);

		const product = await request(app).post("/products")
			.set("content-type", "multipart/form-data")
			.field("name", "Product Name")
			.field("description", "Product description")
			.field("barCode", "1111111111111")
			.field("volume", "80")
			.field("subCategoryId", subCategory.body.id)
			.field("brandId", createdBrand.body.id)
			.field("measurementUnitId", measurementUnits.id)
			.attach("image", filePath)
			.expect(201);

		const productImage = await imagesRepository.findById(product.body.imageId);
		const categoryImage = await imagesRepository.findById(category.body.imageId);
		const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId);

		await localStorage.unlinkImage(productImage.key);
		await localStorage.unlinkImage(categoryImage.key);
		await localStorage.unlinkImage(subCategoryImage.key);

		const response = await request(app).get(`/products/${subCategory.body.slug}`);

		expect(response.body[0].name).toEqual("Product Name");
		expect(response.body[0].description).toEqual("Product description");
		expect(response.body[0]).toHaveProperty("imageUrl");
	});

	it("should not be able to list products by sub category that does not exists", async () => {
		const response = await request(app).get("/products/teste");

		expect(response.body.type).toEqual("subCategory.not.found");
		expect(response.body.field).toEqual("subCategorySlug");
	});
});