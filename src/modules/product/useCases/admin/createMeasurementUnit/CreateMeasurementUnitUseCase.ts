import { MeasurementUnit } from "@prisma/client";

import { IMeasurementUnitsRepository } from "@modules/product/repositories/IMeasurementUnitsRepository";

interface IRequest {
  name: string
  abbreviation?: string
}

class CreateMeasurementUnitUseCase {
	private measurementUnitsRepository: IMeasurementUnitsRepository;
  
	constructor(
		measurementUnitsRepository: IMeasurementUnitsRepository, 
	) {
		this.measurementUnitsRepository = measurementUnitsRepository;
	}

	async execute({ name, abbreviation }: IRequest): Promise<MeasurementUnit> {
		const measurementUnit = await this.measurementUnitsRepository.create({
			name,
			abbreviation
		});

		return measurementUnit;
	}
}

export { CreateMeasurementUnitUseCase };
