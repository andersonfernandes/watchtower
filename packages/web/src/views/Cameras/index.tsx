import useApi from "@/adapters/api/useApi";
import type { Camera } from "@watchtower-api/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
          <Link key={camera.id} to={camera.id}>
            {camera.name}
          </Link>
        ))}
      </main>
    </>
  );
}
