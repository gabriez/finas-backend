import { Router } from "express";
import {
	CreateProjectHandler,
	GetOnlyProjectHandler,
} from "../handlers/projectsHandler";
import { param } from "express-validator";

export const ProjectRoutes = () => {
	const routerRoot = Router();

	routerRoot.post("/", CreateProjectHandler);
	routerRoot.get(
		"/:id",
		param("id").isInt().withMessage("ID invalido"),
		GetOnlyProjectHandler
	);

	return routerRoot;
};
