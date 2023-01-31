import { Category } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async list(): Promise<Category[]> {
    const listOfBrands = this.categories;

    return listOfBrands;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category: Category = {
      id: uuidV4(),
      name,
      description,
      createdAt: new Date()
    }

    this.categories.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const brand = this.categories.find(brand => brand.name === name);

    return brand;
  }
}

export { CategoriesRepositoryInMemory }
