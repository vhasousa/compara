import slugify from "slugify";

import { Category } from "@prisma/client";

import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository";
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository";
import { CreateSubCategoryValidation } from "./CreateSubCategoryValidation";
import { IValidationMessage } from "errors/IValidationMessage";
import { IImagesRepository } from "@modules/product/repositories/IImagesRepository";
import { IStorageProvider } from "@shared/StorageProvider/IStorageProvider";

interface IRequest {
  name: string
  description?: string
  categoryName: string
  originalName: string
  key: string
}

class CreateSubCategoryUseCase {
	private subCategoriesRepository: ISubCategoriesRepository;
	private categoriesRepository: ICategoriesRepository;
	private imagesRepository: IImagesRepository;
	private storageProvider: IStorageProvider;
	private createSubCategoryValidation: CreateSubCategoryValidation;
  
	constructor(
		subCategoriesRepository: ISubCategoriesRepository,
		categoriesRepository: ICategoriesRepository,
		imagesRepository: IImagesRepository,
		storageProvider: IStorageProvider,
	) {
		this.subCategoriesRepository = subCategoriesRepository;
		this.categoriesRepository = categoriesRepository;
		this.imagesRepository = imagesRepository;
		this.storageProvider = storageProvider;
		this.createSubCategoryValidation = new CreateSubCategoryValidation();
	}

	async execute({ 
		name, 
		description,
		categoryName,
		originalName,
		key
	}: IRequest): Promise<IValidationMessage<Category>> {
		const category = await this.categoriesRepository.findByName(categoryName);

		if (!name) {
			const nameRequired = this.createSubCategoryValidation.nameRequired(name);

			if(nameRequired.isFailure) {
				this.storageProvider.unlinkImage(key);

				return nameRequired;
			}
		}

		const slug = slugify(name, {
			replacement: "-",
			lower: true,
			remove: /[*+~.()'"!:@<>-?,]/g,
		});

		const subCategory = await this.subCategoriesRepository.findBySlug(slug);

		if (!category) {
			const categoryExists = 
				this.createSubCategoryValidation.categoryExists(category);

			if (categoryExists.isFailure) {
				this.storageProvider.unlinkImage(key);
				return categoryExists;
			}
		}

		if (subCategory) {
			const subCategoryExists = 
				this.createSubCategoryValidation.subCategoryExists(subCategory);

			if (subCategoryExists.isFailure) {
				this.storageProvider.unlinkImage(key);
				return subCategoryExists;
			}
		}

		const image = await this.imagesRepository.create({ originalName, key });

		const createdSubcategory = await this.subCategoriesRepository.create({ 
			name, 
			description, 
			categoryId: category.id,
			category,
			imageId: image.id,
			slug,
			image
		});

		const result: IValidationMessage<Category> = {
			isSuccess: true,
			value: createdSubcategory
		};

		return result;
	}
}

export { CreateSubCategoryUseCase };
