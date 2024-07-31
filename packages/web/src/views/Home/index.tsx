import Layout from "@/components/Layout";
import { Box, Button, Center } from "@mantine/core";
import { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/cameras");
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <Center my={"20%"}>
        <Box>
          <Button
            leftSection={<FaArrowRightToBracket />}
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Box>
      </Center>
    </Layout>
  );
}
