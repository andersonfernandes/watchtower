import useApi from "@/adapters/api/useApi";
import { useEffect, useState, type FormEvent } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const api = useApi();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api.users
      .login({
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        const { success, data } = response;

        if (success) {
          signIn({
            auth: {
              token: data.token,
              type: "Bearer",
            },
            userState: data.user,
            // refresh: response.data.refreshToken,
          });

          navigate("/");
        }
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
