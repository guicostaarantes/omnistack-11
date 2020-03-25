import knex from "knex";
import * as config from "../../knexfile";

let connection;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  connection = knex(config.development as any);
} else if (
  process.env.NODE_ENV === "staging" ||
  process.env.NODE_ENV === "production"
) {
  connection = knex(config.production as any);
} else {
  throw new Error(
    "NODE_ENV must be set to development, test, staging or production."
  );
}

export default connection;
