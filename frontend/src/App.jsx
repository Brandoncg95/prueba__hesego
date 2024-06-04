import { Routes, Route, Outlet } from "react-router-dom"; // Importamos componentes y hooks de react-router-dom
import { useAuth } from "./context/AuthContext"; // Importamos el hook useAuth del contexto de autenticación
import { TaskProvider } from "./context/TaskContext"; // Importamos el proveedor del contexto de tareas
import Navbar from "./components/navbar/Navbar"; // Importamos el componente Navbar
import { Container } from "./components/ui"; // Importamos el componente Container
import { ProtectedRoute } from "./components/ProtectedRoute"; // Importamos el componente ProtectedRoute
import HomePage from "./pages/HomePage"; // Importamos la página de inicio
import AboutPage from "./pages/AboutPage"; // Importamos la página acerca de
import LoginPage from "./pages/LoginPage"; // Importamos la página de inicio de sesión
import RegisterPage from "./pages/RegisterPage"; // Importamos la página de registro
import TasksPage from "./pages/TasksPage"; // Importamos la página de tareas
import TaskFormPage from "./pages/TaskFormPage"; // Importamos la página de formulario de tarea
import ProfilePage from "./pages/ProfilePage"; // Importamos la página de perfil de usuario
import NotFound from "./pages/NotFound"; // Importamos la página de error 404

function App() {
  const { isAuth, loading } = useAuth(); // Obtenemos el estado de autenticación y carga del contexto de autenticación

  if (loading) return <h1>Cargando...</h1>; // Si se está cargando, mostramos un mensaje de carga

  return (
    <> {/* Fragmento de React para envolver múltiples elementos */}
      <Navbar /> {/* Renderizamos el componente Navbar */}

      <Container className="py-5"> {/* Renderizamos el componente Container con una clase de padding */}
        <Routes> {/* Definimos las rutas de la aplicación */}
          {/* Rutas para usuarios no autenticados */}
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/tasks" />} // Protegemos la ruta de inicio, acerca de, inicio de sesión y registro si el usuario está autenticado
          >
            <Route path="/" element={<HomePage />} /> {/* Ruta para la página de inicio */}
            <Route path="/about" element={<AboutPage />} /> {/* Ruta para la página acerca de */}
            <Route path="/login" element={<LoginPage />} /> {/* Ruta para la página de inicio de sesión */}
            <Route path="/register" element={<RegisterPage />} /> {/* Ruta para la página de registro */}
          </Route>

          {/* Rutas para usuarios autenticados */}
          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />} // Protegemos la ruta de tareas y perfil si el usuario no está autenticado
          >
            <Route
              element={ // Establecemos el proveedor del contexto de tareas para las rutas relacionadas con las tareas
                <TaskProvider>
                  <Outlet /> {/* Renderizamos el componente Outlet para anidar las rutas hijas */}
                </TaskProvider>
              }
            >
              <Route path="/tasks" element={<TasksPage />} /> {/* Ruta para la página de tareas */}
              <Route path="/tasks/new" element={<TaskFormPage />} /> {/* Ruta para la página de creación de tarea */}
              <Route path="/tasks/:id/edit" element={<TaskFormPage />} /> {/* Ruta para la página de edición de tarea */}
            </Route>

            <Route path="/profile" element={<ProfilePage />} /> {/* Ruta para la página de perfil de usuario */}
          </Route>

          <Route path="*" element={<NotFound />} /> {/* Ruta para manejar errores 404 */}
        </Routes>
      </Container>
    </>
  );
}

export default App; // Exportamos el componente App
