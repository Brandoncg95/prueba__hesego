import { createContext, useState, useContext } from "react"; // Importamos funciones y hook de React
import {
  getAllTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks.api"; // Importamos las funciones para realizar las peticiones HTTP

// Creamos el contexto para las tareas
const TaskContext = createContext();

// Hook personalizado para acceder al contexto de tareas
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro del proveedor TaskProvider"); // Lanzamos un error si el hook no está dentro de un TaskProvider
  }
  return context;
};

// Componente que proporciona el contexto de tareas a la aplicación
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [errors, setErrors] = useState([]); // Estado para manejar errores

  // Función para cargar todas las tareas
  const loadTasks = async () => {
    const res = await getAllTasksRequest(); // Realizamos una petición HTTP para obtener todas las tareas
    setTasks(res.data); // Actualizamos el estado de las tareas con la respuesta del servidor
  };

  // Función para cargar una tarea específica
  const loadTask = async (id) => {
    const res = await getTaskRequest(id); // Realizamos una petición HTTP para obtener una tarea por su ID
    return res.data; // Retornamos los datos de la tarea
  };

  // Función para crear una nueva tarea
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task); // Realizamos una petición HTTP para crear una nueva tarea
      setTasks([...tasks, res.data]); // Actualizamos el estado de las tareas con la nueva tarea
      return res.data; // Retornamos los datos de la nueva tarea
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]); // Si hay errores, los establecemos en el estado de errores
      }
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id); // Realizamos una petición HTTP para eliminar una tarea
    if (res.status === 204) {
      setTasks(tasks.filter((task) => task.id !== id)); // Eliminamos la tarea del estado de las tareas
    }
  };

  // Función para actualizar una tarea
  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task); // Realizamos una petición HTTP para actualizar una tarea
      return res.data; // Retornamos los datos de la tarea actualizada
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]); // Si hay errores, los establecemos en el estado de errores
      }
    }
  };

  // Proveemos el contexto de tareas a la aplicación
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        loadTask,
        errors,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
