import axios from "axios";  // Importa la librería Axios para realizar solicitudes HTTP

// Obtiene la URL base del backend desde una variable de entorno o utiliza la URL predeterminada
const baseURL = import.meta.env.VITE_BACKEND || "http://localhost:3000/api";

// Crea una instancia de cliente Axios con la URL base y la configuración de credenciales
const client = axios.create({
  baseURL,  // Establece la URL base para todas las solicitudes
  withCredentials: true,  // Habilita el envío de cookies de autenticación con las solicitudes
});

export default client;  // Exporta la instancia del cliente Axios para su uso en otros archivos
