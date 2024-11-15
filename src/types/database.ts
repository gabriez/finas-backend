import Projects from "../models/Projects.model.js";
import Roles from "../models/Roles.model.js";
import Users from "../models/Users.model.js";
import { RequestAPI } from "./express";
import { ProjectsI } from "./project";
import { RolesI, UserI } from "./users";

export interface ReqImportData
	extends RequestAPI<
		{
			email: string;
			password: string;
			projects: Projects[] | any;
			users: Users[] | any;
		},
		{}
	> {}

export interface ReqExport
	extends RequestAPI<{
		email: string;
		password: string;
	}> {}
