import { IValidationMessage } from "errors/IValidationMessage";
import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository";
import { IProductsRepository } from "@modules/product/repositories/IProductsRepository";
import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { Product } from "@prisma/client";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";
import { CreateProductValidation } from "./CreateProductValidation";

interface IRequest {
  name: string
  description?: string
  measurementUnitId?: number
  categoryId?: number
  subCategoryId?: number
  barCode: string
  volume?: string
  brandId: string
  originalName: string
  key: string
}

class CreateProductUseCase {
	private productsRepository: IProductsRepository;
	private brandsRepository: IBrandsRepository;
	private measurementUnitsRepository: IMeasurementUnitsRepository;
	private categoriesRepository: ICategoriesRepository;
	private subCategoriesRepository: ISubCategoriesRepository;
	private imagesRepository: IImagesRepository;
	private createProductsValidation: CreateProductValidation;
	private storageProvider: IStorageProvider;
  
	constructor(
		productsRepository: IProductsRepository,
		brandsRepository: IBrandsRepository,
		categoriesRepository: ICategoriesRepository,
		subCategoriesRepository: ISubCategoriesRepository,
		measurementUnitsRepository: IMeasurementUnitsRepository,
		imagesRepository: IImagesRepository,
		storageProvider: IStorageProvider
	) {
		this.productsRepository = productsRepository;
		this.brandsRepository = brandsRepository;
		this.categoriesRepository = categoriesRepository;
		this.subCategoriesRepository = subCategoriesRepository;
		this.measurementUnitsRepository = measurementUnitsRepository;
		this.imagesRepository = imagesRepository;
		this.storageProvider = storageProvider;
		this.createProductsValidation = new CreateProductValidation();
	}

	async execute({
		name,
		description,
		measurementUnitId,
		barCode,
		volume,
		brandId,
		subCategoryId,
		originalName,
		key
	}: IRequest): Promise<IValidationMessage<Product>> {
		const brand = await this.brandsRepository.findById(brandId);
		const subCategory = await this.subCategoriesRepository.findById(
			subCategoryId);
		const measurementUnit = await this.measurementUnitsRepository.findById(
			measurementUnitId);
		const product = await this.productsRepository.findByBarCode(barCode);

		if (!brand || product || !subCategory || !measurementUnit) {
			const brandExists = this.createProductsValidation.brandExists(brand);
			const subCategoryExists = 
				this.createProductsValidation.subCategoryExists(subCategory);
			const measurementUnitExists = 
				this.createProductsValidation.measurementUnitExists(measurementUnit);

			if(measurementUnitExists.isFailure) {
				await this.storageProvider.unlinkImage(key);
				return measurementUnitExists; 
			}
      
			if (!brandExists.isSuccess) {
				await this.storageProvider.unlinkImage(key);
				return brandExists;
			}
      
			if (!subCategoryExists.isSuccess) {
				await this.storageProvider.unlinkImage(key);
				return subCategoryExists;
			}
      
			const productExists = this.createProductsValidation.productExists(product);
      
			if (!productExists.isSuccess) {
				await this.storageProvider.unlinkImage(key);
				return productExists;
			}
		}

		const volumeValidation = 
			volume ? this.createProductsValidation.volumeValidation(volume) : null;

		const barCodeValidation = 
			volume ? this.createProductsValidation.barCodeValidation(barCode) : null;


		if (volumeValidation.isFailure) {
			await this.storageProvider.unlinkImage(key);
			return volumeValidation;
		}

		if (barCodeValidation.isFailure) {
			await this.storageProvider.unlinkImage(key);
			return barCodeValidation;
		}
    
		const category = await this.categoriesRepository.findById(subCategory.categoryId);

		const image = await this.imagesRepository.create({ originalName, key });

		const createdProduct = await this.productsRepository.create({
			name,
			description,
			measurementUnitId: measurementUnit.id,
			measurementUnit,
			barCode,
			volume,
			brandId,
			categoryId: category.id,
			subCategoryId: subCategory.id,
			imageId: image.id,
			brand,
			category,
			subCategory,
			image
		});

		const result: IValidationMessage<Product> = {
			isSuccess: true,
			value: createdProduct
		};

		return result;
	}
}

export { CreateProductUseCase };
