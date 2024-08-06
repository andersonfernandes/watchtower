import useApi from "@/adapters/api/useApi";
import Layout from "@/components/Layout";
import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import type { UserLoginRequest } from "@watchtower-api/types";
import { useEffect, useState, type FormEvent } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const api = useApi();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: UserLoginRequest) =>
      api.users.login({ username, password }).then(({ data }) => data),
    onSuccess: async (data) => {
      signIn({
        auth: {
          token: data.token,
          type: "Bearer",
        },
        userState: data.user,
        // refresh: response.data.refreshToken,
      });

      navigate("/");
    },
  });

  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <Layout>
      <main>
        <Container size="xs">
          <form onSubmit={onSubmit}>
            <TextInput
              label="Username"
              mt={15}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <PasswordInput
              label="Password"
              mt={15}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button type="submit" mt={15} variant="filled" fullWidth>
              Login
            </Button>
          </form>
        </Container>
      </main>
    </Layout>
  );
}
