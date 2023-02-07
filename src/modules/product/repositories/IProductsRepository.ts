import { Brand, Category, MeasurementUnit, Product } from '@prisma/client';

interface ICreateProductDTO {
  id?: string
  name: string
  description: string
  measurementUnitId?: string
  measurementUnit?: MeasurementUnit
  barCode: string
  volume?: string
  brandId: string
  categoryId: string
  brand?: Brand
  category?: Category
  createdAt?: Date
  updatedAt?: Date
}

interface IResponseProductDTO {
  name: string
  description: string
  measurementUnit?: MeasurementUnit
  barCode: string
  volume?: string
  brand: Brand
  category: Category
  createdAt?: Date
  updatedAt?: Date
}

interface IProductsRepository {
  list(): Promise<IResponseProductDTO[]>;
  create({
    name,
    description,
    measurementUnitId,
    measurementUnit,
    barCode,
    volume,
    brandId,
    categoryId,
    brand,
    category
  }: ICreateProductDTO): Promise<Product>;
  findByBarCode(barCode: string): Promise<Product>;
}

export { IProductsRepository, ICreateProductDTO, IResponseProductDTO }
