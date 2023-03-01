import { measurementUnits } from "@config/prisma/seed/measurementUnitData";
import { Product, PrismaClient, SubCategory } from "@prisma/client";

import { ICreateProductDTO, IImportProducts, IProductsRepository, IResponseProductDTO } from "../IProductsRepository";

class ProductsRepository implements IProductsRepository {
  private prisma = new PrismaClient();

  async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        brand: true,
        measurementUnit: true,
        category: true
      }
    });

    return products;
  }

  async create({
    name,
    description,
    measurementUnitId,
    barCode,
    volume,
    brandId,
    categoryId,
    subCategoryId,
    imageId
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        measurementUnitId,
        barCode,
        volume,
        brandId,
        categoryId,
        subCategoryId,
        imageId
      }
    });

    return product;
  }

  async createMany(products: ICreateProductDTO[]): Promise<void> {
    const test = await this.prisma.product.createMany({
      data: products,
      skipDuplicates: true
    });
  }

  async findByBarCode(barCode: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        barCode
      }
    });

    return product;
  }

  async listBySubCategory(subCategoryId: number): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        image: true
      },
      where: {
        subCategoryId
      }
    });

    return products;
  }
}

export { ProductsRepository }