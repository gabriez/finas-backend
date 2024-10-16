import Projects from "../models/Projects.model.js";
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
			order: [["createdAt", "DESC"]],
		});

		if (projects.length == 0) {
			res.status(400).json({
				status: false,
				message: "No hay proyectos",
			});
			return;
		}

		const statistics = {
			finalized: 0,
			inProgress: 0,
			stopped: 0,
			notFinished: 0,
			lastProject: "",
			moreProjectsSector: "",
			moreProjectsSectorCount: 0,
			secondProjectsSector: "",
			secondMoreProjectsSectorCount: 0,
			restProjectsCount: 0,
		};

		statistics.lastProject = projects[0].dataValues.titulo;

		projects.forEach((project) => {
			if (project.dataValues.status == "Finalizado") statistics.finalized++;
			if (project.dataValues.status == "Inconcluso") statistics.notFinished++;
			if (project.dataValues.status == "En Ejecución") statistics.inProgress++;
			if (project.dataValues.status == "Paralizado") statistics.stopped++;
		});
		let projectMap = new Map();
		for (let project of projects) {
			let key = project.dataValues.sector;
			let value = projectMap.get(project.dataValues.sector);
			if (value) {
				value++;
			} else {
				value = 1;
			}
			projectMap.set(key, value);
		}

		for (let [value, key] of projectMap.entries()) {
			if (value > statistics.moreProjectsSectorCount) {
				statistics.secondMoreProjectsSectorCount =
					statistics.moreProjectsSectorCount;
				statistics.secondProjectsSector = statistics.moreProjectsSector;
				statistics.moreProjectsSectorCount = value;
				statistics.moreProjectsSector = key;
			}
			statistics.restProjectsCount += value;
		}

		statistics.restProjectsCount -=
			statistics.secondMoreProjectsSectorCount +
			statistics.moreProjectsSectorCount;

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
