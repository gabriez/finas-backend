import db from "../config/db.js";
import Roles from "../models/Roles.model.js";
import Users from "../models/Users.model.js";

import colors from "colors";

async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
		console.log(colors.bgGreen.bold("Conexion exitosa a la base de datos"));
	} catch (error) {
		console.log(error);
		console.log("Hubo un error al conectar a la base de datos");
	}
}

export const seedSuperAdmin = async () => {
	let user = await Users.findOne({
		where: {
			email: "superadmin@gmail.com",
		},
	});

	let roles = await Roles.findOne({
		where: {
			rol: ["admin"],
		},
	});
	if (user) {
		return;
	}

	await Users.create({
		email: "superadmin@gmail.com",
		password: "superadmin123",
		nombre: "Admin",
		apellido: "FINAS",
		username: "SuperAdmin",
		roleId: roles.dataValues.id,
	});
};

await connectDB();
await seedSuperAdmin();
