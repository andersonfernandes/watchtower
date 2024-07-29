import Area from "@/db/models/Area";
import { SuccessResponse } from "./response";

export { type Area };

export type CreateAreaRequest = { name: string };

export type AreaResponse = SuccessResponse<Area>;

export type AreasResponse = SuccessResponse<Array<Area>>;
