import { Navigate, Outlet } from "react-router-dom"; // Importamos componentes de React Router

// Componente para enrutamiento protegido
export const ProtectedRoute = ({ redirectTo, isAllowed, children }) => {
  
  // Si el usuario no está permitido, redirigir a la ruta especificada
  if (!isAllowed) return <Navigate to={redirectTo} replace />;

  // Si el usuario está permitido, renderizar el contenido o el Outlet para rutas anidadas
  return children ? children : <Outlet />;
};
