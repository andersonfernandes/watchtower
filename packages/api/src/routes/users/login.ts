import { db } from "@/db";
import { env } from "@/env";
import { AppRequest, AppResponse } from "@/types/router";
import { UserLoginRequest, UserLoginResponse } from "@/types/schemas";
import { logger } from "@/utils/logger";
import { omit } from "@/utils/object";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function userLogin(
  request: AppRequest<UserLoginRequest>,
  response: AppResponse<UserLoginResponse>
) {
  /*  #swagger.tags = ['Users']
      #swagger.requestBody = {in: "body", schema: { $ref: "#/schemas/UserLoginRequest" }}
      #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/UserLoginResponse"
                    }
                }
            }
        }
    */

  const { username, password } = request.body;

  try {
    const user = await db("users").where("username", username).first();

    const errorResponse = {
      success: false,
      data: { errors: ["Invalid username or password"] },
    };
    if (!user) {
      return response.status(401).json(errorResponse);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(401).json(errorResponse);
    }

    const token = sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    response.json({
      success: true,
      data: { token, user: omit(user, "password") },
    });
  } catch (err) {
    logger.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
