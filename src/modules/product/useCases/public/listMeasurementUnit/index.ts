import { MeasurementUnitsRepository } from "@modules/product/repositories/prisma/MeasurementUnitsRepository";
import { ListMeasurementUnitsController } from "./ListMeasurementUnitsController";
import { ListMeasurementUnitsUseCase } from "./ListMeasurementUnitsUseCase";

const measurementUnitsRepository = new MeasurementUnitsRepository();

const listMeasurementUnitsUseCase = new ListMeasurementUnitsUseCase(measurementUnitsRepository);
const listMeasurementUnitsController = new ListMeasurementUnitsController(listMeasurementUnitsUseCase);

export { listMeasurementUnitsController };