import { RequestAPI } from "./express";

export interface ReqLogin
	extends RequestAPI<{
		email: string;
		password: string;
	}> {}
