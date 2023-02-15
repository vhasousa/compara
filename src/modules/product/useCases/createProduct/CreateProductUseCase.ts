import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage"
import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository"
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository"
import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository"
import { IProductsRepository } from "@modules/product/repositories/IProductsRepository"
import { ISubCategoriesRepository } from "@modules/product/repositories/ISubCategoriesRepository"
import { Product } from "@prisma/client"
import { CreateProductValidation } from "./CreateProductValidation"

interface IRequest {
  name: string
  description: string
  measurementUnitId?: number
  categoryId?: number
  subCategoryId?: number
  barCode: string
  volume?: string
  brandId: string
}

class CreateProductUseCase {
  private productsRepository: IProductsRepository;
  private brandsRepository: IBrandsRepository;
  private measurementUnitsRepository: IMeasurementUnitsRepository;
  private categoriesRepository: ICategoriesRepository;
  private subCategoriesRepository: ISubCategoriesRepository;
  private createProductsValidation: CreateProductValidation;
  
  constructor(
    productsRepository: IProductsRepository,
    brandsRepository: IBrandsRepository,
    categoriesRepository: ICategoriesRepository,
    subCategoriesRepository: ISubCategoriesRepository,
    measurementUnitsRepository: IMeasurementUnitsRepository
    ) {
    this.productsRepository = productsRepository;
    this.brandsRepository = brandsRepository;
    this.categoriesRepository = categoriesRepository;
    this.subCategoriesRepository = subCategoriesRepository;
    this.measurementUnitsRepository = measurementUnitsRepository;
    this.createProductsValidation = new CreateProductValidation();
  }

  async execute({
    name,
    description,
    measurementUnitId,
    barCode,
    volume,
    brandId,
    subCategoryId
  }: IRequest): Promise<IValidationMessage<Product>> {
    const brand = await this.brandsRepository.findById(brandId);
    const subCategory = await this.subCategoriesRepository.findById(subCategoryId);
    const measurementUnit = await this.measurementUnitsRepository.findById(measurementUnitId);
    const product = await this.productsRepository.findByBarCode(barCode);
    
    if (!brand || product || !subCategory) {
      const brandExists = this.createProductsValidation.brandExists(brand);
      const subCategoryExists = this.createProductsValidation.subCategoryExists(subCategory);
      
      if (!brandExists.isSuccess) {
        return brandExists;
      }
      
      if (!subCategoryExists.isSuccess) {
        return subCategoryExists;
      }
      
      const productExists = this.createProductsValidation.productExists(product)
      
      if (!productExists.isSuccess) {
        return productExists;
      }
    }
    
    const category = await this.categoriesRepository.findById(subCategory.categoryId);

    const createdProduct = await this.productsRepository.create({
      name,
      description,
      measurementUnitId,
      measurementUnit,
      barCode,
      volume,
      brandId,
      categoryId: category.id,
      subCategoryId,
      brand,
      category,
      subCategory
    });

    const result: IValidationMessage<Product> = {
      isSuccess: true,
      value: createdProduct
    }

    return result;
  }
}

export { CreateProductUseCase }
