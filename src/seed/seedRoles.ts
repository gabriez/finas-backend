import db from "../config/db.js";
import Roles from "../models/Roles.model.js";
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

await connectDB();
await seedRoles();
