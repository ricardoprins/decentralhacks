import { config as _config } from "firebase-functions";
import { existsSync } from "fs";

let config = _config().env;

if (process.env.NODE_ENV !== "production") {
  if (existsSync("./env.json")) {
    const env = require("./env.json");
    config = env;
  }
}

export default config;
