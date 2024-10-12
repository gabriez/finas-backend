import { RequestAPI } from "./express";

export interface ReqCreateProject
	extends RequestAPI<{
		titulo: string;
		descripcion: string;
		ubicacion: string;
		encargadoId: number;
		userId: number;
		enteEmail: string;
		estadoId: number;
		estado: string;
		municipioId: number;
		municipio: string;
		parroquiaId: number;
		parroquia: string;
		sectorId: number;
		sector: string;
		puntoDeReferencia: string;
		coordenadasLat: string;
		coordenadasLong: string;
		anoAprob: number;
		poblacionBeneficiada: string;
		propuesta: string;
		statusId: number;
		observacion: string;
		lapsoInicio: Date;
		lapsoFin: Date;
		ente: string;
		entePhone: string;
	}> {}

export interface ReqGetOnlyProject
	extends RequestAPI<
		{},
		{
			id: number;
		}
	> {}
