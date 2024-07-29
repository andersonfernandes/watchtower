import useApi from "@/adapters/api/useApi";
import type { Camera } from "@watchtower-api/types";
import { useEffect, useState } from "react";

export default function Cameras() {
  const [loading, setLoading] = useState(false);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const api = useApi();

  useEffect(() => {
    if (!loading) {
      setLoading(true);

      api.cameras
        .getCameras()
        .then(({ success, data }) => {
          if (success) {
            setCameras(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      <h1>Watchtower - Cameras</h1>

      <main>
        {cameras.map((camera) => (
          <h2 key={camera.id}>{camera.name}</h2>
        ))}
      </main>
    </>
  );
}
