import Projects from "../models/Projects.model.js";
import Roles from "../models/Roles.model.js";
import Users from "../models/Users.model.js";
import { RequestAPI } from "./express";
import { ProjectsI } from "./project";
import { RolesI, UserI } from "./users";

export interface ReqImportData
	extends RequestAPI<
		{ projects: Projects[] | any; roles: Roles[] | any; users: Users[] | any },
		{}
	> {}
