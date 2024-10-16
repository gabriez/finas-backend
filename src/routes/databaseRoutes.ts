import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations.js";
import {
	ExportacionHandler,
	ImportacionHandler,
} from "../handlers/databaseHandlers.js";

export const DatabaseRoutes = () => {
	const routerRoot = Router();

	routerRoot.post("/exportacion", ExportacionHandler);
	routerRoot.post("/importacion", ImportacionHandler);

	return routerRoot;
};
