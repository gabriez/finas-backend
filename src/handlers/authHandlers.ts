import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/constants.js";
import Users from "../models/Users.model.js";
import { ReqLogin } from "../types/auth";
import { ResponseAPI } from "../types/express";

function createToken(user: Users) {
	const {
		dataValues: {
			email,
			id,
			username,
			role: { dataValues: rol },
		},
	} = user;
	return jwt.sign({ email, rol: rol.rol, id, username }, jwtSecret, {
		expiresIn: 86400 /* 1 day */,
	});
}

const loginHandler = async (req: ReqLogin, res: ResponseAPI) => {
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

		if (isMatch) {
			res.status(200).json({
				status: true,
				message: "Success!",
				data: {
					user: {
						username: user.dataValues.username,
						email: user.dataValues.email,
						rol: user.dataValues.role.dataValues.rol,
					},
					token: createToken(user),
				},
			});
			return;
		} else {
			res.status(400).json({
				status: false,
				message: "El email o la contraseña son incorrecto",
			});
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde",
		});
		return;
	}
};

const registerHandler = async (req, res) => {};

const forgotPasswordHandler = async (req, res) => {};

export { loginHandler, registerHandler, forgotPasswordHandler };
