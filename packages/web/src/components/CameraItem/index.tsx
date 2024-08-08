import { Link } from "react-router-dom";
import type { Camera } from "@watchtower-api/types";
import { Badge, Box, Center, Grid, Text, useMantineTheme } from "@mantine/core";

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
        <Grid.Col span={8}>
          <Text>{camera.name}</Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Center>
            <Badge p={12} color={theme.colors.dark[7]}>
              {camera.status}
            </Badge>
          </Center>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
