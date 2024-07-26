import express from "express";
import { createArea } from "./create";
import { listAreas } from "./list";

const areasRouter = express.Router();

areasRouter.get("/", listAreas);
areasRouter.post("/", createArea);

export { areasRouter };
