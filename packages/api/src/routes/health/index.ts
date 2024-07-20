import express from "express";

const router = express.Router();

router.get("/", (_, response) => {
  response.status(200).json({});
});

export default router;
