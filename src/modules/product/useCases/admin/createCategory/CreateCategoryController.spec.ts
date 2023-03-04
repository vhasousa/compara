import { resolve } from "path";
import request from "supertest";

import { app } from "../../../../../app";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";

let localStorage: IStorageProvider;
let imagesRepository: IImagesRepository;

describe("Create category", () => {

	beforeEach(() => {
		localStorage = new LocalStorageProvider();
		imagesRepository = new ImagesRepository();
	});

	it("should return the category", async () => {
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

		const response = await request(app).post("/categories")
			.set("content-type", "multipart/form-data")
			.field("name", "Category name")
			.field("description", "Category description")
			.attach("image", filePath)
			.expect(201);

		const image = await imagesRepository.findById(response.body.imageId);

		await localStorage.unlinkImage(image.key);

		expect(response.body.name).toEqual("Category name");
		expect(response.body.description).toEqual("Category description");
	});

	it("should not be able to create a new category with a name that already exists", async () => {
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

		const response = await request(app).post("/categories")
			.set("content-type", "multipart/form-data")
			.field("name", "Category name")
			.field("description", "Category description")
			.attach("image", filePath)
			.expect(400);

		const image = await imagesRepository.findById(category.body.imageId);

		await localStorage.unlinkImage(image.key);

		expect(response.body.type).toEqual("category.already.exists");
		expect(response.body.field).toEqual("name");
	});

	it("should not be able to create a category without name", async () => {
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

		const response = await request(app).post("/categories")
			.set("content-type", "multipart/form-data")
			.field("name", "")
			.field("description", "Category description")
			.attach("image", filePath)
			.expect(400);

		expect(response.body.type).toEqual("name.required");
		expect(response.body.field).toEqual("name");
	});
});