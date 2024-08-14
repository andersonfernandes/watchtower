import { Server } from "http";
import { verify } from "jsonwebtoken";
import WebSocket, { RawData } from "ws";
import { db } from "./db";
import { env } from "./env";
import { logger } from "./utils/logger";

const MAX_BUFFER_SIZE = 120;
const clients = new Map<string, WebSocket[]>();
const cameras = new Map<string, WebSocket>();
const buffers = new Map<string, RawData[]>();

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

      const connectedAt = new Date();
      await db("camera_logs").insert({
        camera_id: cameraId,
        event_type: client === "camera" ? "camera_online" : "viewer_connected",
        event_at: connectedAt,
        event_details: {
          client_ip: clientIp,
          user_agent: userAgent,
        },
      });

      if (client === "camera") {
        await db("cameras")
          .where("id", camera.id)
          .update({ status: "active", connected_at: connectedAt });
      }

      if (!clients.has(camera.id)) {
        clients.set(camera.id, []);
      }

      if (!buffers.has(camera.id)) {
        buffers.set(camera.id, []);
      }

      if (client === "viewer") {
        clients.get(camera.id).push(ws);
      } else {
        cameras.set(camera.id, ws);
      }

      logger.info(
        `[WebSocket] ${client} connected at ${camera.name} (${camera.id})`
      );

      ws.on("message", (data) => {
        if (client === "camera") {
          const buffer = buffers.get(camera.id);
          if (buffer.length >= MAX_BUFFER_SIZE) {
            buffer.shift();
          }

          buffer.push(data);
        } else {
          const cameraWs = cameras.get(camera.id);
          if (cameraWs.readyState === WebSocket.OPEN) {
            cameraWs.send(data);
          }
        }
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

        if (client === "camera") {
          await db("cameras")
            .where("id", camera.id)
            .update({ status: "inactive" });
        }

        logger.info(
          `[WebSocket] ${client} disconnected at ${camera.name} (${camera.id})`
        );

        clients.delete(camera.id);
      });

      ws.on("error", (err) => {
        logger.error(`[WebSocket] Error: ${err.message}`);
      });
    } catch (error) {
      logger.error("[WebSocket] Error:", error);
      ws.close;
    }
  });

  setInterval(() => {
    buffers.forEach((buffer, cameraId) => {
      const wsClients = clients.get(cameraId);

      if (wsClients) {
        for (let ws of wsClients) {
          if (ws.readyState === WebSocket.OPEN) {
            const frame = buffer.shift();
            ws.send(frame);
          }
        }
      }
    });
  }, 1000 / 30);
};
