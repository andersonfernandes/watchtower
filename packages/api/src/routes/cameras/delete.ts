import { db } from "@/db";
import { CameraId } from "@/db/models/Camera";
import { AppRequest, AppResponse } from "@/types/router";
import { logger } from "@/utils/logger";

export async function deleteCamera(
  request: AppRequest<{}, { id: string }>,
  response: AppResponse
) {
  // #swagger.responses[204] = { description: 'No Content' }

  try {
    const camera: { id: CameraId } = await db("cameras")
      .select("cameras.id")
      .innerJoin("areas", "areas.id", "cameras.area_id")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("cameras.id", request.params.id)
      .where("user_areas.user_id", request.user.id)
      .first();

    if (!camera) {
      return response
        .status(404)
        .json({ success: false, data: { errors: ["Not Found"] } });
    }

    await db("cameras").delete().where("id", camera.id);

    response.status(204).json();
  } catch (err) {
    logger.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
