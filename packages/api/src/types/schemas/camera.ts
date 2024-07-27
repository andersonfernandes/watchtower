import Camera from "@/db/models/Camera";

export type CreateCameraRequest = Pick<
  Camera,
  "name" | "local_address" | "area_id"
>;

export type CameraResponse = Camera;

export type CamerasResponse = Array<Camera>;
