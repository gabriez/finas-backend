import { Router } from "express";
import { param, body } from "express-validator";

import {
	CreateProjectHandler,
	DeleteProject,
	GetOnlyProjectHandler,
	GetProjects,
	GetStatistics,
	GetStatus,
	PatchProject,
} from "../handlers/projectsHandler.js";
import HandleInputErrorsMiddleware from "../middlewares/validations.js";

export const ProjectRoutes = () => {
	const routerRoot = Router();
	routerRoot.post("/", CreateProjectHandler);
	routerRoot.get("/", GetProjects);
	routerRoot.get("/status", GetStatus);
	routerRoot.get("/statistics", GetStatistics);

	routerRoot.get(
		"/:id",
		param("id").isInt().withMessage("ID invalido"),
		HandleInputErrorsMiddleware,
		GetOnlyProjectHandler
	);

	routerRoot.patch("/:id", PatchProject);
	routerRoot.delete("/:id", DeleteProject);

	return routerRoot;
};
