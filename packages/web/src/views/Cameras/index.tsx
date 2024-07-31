import useApi from "@/adapters/api/useApi";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Cameras() {
  const api = useApi();
  const { data: cameras, isLoading } = useQuery({
    queryKey: ["cameras"],
    queryFn: async () => api.cameras.getCameras().then(({ data }) => data),
  });

  return (
    <Layout isLoading={isLoading}>
      <h1>Cameras</h1>

      <main>
        {cameras?.map((camera) => (
          <Link key={camera.id} to={camera.id}>
            {camera.name}
          </Link>
        ))}
      </main>
    </Layout>
  );
}
