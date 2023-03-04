import { IProductDTO } from "@modules/product/interfaces/dtos/IProductDTO";
import { Brand, Category, Image, MeasurementUnit, Product, SubCategory } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ICreateProductDTO, IImportProducts, IProductsRepository, IResponseProductDTO } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
	brands: Brand[] = [];
	images: Image[] = [];
	products: Product[] = [];
	categories: Category[] = [];
	subCategories: SubCategory[] = [];
	measurementUnits: MeasurementUnit[] = [];

	async listBySubCategory(subCategoryId: number): Promise<IProductDTO[]> {
		const listOfProducts = this.products.map(product => {
			if (product.subCategoryId === subCategoryId) {
				const {
					id,
					name,
					description,
					barCode,
					volume,
					imageId,
					brandId,
					categoryId,
					measurementUnitId,
					subCategoryId,
					createdAt,
					updatedAt,
				} = product;

				const formmatedProduct: IProductDTO = {
					id,
					brandId,
					categoryId,
					createdAt,
					imageId,
					measurementUnitId,
					subCategoryId,
					updatedAt,
					name,
					description,
					barCode,
					volume,
					image: this.images.find(image => image.id === imageId),
					subCategory: this.subCategories.find(subCategory => subCategory.id === subCategoryId)
				};
  
				return formmatedProduct;
			}
		});

		return listOfProducts;
	}

	async create({
		name,
		description,
		measurementUnitId,
		measurementUnit,
		barCode,
		volume,
		brandId,
		categoryId,
		subCategoryId,
		imageId,
		brand,
		category,
		subCategory,
		image
	}: ICreateProductDTO): Promise<Product> {
		this.brands.push(brand);
		this.images.push(image);
		this.categories.push(category);
		this.subCategories.push(subCategory);
		this.measurementUnits.push(measurementUnit);

		const product: Product = { 
			id: uuidV4(),
			name,
			barCode,
			description,
			measurementUnitId,
			volume,
			brandId,
			categoryId,
			subCategoryId,
			imageId,
			createdAt: new Date(),
			updatedAt: new Date()
		};
    

		this.products.push(product);

		return product;
	}

	createMany(products: IImportProducts[]): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async findByBarCode(barCode: string): Promise<Product> {
		const product = this.products.find(product => product.barCode === barCode);

		return product;
	}
}

export { ProductsRepositoryInMemory };
