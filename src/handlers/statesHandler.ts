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
		const municipios = await axios.get(
			`${URL}/listadoMunicipio?token=&codEntidad=21`
		);
		res.status(200).json({
			status: true,
			message: "Los municipios se obtuvieron exitosamente",
			data: municipios,
		});
		return;
	} catch (error) {}
};
const parroquiaHandler = async (req: RequestParroquia, res: ResponseAPI) => {};
const sectorHandler = async (req: RequestSector, res: ResponseAPI) => {};

export { municipioHandler, parroquiaHandler, sectorHandler };
