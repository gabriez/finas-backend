import Projects from "../models/Projects.model";
import { ResponseAPI } from "../types/express";
import { ReqCreateProject, ReqGetOnlyProject } from "../types/project";

const CreateProjectHandler = async (
	req: ReqCreateProject,
	res: ResponseAPI
) => {
	let body = req.body;
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
				message: "El producto no existe",
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

export { CreateProjectHandler, GetOnlyProjectHandler };
