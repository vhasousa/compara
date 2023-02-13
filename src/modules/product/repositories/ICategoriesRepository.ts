import { Category } from '@prisma/client';

interface ICreateCategoryDTO {
  name: string
  description?: string
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category>;
  findById(id: number): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO }
