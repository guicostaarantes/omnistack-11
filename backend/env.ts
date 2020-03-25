import dotenv from "dotenv";

const envs = ["development", "test", "staging", "production"];
const env = process.env.NODE_ENV || "";

const path = envs.indexOf(env) !== -1 ? `./${env}.env` : "./.env";

export default () => {
  dotenv.config({ path });
  return env;
};
