import express from "express";
import { listCameras } from "./list";

const camerasRouter = express.Router();

camerasRouter.get("/", listCameras);

export { camerasRouter };
