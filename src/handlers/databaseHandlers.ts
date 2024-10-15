import Projects from "../models/Projects.model";
import Roles from "../models/Roles.model";
import Users from "../models/Users.model";
import { ReqImportData } from "../types/database";
import { RequestAPI, ResponseAPI } from "../types/express";

export const ExportacionHandler = async (req: RequestAPI, res: ResponseAPI) => {
	try {
		const users = await Users.findAll();
		const projects = await Projects.findAll();
		const roles = await Roles.findAll();

		res.status(200).json({
			status: true,
			data: {
				users,
				projects,
				roles,
			},
			message: "Exito",
		});
		return;
	} catch (error) {
		console.log("> error in ExportacionHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

export const ImportacionHandler = async (
	req: ReqImportData,
	res: ResponseAPI
) => {
	try {
		const { body } = req;
		const roles = await Roles.bulkCreate(body.roles);
		const users = await Users.bulkCreate(body.users);
		const projects = await Projects.bulkCreate(body.projects);

		res.status(200).json({
			status: true,
			data: {
				users,
				projects,
				roles,
			},
			message: "Exito",
		});
		return;
	} catch (error) {
		console.log("> error in ImportacionHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};
