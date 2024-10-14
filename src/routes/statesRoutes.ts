import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations.js";
import {
	municipioHandler,
	parroquiaHandler,
	sectorHandler,
} from "../handlers/statesHandler.js";

export const StatesRoutes = () => {
	const routerRoot = Router();

	routerRoot.get("/municipio", municipioHandler);

	routerRoot.get("/parroquia", parroquiaHandler);

	routerRoot.get("/sector", sectorHandler);

	return routerRoot;
};
