import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `CREATE TYPE camera_log_event_type AS ENUM ('camera_online', 'camera_offline', 'error', 'viewer_connected', 'viewer_disconnected');`
  );

  await knex.schema.createTable("camera_logs", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .enu("event_type", null, {
        useNative: true,
        existingType: true,
        enumName: "camera_log_event_type",
      })
      .notNullable();
    table.timestamp("event_at").notNullable();
    table.jsonb("event_details").defaultTo({});

    table.uuid("camera_id").notNullable();
    table
      .foreign("camera_id")
      .references("id")
      .inTable("cameras")
      .onDelete("cascade");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("camera_logs");
  await knex.raw("DROP TYPE IF EXISTS camera_log_event_type;");
}
