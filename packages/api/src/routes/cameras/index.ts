import express from "express";
import { createCamera } from "./create";
import { listCameras } from "./list";

const camerasRouter = express.Router();

camerasRouter.get("/", listCameras);
camerasRouter.post("/", createCamera);

export { camerasRouter };
