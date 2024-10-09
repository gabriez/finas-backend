import { Router } from "express";
import { ProjectRoutes } from "./routes/projectRoutes";

const router = Router();

router.use("/projects", ProjectRoutes());

router.get("/", (req, res) => {
	res.json("hola");
});

export default router;
