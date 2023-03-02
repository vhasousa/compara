import { ICategoryDTO } from "@modules/product/interfaces/dtos/ICategoryDTO";
import { Category, Image } from "@prisma/client";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  images: Image[] = [];
  counter = 0;

  async list(): Promise<Category[]> {
    const listOfBrands = this.categories;

    return listOfBrands;
  }

  async create({ 
    name,
    description,
    slug,
    image,
    imageId
  }: ICreateCategoryDTO): Promise<ICategoryDTO> {
    ++this.counter

    this.images.push(image);

    const category: ICategoryDTO = {
      id: this.counter,
      name,
      description,
      slug,
      createdAt: new Date(),
      image,
      imageId
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
    const category = this.categories.find(category => category.id === id);

    return category;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = this.categories.find(category => category.slug === slug);

    return category;
  }
}

export { CategoriesRepositoryInMemory }
