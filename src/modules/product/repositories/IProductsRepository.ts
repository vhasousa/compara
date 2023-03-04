import { Brand, Category, Image, MeasurementUnit, Product, SubCategory } from "@prisma/client";
import { IProductDTO } from "../interfaces/dtos/IProductDTO";

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
  imageId?: string
  image?: Image
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
  slug?: string
  subCategory: string
}

interface IProductsRepository {
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
  	imageId,
  	image
  }: ICreateProductDTO): Promise<Product>;
  createMany(products: ICreateProductDTO[]): Promise<void>;
  findByBarCode(barCode: string): Promise<Product>;
  listBySubCategory(subCategoryId: number): Promise<IProductDTO[]>;
}

export { 
	IProductsRepository, 
	ICreateProductDTO,
	IResponseProductDTO, 
	IImportProducts
};
