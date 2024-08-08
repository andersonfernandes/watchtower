import Camera from "@/db/models/Camera";
import CameraStatus from "@/db/models/CameraStatus";
import { SuccessResponse } from "./response";

export type { Camera, CameraStatus };

export type CreateCameraRequest = Pick<
  Camera,
  "name" | "local_address" | "area_id"
>;

export type CameraResponse = SuccessResponse<Camera>;

export type CamerasResponse = SuccessResponse<Array<Camera>>;
