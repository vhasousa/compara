import { listMeasurementUnitsController } from "@modules/product/useCases/public/listMeasurementUnit";
import { Router } from "express";

const measurementUnitsRoutes = Router();

measurementUnitsRoutes.get("/", (request, response) => {
	return listMeasurementUnitsController.handle(request, response);
});

export { measurementUnitsRoutes };
