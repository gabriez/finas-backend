import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations";
import {
	municipioHandler,
	parroquiaHandler,
	sectorHandler,
} from "../handlers/statesHandler";

export const StatesRoutes = () => {
	const routerRoot = Router();

	routerRoot.get("/municipio", municipioHandler);

	routerRoot.get("/parroquia", parroquiaHandler);

	routerRoot.get("/sector", sectorHandler);

	return routerRoot;
};
