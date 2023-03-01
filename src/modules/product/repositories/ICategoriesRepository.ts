import { Category, Image } from '@prisma/client';

interface ICreateCategoryDTO {
  id?: number
  name: string
  description?: string
  imageId?: string
  slug: string
  image: Image
}

interface IImportCategories {
  name: string
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create({ name, description, imageId, slug }: ICreateCategoryDTO): Promise<Category>;
  createIfNotExists({ name, description }: ICreateCategoryDTO): Promise<Category>;
  createMany(categories: ICreateCategoryDTO[]): Promise<void>;
  findByName(name: string): Promise<Category>;
  findBySlug(slug: string): Promise<Category>;
  findById(id: number): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO, IImportCategories }
