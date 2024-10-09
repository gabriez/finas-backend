import type { Query, ParamsDictionary, Send } from "express-serve-static-core";
import type { Request, Response } from "express";

export interface TypedResponse<ResBody> extends Response {
	json: Send<ResBody, this>;
}

export interface RequestAPI<T = {}, P = {}, Q = {}> extends Request {
	body: T;
	update?: boolean;
	params: P & ParamsDictionary;
	query: Q & Query;
}

export interface ResponseAPI<T = any>
	extends TypedResponse<{
		data?: T;
		status: boolean;
		message: string;
	}> {}
