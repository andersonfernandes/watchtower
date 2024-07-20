import { Request, Router } from "express";

import { healthRouter } from "./health";
import { usersRouter } from "./users";

export type RequestBody<T> = Request<{}, {}, T>;

const router = Router();

router.use("/health", healthRouter);
router.use("/users", usersRouter);

export default router;
