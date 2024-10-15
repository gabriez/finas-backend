import { Router } from "express";
import { ProjectRoutes } from "./routes/projectRoutes.js";
import { RequestAPI, ResponseAPI } from "./types/express";
import { UsersRoutes } from "./routes/usersRoutes.js";
import { AuthRoutes } from "./routes/authRoutes.js";
import { StatesRoutes } from "./routes/statesRoutes.js";
import CacheStatesMiddleware from "./middlewares/statesMiddleware.js";

const router = Router();

router.use("/api/users", UsersRoutes());
router.use("/api/projects", ProjectRoutes());
router.use("/api/authentication", AuthRoutes());
router.use("/api/states", CacheStatesMiddleware, StatesRoutes());

router.get("/*", (req: RequestAPI, res: ResponseAPI) => {
	res.status(200).json({
		message: "Server up and running!",
		status: true,
	});
});

export default router;
