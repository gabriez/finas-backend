import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { RequestAPI, ResponseAPI } from "../types/express";
import { jwtSecret } from "../config/constants.js";
import Users from "../models/Users.model.js";

async function verifyToken(
	req: RequestAPI,
	resp: ResponseAPI,
	next: NextFunction
) {
	try {
		const bearer = req.headers.authorization;
		const token = bearer?.split(" ")[1];

		if (!token) {
			resp.status(403).json({
				status: false,
				message: "Falta el token de autenticación",
			});
			return;
		}

		const decodeToken = jwt.verify(token, jwtSecret);

		let user: Users | null = null;

		if (typeof decodeToken != "string") {
			user = await Users.findOne({
				where: { id: decodeToken?.id },
				include: ["role"],
			});
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("verifyToken error:", String(error));
		resp.status(401).json({
			status: false,
			message: "No se pudo verificar el token de autenticación",
		});
		return;
	}
}

function isAutorized(rolToCheck: string, user: Users) {
	return user && user.dataValues.role.dataValues.rol == rolToCheck;
}

async function isSuperAdmin(
	req: RequestAPI,
	resp: ResponseAPI,
	next: NextFunction
) {
	if (!isAutorized("admin", req.user)) {
		resp.status(403).json({
			status: false,
			message: "Forbidden!",
		});
		return;
	}

	next();
}

async function isEncargado(
	req: RequestAPI,
	resp: ResponseAPI,
	next: NextFunction
) {
	if (!isAutorized("encargado", req.user) || !isAutorized("admin", req.user)) {
		resp.status(403).json({
			status: false,
			message: "Forbidden!",
		});
		return;
	}

	next();
}

export { verifyToken, isSuperAdmin, isEncargado };
