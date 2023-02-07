import { MeasurementUnit } from '@prisma/client';

interface ICreateMeasurementUnitDTO {
  id?: string
  name: string
  abbreviation?: string
}

interface IMeasurementUnitsRepository {
  create({ name, abbreviation }: ICreateMeasurementUnitDTO): Promise<MeasurementUnit>;
  list(): Promise<MeasurementUnit[]>;
  findById(id: string): Promise<MeasurementUnit>;
}

export { IMeasurementUnitsRepository, ICreateMeasurementUnitDTO }
