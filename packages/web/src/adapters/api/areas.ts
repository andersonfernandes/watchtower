import type { AreasResponse } from "@watchtower-api/types";
import { requests } from "./client";

export default {
  getAreas: (): Promise<AreasResponse> => requests.get("/areas"),
};
