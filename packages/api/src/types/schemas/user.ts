import User from "@/db/models/User";

export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = {
  token: string;
};

export type UserResponse = Omit<User, "password">;

export type UserJWTPayload = { userId: string };
