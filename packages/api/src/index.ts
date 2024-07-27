import { api } from "./api";
import { generateDocs } from "./swagger/generator";
import { initWebSocket } from "./websocket";

generateDocs();

const port = 5000;
const server = api.listen(port, () =>
  console.log(`Listening on http://0.0.0.0:${port}`)
);

initWebSocket(server);
