import { Category } from '@prisma/client';

interface ICreateCategoryDTO {
  id?: number
  name: string
  description?: string
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  createIfNotExists({ name, description }: ICreateCategoryDTO): Promise<Category>;
  createMany(categories: ICreateCategoryDTO[]): Promise<void>;
  findByName(name: string): Promise<Category>;
  findById(id: number): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO }
