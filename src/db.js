// Importación de variables de configuración para la conexión a la base de datos PostgreSQL
import {
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USER,
} from "./config.js";

// Importación del cliente PostgreSQL
import pg from "pg";

// Creación de un nuevo pool de conexiones PostgreSQL con la configuración especificada
export const pool = new pg.Pool({
  port: PG_PORT,      // Puerto de la base de datos
  host: PG_HOST,      // Host de la base de datos
  user: PG_USER,      // Usuario de la base de datos
  password: PG_PASSWORD,  // Contraseña de la base de datos
  database: PG_DATABASE,  // Nombre de la base de datos
});

// Manejador de eventos que se ejecuta cuando se establece una conexión exitosa con la base de datos
pool.on("connect", () => {
  console.log("Database connected");  // Mensaje de registro de conexión exitosa
});
