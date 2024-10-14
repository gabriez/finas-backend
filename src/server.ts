import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";

import router from "./routes";
import db from "./config/db";
import morgan from "morgan";
import { seedRoles } from "./seed/seedRoles";
import { seedSuperAdmin } from "./seed/seedSuperAdmin";

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

connectDB();
await seedRoles();
await seedSuperAdmin();

const server = express();

const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		// if (origin === process.env.FRONTEND_URL) callback(null, true);
		// else callback(new Error("CORS error"));
		callback(null, true);
	},
};

server.use(cors(corsOptions));

server.use(morgan("dev"));

server.use(express.json());

server.use("/", router);

export default server;
