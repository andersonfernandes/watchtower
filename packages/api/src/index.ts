import { api } from "./api";
import { initWebSocket } from "./websocket";

const port = 5000;
const server = api.listen(port, () =>
  console.log(`Listening on http://0.0.0.0:${port}`)
);

initWebSocket(server);
