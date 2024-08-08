import useApi from "@/adapters/api/useApi";
import Layout from "@/components/Layout";
import { Anchor, Box, Breadcrumbs, Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Areas() {
  const api = useApi();
  const { data: areas, isLoading } = useQuery({
    queryKey: ["areas"],
    queryFn: async () => api.areas.getAreas().then(({ data }) => data),
  });

  return (
    <Layout isLoading={isLoading}>
      <Grid>
        <Grid.Col span={6}>
          <Breadcrumbs>
            <Anchor underline="never" component={Link} to="/areas">
              Areas
            </Anchor>
          </Breadcrumbs>
        </Grid.Col>
      </Grid>

      <Box my="md">
        {areas?.map((area) => (
          <Text key={area.id}>{area.name}</Text>
        ))}
      </Box>
    </Layout>
  );
}
