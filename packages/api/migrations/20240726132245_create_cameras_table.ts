import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `CREATE TYPE camera_status AS ENUM ('active', 'inactive', 'maintenance');`
  );

  await knex.schema.createTable("cameras", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.string("token").notNullable();
    table.string("local_address").nullable();
    table
      .enu("status", null, {
        useNative: true,
        existingType: true,
        enumName: "camera_status",
      })
      .defaultTo("inactive");
    table.timestamp("connected_at");

    table.uuid("area_id").notNullable();
    table
      .foreign("area_id")
      .references("id")
      .inTable("areas")
      .onDelete("cascade");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("cameras");
  await knex.raw("DROP TYPE IF EXISTS camera_status;");
}
