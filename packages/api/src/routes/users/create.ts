import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";
import { CreateUserRequest, CreateUserResponse } from "@/types/schemas";

export async function createUser(
  request: AppRequest<CreateUserRequest>,
  response: AppResponse<CreateUserResponse>
) {
  /*  #swagger.tags = ['Users']
      #swagger.requestBody = {in: "body", schema: { $ref: "#/schemas/CreateUserRequest" }}
      #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/CreateUserResponse"
                    }
                }
            }
        }
    */

  response.status(200);
}
