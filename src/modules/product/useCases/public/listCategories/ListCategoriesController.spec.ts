import { resolve } from "path";

import { app } from "../../../../../app";
import request from "supertest";
import slugify from "slugify";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";

let localStorage: IStorageProvider;
let imagesRepository: IImagesRepository;

describe("List category", () => {

	beforeEach(() => {
		localStorage = new LocalStorageProvider();
		imagesRepository = new ImagesRepository();
	});

	it("should return all the categories", async () => {
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

		const slug = slugify("Category name", {
			replacement: "-",
			lower: true,
			remove: /[*+~.()'"!:@<>-?,]/g,
		});

		const response = await request(app).get("/categories").expect(200);

		const categoryImage = await imagesRepository.findById(category.body.imageId);
		await localStorage.unlinkImage(categoryImage.key);

		expect(response.body[0].name).toEqual("Category name");
		expect(response.body[0].description).toEqual("Category description");
		expect(response.body[0].slug).toEqual(slug);
		expect(response.body[0]).toHaveProperty("imageUrl");
		expect(response.body[0]).toHaveProperty("slug");
	});
});
