import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE user_area_role AS ENUM ('owner', 'user');`);

  await knex.schema.alterTable("user_areas", (table) => {
    table
      .enu("role", null, {
        useNative: true,
        existingType: true,
        enumName: "user_area_role",
      })
      .defaultTo("user");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user_areas", (table) => {
    table.dropColumn("role");
  });

  await knex.raw("DROP TYPE IF EXISTS user_area_role;");
}
