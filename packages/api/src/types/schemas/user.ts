export interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  username: string;
}
