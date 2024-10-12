import { RequestAPI } from "./express";

export interface ReqCreateUser extends RequestAPI<{}> {}

export interface ReqGetOneUser
	extends RequestAPI<
		{},
		{
			id: number;
		}
	> {}
