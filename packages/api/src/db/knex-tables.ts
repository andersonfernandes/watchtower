import { Knex } from "knex";
import type {
  default as Area,
  AreasInitializer,
  AreasMutator,
} from "./models/Area";
import Camera, { CamerasInitializer, CamerasMutator } from "./models/Camera";
import CameraLog, {
  CameraLogsInitializer,
  CameraLogsMutator,
} from "./models/CameraLog";
import type {
  default as User,
  UsersInitializer,
  UsersMutator,
} from "./models/User";
import type {
  default as UserArea,
  UserAreasInitializer,
  UserAreasMutator,
} from "./models/UserArea";

declare module "knex/types/tables" {
  interface Tables {
    users: Knex.CompositeTableType<User, UsersInitializer, UsersMutator>;
    areas: Knex.CompositeTableType<Area, AreasInitializer, AreasMutator>;
    user_areas: Knex.CompositeTableType<
      UserArea,
      UserAreasInitializer,
      UserAreasMutator
    >;
    cameras: Knex.CompositeTableType<
      Camera,
      CamerasInitializer,
      CamerasMutator
    >;
    camera_logs: Knex.CompositeTableType<
      CameraLog,
      CameraLogsInitializer,
      CameraLogsMutator
    >;
  }
}
