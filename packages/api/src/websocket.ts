import { Server } from "http";
import { verify } from "jsonwebtoken";
import WebSocket from "ws";
import { db } from "./db";
import { env } from "./env";

export const initWebSocket = (server: Server) => {
  const wsServer = new WebSocket.Server({ server });

  wsServer.on("connection", async (ws, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    const client = url.searchParams.get("client");

    if (!["camera", "viewer"].includes(client)) {
      console.error("Invalid client identifier");
      return ws.close();
    }

    try {
      const decoded: any = verify(token, env.JWT_SECRET);
      const { cameraId } = decoded;

      const camera = await db("cameras").where("id", cameraId).first();

      if (!camera) {
        console.error("Invalid token. CameraId not found!");
        return ws.close();
      }

      await db("camera_logs").insert({
        camera_id: cameraId,
        event_type: client === "camera" ? "camera_online" : "viewer_connected",
        event_at: new Date(),
        event_details: {
          client_ip: req.socket.remoteAddress,
          user_agent: req.headers["user-agent"] || "",
        },
      });

      ws.on("message", (data) => {
        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });

      ws.on("close", async () => {
        await db("camera_logs").insert({
          camera_id: cameraId,
          event_type:
            client === "camera" ? "camera_offline" : "viewer_disconnected",
          event_at: new Date(),
          event_details: {
            client_ip: req.socket.remoteAddress,
            user_agent: req.headers["user-agent"] || "",
          },
        });
      });

      ws.on("error", (err) => {
        console.error(`WebSocket Error: ${err.message}`);
      });
    } catch (error) {
      console.error(error);
      ws.close;
    }
  });
};
