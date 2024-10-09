import express from "express";
import colors from "colors";

import router from "./routes";
import db from "./config/db";

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

const server = express();

server.use(express.json());

server.use("/", router);

export default server;
