import { Knex } from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.text("password").notNullable();
    table.timestamps();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTable("users");
};
