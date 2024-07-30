import useApi from "@/adapters/api/useApi";
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
    <>
      <h1>Watchtower</h1>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button>Submit</button>
        </form>
      </main>
    </>
  );
}
