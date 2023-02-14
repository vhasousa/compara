import { Category, SubCategory } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import { ICreateSubCategoryDTO, IResponseSubCategoryDTO, ISubCategoriesRepository } from "../ISubCategoriesRepository";

class SubCategoriesRepositoryInMemory implements ISubCategoriesRepository {
  subCategories: SubCategory[] = [];
  categories: Category[] = [];
  counter = 0;

  async list(): Promise<IResponseSubCategoryDTO[]> {
    const listOfSubCategories = this.subCategories.map(subCategory => {
      const { id, name, description, categoryId } = subCategory;

      const formmatedProduct: IResponseSubCategoryDTO  = {
        id,
        name,
        description,
        category: this.categories.find(category => category.id === categoryId)
      }

      return formmatedProduct;
    });

    return listOfSubCategories;
  }

  async create({ name, description, categoryId, category }: ICreateSubCategoryDTO): Promise<SubCategory> {
    ++this.counter

    this.categories.push(category);

    const subCategories: SubCategory = {
      id: this.counter,
      name,
      description,
      categoryId,
      createdAt: new Date()
    }

    this.subCategories.push(subCategories);

    return subCategories;
  }

  createMany(categories: ICreateCategoryDTO[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<SubCategory> {
    const brand = this.subCategories.find(brand => brand.name === name);

    return brand;
  }

  async findById(id: number): Promise<SubCategory> {
    const brand = this.subCategories.find(brand => brand.id === id);

    return brand;
  }
}

export { SubCategoriesRepositoryInMemory }
