import { Router } from "express";
import { param, body } from "express-validator";

import {
	CreateProjectHandler,
	GetOnlyProjectHandler,
} from "../handlers/projectsHandler.js";
import HandleInputErrorsMiddleware from "../middlewares/validations.js";

export const ProjectRoutes = () => {
	const routerRoot = Router();

	routerRoot.post("/", CreateProjectHandler);
	routerRoot.get(
		"/:id",
		param("id").isInt().withMessage("ID invalido"),
		HandleInputErrorsMiddleware,
		GetOnlyProjectHandler
	);

	routerRoot.get("/");
	routerRoot.put("/:id");
	routerRoot.delete("/:id");

	routerRoot.get("/statistics");

	return routerRoot;
};
