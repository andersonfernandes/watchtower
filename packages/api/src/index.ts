import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerDocs from "./swagger/docs.json";
import { initWebSocketServer } from "./websocket";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

initWebSocketServer(app);

app.listen(port, () => console.log(`Listening on http://0.0.0.0:${port}`));
