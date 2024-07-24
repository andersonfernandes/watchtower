import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

export default function Cameras() {
  const videoRef = useRef<HTMLImageElement>(null);

  const { getWebSocket } = useWebSocket("ws://localhost:5000?token=testing", {
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
      <h1>Watchtower - Cameras</h1>

      <main>
        <img
          src="https://via.placeholder.com/500x300?text=Loading..."
          ref={videoRef}
          alt="Stream"
          style={{ width: 500 }}
        />
      </main>
    </>
  );
}
