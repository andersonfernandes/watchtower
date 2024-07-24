export default {
  connection: process.env.DATABASE_URL,
  client: "postgres",
  pool: {
    min: 2,
    max: 20,
  },
  migrations: {
    directory: "migrations",
    tableName: "knex_migrations",
  },
};
