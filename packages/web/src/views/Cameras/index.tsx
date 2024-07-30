import useApi from "@/adapters/api/useApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Cameras() {
  const api = useApi();
  const { data: cameras } = useQuery({
    queryKey: ["cameras"],
    queryFn: async () => api.cameras.getCameras().then(({ data }) => data),
  });

  return (
    <>
      <h1>Watchtower - Cameras</h1>

      <main>
        {cameras?.map((camera) => (
          <Link key={camera.id} to={camera.id}>
            {camera.name}
          </Link>
        ))}
      </main>
    </>
  );
}
