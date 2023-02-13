import { Category, PrismaClient } from "@prisma/client";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {
  private prisma = new PrismaClient();

  async list(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        name,
        description        
      }
    });

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        name
      }
    });

    return category;
  }

  async findById(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    });

    return category;
  }
}

export { CategoriesRepository }
