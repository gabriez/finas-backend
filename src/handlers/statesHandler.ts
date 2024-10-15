import axios from "axios";
import {
	RequestAPI,
	RequestParroquia,
	RequestSector,
	ResponseAPI,
} from "../types/express";

const municipioHandler = async (req: RequestAPI, res: ResponseAPI) => {
	try {
		const URL = process.env.API_GOV;
		const { data } = await axios.get(
			`${URL}/listadoMunicipio?token=${req.token}&codEntidad=21`
		);
		console.log(data);
		res.status(200).json({
			status: true,
			message: "Los municipios se obtuvieron exitosamente",
			data: data.data,
		});
		return;
	} catch (error) {
		console.log("> error in getMunicipioHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};
const parroquiaHandler = async (req: RequestParroquia, res: ResponseAPI) => {
	try {
		const URL = process.env.API_GOV;
		const { codMunicipio } = req.query;
		const { data } = await axios.get(
			`${URL}/listadoParroquia?token=${req.token}&codEntidad=21&codMunicipio=${codMunicipio}`
		);
		console.log(data);
		res.status(200).json({
			status: true,
			message: "Las parroquias se obtuvieron exitosamente",
			data: data.data,
		});
		return;
	} catch (error) {
		console.log("> error in getParroquiaHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};
const sectorHandler = async (req: RequestSector, res: ResponseAPI) => {
	try {
		const URL = process.env.API_GOV;
		const { codMunicipio, codParroquia } = req.query;
		const { data } = await axios.get(
			`${URL}/listadoComunidad?token=${req.token}&codEntidad=21&codMunicipio=${codMunicipio}&codParroquia=${codParroquia}`
		);
		console.log(data);
		res.status(200).json({
			status: true,
			message: "Los sectores se obtuvieron exitosamente",
			data: data.data,
		});
		return;
	} catch (error) {
		console.log("> error in getSectorHandler", error);
		res.status(500).json({
			status: false,
			message:
				"Ocurrió un error inesperado, por favor vuelva  intentar más tarde.",
		});
		return;
	}
};

export { municipioHandler, parroquiaHandler, sectorHandler };
