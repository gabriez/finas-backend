import path from "path";
import fs from "fs";
import Mustache from "mustache";
import Projects from "../models/Projects.model.js";
import Users from "../models/Users.model.js";
import { RequestAPI, ResponseAPI } from "../types/express";
import {
	ReqCreateProject,
	ReqGetOnlyProject,
	ReqPatchProject,
} from "../types/project";
import puppeteer from "puppeteer";
import dayjs from "dayjs";
import { parseNumber } from "../lib/helpers.js";

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
		// Destructure and parse query parameters with defaults
		let { skip = "0", limit = "100" } = req.query as {
			skip?: string;
			limit?: string;
		};

		const skipNum = parseNumber(skip, "Skip");
		const limitNum = parseNumber(limit, "Limit");

		const { rows: projects, count: total } = await Projects.findAndCountAll({
			limit: limitNum,
			offset: skipNum,
		});
		if (projects.length == 0) {
			res.status(200).json({
				status: false,
				message: "No hay proyectos",
			});
			return;
		}

		res.status(200).json({
			status: true,
			data: {
				count: total,
				projects,
			},
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

		if (project.dataValues.status === "Finalizado") {
			res.status(400).json({
				status: false,
				message: "No puede modificar un proyecto ya finalizado",
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

const GetStatus = async (req: RequestAPI, res: ResponseAPI) => {
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

const GetReportProject = async (req: ReqGetOnlyProject, res: ResponseAPI) => {
	try {
		const { id } = req.params;
		const project = await Projects.findByPk(id, {
			include: ["encargado"],
		});

		if (!project) {
			res.status(400).json({
				status: false,
				message: "El proyecto no existe",
			});
			return;
		}

		const pathTemplates = ["src", "templates"];
		const pathStylesEI = [...pathTemplates, "reporte-style.css"];
		const pathTemplateEI = [...pathTemplates, "reporte.html"];
		const templateEIFullpath = path.join(process.cwd(), ...pathTemplateEI);
		const stylesEIFullpath = path.join(process.cwd(), ...pathStylesEI);
		const templateEI = fs.readFileSync(templateEIFullpath, {
			encoding: "utf8",
		});

		let encargado = project.dataValues.encargado.dataValues;
		let dataValues = project.dataValues;
		const proyecto = {
			titulo: dataValues.titulo, // Ejemplo: "Proyecto A"
			ente: dataValues.ente, // Ejemplo: "Organización X"
			propuesta: dataValues.propuesta, // Ejemplo: "Propuesta de mejora"
			descripcion: dataValues.descripcion, // Ejemplo: "Descripción detallada del proyecto"
			municipio: dataValues.municipio, // Ejemplo: "Municipio Y"
			parroquia: dataValues.parroquia, // Ejemplo: "Parroquia Z"
			sector: dataValues.sector, // Ejemplo: "Sector 1"
			puntoDeReferencia: dataValues.puntoDeReferencia, // Ejemplo: "Cerca de la plaza principal"
			coordenadasLong: dataValues.coordenadasLong, // Ejemplo: "-66.9036"
			coordenadasLat: dataValues.coordenadasLat, // Ejemplo: "10.4806"
			anoAprob: dataValues.anoAprob.toString(), // Ejemplo: "2024"
			projectFuncionario: encargado.nombre + " " + encargado.apellido, // Ejemplo: "Juan Pérez"
			observacion: dataValues.observacion, // Ejemplo: "Observación inicial"
			lapsoInicio: dayjs(dataValues.lapsoInicio).format("DD/MM/YYYY"), // Ejemplo: "01/01/2024"
			lapsoFin: dayjs(dataValues.lapsoFin).format("DD/MM/YYYY"), // Ejemplo: "31/12/2024"
		};
		console.log(templateEIFullpath);
		console.log(stylesEIFullpath);

		// Rellenar el template de "Factura electrónica" con la data correspondiente
		const filledTemplateEI = Mustache.render(templateEI, proyecto);

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();

		// Setear el contenido del template de la factura electrónica
		await page.setContent(filledTemplateEI, { waitUntil: "domcontentloaded" });
		await page.addStyleTag({ path: stylesEIFullpath });

		// Generar PDF a partir de la página
		const pdfBuffer = await page.pdf({
			format: "A4",
			printBackground: true,
		});

		await browser.close();

		// Configura la respuesta para mostrar el PDF en el navegador
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", `inline; filename=factura_${id}.pdf`);
		res.send(pdfBuffer);
		return;
	} catch (error) {
		console.log("> error in template GetReportProject", error);
		res.status(422).json({
			status: false,
			message: "An unexpected error occurred. Please try again later.",
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
	GetReportProject,
};
