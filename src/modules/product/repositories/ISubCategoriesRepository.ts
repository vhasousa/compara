import { Category, SubCategory } from '@prisma/client';

interface ICreateSubCategoryDTO {
  name: string
  description?: string
  categoryId: number
  category?: Category
}

interface IResponseSubCategoryDTO {
  id: number
  name: string
  description: string
  categoryId?: number
  createdAt?: Date
  category: Category
}

interface IImportSubCategories {
  name: string
  categoryName: string
}

interface ISubCategoriesRepository {
  list(): Promise<IResponseSubCategoryDTO[]>;
  create({ 
    name, 
    description, 
    categoryId, 
    category 
  }: ICreateSubCategoryDTO): Promise<SubCategory>;
  createMany(subCategories: ICreateSubCategoryDTO[]): Promise<void>;
  findByName(name: string): Promise<SubCategory>;
  findById(id: number): Promise<SubCategory>;
  listByCategory(categoryId: number): Promise<SubCategory[]>;
}

export { 
  ISubCategoriesRepository, 
  ICreateSubCategoryDTO, 
  IResponseSubCategoryDTO,
  IImportSubCategories
}
