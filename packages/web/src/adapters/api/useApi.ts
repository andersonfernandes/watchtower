import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import areas from "./areas";
import cameras from "./cameras";
import { client } from "./client";
import users from "./users";

const useApi = () => {
  const authHeader = useAuthHeader();

  client.defaults.headers.common.Authorization = authHeader;

  return { areas, client, cameras, users };
};

export default useApi;
