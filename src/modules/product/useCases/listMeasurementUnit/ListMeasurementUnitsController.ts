import { Request, Response } from "express";
import { ListMeasurementUnitsUseCase } from "./ListMeasurementUnitsUseCase";


class ListMeasurementUnitsController {
  private listMeasurementUnitsUseCase: ListMeasurementUnitsUseCase;

  constructor(listMeasurementUnitsUseCase: ListMeasurementUnitsUseCase) {
    this.listMeasurementUnitsUseCase = listMeasurementUnitsUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const measurementUnitsList = await this.listMeasurementUnitsUseCase.execute();

    return response.status(200).json(measurementUnitsList);
  }
}

export { ListMeasurementUnitsController };
