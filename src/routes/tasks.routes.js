import Router from "express-promise-router";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasks.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

// Creamos un nuevo enrutador utilizando express-promise-router para manejar las rutas de manera asíncrona
const router = Router();

// Ruta para obtener todas las tareas del usuario autenticado
router.get("/tasks", isAuth, getAllTasks);

// Ruta para obtener una tarea específica por su ID
router.get("/tasks/:id", isAuth, getTask);

// Ruta para crear una nueva tarea para el usuario autenticado
router.post("/tasks", isAuth, validateSchema(createTaskSchema), createTask);

// Ruta para actualizar una tarea existente por su ID
router.put("/tasks/:id", isAuth, validateSchema(updateTaskSchema), updateTask);

// Ruta para eliminar una tarea por su ID
router.delete("/tasks/:id", isAuth, deleteTask);

// Exportamos el enrutador para su uso en otras partes de la aplicación
export default router;
