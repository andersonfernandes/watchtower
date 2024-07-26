import { db } from "@/db";
import { AppRequest, AppResponse } from "@/types/router";

export async function deleteArea(
  request: AppRequest<{}, { id: string }>,
  response: AppResponse
) {
  /* #swagger.responses[204] = { description: 'No Content' } */

  try {
    const area = await db("areas")
      .select("areas.*")
      .innerJoin("user_areas", "areas.id", "user_areas.area_id")
      .where("areas.id", request.params.id)
      .where("user_areas.user_id", request.user.id)
      .first();

    if (!area) {
      return response
        .status(404)
        .json({ success: false, data: { errors: ["Not Found"] } });
    }

    // TODO: Check if user is owner before delete
    await db("areas").delete().where("id", area.id);

    response.status(204).json();
  } catch (err) {
    console.error(err);
    response
      .status(500)
      .json({ success: false, data: { errors: ["Internal Server Error"] } });
  }
}
