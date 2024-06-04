import axios from "./axios";  // Importa la instancia personalizada de Axios

// Función para realizar una solicitud GET para obtener todas las tareas
export const getAllTasksRequest = () => axios.get("/tasks");

// Función para realizar una solicitud POST para crear una nueva tarea
export const createTaskRequest = (task) => axios.post("/tasks", task);

// Función para realizar una solicitud DELETE para eliminar una tarea según su ID
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);

// Función para realizar una solicitud GET para obtener una tarea específica según su ID
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

// Función para realizar una solicitud PUT para actualizar una tarea según su ID
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);
