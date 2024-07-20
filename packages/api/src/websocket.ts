import { Express } from "express";
import http from "http";
import jwt from "jsonwebtoken";
import WebSocket from "ws";

export const initWebSocket = (app: Express) => {
  const wsServer = new WebSocket.Server({ server: http.createServer(app) });

  wsServer.on("connection", (ws, req) => {
    const token = req.url.split("token=")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        ws.close();
        return;
      }

      // const cameraId = decoded.cameraId;

      try {
        // const result = await pool.query(
        //   "SELECT * FROM cameras WHERE id = $1 AND user_id = $2",
        //   [cameraId, decoded.userId]
        // );
        // if (result.rows.length === 0) {
        //   ws.close();
        //   return;
        // }
      } catch (err) {
        console.error(err);
        ws.close();
        return;
      }

      ws.on("message", (message) => {
        // Broadcast the received frame to all connected clients
        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    });
  });
};
