import type { Query, ParamsDictionary, Send } from "express-serve-static-core";
import type { Request, Response } from "express";
import Users from "../models/Users.model";

export interface TypedResponse<ResBody> extends Response {
	json: Send<ResBody, this>;
}

export interface RequestAPI<T = {}, P = {}, Q = {}> extends Request {
	body: T;
	update?: boolean;
	user?: Users | null;
	params: P & ParamsDictionary;
	query: Q & Query;
}

export interface ResponseAPI<T = any>
	extends TypedResponse<{
		data?: T;
		status: boolean;
		message: string;
	}> {}

export interface RequestParroquia
	extends RequestAPI<
		{},
		{},
		{
			codMunicipio: string;
		}
	> {}

export interface RequestSector
	extends RequestAPI<
		{},
		{},
		{
			codMunicipio: string;
			codParroquia: string;
		}
	> {}
