import { Brand, PrismaClient } from "@prisma/client";

import { IBrandsRepository, ICreateBrandDTO } from "@modules/product/repositories/IBrandsRepository";

class BrandsRepository implements IBrandsRepository {
  private prisma = new PrismaClient();

  async list(): Promise<Brand[]> {
    const services = await this.prisma.brand.findMany();

    return services;
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
}

export { BrandsRepository }