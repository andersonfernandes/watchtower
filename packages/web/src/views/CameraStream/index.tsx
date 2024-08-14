import useApi from "@/adapters/api/useApi";
import Layout from "@/components/Layout";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Grid,
  Image,
  Loader,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

export default function CameraStream() {
  const streamRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState<boolean>(false);
  const [ledOn, setLedOn] = useState<boolean>(false);
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

  const { getWebSocket, sendJsonMessage } = useWebSocket(getSocketUrl, {
    onOpen: () => {
      console.debug("WebSocket connection established.");
    },
    onMessage: (event) => {
      setActive(true);

      const blob = new Blob([event.data], { type: "image/jpeg" });

      if (streamRef.current && blob.size !== 0) {
        const url = URL.createObjectURL(blob);
        streamRef.current.src = url;
        streamRef.current.onload = () => URL.revokeObjectURL(url);
      }
    },
  });

  useEffect(() => {
    return () => {
      getWebSocket()?.close();
    };
  }, []);

  const toggleLed = () => {
    sendJsonMessage({ led: !ledOn ? "on" : "off" });
    setLedOn((prev) => !prev);
  };

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

      <Center my="md">
        {!active && <Loader />}
        {active && (
          <Box>
            <Image w={{ sm: 500, md: "auto" }} radius="md" ref={streamRef} />
            <Button variant="transparent" onClick={toggleLed}>
              {ledOn && <FaLightbulb />}
              {!ledOn && <FaRegLightbulb />}
            </Button>
          </Box>
        )}
      </Center>
    </Layout>
  );
}
