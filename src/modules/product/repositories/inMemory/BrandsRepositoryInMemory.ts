import { Brand } from "@prisma/client";
import { IBrandsRepository, ICreateBrandDTO } from "../IBrandsRepository";
import { v4 as uuidV4 } from 'uuid';

class BrandsRepositoryInMemory implements IBrandsRepository {
  brands: Brand[] = [];

  async list(): Promise<Brand[]> {
    const listOfBrands = this.brands;

    return listOfBrands;
  }

  async create({ name }: ICreateBrandDTO): Promise<Brand> {
    const brand: Brand = {
      id: uuidV4(),
      name,
      createdAt: new Date()
    }

    this.brands.push(brand);

    return brand;
  }

  async findByName(name: string): Promise<Brand> {
    const brand = this.brands.find(brand => brand.name === name);

    return brand;
  }

  async findById(id: string): Promise<Brand> {
    const brand = this.brands.find(brand => brand.id === id);

    return brand;
  }
}

export { BrandsRepositoryInMemory }
