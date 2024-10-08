import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";
import { AreasResponse } from "@/types/schemas";
import { logger } from "@/utils/logger";

export async function listAreas(
  request: AppRequest,
  response: AppResponse<AreasResponse>
) {
  /*  #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/AreasResponse"
                    }
                }
            }
        }
    */

  try {
    const areas = await db("areas")
      .select("areas.*")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("user_id", request.user.id);

    response.json({ success: true, data: areas });
  } catch (err) {
    logger.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
