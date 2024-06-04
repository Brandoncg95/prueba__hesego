import jwt from "jsonwebtoken"; // Importamos el módulo JWT para manejar tokens de acceso

// Función para crear un token de acceso
export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    // Utilizamos el método sign de JWT para firmar el token con el payload proporcionado
    jwt.sign(
      payload, // Payload que contendrá información del usuario
      "xyz123", // Clave secreta para firmar el token (debería ser más seguro en un entorno real)
      {
        expiresIn: "1d", // Duración del token (1 día en este caso)
      },
      (err, token) => {
        // Callback para manejar errores y retornar el token generado
        if (err) reject(err); // Si hay un error al firmar el token, lo rechazamos
        resolve(token); // Si se firma el token correctamente, lo resolvemos y lo devolvemos
      }
    );
  });
};
