import { pool } from "../db.js"; // Importamos el pool de conexiones a la base de datos

// Controlador para obtener todas las tareas del usuario autenticado
export const getAllTasks = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM task WHERE user_id = $1", [
    req.userId,
  ]);
  return res.json(result.rows);
};

// Controlador para obtener una tarea por su id
export const getTask = async (req, res) => {
  const result = await pool.query("SELECT * FROM task WHERE id = $1", [
    req.params.id,
  ]);

  // Si no se encuentra la tarea con el id proporcionado, respondemos con un error 404
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }

  // Respondemos con los datos de la tarea encontrada
  return res.json(result.rows[0]);
};

// Controlador para crear una nueva tarea
export const createTask = async (req, res, next) => {
  const { title, description } = req.body; // Extraemos los datos del cuerpo de la solicitud

  try {
    // Insertamos la nueva tarea en la base de datos
    const result = await pool.query(
      "INSERT INTO task (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.userId]
    );

    // Respondemos con los datos de la nueva tarea creada
    res.json(result.rows[0]);
  } catch (error) {
    // Manejo de errores
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe una tarea con ese título",
      });
    }
    next(error);
  }
};

// Controlador para actualizar una tarea existente
export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body; // Extraemos los datos del cuerpo de la solicitud

  // Actualizamos la tarea en la base de datos
  const result = await pool.query(
    "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );

  // Si no se encuentra la tarea con el id proporcionado, respondemos con un error 404
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }

  // Respondemos con los datos de la tarea actualizada
  return res.json(result.rows[0]);
};

// Controlador para eliminar una tarea
export const deleteTask = async (req, res) => {
  // Eliminamos la tarea de la base de datos
  const result = await pool.query("DELETE FROM task WHERE id = $1", [
    req.params.id,
  ]);

  // Si no se encuentra la tarea con el id proporcionado, respondemos con un error 404
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }

  // Respondemos con el código 204 (Sin contenido) para indicar que la tarea ha sido eliminada con éxito
  return res.sendStatus(204);
};
