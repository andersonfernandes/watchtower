import { Router } from "express";

import { areasRouter } from "./areas";
import { healthRouter } from "./health";
import { usersRouter } from "./users";

const router = Router();

router.use("/health", healthRouter);
router.use("/areas", areasRouter);
router.use("/users", usersRouter);

export default router;
