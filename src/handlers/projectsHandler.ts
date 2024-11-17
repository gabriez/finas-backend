import Projects from "../models/Projects.model.js";
import Users from "../models/Users.model.js";
import { RequestAPI, ResponseAPI } from "../types/express";
import {
	ReqCreateProject,
	ReqGetOnlyProject,
	ReqPatchProject,
} from "../types/project";

const status = ["Paralizado", "Inconcluso", "En Ejecución", "Finalizado"];

const CreateProjectHandler = async (
	req: ReqCreateProject,
	res: ResponseAPI
) => {
	let body = req.body;
	console.log(body.status);
	if (!status.includes(body.status)) {
		res.status(400).json({
			status: false,
			message: "El estatus no existe",
		});
		return;
	}

	try {
		let project = new Projects(body);
		let resultProject = await project.save();

		res.status(200).json({
			status: true,
			message: "Proyecto creado",
			data: resultProject,
		});
		return;
	} catch (error) {
		console.log("> error in CreateProjectHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

const GetOnlyProjectHandler = async (
	req: ReqGetOnlyProject,
	res: ResponseAPI
) => {
	try {
		const { id } = req.params;
		const project = await Projects.findByPk(id);

		if (!project) {
			res.status(400).json({
				status: false,
				message: "El proyecto no existe",
			});
			return;
		}

		res.status(200).json({
			status: true,
			data: project,
			message: "Exito",
		});
		return;
	} catch (error) {
		console.log("> error in GetOnlyProjectHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

const GetProjects = async (req: RequestAPI, res: ResponseAPI) => {
	try {
		const projects = await Projects.findAll();

		if (projects.length == 0) {
			res.status(200).json({
				status: false,
				message: "No hay proyectos",
			});
			return;
		}

		res.status(200).json({
			status: true,
			data: projects,
			message: "Exito",
		});
		return;
	} catch (error) {
		console.log("> error in GetOnlyProjectHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

const DeleteProject = async (req: ReqGetOnlyProject, res: ResponseAPI) => {
	try {
		const { id } = req.params;
		const project = await Projects.findByPk(id);

		if (!project) {
			res.status(400).json({
				status: false,
				message: "El proyecto no existe",
			});
			return;
		}

		await project.destroy();

		res.status(200).json({
			status: true,
			message: "Proyecto eliminado exitosamente",
		});
		return;
	} catch (error) {
		console.log("> error in GetOnlyProjectHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

const PatchProject = async (req: ReqPatchProject, res: ResponseAPI) => {
	try {
		const { id } = req.params;
		const { body } = req;
		if (!status.includes(body.status)) {
			res.status(400).json({
				status: false,
				message: "El estatus no existe",
			});
			return;
		}
		let project = await Projects.findByPk(id);

		if (!project) {
			res.status(400).json({
				status: false,
				message: "El proyecto no existe",
			});
			return;
		}

		project = await project.update(req.body);

		res.status(200).json({
			status: true,
			data: project,
			message: "Exito actualizando",
		});
		return;
	} catch (error) {
		console.log("> error in PatchProject", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

const GetStatus = async (req: ReqGetOnlyProject, res: ResponseAPI) => {
	res.status(200).json({
		status: true,
		data: status,
		message: "Exito",
	});
	return;
};

const GetStatistics = async (req: RequestAPI, res: ResponseAPI) => {
	try {
		const projects = await Projects.findAll({
			order: [["updatedAt", "DESC"]],
			include: ["encargado"],
		});

		if (projects.length == 0) {
			res.status(400).json({
				status: false,
				message: "No hay proyectos",
			});
			return;
		}

		let municipiosData = {};
		let projectsFinalized = {
			enero: { mes: "enero", finalizados: 0 },
			febrero: { mes: "febrero", finalizados: 0 },
			marzo: { mes: "marzo", finalizados: 0 },
			abril: { mes: "abril", finalizados: 0 },
			mayo: { mes: "mayo", finalizados: 0 },
			junio: { mes: "junio", finalizados: 0 },
			julio: { mes: "julio", finalizados: 0 },
			agosto: { mes: "agosto", finalizados: 0 },
			septiembre: { mes: "septiembre", finalizados: 0 },
			octubre: { mes: "octubre", finalizados: 0 },
			noviembre: { mes: "noviembre", finalizados: 0 },
			diciembre: { mes: "diciembre", finalizados: 0 },
		};
		let encargadosProjects = {};
		let totalProjects = projects.length;

		for (let project of projects) {
			let monthNumber = new Date(project.dataValues.updatedAt);

			let month = monthNumber.toLocaleString("es-ES", { month: "long" });

			if (
				projectsFinalized[month] &&
				project.dataValues.status == "Finalizado"
			) {
				projectsFinalized[month].finalizados += 1;
			} else if (project.dataValues.status == "Finalizado") {
				projectsFinalized[month] = { mes: month, finalizados: 1 };
			}

			let encargado = project.dataValues.encargado.dataValues;
			let encargadoId = project.dataValues.encargadoId;

			if (encargadosProjects[encargadoId]) {
				encargadosProjects[encargadoId].value += 1;
				encargadosProjects[encargadoId].chartValue =
					(encargadosProjects[encargadoId].value / totalProjects) * 100;
			} else {
				encargadosProjects[encargadoId] = {
					value: 1,
					name: encargado.nombre + " " + encargado.apellido,
					chartValue: (1 / totalProjects) * 100,
				};
			}

			let municipio = project.dataValues.municipio;

			if (municipiosData[municipio]) {
				municipiosData[municipio].value += 1;
				municipiosData[municipio].chartValue =
					(municipiosData[municipio].value / totalProjects) * 100;

				continue;
			}
			municipiosData[municipio] = {
				name: municipio,
				value: 1,
				chartValue: (1 / totalProjects) * 100,
			};
		}
		municipiosData = Object.values(municipiosData).sort((a: any, b: any) => {
			return b.value - a.value;
		});

		encargadosProjects = Object.values(encargadosProjects).sort(
			(a: any, b: any) => {
				return b.value - a.value;
			}
		);

		const statistics = {
			municipiosData: municipiosData,
			projectsFinalized: Object.values(projectsFinalized),
			encargadosProjects: encargadosProjects,
		};

		res.status(200).json({
			status: true,
			data: statistics,
			message: "Exito",
		});
		return;
	} catch (error) {
		console.log("> error in GetStatistics", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

export {
	CreateProjectHandler,
	GetOnlyProjectHandler,
	GetStatus,
	DeleteProject,
	GetProjects,
	PatchProject,
	GetStatistics,
};
