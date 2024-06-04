// Función de middleware para validar el esquema de entrada
export const validateSchema = (schema) => async (req, res, next) => {
  try {
    // Intentamos analizar la solicitud utilizando el esquema proporcionado
    await schema.parse(req.body);
    
    // Si la validación del esquema pasa, llamamos a la función next() para continuar con el siguiente middleware
    next();
  } catch (error) {
    // Manejo de errores si la validación del esquema falla

    // Verificamos si el error es un array de errores
    if (Array.isArray(error.errors)) {
      // Si es un array de errores, respondemos con un código de estado 400 (Solicitud incorrecta) y una lista de mensajes de error
      return res.status(400).json(error.errors.map((error) => error.message));
    }

    // Si el error no es un array de errores, respondemos con un código de estado 400 (Solicitud incorrecta) y el mensaje de error
    return res.status(400).json(error.message);
  }
};
