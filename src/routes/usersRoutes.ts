import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations";

export const UsersRoutes = () => {
	const routerRoot = Router();

	routerRoot.get("/");
	routerRoot.get("/encargados");

	routerRoot.get("/:id");
	routerRoot.get("/encargados/:id");

	routerRoot.post("/");

	routerRoot.put("/:id");
	routerRoot.put("/encargados/:id");

	return routerRoot;
};
