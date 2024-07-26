import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";
import { CamerasResponse } from "@/types/schemas/camera";

export async function listCameras(
  request: AppRequest,
  response: AppResponse<CamerasResponse>
) {
  /*  #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/CamerasResponse"
                    }
                }
            }
        }
    */

  try {
    const cameras = await db("cameras")
      .select("cameras.*")
      .innerJoin("areas", "areas.id", "cameras.area_id")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("user_areas.user_id", request.user.id);

    response.json({ success: true, data: cameras });
  } catch (err) {
    console.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
