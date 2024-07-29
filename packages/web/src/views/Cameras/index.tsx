import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";

export default function Cameras() {
  // TODO: Shared type from the API to response and model
  const [loading, setLoading] = useState(false);
  const [cameras, setCameras] = useState([]);
  const api = useApi();

  useEffect(() => {
    if (!loading) {
      setLoading(true);

      api
        .get("/cameras")
        .then(({ data: responseData }) => {
          if (responseData.success) {
            setCameras(responseData.data);
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
