import { Router } from "express";

import {
	ExportacionHandler,
	ImportacionHandler,
} from "../handlers/databaseHandlers.js";
import { isSuperAdmin, verifyToken } from "../middlewares/authentication.js";

export const DatabaseRoutes = () => {
	const routerRoot = Router();

	routerRoot.post("/export", verifyToken, isSuperAdmin, ExportacionHandler);
	routerRoot.post("/import", verifyToken, isSuperAdmin, ImportacionHandler);

	return routerRoot;
};
