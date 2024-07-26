import express from "express";
import { userLogin } from "./login";

const usersRouter = express.Router();

usersRouter.post("/login", userLogin);

export { usersRouter };
