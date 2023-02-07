import { Brand } from '@prisma/client';

interface ICreateBrandDTO {
  name: string;
}

interface IBrandsRepository {
  list(): Promise<Brand[]>;
  create({ name }: ICreateBrandDTO): Promise<Brand>;
  findByName(name: string): Promise<Brand>;
  findById(id: string): Promise<Brand>;
}

export { IBrandsRepository, ICreateBrandDTO }
