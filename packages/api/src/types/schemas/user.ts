import User from "@/db/models/User";
import { SuccessResponse } from "./response";

export { type User };

export type UserResponse = SuccessResponse<Omit<User, "password">>;

export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = SuccessResponse<{
  token: string;
  user: Omit<User, "password">;
}>;

export type UserJWTPayload = { userId: string };
