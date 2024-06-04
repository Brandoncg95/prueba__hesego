import { createContext, useState, useContext, useEffect } from "react"; // Importamos funciones y hook de React
import Cookie from "js-cookie"; // Importamos el paquete para trabajar con cookies
import axios from "../api/axios"; // Importamos axios para realizar peticiones HTTP

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider"); // Lanzamos un error si el hook no está dentro de un AuthProvider
  }
  return context;
};

// Componente que proporciona el contexto de autenticación a la aplicación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const [isAuth, setIsAuth] = useState(false); // Estado para verificar si el usuario está autenticado
  const [errors, setErrors] = useState(null); // Estado para manejar errores de autenticación
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando la información de autenticación

  // Función para iniciar sesión
  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data); // Realizamos una petición POST para iniciar sesión
      setUser(res.data); // Actualizamos el estado del usuario con la respuesta del servidor
      setIsAuth(true); // Actualizamos el estado de autenticación
      return res.data; // Retornamos los datos del usuario
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data); // Si hay errores, los establecemos en el estado de errores
      }
      setErrors([error.response.data.message]); // Si hay errores, los establecemos en el estado de errores
    }
  };

  // Función para registrar un nuevo usuario
  const signup = async (data) => {
    try {
      const res = await axios.post("/signup", data); // Realizamos una petición POST para registrar un nuevo usuario
      setUser(res.data); // Actualizamos el estado del usuario con la respuesta del servidor
      setUser(res.data); // Actualizamos el estado del usuario con la respuesta del servidor
      setIsAuth(true); // Actualizamos el estado de autenticación
      return res.data; // Retornamos los datos del usuario
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data); // Si hay errores, los establecemos en el estado de errores
      }
      setErrors([error.response.data.message]); // Si hay errores, los establecemos en el estado de errores
    }
  };

  // Función para cerrar sesión
  const signout = async () => {
    await axios.post("/signout"); // Realizamos una petición POST para cerrar sesión
    setUser(null); // Actualizamos el estado del usuario
    setIsAuth(false); // Actualizamos el estado de autenticación
  };

  // Efecto para cargar la información de autenticación al cargar el componente
  useEffect(() => {
    setLoading(true); // Indicamos que se está cargando la información de autenticación
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data); // Actualizamos el estado del usuario con la respuesta del servidor
          setIsAuth(true); // Actualizamos el estado de autenticación
        })
        .catch((err) => {
          setUser(null); // Actualizamos el estado del usuario
          setIsAuth(false); // Actualizamos el estado de autenticación
        });
    }
    
    setLoading(false); // Indicamos que se ha completado la carga de la información de autenticación
  }, []);

  // Efecto para limpiar los errores después de un tiempo
  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null); // Limpiamos el estado de errores después de 5 segundos
    }, 5000);

    return () => clearTimeout(clean); // Limpiamos el temporizador cuando el componente se desmonta
  }, [errors])

  // Proveemos el contexto de autenticación a la aplicación
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
