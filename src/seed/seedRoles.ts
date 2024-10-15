import Roles from "../models/Roles.model.js";

export const seedRoles = async () => {
	let roles = await Roles.findAll({
		where: {
			rol: ["admin", "encargado", "user"],
		},
	});
	if (roles.length === 3) {
		return;
	}

	await Roles.bulkCreate([
		{
			rol: "admin",
		},
		{
			rol: "encargado",
		},
		{
			rol: "user",
		},
	]);
};
