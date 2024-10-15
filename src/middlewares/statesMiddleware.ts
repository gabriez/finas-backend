import { NextFunction } from "express";
import { RequestAPI, ResponseAPI } from "../types/express";
import cache from "memory-cache";
import axios from "axios";
import qs from "qs";
import { header } from "express-validator";

const CacheStatesMiddleware = async (
	req: RequestAPI,
	res: ResponseAPI,
	next: NextFunction
) => {
	const cachedData = cache.get("cachedData");
	console.log(cachedData);

	if (cachedData) {
		// Return cached data
		console.log(cachedData);
		req.token = cachedData;

		next();
		return;
	}

	try {
		let login = {
			usuario: process.env.USER_API,
			clave: process.env.PASSWORD,
		};
		const URL = process.env.API_GOV;
		console.log(login, qs.stringify(login));

		const { data } = await axios.post(`${URL}/login`, qs.stringify(login), {
			...header,
		});

		console.log(data);

		req.token = data.token;
		cache.put(
			"cachedData",
			data.token,
			data.data.expiry_time - data.data.broadcast_time
		);

		next();
	} catch (err) {
		console.log("verifyToken error:", String(err));
		res.status(500).json({
			status: false,
			message: "Error interno del servidor. Vuelva a intentar nuevamente",
		});
		return;
	}

	// Fetch data from the database or external API

	// Cache the data for future use
	// cache.put("cachedData", newData, 10 * 60 * 1000); // Cache for 10 minutes
};

export default CacheStatesMiddleware;
