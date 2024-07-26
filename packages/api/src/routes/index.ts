import { Router } from "express";

import { areasRouter } from "./areas";
import { camerasRouter } from "./cameras";
import { healthRouter } from "./health";
import { usersRouter } from "./users";

const router = Router();

router.use("/health", healthRouter);
router.use(
  // #swagger.tags = ['Areas']
  // #swagger.security = [{ "bearerAuth": [] }]
  "/areas",
  areasRouter
);
router.use(
  // #swagger.tags = ['Cameras']
  // #swagger.security = [{ "bearerAuth": [] }]
  "/cameras",
  camerasRouter
);
router.use("/users", usersRouter);

export default router;
