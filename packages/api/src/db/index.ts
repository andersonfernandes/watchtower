import knex from "knex";

export const db = knex({
  client: "postgres",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 20,
  },
});
