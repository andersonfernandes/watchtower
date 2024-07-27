import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cameras", (table) => {
    table.string("token").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cameras", (table) => {
    table.string("token").notNullable().alter();
  });
}
