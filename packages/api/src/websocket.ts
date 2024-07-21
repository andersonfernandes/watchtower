import { Server } from "http";
import WebSocket from "ws";

export const initWebSocket = (server: Server) => {
  const wsServer = new WebSocket.Server({ server });

  wsServer.on("connection", (ws, req) => {
    const token = req.url.split("token=")[1];
    // TODO: Token validation

    ws.on("message", (data) => {
      wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    ws.on("error", (err) => {
      console.error(`WebSocket Error: ${err.message}`);
    });
  });
};
