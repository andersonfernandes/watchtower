import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user_areas", (table) => {
    table.dropForeign("user_id");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");

    table.dropForeign("area_id");
    table.foreign("area_id").references("areas.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user_areas", (table) => {
    table.dropForeign("user_id");
    table.foreign("user_id").references("users.id");

    table.dropForeign("area_id");
    table.foreign("area_id").references("areas.id");
  });
}
