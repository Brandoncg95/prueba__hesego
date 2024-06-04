import bcrypt from "bcrypt"; // Importamos bcrypt para el hashing de contraseñas
import { pool } from "../db.js"; // Importamos el pool de conexiones a la base de datos
import { createAccessToken } from "../libs/jwt.js"; // Importamos la función para crear tokens JWT
import md5 from 'md5'; // Importamos md5 para generar un avatar Gravatar

// Controlador para el inicio de sesión de usuarios
export const signin = async (req, res) => {
  const { email, password } = req.body; // Extraemos el correo y la contraseña del cuerpo de la solicitud

  // Buscamos el usuario en la base de datos por su correo electrónico
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  // Si no se encuentra ningún usuario con el correo proporcionado, respondemos con un error
  if (result.rowCount === 0) {
    return res.status(400).json({
      message: "El correo no está registrado",
    });
  }

  // Comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos
  const validPassword = await bcrypt.compare(password, result.rows[0].password);

  // Si la contraseña no es válida, respondemos con un error
  if (!validPassword) {
    return res.status(400).json({
      message: "La contraseña es incorrecta",
    });
  }

  // Creamos un token de acceso para el usuario
  const token = await createAccessToken({ id: result.rows[0].id });

  // Establecemos una cookie con el token de acceso
  res.cookie("token", token, {
    // httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });

  // Respondemos con los datos del usuario autenticado
  return res.json(result.rows[0]);
};

// Controlador para registrar nuevos usuarios
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body; // Extraemos los datos del cuerpo de la solicitud

  try {
    // Hash de la contraseña del usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generamos el enlace al avatar Gravatar del usuario
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

    // Insertamos el nuevo usuario en la base de datos
    const result = await pool.query(
      "INSERT INTO users(name, email, password, gravatar) VALUES($1, $2, $3, $4) Returning *",
      [name, email, hashedPassword, gravatar]
    );

    // Creamos un token de acceso para el nuevo usuario
    const token = await createAccessToken({ id: result.rows[0].id });

    // Establecemos una cookie con el token de acceso
    res.cookie("token", token, {
      // httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    // Respondemos con los datos del nuevo usuario
    return res.json(result.rows[0]);
  } catch (error) {
    // Manejo de errores
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    next(error);
  }
};

// Controlador para cerrar sesión
export const signout = (req, res) => {
  // Borramos la cookie que contiene el token de acceso
  res.clearCookie('token');
  // Respondemos con el código 200
  res.sendStatus(200);
}

// Controlador para obtener el perfil del usuario autenticado
export const profile = async (req, res) => {
  // Buscamos el perfil del usuario en la base de datos
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
  // Respondemos con los datos del perfil del usuario
  return res.json(result.rows[0]);
}
