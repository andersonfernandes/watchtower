import { db } from "@/db";
import { env } from "@/env";
import { AppRequest, AppResponse } from "@/types/router";
import { CameraResponse, CreateCameraRequest } from "@/types/schemas";
import { logger } from "@/utils/logger";
import { sign } from "jsonwebtoken";

export async function createCamera(
  request: AppRequest<CreateCameraRequest>,
  response: AppResponse<CameraResponse>
) {
  /*  #swagger.requestBody = { required: true, schema: { $ref: "#/schemas/CreateCameraRequest" } }
      #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/CameraResponse"
                    }
                }
            }
        }
    */

  const { name, local_address, area_id } = request.body;

  try {
    let [camera] = await db("cameras")
      .insert({ name, local_address, area_id, status: "maintenance" })
      .returning("*");

    const token = sign({ cameraId: camera.id }, env.JWT_SECRET, {
      expiresIn: "90d",
    });

    [camera] = await db("cameras")
      .update({ token })
      .where("id", camera.id)
      .returning("*");

    response.json({ success: true, data: camera });
  } catch (err) {
    logger.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
