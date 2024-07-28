import User from "@/db/models/User";

export type UserResponse = Omit<User, "password">;

export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = {
  token: string;
  user: UserResponse;
};

export type UserJWTPayload = { userId: string };
