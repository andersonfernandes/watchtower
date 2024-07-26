import Area from "@/db/models/Area";

export type CreateAreaRequest = { name: string };

export type AreaResponse = Area;

export type AreasResponse = Array<Area>;
