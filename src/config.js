// Configuración de puerto para el servidor HTTP
export const PORT = process.env.PORT || 3000;

// Configuración de puerto, host, usuario, contraseña y base de datos para PostgreSQL
export const PG_PORT = process.env.PG_PORT || 5433;
export const PG_HOST = process.env.PG_HOST || "localhost";
export const PG_USER = process.env.PG_USER || "postgres";
export const PG_PASSWORD = process.env.PG_PASSWORD || "cali1912";
export const PG_DATABASE = process.env.PG_DATABASE || "julio1995";

// Configuración del origen para CORS
export const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
