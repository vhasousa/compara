import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository";
import { MeasurementUnit } from "@prisma/client";

class ListMeasurementUnitsUseCase {
	private measurementUnitsRepository: IMeasurementUnitsRepository;

	constructor(measurementUnitsRepository: IMeasurementUnitsRepository) {
		this.measurementUnitsRepository = measurementUnitsRepository;
	}

	async execute(): Promise<MeasurementUnit[]> {
		const measurementUnits = await this.measurementUnitsRepository.list();

		return measurementUnits;
	}
}

export { ListMeasurementUnitsUseCase };
