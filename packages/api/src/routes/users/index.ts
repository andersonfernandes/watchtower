import express from "express";
import { createUser } from "./create";

const usersRouter = express.Router();

usersRouter.post("/", createUser);

export { usersRouter };
