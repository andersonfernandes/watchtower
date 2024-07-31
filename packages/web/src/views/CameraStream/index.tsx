import useApi from "@/adapters/api/useApi";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

export default function CameraStream() {
  const videoRef = useRef<HTMLImageElement>(null);
  const [socketUrl, setSocketUrl] = useState<string>("");
  const { id } = useParams();
  const api = useApi();
  const { data: camera, isLoading } = useQuery({
    queryKey: ["camera"],
    queryFn: async () => {
      if (!id) return Promise.resolve();

      return api.cameras.getCamera(id).then(({ data }) => {
        setSocketUrl(`${import.meta.env.VITE_WS_URL}&token=${data.token}`);
        return data;
      });
    },
  });

  const getSocketUrl = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      resolve(socketUrl);
    });
  }, [socketUrl]);

  const { getWebSocket } = useWebSocket(getSocketUrl, {
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
    <Layout isLoading={isLoading}>
      <h1>{`${camera?.name} Stream`}</h1>

      <main>
        <img
          src="https://placehold.co/500x300?text=Loading..."
          ref={videoRef}
          alt="Stream"
          style={{ width: 500 }}
        />
      </main>
    </Layout>
  );
}
