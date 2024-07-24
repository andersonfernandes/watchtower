import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", (_, response) => {
  response.status(200).json({});
});

export { healthRouter };
