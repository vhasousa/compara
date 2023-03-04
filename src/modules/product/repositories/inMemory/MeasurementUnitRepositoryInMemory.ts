import { MeasurementUnit } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ICreateMeasurementUnitDTO, IMeasurementUnitsRepository } from "../IMeasurementUnitsRepository";

class MeasurementUnitsRepositoryInMemory implements IMeasurementUnitsRepository {
	measurementUnits: MeasurementUnit[] = [];

	async create({ name, abbreviation }: ICreateMeasurementUnitDTO): Promise<MeasurementUnit> {
		const measurementUnit: MeasurementUnit = {
			id: uuidV4(),
			name,
			abbreviation,
		};

		this.measurementUnits.push(measurementUnit);

		return measurementUnit;
	}

	async list(): Promise<MeasurementUnit[]> {
		const listOfBrands = this.measurementUnits;

		return listOfBrands;
	}

	async findById(id: number): Promise<MeasurementUnit> {
		const measurementUnit = this.measurementUnits.find(
			measurementUnit => measurementUnit.id === id);

		return measurementUnit;
	}
}

export { MeasurementUnitsRepositoryInMemory };
