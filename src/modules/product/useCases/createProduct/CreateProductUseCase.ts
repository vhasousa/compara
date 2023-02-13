import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage"
import { IBrandsRepository } from "@modules/product/repositories/IBrandsRepository"
import { ICategoriesRepository } from "@modules/product/repositories/ICategoriesRepository"
import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository"
import { IProductsRepository } from "@modules/product/repositories/IProductsRepository"
import { Product } from "@prisma/client"
import { CreateProductValidation } from "./CreateProductValidation"

interface IRequest {
  name: string
  description: string
  measurementUnitId?: number
  categoryId?: number
  barCode: string
  volume?: string
  brandId: string
}

class CreateProductUseCase {
  private productsRepository: IProductsRepository;
  private brandsRepository: IBrandsRepository;
  private measurementUnitsRepository: IMeasurementUnitsRepository;
  private categoriesRepository: ICategoriesRepository;
  private createProductsValidation: CreateProductValidation;
  
  constructor(
    productsRepository: IProductsRepository,
    brandsRepository: IBrandsRepository,
    categoriesRepository: ICategoriesRepository,
    measurementUnitsRepository: IMeasurementUnitsRepository
    ) {
    this.productsRepository = productsRepository;
    this.brandsRepository = brandsRepository;
    this.categoriesRepository = categoriesRepository;
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
    categoryId
  }: IRequest): Promise<IValidationMessage<Product>> {
    const brand = await this.brandsRepository.findById(brandId);
    const category = await this.categoriesRepository.findById(categoryId);
    const measurementUnit = await this.measurementUnitsRepository.findById(measurementUnitId);
    const product = await this.productsRepository.findByBarCode(barCode);

    if (!brand || product || !category) {
      const brandExists = this.createProductsValidation.brandExists(brand);
      const categoryExists = this.createProductsValidation.categoryExists(category);

      if (!brandExists.isSuccess) {
        return brandExists;
      }

      if (!categoryExists.isSuccess) {
        return categoryExists;
      }

      const productExists = this.createProductsValidation.productExists(product)

      if (!productExists.isSuccess) {
        return productExists;
      }
    }

    const createdProduct = await this.productsRepository.create({
      name,
      description,
      measurementUnitId,
      measurementUnit,
      barCode,
      volume,
      brandId,
      categoryId,
      brand,
      category,
    });

    const result: IValidationMessage<Product> = {
      isSuccess: true,
      value: createdProduct
    }

    return result;
  }
}

export { CreateProductUseCase }
