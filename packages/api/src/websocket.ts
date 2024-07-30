import { Server } from "http";
import { verify } from "jsonwebtoken";
import WebSocket from "ws";
import { db } from "./db";
import { env } from "./env";
import { logger } from "./utils/logger";

export const initWebSocket = (server: Server) => {
  const wsServer = new WebSocket.Server({ server });

  wsServer.on("connection", async (ws, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    const client = url.searchParams.get("client");

    if (!token || !["camera", "viewer"].includes(client)) {
      logger.debug({ token, client }, "[WebSocket] Invalid Params");
      return ws.close();
    }

    try {
      const decoded: any = verify(token, env.JWT_SECRET);
      const { cameraId } = decoded;

      const camera = await db("cameras").where("id", cameraId).first();

      if (!camera) {
        logger.error("[WebSocket] Invalid token. CameraId not found!");
        return ws.close();
      }

      let clientIp = req.socket.remoteAddress;
      const forwardedFor = req.headers["x-forwarded-for"];
      if (forwardedFor) {
        const forwardedIps = forwardedFor.toString().split(",");
        clientIp = forwardedIps[0].trim();
      }

      const userAgent = req.headers["user-agent"] || "";

      await db("camera_logs").insert({
        camera_id: cameraId,
        event_type: client === "camera" ? "camera_online" : "viewer_connected",
        event_at: new Date(),
        event_details: {
          client_ip: clientIp,
          user_agent: userAgent,
        },
      });

      logger.info(`[WebSocket] ${client} connected`);

      ws.on("message", (data) => {
        wsServer.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
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
            client_ip: clientIp,
            user_agent: userAgent,
          },
        });
      });

      ws.on("error", (err) => {
        logger.error(`[WebSocket] Error: ${err.message}`);
      });
    } catch (error) {
      logger.error("[WebSocket] Error:", error);
      ws.close;
    }
  });
};
