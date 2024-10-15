import { RequestAPI } from "./express";

export interface ReqCreateUser
	extends RequestAPI<{
		username: string;
		nombre: string;
		apellido: string;
		email: string;
		password: string;
		phone?: string;
		cedula?: string;
		roleId: number;
	}> {}

export interface ReqUpdateUser
	extends RequestAPI<
		{
			username: string;
			nombre: string;
			apellido: string;
			email: string;
			password: string;
			phone?: string;
			cedula?: string;
			roleId: number;
		},
		{ id: number }
	> {}

export interface ReqGetOneUser
	extends RequestAPI<
		{},
		{
			id: number;
		}
	> {}

export interface ReqGetUsers
	extends RequestAPI<
		{},
		{},
		{
			rol: "encargado" | "all";
		}
	> {}

export interface UserI {
	id: number;
	username: string;
	nombre: string;
	apellido: string;
	email: string;
	password: string;
	phone?: string;
	cedula?: string;
	roleId: number;
	createdAt: string;
	updatedAt: string;
}

export interface RolesI {
	id: number;
	rol: string;
	createdAt: string;
	updatedAt: string;
}
