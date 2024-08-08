import { Link } from "react-router-dom";
import type { Camera } from "@watchtower-api/types";
import { Badge, Box, Center, Grid, Text, useMantineTheme } from "@mantine/core";
import CameraStatusBadge from "../CameraStatusBadge";

export default function CameraItem({ camera }: { camera: Camera }) {
  const theme = useMantineTheme();

  return (
    <Box
      component={Link}
      to={camera.id}
      w="100%"
      p="lg"
      style={{
        flex: 1,
        textDecoration: "none",
        backgroundColor: theme.colors.dark[6],
        color: theme.colors.gray[0],
        display: "block",
        borderRadius: "8px",
      }}
    >
      <Grid>
        <Grid.Col span={7}>
          <Text>{camera.name}</Text>
        </Grid.Col>

        <Grid.Col span={5}>
          <CameraStatusBadge key={camera.id} status={camera.status} />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
