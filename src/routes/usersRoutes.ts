import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations";
import { isSuperAdmin, verifyToken } from "../middlewares/authentication";
import {
	createUser,
	getOneUser,
	getUsers,
	putUser,
} from "../handlers/usersHandler";

export const UsersRoutes = () => {
	const routerRoot = Router();
	// verifyToken
	routerRoot.get("/", verifyToken, getUsers);

	routerRoot.get("/:id", getOneUser);

	routerRoot.post("/", verifyToken, isSuperAdmin, createUser);

	routerRoot.patch("/:id", verifyToken, isSuperAdmin, putUser);

	return routerRoot;
};
