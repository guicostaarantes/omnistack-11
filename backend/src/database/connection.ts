import knex from "knex";
import * as config from "../../knexfile";

let connection;
if (process.env.CONFIG_ENV === "development") {
  connection = knex(config.development as any);
} else if (
  process.env.CONFIG_ENV === "test" ||
  process.env.CONFIG_ENV === "production"
) {
  connection = knex(config.production as any);
} else {
  throw new Error("CONFIG_ENV must be development, test or production.");
}

export default connection;
