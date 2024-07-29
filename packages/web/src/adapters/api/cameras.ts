import type { CamerasResponse } from "@watchtower-api/types";
import { requests } from "./client";

export default {
  getCameras: (): Promise<CamerasResponse> => requests.get("/cameras"),
};
