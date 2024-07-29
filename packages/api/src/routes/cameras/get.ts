import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";
import { CameraResponse } from "@/types/schemas/camera";
import { logger } from "@/utils/logger";

// TODO: Fix docs
export async function getCamera(
  request: AppRequest<{}, { id: string }>,
  response: AppResponse<CameraResponse>
) {
  /*  #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/CameraResponse"
                    }
                }
            }
        }
    */

  try {
    const camera = await db("cameras")
      .select("cameras.*")
      .innerJoin("areas", "areas.id", "cameras.area_id")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("user_areas.user_id", request.user.id)
      .where("cameras.id", request.params.id)
      .first();

    response.json({ success: true, data: camera });
  } catch (err) {
    logger.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
