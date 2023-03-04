import { BrandsRepositoryInMemory } from "@modules/product/repositories/inMemory/BrandsRepositoryInMemory";
import { CreateBrandsUseCase } from "./CreateBrandsUseCase";

let createBrandUseCase: CreateBrandsUseCase;
let brandsRepositoryInMemory: BrandsRepositoryInMemory;

describe("Create brand", () => {
  
	beforeEach(() => {
		brandsRepositoryInMemory = new BrandsRepositoryInMemory();
		createBrandUseCase = new CreateBrandsUseCase(brandsRepositoryInMemory);
	});

	it("should be able to create a new brand", async () => {
		const createdBrand = await createBrandUseCase.execute({
			name: "Brand test"
		});

		expect(createdBrand.value).toHaveProperty("name");
		expect(createdBrand.value.name).toEqual("Brand test");
	});

	it("should not be able to create a new brand with a name that already exists", async () => {
		await createBrandUseCase.execute({
			name: "Brand"
		});

		const createdBrand = await createBrandUseCase.execute({
			name: "Brand"
		});

		expect(createdBrand.error.type).toEqual("brand.already.exists");
		expect(createdBrand.error.field).toEqual("name");
		expect(createdBrand.isSuccess).toEqual(false);
	});

	it("should not be able to create a new brand without a name", async () => {
		const createdBrand = await createBrandUseCase.execute({
			name: ""
		});

		expect(createdBrand.error.type).toEqual("name.required");
		expect(createdBrand.error.field).toEqual("name");
		expect(createdBrand.isSuccess).toEqual(false);
	});
});