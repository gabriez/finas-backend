import { NextFunction } from "express";
import { RequestAPI, ResponseAPI } from "../types/express";
import { validationResult } from "express-validator";

const HandleInputErrorsMiddleware = (
	req: RequestAPI,
	res: ResponseAPI,
	next: NextFunction
) => {
	let errors = validationResult(req);
	if (!errors.isEmpty) {
		return res.status(400).json({
			status: false,
			message: "The request data is wrong",
			data: errors.array(),
		});
	}
	next();
};

export default HandleInputErrorsMiddleware;
