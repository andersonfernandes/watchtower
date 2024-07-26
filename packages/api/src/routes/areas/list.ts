import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";
import { AreaResponse } from "@/types/schemas";

export async function listAreas(
  request: AppRequest,
  response: AppResponse<AreaResponse[]>
) {
  /*  #swagger.tags = ['Areas']
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/schemas/AreaResponse"
                    }
                }
            }
        }
    */

  try {
    const areas = await db("areas")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("user_id", request.user.id);

    response.json({ success: true, data: areas });
  } catch (err) {
    console.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
