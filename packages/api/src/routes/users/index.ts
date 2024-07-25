import express from "express";
import { createUser } from "./create";
import { userLogin } from "./login";

const usersRouter = express.Router();

usersRouter.post("/", createUser);
usersRouter.post("/login", userLogin);

export { usersRouter };
