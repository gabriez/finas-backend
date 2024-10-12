import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations";

export const DatabaseRoutes = () => {
	const routerRoot = Router();

	routerRoot.post("/importacion");
	routerRoot.post("/respaldo");

	return routerRoot;
};
