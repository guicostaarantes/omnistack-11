import dotenv from "dotenv";
dotenv.config();

export const development = {
  client: "sqlite3",
  connection: {
    filename: process.env.DB_FILEPATH
  },
  migrations: {
    directory: "./src/database/migrations",
    tableName: "knex_migrations"
  },
  useNullAsDefault: true
};

export const production = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./src/database/migrations",
    tableName: "knex_migrations"
  }
};
