import useApi from "@/adapters/api/useApi";
import type { Camera } from "@watchtower-api/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

export default function CameraStream() {
  const videoRef = useRef<HTMLImageElement>(null);
  const [socketUrl, setSocketUrl] = useState(import.meta.env.VITE_WS_URL);
  const [camera, setCamera] = useState<Camera>(null);
  const { id } = useParams();
  const api = useApi();

  useEffect(() => {
    if (id) {
      api.cameras.getCamera(id).then(({ success, data }) => {
        if (success) {
          setCamera(data);
          setSocketUrl(`${import.meta.env.VITE_WS_URL}&token=${data.token}`);
        }
      });
    }
  }, [id]);

  const { getWebSocket } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.debug("WebSocket connection established.");
    },
    onMessage: (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      if (videoRef.current) {
        videoRef.current.src = url;
      }
    },
  });

  useEffect(() => {
    return () => {
      getWebSocket()?.close();
    };
  }, []);

  return (
    <>
      <h1>Watchtower - Camera Stream</h1>

      <main>
        <img
          src="https://placehold.co/500x300?text=Loading..."
          ref={videoRef}
          alt="Stream"
          style={{ width: 500 }}
        />
      </main>
    </>
  );
}
