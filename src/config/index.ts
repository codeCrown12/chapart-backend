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
  MAIL_HOST,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;