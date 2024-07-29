import Camera from "@/db/models/Camera";
import { SuccessResponse } from "./response";

export { type Camera };

export type CreateCameraRequest = Pick<
  Camera,
  "name" | "local_address" | "area_id"
>;

export type CameraResponse = SuccessResponse<Camera>;

export type CamerasResponse = SuccessResponse<Array<Camera>>;
