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
import { isSuperAdmin, verifyToken } from "../middlewares/authentication.js";

export const ProjectRoutes = () => {
	const routerRoot = Router();
	routerRoot.post("/", verifyToken, isSuperAdmin, CreateProjectHandler);
	routerRoot.get("/", verifyToken, GetProjects);
	routerRoot.get("/status", verifyToken, GetStatus);
	routerRoot.get("/statistics", verifyToken, GetStatistics);

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
