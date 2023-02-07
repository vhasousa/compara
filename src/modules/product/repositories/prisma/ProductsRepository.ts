import { measurementUnits } from "@config/prisma/seed/measurementUnitData";
import { Product, PrismaClient } from "@prisma/client";

import { ICreateProductDTO, IProductsRepository, IResponseProductDTO } from "../IProductsRepository";

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