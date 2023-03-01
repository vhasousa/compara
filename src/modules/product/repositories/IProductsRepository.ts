import { Brand, Category, MeasurementUnit, Product, SubCategory } from '@prisma/client';

interface ICreateProductDTO {
  id?: string
  name: string
  description: string
  measurementUnitId?: number
  measurementUnit?: MeasurementUnit
  barCode: string
  volume?: string
  brandId?: string
  categoryId: number
  subCategoryId: number
  brand?: Brand
  subCategory?: SubCategory
  category?: Category
  createdAt?: Date
  updatedAt?: Date
  imageId: string
}

interface IImportProducts {
  name: string
  description: string
  measurementUnitId?: number
  barCode: string
  volume?: string
  brandId?: string
  categoryName?: string
  subCategoryName?: string
}

interface IResponseProductDTO {
  id: string
  name: string
  description: string
  measurementUnit?: MeasurementUnit
  barCode?: string
  volume?: string
  brand?: Brand
  category?: Category
  createdAt?: Date
  updatedAt?: Date
  imageUrl: string
}

interface IProductsRepository {
  list(): Promise<Product[]>;
  create({
    name,
    description,
    measurementUnitId,
    measurementUnit,
    barCode,
    volume,
    brandId,
    subCategoryId,
    brand,
    subCategory,
    imageId
  }: ICreateProductDTO): Promise<Product>;
  createMany(products: ICreateProductDTO[]): Promise<void>;
  findByBarCode(barCode: string): Promise<Product>;
  listBySubCategory(subCategoryId: number): Promise<Product[]>;
}

export { 
  IProductsRepository, 
  ICreateProductDTO,
  IResponseProductDTO, 
  IImportProducts
}
