import { Brand, Category, MeasurementUnit, Product } from '@prisma/client';

interface ICreateProductDTO {
  id?: string
  name: string
  description: string
  measurementUnitId?: number
  measurementUnit?: MeasurementUnit
  barCode: string
  volume?: string
  brandId: string
  categoryId: number
  brand?: Brand
  category?: Category
  createdAt?: Date
  updatedAt?: Date
}

interface IImportProducts {
  name: string
  description: string
  measurementUnitId?: number
  categoryId?: number
  barCode: string
  volume?: string
  brandId: string
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

interface IImportCategories {
  name: string
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
  createMany(products: IImportProducts[]): Promise<void>;
  findByBarCode(barCode: string): Promise<Product>;
}

export { 
  IProductsRepository, 
  ICreateProductDTO,
  IResponseProductDTO, 
  IImportProducts, 
  IImportCategories 
}
