import { PrismaClient, SubCategory } from "@prisma/client";
import { 
  ICreateSubCategoryDTO, 
  IResponseSubCategoryDTO, 
  ISubCategoriesRepository 
} from "../ISubCategoriesRepository";


class SubCategoriesRepository implements ISubCategoriesRepository {
  private prisma = new PrismaClient();

  async list(): Promise<SubCategory[]> {
    const subCategories = await this.prisma.subCategory.findMany({
      include: {
        category: true
      }
    });

    return subCategories;
  }

  async create({ 
    name, 
    description, 
    categoryId,
    imageId,
    slug
  }: ICreateSubCategoryDTO): Promise<SubCategory> {
    const subCategories = await this.prisma.subCategory.create({
      data: {
        name,
        description,
        categoryId,
        imageId,
        slug
      }
    });

    return subCategories;
  }

  async createMany(subCategories: ICreateSubCategoryDTO[]): Promise<void> {
    await this.prisma.subCategory.createMany({
      data: subCategories,
      skipDuplicates: true
    });
  }

  async findByName(name: string): Promise<SubCategory> {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: {
        name
      }
    });


    return subCategory;
  }

  async findById(id: number): Promise<SubCategory> {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: {
        id
      }
    });

    return subCategory;
  }

  async findBySlug(slug: string): Promise<SubCategory> {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: {
        slug
      }
    });

    return subCategory;
  }

  async listByCategory(categoryId: number): Promise<SubCategory[]> {
    const subCategories = await this.prisma.subCategory.findMany({
      where: { categoryId },
      include: {
        image: true
      }
    });

    return subCategories;
  }
}

export { SubCategoriesRepository }
