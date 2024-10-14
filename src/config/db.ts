import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Projects from "../models/Projects.model";
import Users from "../models/Users.model";
import Roles from "../models/Roles.model";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename);

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
	models: [join(__dirname, "../models/*")],
});

db.addModels([Projects, Users, Roles]);

export default db;
