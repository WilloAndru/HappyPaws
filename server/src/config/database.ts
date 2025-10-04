import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  dialect: "postgres", // cámbialo a 'mysql' o 'sqlite' si prefieres
  logging: false,
});
