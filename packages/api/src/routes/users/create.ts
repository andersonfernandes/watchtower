import { CreateUserRequest } from "@/types/schemas";
import { Response } from "express";
import { RequestBody } from "@/routes";

export function createUser(
  request: RequestBody<CreateUserRequest>,
  response: Response
) {
  //  #swagger.parameters['body'] = {in: "body", schema: { $ref: "#/schemas/CreateUserRequest" }}

  response.status(200).json({});
}
