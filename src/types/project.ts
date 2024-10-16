import { RequestAPI } from "./express";

export interface ReqCreateProject
	extends RequestAPI<{
		titulo: string;
		descripcion: string;
		encargadoId: number;
		userId: number;
		enteEmail: string;

		municipioId: string;
		municipio: string;
		parroquiaId: string;
		parroquia: string;
		sectorId: string;
		sector: string;
		puntoDeReferencia: string;
		coordenadasLat: string;
		coordenadasLong: string;
		anoAprob: number;
		poblacionBeneficiada: string;
		propuesta: string;
		status: string;
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

export interface ReqPatchProject
	extends RequestAPI<
		{
			titulo: string;
			descripcion: string;
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
			status: string;
			observacion: string;
			lapsoInicio: Date;
			lapsoFin: Date;
			ente: string;
			entePhone: string;
		},
		{
			id: number;
		}
	> {}

export interface ProjectsI {
	titulo: string;
	descripcion: string;
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
	status: string;
	observacion: string;
	lapsoInicio: Date;
	lapsoFin: Date;
	ente: string;
	entePhone: string;
	id: number;
	createdAt: string;
	updatedAt: string;
}
