import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => console.log(`Listening on http://0.0.0.0:${port}`));
