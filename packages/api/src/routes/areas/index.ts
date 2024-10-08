import express from "express";
import { createArea } from "./create";
import { deleteArea } from "./delete";
import { listAreas } from "./list";

const areasRouter = express.Router();

// TODO: Add Update
areasRouter.delete("/:id", deleteArea);
areasRouter.post("/", createArea);
areasRouter.get("/", listAreas);

export { areasRouter };
