import { RequestAPI } from "./express";

export interface ReqCreateProject
	extends RequestAPI<{
		nombre: string;
		descripcion: string;
		ubicacion: string;
	}> {}

export interface ReqGetOnlyProject
	extends RequestAPI<
		{},
		{
			id: number;
		}
	> {}
