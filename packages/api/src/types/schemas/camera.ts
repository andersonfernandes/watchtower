import Camera from "@/db/models/Camera";

export type CreateCameraRequest = { name: string; local_address?: string };

export type CameraResponse = Camera;

export type CamerasResponse = Array<Camera>;
