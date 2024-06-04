// Importación del objeto de la aplicación Express configurada
import app from "./app.js";

// Importación del puerto de escucha desde la configuración
import { PORT } from "./config.js";

// Inicio del servidor Express en el puerto especificado
app.listen(PORT);

// Mensaje de registro para indicar que el servidor se ha iniciado correctamente en el puerto especificado
console.log("Server on port", PORT);
