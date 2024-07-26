import Camera from "@/db/models/Camera";

export type CreateCameraRequest = Pick<Camera, "name" | "local_address">;

export type CameraResponse = Camera;
