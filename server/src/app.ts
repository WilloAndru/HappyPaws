import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());

// Ruta mínima
app.get("/", (_req, res) => res.json({ ok: true }));

// Conexión a la BD
export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB authenticated");
    await sequelize.sync({ alter: true });
    console.log("✅ DB synced");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
};

export default app;
