import { Router } from "express";
import { param, body } from "express-validator";

import HandleInputErrorsMiddleware from "../middlewares/validations.js";
import {
	forgotPasswordHandler,
	loginHandler,
	registerHandler,
} from "../handlers/authHandlers.js";

export const AuthRoutes = () => {
	const routerRoot = Router();

	routerRoot.post(
		"/login",

		loginHandler
	);
	routerRoot.post("/register", registerHandler);
	routerRoot.post("/confirmation");
	routerRoot.post("/forgot-password", forgotPasswordHandler);

	return routerRoot;
};
