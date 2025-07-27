import { Sequelize } from "sequelize";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  NODE_ENV,
} from "../env/env.js";
import pg from "pg";

// Define connection parameters
const database = DB_NAME;
const user = DB_USER;
const password = DB_PASSWORD;
const host = DB_HOST;

// Export Sequelize connecion
export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: NODE_ENV === "production" ? { ssl: { require: true } } : {},
});
