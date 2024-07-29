import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import cameras from "./cameras";
import { client } from "./client";
import users from "./users";

const useApi = () => {
  const authHeader = useAuthHeader();

  client.defaults.headers.common.Authorization = authHeader;

  return { client, cameras, users };
};

export default useApi;
