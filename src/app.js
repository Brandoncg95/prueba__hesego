import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { ORIGIN } from "./config.js";
import { pool } from "./db.js";

const app = express();

// Middlewares

// Configuración de CORS para permitir solicitudes desde un origen específico
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

// Registro de solicitudes HTTP con Morgan en el entorno de desarrollo
app.use(morgan("dev"));

// Parseo de cookies para facilitar su uso en las solicitudes
app.use(cookieParser());

// Parseo de cuerpos de solicitudes JSON
app.use(express.json());

// Parseo de cuerpos de solicitudes codificados en URL
app.use(express.urlencoded({ extended: false }));

// Routes

// Ruta de bienvenida a la API
app.get("/", (req, res) => res.json({ message: "welcome to my API" }));

// Ruta de prueba para verificar la conexión con la base de datos
app.get("/api/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  return res.json(result.rows[0]);
});

// Rutas para las funcionalidades relacionadas con las tareas y la autenticación
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

// Error Handler

// Manejador de errores genérico que responde con un estado 500 y el mensaje de error
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
