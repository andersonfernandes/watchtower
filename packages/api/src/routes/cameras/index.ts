import express from "express";
import { createCamera } from "./create";
import { deleteCamera } from "./delete";
import { getCamera } from "./get";
import { listCameras } from "./list";

const camerasRouter = express.Router();

camerasRouter.get("/:id", getCamera);
camerasRouter.delete("/:id", deleteCamera);
camerasRouter.get("/", listCameras);
camerasRouter.post("/", createCamera);

export { camerasRouter };
