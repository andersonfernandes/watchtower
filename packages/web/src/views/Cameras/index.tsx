import useApi from "@/adapters/api/useApi";
import CameraItem from "@/components/CameraItem";
import Layout from "@/components/Layout";
import { Anchor, Box, Breadcrumbs, Grid } from "@mantine/core";
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
      <Grid>
        <Grid.Col span={6}>
          <Breadcrumbs>
            <Anchor underline="never" component={Link} to="/cameras">
              Cameras
            </Anchor>
          </Breadcrumbs>
        </Grid.Col>
      </Grid>

      <Box my="md">
        {cameras?.map((camera) => (
          <CameraItem key={camera.id} camera={camera} />
        ))}
      </Box>
    </Layout>
  );
}
