import { Category } from "@prisma/client";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  
  categories: Category[] = [];
  counter = 0;

  async list(): Promise<Category[]> {
    const listOfBrands = this.categories;

    return listOfBrands;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    ++this.counter

    const category: Category = {
      id: this.counter,
      name,
      description,
      createdAt: new Date()
    }

    this.categories.push(category);

    return category;
  }

  createMany(categories: ICreateCategoryDTO[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  createIfNotExists({ name, description }: ICreateCategoryDTO): Promise<Category> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Category> {
    const brand = this.categories.find(brand => brand.name === name);

    return brand;
  }

  async findById(id: number): Promise<Category> {
    const brand = this.categories.find(brand => brand.id === id);

    return brand;
  }
}

export { CategoriesRepositoryInMemory }
