import { MeasurementUnit, PrismaClient } from "@prisma/client";
import { ICreateMeasurementUnitDTO, IMeasurementUnitsRepository } from "../IMeasurementUnitsRepository";


class MeasurementUnitsRepository implements IMeasurementUnitsRepository {
  private prisma = new PrismaClient();

  async create({ name, abbreviation }: ICreateMeasurementUnitDTO): Promise<MeasurementUnit> {
    const measurementUnit = await this.prisma.measurementUnit.create({
      data: {
        name,
        abbreviation        
      }
    });

    return measurementUnit;
  }

  async list(): Promise<MeasurementUnit[]> {
    const measurementUnits = await this.prisma.measurementUnit.findMany();

    return measurementUnits;
  }

  async findById(id: number): Promise<MeasurementUnit> {
    const measurementUnits = await this.prisma.measurementUnit.findUnique({
      where: {
        id
      }
    });

    return measurementUnits;
  }
}

export { MeasurementUnitsRepository }
