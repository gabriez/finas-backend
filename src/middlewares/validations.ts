import { NextFunction } from "express";
import { RequestAPI, ResponseAPI } from "../types/express";
import { validationResult } from "express-validator";

const HandleInputErrorsMiddleware = (
	req: RequestAPI,
	res: ResponseAPI,
	next: NextFunction
) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({
			status: false,
			message: "La información ingresada es incorrecta",
			data: errors.array(),
		});
		return;
	}
	next();
};

export default HandleInputErrorsMiddleware;
