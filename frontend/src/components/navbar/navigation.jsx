// Importamos los iconos MdTaskAlt, BiTask y BiUserCircle desde sus respectivos paquetes de iconos
import {MdTaskAlt} from 'react-icons/md'
import {BiTask, BiUserCircle} from 'react-icons/bi'

// Definimos un array de rutas públicas que no requieren autenticación para acceder
export const publicRoutes = [
  {
    name: "Acerca de",
    path: "/about",
  },
  {
    name: "Ingreso", // Nombre de la ruta
    path: "/login", // Ruta a la que se accede
  },
  {
    name: "Registro", // Nombre de la ruta
    path: "/register", // Ruta a la que se accede
  },
]


export const privateRoutes = [
  {
    name: "Tasks",
    path: "/tasks",
    icon: <BiTask className='w-5 h-5' />,
  },
  {
    name: "Add",
    path: "/tasks/new",
    icon: <MdTaskAlt className='w-5 h-5' />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <BiUserCircle className='w-5 h-5' />,
  },
];