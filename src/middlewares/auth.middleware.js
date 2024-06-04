import jwt from "jsonwebtoken"; // Importamos el módulo JWT para manejar tokens JWT

// Middleware para verificar si el usuario está autenticado
export const isAuth = (req, res, next) => {
  const token = req.cookies.token; // Extraemos el token de las cookies de la solicitud

  // Verificamos si no hay ningún token en las cookies
  if (!token) {
    // Si no hay token, respondemos con un código de estado 401 (No autorizado) y un mensaje de error
    return res.status(401).json({
      message: "No estás autorizado", // Mensaje indicando que el usuario no está autorizado
    });
  }

  // Verificamos la validez del token utilizando el método verify de JWT
  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err)
      // Si hay un error al verificar el token, respondemos con un código de estado 401 (No autorizado) y un mensaje de error
      return res.status(401).json({
        message: "No estás autorizado", // Mensaje indicando que el usuario no está autorizado
      });

    // Si el token es válido, extraemos el ID de usuario decodificado del token y lo adjuntamos a la solicitud
    req.userId = decoded.id;

    // Llamamos a la función next() para pasar al siguiente middleware en la cadena de middleware
    next();
  });
};
