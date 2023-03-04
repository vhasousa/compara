import { Category, Image } from "@prisma/client";
import { ICategoryDTO } from "../interfaces/dtos/ICategoryDTO";

interface ICreateCategoryDTO {
  id?: number
  name: string
  description?: string
  imageId?: string
  slug: string
  image?: Image
}

interface IImportCategories {
  name: string
  slug: string
}

interface ICategoriesRepository {
  list(): Promise<ICategoryDTO[]>;
  create({ name, description, imageId, slug }: ICreateCategoryDTO): Promise<ICategoryDTO>;
  createIfNotExists({ name, description }: ICreateCategoryDTO): Promise<Category>;
  createMany(categories: ICreateCategoryDTO[]): Promise<void>;
  findByName(name: string): Promise<Category>;
  findBySlug(slug: string): Promise<Category>;
  findById(id: number): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO, IImportCategories };
