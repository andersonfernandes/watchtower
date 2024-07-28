import { api } from "./api";
import { generateDocs } from "./swagger/generator";
import { logger } from "./utils/logger";
import { initWebSocket } from "./websocket";

generateDocs();

const port = 5000;
const server = api.listen(port, () =>
  logger.info(`Listening on http://0.0.0.0:${port}`)
);

initWebSocket(server);
