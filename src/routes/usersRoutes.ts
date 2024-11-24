import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations.js";
import { isSuperAdmin, verifyToken } from "../middlewares/authentication.js";
import {
	createUser,
	getOneUser,
	getRoles,
	getUsers,
	putUser,
} from "../handlers/usersHandler.js";

export const UsersRoutes = () => {
	const routerRoot = Router();
	// verifyToken
	routerRoot.get("/", verifyToken, getUsers);

	routerRoot.get("/roles", getRoles);

	routerRoot.get("/:id", verifyToken, getOneUser);

	routerRoot.post("/", verifyToken, isSuperAdmin, createUser);

	routerRoot.patch("/:id", verifyToken, isSuperAdmin, putUser);

	return routerRoot;
};
