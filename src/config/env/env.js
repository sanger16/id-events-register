import * as dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  NODE_ENV,
  SECRET_ACCESS_TOKEN,
  SECRET_SESSION,
  SALT_ROUND,
  OUTGOING_EMAIL,
  OUTGOING_EMAIL_PASSWORD,
  SECRET_PASSWORD_TOKEN,
  TIMEZONE,
  APP_URL,
} = process.env;
