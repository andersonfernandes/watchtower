import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { requireAuth } from "./middlewares/requireAuth";
import routes from "./routes";
import swaggerDocs from "./swagger/docs.json";

const api = express();

api.use(cors());
api.use(bodyParser.json());
api.use(requireAuth);

api.use("/api", routes);
api.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export { api };
