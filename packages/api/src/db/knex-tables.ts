import { Knex } from "knex";
import type {
  default as User,
  UsersInitializer,
  UsersMutator,
} from "./models/User";

declare module "knex/types/tables" {
  interface Tables {
    users: Knex.CompositeTableType<User, UsersInitializer, UsersMutator>;
  }
}
