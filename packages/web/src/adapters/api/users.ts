import type {
  UserLoginRequest,
  UserLoginResponse,
} from "@watchtower-api/types";
import { requests } from "./client";

export default {
  login: (body: UserLoginRequest): Promise<UserLoginResponse> =>
    requests.post("/users/login", body),
};
