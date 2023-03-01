import { Category, Image, SubCategory } from '@prisma/client';

interface ICreateSubCategoryDTO {
  name: string
  description?: string
  categoryId: number
  category?: Category
  imageId: string
  slug: string
}

interface IResponseSubCategoryDTO {
  id: number
  name: string
  description: string
  categoryId?: number
  createdAt?: Date
  category?: Category
  imageUrl: string
  slug: string
}

interface IImportSubCategories {
  name: string
  categoryName: string
}

interface ISubCategoriesRepository {
  list(): Promise<SubCategory[]>;
  create({ 
    name, 
    description, 
    categoryId, 
    category,
    imageId,
    slug
  }: ICreateSubCategoryDTO): Promise<SubCategory>;
  createMany(subCategories: ICreateSubCategoryDTO[]): Promise<void>;
  findByName(name: string): Promise<SubCategory>;
  findById(id: number): Promise<SubCategory>;
  findBySlug(slug: string): Promise<SubCategory>;
  listByCategory(categoryId: number): Promise<SubCategory[]>;
}

export { 
  ISubCategoriesRepository, 
  ICreateSubCategoryDTO, 
  IResponseSubCategoryDTO,
  IImportSubCategories
}
