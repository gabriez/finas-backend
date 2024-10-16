import bcrypt from "bcrypt";
import colors from "colors";
import Users from "../models/Users.model.js";
import {
	ReqCreateUser,
	ReqGetOneUser,
	ReqGetUsers,
	ReqUpdateUser,
} from "../types/users";
import { RequestAPI, ResponseAPI } from "../types/express";
import Roles from "../models/Roles.model.js";
import { Op } from "sequelize";

const getUsers = async (req: ReqGetUsers, res: ResponseAPI) => {
	try {
		let query: string | string[] = req.query.rol;

		if (query == "all") {
			query = ["admin", "user"];
		} else if (query != "encargado") {
			res.status(404).json({
				status: false,
				message: "El rol no existe",
			});
			return;
		}

		let users = await Users.findAll({
			attributes: { exclude: ["password", "createdAt", "updatedAt", "roleId"] },
			include: [
				{
					model: Roles,
					where: {
						rol: query,
					},
					attributes: { exclude: ["createdAt", "updatedAt"] },
				},
			],
		});

		res.status(200).json({
			status: true,
			message: "Consulta exitosa",
			data: users,
		});
		return;
	} catch (error) {
		console.log(
			colors.bgRed.white(
				`Ocurrio un error en la creacion de usuarios. ${error}`
			)
		);
		res.status(500).json({
			status: false,
			message: "Ocurrio un error en el servidor",
		});
		return;
	}
};
const getOneUser = async (req: ReqGetOneUser, res: ResponseAPI) => {
	try {
		let { id } = req.params;

		let user = await Users.findByPk(id, {
			include: {
				model: Roles,
			},
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		});

		if (!user) {
			res.status(400).json({
				status: false,
				message: "El usuario no existe",
			});
			return;
		}

		res.status(200).json({
			status: true,
			message: "Datos actualizados correctamente",
			data: user,
		});
		return;
	} catch (error) {
		console.log(
			colors.bgRed.white(
				`Ocurrio un error en la actualizacion de usuarios. ${error}`
			)
		);
		res.status(500).json({
			status: false,
			message: "Ocurrio un error en el servidor",
		});
	}
};

const createUser = async (req: ReqCreateUser, res: ResponseAPI) => {
	try {
		// const salt = await bcrypt.genSalt(10);

		let role = await Roles.findByPk(req.body.roleId);

		if (!role) {
			res.status(404).json({
				status: false,
				message: "El rol no existe",
			});
			return;
		}
		let usr = {
			...req.body,
		};

		let user = await Users.findOne({
			where: {
				[Op.or]: [{ email: usr.email }, { username: usr.username }],
			},
		});

		if (user) {
			if (user.dataValues.username === usr.username) {
				res.status(400).json({
					status: false,
					message: "El nombre de usuario ya existe",
				});
				return;
			}

			if (user.dataValues.email === usr.email) {
				res.status(400).json({
					status: false,
					message: "El email ya existe",
				});
				return;
			}
		}

		let createdUser = await Users.create(usr);

		res.status(201).json({
			status: true,
			message: "Usuario creado exitosamente",
			data: {
				id: createdUser.dataValues.id,
				email: createdUser.dataValues.email,
				username: createdUser.dataValues.username,
				nombre: createdUser.dataValues.nombre,
				apellido: createdUser.dataValues.apellido,
				phone: createdUser.dataValues.phone,
				cedula: createdUser.dataValues.cedula,
				role: { rol: role.rol, id: role.id },
			},
		});
	} catch (error) {
		console.log(
			colors.bgRed.white(
				`Ocurrio un error en la creacion de usuarios. ${error}`
			)
		);
		res.status(500).json({
			status: false,
			message: "Ocurrio un error en el servidor",
		});
	}
};

const putUser = async (req: ReqUpdateUser, res: ResponseAPI) => {
	try {
		let usr = req.body;
		let { id } = req.params;

		let user = await Users.findByPk(id);

		if (!user) {
			res.status(400).json({
				status: false,
				message: "El usuario no existe",
			});
			return;
		}

		user = await user.update(usr);
		res.status(200).json({
			status: true,
			message: "Datos actualizados correctamente",
			data: user,
		});
		return;
	} catch (error) {
		console.log(
			colors.bgRed.white(
				`Ocurrio un error en la actualizacion de usuarios. ${error}`
			)
		);
		res.status(500).json({
			status: false,
			message: "Ocurrio un error en el servidor",
		});
	}
};

const getRoles = async (req: RequestAPI, res: ResponseAPI) => {
	try {
		let roles = await Roles.findAll({});

		res.status(200).json({
			status: true,
			message: "Consulta exitosa",
			data: roles,
		});
		return;
	} catch (error) {
		console.log(
			colors.bgRed.white(`Ocurrio un error en la obtencion de roles. ${error}`)
		);
		res.status(500).json({
			status: false,
			message: "Ocurrio un error en el servidor",
		});
		return;
	}
};

export { createUser, getOneUser, getUsers, putUser, getRoles };
