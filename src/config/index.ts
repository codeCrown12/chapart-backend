import { config } from "dotenv";
config();

export const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  LOG_DIR,
  DB_URL,
  MAIL_NAME,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_HOST
} = process.env;