import { Op } from "sequelize";
import Projects from "../models/Projects.model.js";
import Roles from "../models/Roles.model.js";
import Users from "../models/Users.model.js";
import type { ReqExport, ReqImportData } from "../types/database";
import type { ResponseAPI } from "../types/express";

export const ExportacionHandler = async (req: ReqExport, res: ResponseAPI) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(422).json({
				data: null,
				status: false,
				message: "El email y contraseña son obligatorios",
			});
			return;
		}

		const user = await Users.findOne({
			where: {
				email,
			},
			include: ["role"],
		});

		if (!user) {
			res.status(422).json({
				data: null,
				status: false,
				message: "El usuario no existe",
			});
			return;
		}
		const isMatch = await user.comparePassword(password);

		if (!isMatch || user.dataValues.role.dataValues.rol != "admin") {
			res.status(401).json({
				status: false,
				message: "Forbidden",
			});
			return;
		}

		const users = await Users.findAll({
			where: {
				email: {
					[Op.ne]: "superadmin@gmail.com",
				},
			},
		});
		const projects = await Projects.findAll();
		let respaldoData = JSON.stringify({
			users,
			projects,
		});
		let filename = "respaldo.json";

		res.setHeader("Content-Type", "application/json");
		res.setHeader("Content-disposition", "attachment; filename=" + filename);

		res.status(200).send(respaldoData);
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
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(422).json({
				data: null,
				status: false,
				message: "El email y contraseña son obligatorios",
			});
			return;
		}

		const user = await Users.findOne({
			where: {
				email,
			},
			include: ["role"],
		});

		if (!user) {
			res.status(422).json({
				data: null,
				status: false,
				message: "El usuario no existe",
			});
			return;
		}
		const isMatch = await user.comparePassword(password);

		if (!isMatch || user.dataValues.role.dataValues.rol != "admin") {
			res.status(401).json({
				status: false,
				message: "Forbidden",
			});
			return;
		}

		const users = await Users.bulkCreate(body.users);
		const projects = await Projects.bulkCreate(body.projects);

		res.status(200).json({
			status: true,
			data: {
				users,
				projects,
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
