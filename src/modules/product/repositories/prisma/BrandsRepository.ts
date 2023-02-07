import { Brand, PrismaClient } from "@prisma/client";

import { IBrandsRepository, ICreateBrandDTO } from "@modules/product/repositories/IBrandsRepository";

class BrandsRepository implements IBrandsRepository {
  private prisma = new PrismaClient();

  async list(): Promise<Brand[]> {
    const brands = await this.prisma.brand.findMany();

    return brands;
  }

  async create({ name }: ICreateBrandDTO): Promise<Brand> {
    const brand = await this.prisma.brand.create({
      data: {
        name
      }
    });

    return brand;
  }

  async findByName(name: string): Promise<Brand> {
    const brand = await this.prisma.brand.findUnique({
      where: {
        name
      }
    });

    return brand;
  }

  async findById(id: string): Promise<Brand> {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id
      }
    });

    return brand;
  }
}

export { BrandsRepository }