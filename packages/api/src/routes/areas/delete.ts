import { db } from "@/db";
import Area, { AreaId } from "@/db/models/Area";
import UserAreaRole from "@/db/models/UserAreaRole";
import { AppRequest, AppResponse } from "@/types/router";

export async function deleteArea(
  request: AppRequest<{}, { id: string }>,
  response: AppResponse
) {
  // #swagger.responses[204] = { description: 'No Content' }

  try {
    const area: { id: AreaId; role: UserAreaRole } = await db("areas")
      .select("areas.id", "user_areas.role")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("areas.id", request.params.id)
      .where("user_areas.user_id", request.user.id)
      .first();

    if (!area) {
      return response
        .status(404)
        .json({ success: false, data: { errors: ["Not Found"] } });
    }

    if (area.role !== "owner") {
      return response.status(422).json({
        success: false,
        data: { errors: ["The user must be an owner to delete the area"] },
      });
    }

    await db("areas").delete().where("id", area.id);

    response.status(204).json();
  } catch (err) {
    console.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
