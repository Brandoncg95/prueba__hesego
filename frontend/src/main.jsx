import React from "react"; // Importamos React
import ReactDOM from "react-dom/client"; // Importamos ReactDOM para renderizar la aplicación
import { BrowserRouter } from "react-router-dom"; // Importamos BrowserRouter para manejar las rutas
import { AuthProvider } from "./context/AuthContext"; // Importamos el proveedor de contexto de autenticación
import App from "./App"; // Importamos el componente principal de la aplicación
import "./index.css"; // Importamos el archivo de estilos CSS

ReactDOM.createRoot(document.getElementById("root")).render( // Creamos el árbol de elementos y lo renderizamos en el elemento con el id "root"
  <React.StrictMode> {/* Activamos el modo estricto de React */}
    <BrowserRouter> {/* Utilizamos BrowserRouter para envolver la aplicación y habilitar el enrutamiento */}
      <AuthProvider> {/* Utilizamos AuthProvider para envolver la aplicación y proporcionar el contexto de autenticación */}
        <App /> {/* Renderizamos el componente principal de la aplicación */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode> // Cerramos el modo estricto de React
);
