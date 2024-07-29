import type { CameraResponse, CamerasResponse } from "@watchtower-api/types";
import { requests } from "./client";

export default {
  getCamera: (id: string): Promise<CameraResponse> =>
    requests.get(`/cameras/${id}`),
  getCameras: (): Promise<CamerasResponse> => requests.get("/cameras"),
};
