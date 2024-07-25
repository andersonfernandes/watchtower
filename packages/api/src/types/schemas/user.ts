import User from "@/db/models/User";

export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = {
  token: string;
};

export type CreateUserRequest = Pick<User, "name" | "username">;

export type CreateUserResponse = Omit<User, "password">;
