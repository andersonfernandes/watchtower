import useApi from "@/hooks/useApi";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

export default function CameraStream() {
  const videoRef = useRef<HTMLImageElement>(null);

  const { getWebSocket } = useWebSocket(
    "ws://localhost:5000?token=testing&client=viewer",
    {
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
    }
  );

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
