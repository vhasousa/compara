import { measurementUnits } from "@config/prisma/seed/measurementUnitData";
import { Product, PrismaClient } from "@prisma/client";

import { ICreateProductDTO, IImportProducts, IProductsRepository, IResponseProductDTO } from "../IProductsRepository";

class ProductsRepository implements IProductsRepository {
  private prisma = new PrismaClient();

  async list(): Promise<IResponseProductDTO[]> {
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
    categoryId
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        measurementUnitId,
        barCode,
        volume,
        brandId,
        categoryId
      }
    });

    return product;
  }

  async createMany(products: IImportProducts[]): Promise<void> {
    const test = await this.prisma.product.createMany({
      data: products,
      skipDuplicates: true
    });

    console.log(test);
  }

  async findByBarCode(barCode: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        barCode
      }
    });

    return product;
  }
}

export { ProductsRepository }