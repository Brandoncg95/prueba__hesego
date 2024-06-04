// Importamos los componentes y hooks necesarios
import { Card, Button } from "../ui"; // Componentes de interfaz de usuario
import { useTasks } from "../../context/TaskContext"; // Hook para acceder al contexto de las tareas
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import { PiTrashSimpleLight } from "react-icons/pi"; // Icono de papelera
import { BiPencil } from "react-icons/bi"; // Icono de lápiz

// Componente funcional para renderizar una tarjeta de tarea
function TaskCard({ task }) {
  // Obtenemos la función de eliminar tarea y la función de navegación del contexto de las tareas
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  return (
    // Renderizamos una tarjeta con el contenido de la tarea
    <Card key={task.id} className="px-7 py-4 flex flex-col justify-center">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1> {/* Título de la tarea */}
        <p>{task.description}</p> {/* Descripción de la tarea */}
      </div>
      {/* Botones para editar y eliminar la tarea */}
      <div className="my-2 flex justify-end gap-x-2">
        {/* Botón para editar la tarea */}
        <Button onClick={() => navigate(`/tasks/${task.id}/edit`)}>
          <BiPencil className="text-white" /> {/* Icono de lápiz */}
          Editar
        </Button>
        {/* Botón para eliminar la tarea */}
        <Button
          className="bg-red-700 hover:bg-red-600" // Estilos para el botón
          onClick={async () => {
            // Mostramos una confirmación antes de eliminar la tarea
            if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
              deleteTask(task.id); // Eliminamos la tarea
            }
          }}
        >
          <PiTrashSimpleLight className="text-white" /> {/* Icono de papelera */}
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard; // Exportamos el componente por defecto
