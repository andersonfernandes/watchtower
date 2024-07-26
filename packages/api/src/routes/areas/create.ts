import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";
import { AreaResponse, CreateAreaRequest } from "@/types/schemas";

export async function createArea(
  request: AppRequest<CreateAreaRequest>,
  response: AppResponse<AreaResponse>
) {
  /*  #swagger.tags = ['Areas']
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = { required: true, schema: { $ref: "#/schemas/CreateAreaRequest" } }
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
    const [area] = await db("areas")
      .insert({ name: request.body.name })
      .returning("*");

    await db("user_areas").insert({
      area_id: area.id,
      user_id: request.user.id,
    });

    response.json({ success: true, data: area });
  } catch (err) {
    console.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
