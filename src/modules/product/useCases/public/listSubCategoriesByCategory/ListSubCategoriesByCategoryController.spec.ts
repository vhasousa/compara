import { resolve } from "path";

import { app } from "../../../../../app";
import request from "supertest";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { LocalStorageProvider } from "@shared/StorageProvider/implementations/LocalStorageProvider";
import { ImagesRepository } from "@modules/product/repositories/prisma/ImagesRepository";

let localStorage: IStorageProvider;
let imagesRepository: IImagesRepository;

describe("List sub category by category", () => {
	beforeEach(() => {
		localStorage = new LocalStorageProvider();
		imagesRepository = new ImagesRepository();
	});

	it("should return the sub category by category", async () => {
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

		const categoryImage = await imagesRepository.findById(category.body.imageId);
		const subCategoryImage = await imagesRepository.findById(subCategory.body.imageId);

		await localStorage.unlinkImage(categoryImage.key);
		await localStorage.unlinkImage(subCategoryImage.key);

		const response = await request(app).get(`/sub_categories/${category.body.slug}`);

		expect(response.body[0].name).toEqual("Sub Category name");
		expect(response.body[0].description).toEqual("Sub Category description");
		expect(response.body[0]).toHaveProperty("imageUrl");
	});

	it("should not be able to create a new sub category with a name that already exists", async () => {
		const subCategory = await request(app).get("/sub_categories/teste");

		expect(subCategory.body.type).toEqual("category.not.found");
		expect(subCategory.body.field).toEqual("categorySlug");
	});
});