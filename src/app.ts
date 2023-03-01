import express from "express";

import swaggerUi from 'swagger-ui-express';

import { router } from "./routes";
import swaggerFile from   "./swagger.json";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

export { app }
