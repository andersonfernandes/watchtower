import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: "application/json" },
});

const useApi = () => {
  const authHeader = useAuthHeader();

  api.defaults.headers.common.Authorization = authHeader;

  return api;
};

export default useApi;
