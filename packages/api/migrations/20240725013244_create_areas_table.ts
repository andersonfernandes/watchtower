import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("areas", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();

    table.timestamps(true, true);
  });

  await knex.schema.createTable("user_areas", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("user_id").notNullable();
    table.uuid("area_id").notNullable();

    table.foreign("user_id").references("id").inTable("users");
    table.foreign("area_id").references("id").inTable("areas");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("areas");
  await knex.schema.dropTable("user_areas");
}
