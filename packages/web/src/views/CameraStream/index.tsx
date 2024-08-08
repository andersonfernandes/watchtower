import useApi from "@/adapters/api/useApi";
import Layout from "@/components/Layout";
import { Anchor, Box, Breadcrumbs, Grid, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

export default function CameraStream() {
  const streamRef = useRef<HTMLImageElement>(null);
  const [socketUrl, setSocketUrl] = useState<string>("");
  const { id } = useParams();
  const api = useApi();
  const { data: camera, isLoading } = useQuery({
    queryKey: ["camera"],
    queryFn: async () => {
      if (!id) return Promise.resolve();

      return api.cameras.getCamera(id).then(({ data }) => {
        setSocketUrl(`${import.meta.env.VITE_WS_URL}&token=${data.token}`);
        return data;
      });
    },
  });

  const getSocketUrl = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      resolve(socketUrl);
    });
  }, [socketUrl]);

  const { getWebSocket } = useWebSocket(getSocketUrl, {
    onOpen: () => {
      console.debug("WebSocket connection established.");
    },
    onMessage: (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      if (streamRef.current) {
        streamRef.current.src = url;
      }
    },
  });

  useEffect(() => {
    return () => {
      getWebSocket()?.close();
    };
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <Grid>
        <Grid.Col span={6}>
          <Breadcrumbs>
            <Anchor underline="never" component={Link} to="/cameras">
              Cameras
            </Anchor>

            <Anchor
              underline="never"
              component={Link}
              to={`/cameras/${camera?.id}`}
            >
              {camera?.name}
            </Anchor>
          </Breadcrumbs>
        </Grid.Col>
      </Grid>

      <Box my="md">
        <Image
          w={500}
          radius="md"
          ref={streamRef}
          fallbackSrc="https://placehold.co/500x300?text=Loading..."
        />
      </Box>
    </Layout>
  );
}
