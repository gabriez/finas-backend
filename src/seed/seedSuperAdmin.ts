import Roles from "../models/Roles.model.js";
import Users from "../models/Users.model.js";

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
