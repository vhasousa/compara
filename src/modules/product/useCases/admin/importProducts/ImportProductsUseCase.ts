import { IValidationMessage } from "errors/IValidationMessage";
import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository";
import { ICreateProductDTO, IImportProducts, IProductsRepository } from "@modules/product/repositories/IProductsRepository";
import { Product } from "@prisma/client";

import fs from "fs";
import { parse } from "csv-parse";
import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";



class ImportProductsUseCase {
	private productsRepository: IProductsRepository;
	private brandsRepository: IBrandsRepository;
	private measurementUnitsRepository: IMeasurementUnitsRepository;
	private categoriesRepository: ICategoriesRepository;
	private subCategoriesRepository: ISubCategoriesRepository;
  
	constructor(
		productsRepository: IProductsRepository,
		// brandsRepository: IBrandsRepository,
		// categoriesRepository: ICategoriesRepository,
		subCategoriesRepository: ISubCategoriesRepository,
		// measurementUnitsRepository: IMeasurementUnitsRepository
	) {
		this.productsRepository = productsRepository;
		// this.brandsRepository = brandsRepository;
		// this.categoriesRepository = categoriesRepository;
		this.subCategoriesRepository = subCategoriesRepository;
		// this.measurementUnitsRepository = measurementUnitsRepository;
	}

	async loadProducts(file: Express.Multer.File): Promise<IImportProducts[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const products: IImportProducts[] = [];

			const parseFile = parse({
				delimiter: ","
			});

			stream.pipe(parseFile);

			parseFile.on("data", async (line) => {
				const [
					name,
					description,
					measurementUnitId,
					barCode,
					volume,
					brandId,
					categoryName,
					subCategoryName
				] = line;
        
				products.push({
					name,
					description,
					measurementUnitId,
					barCode,
					volume,
					brandId,
					categoryName,
					subCategoryName
				});
			})
				.on("end", () => {
					resolve(products);
				})
				.on("error", (err) => {
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const products = await this.loadProducts(file);
		const listOfProducts: ICreateProductDTO[] = [];

		for (let i = 0; i < products.length; i++) {
			const { 
				subCategoryName, 
				barCode, 
				description,
				name,
				brandId,
				measurementUnitId,
				volume 
			} = products[i];

			const subCategory = await this.subCategoriesRepository.findByName(
				subCategoryName
			);

			listOfProducts.push({ 
				subCategoryId: subCategory.id, 
				barCode, 
				description,
				name,
				brandId: brandId ? brandId : null,
				categoryId: subCategory.categoryId,
				measurementUnitId: measurementUnitId ? measurementUnitId : null,
				volume 
			});
		}

		await this.productsRepository.createMany(listOfProducts);
	}
}

export { ImportProductsUseCase };
