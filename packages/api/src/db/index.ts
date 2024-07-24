import { env } from "@/env";
import knex from "knex";

export const db = knex({
  client: "pg",
  connection: env.DATABASE_URL,
  pool: {
    min: 2,
    max: 20,
  },
});
