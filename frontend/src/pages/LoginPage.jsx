import { Card, Input, Button, Label, Container } from "../components/ui"; // Importamos componentes de UI necesarios
import { Link, useNavigate } from "react-router-dom"; // Importamos Link para manejar la navegación entre páginas y useNavigate para navegar programáticamente
import { useForm } from "react-hook-form"; // Importamos el hook useForm para manejar formularios
import { useAuth } from "../context/AuthContext"; // Importamos el contexto de autenticación

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Extraemos métodos y estados del hook useForm
  const { signin, errors: loginErrors } = useAuth(); // Extraemos el método de inicio de sesión y los errores de autenticación del contexto de autenticación
  const navigate = useNavigate(); // Extraemos la función navigate para cambiar de página

  const onSubmit = handleSubmit(async (data) => { // Definimos la función onSubmit para manejar el envío del formulario
    const user = await signin(data); // Iniciamos sesión con los datos del formulario

    if (user) navigate("/tasks"); // Si el inicio de sesión es exitoso, redirigimos al usuario a la página de tareas
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex justify-center items-center"> {/* Contenedor principal de la página */}
      <Card> {/* Tarjeta de inicio de sesión */}
        {loginErrors && // Si hay errores de inicio de sesión, los mostramos
          loginErrors.map((err) => (
            <p className="bg-red-500 text-white p-2 text-center">{err}</p>
          ))}

        <h1 className="text-4xl font-bold my-2 text-center">Iniciar Sesion</h1> {/* Título de la página de inicio de sesión */}

        <form onSubmit={onSubmit}> {/* Formulario de inicio de sesión */}
          <Label htmlFor="email">Correo</Label> {/* Etiqueta para el campo de correo electrónico */}
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>} {/* Mensaje de error para el campo de correo electrónico */}

          <Label htmlFor="password">Contraseña</Label> {/* Etiqueta para el campo de contraseña */}
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )} {/* Mensaje de error para el campo de contraseña */}

          <Button>Iniciar Sesion</Button> {/* Botón para enviar el formulario de inicio de sesión */}

          <div className="flex justify-between my-4"> {/* Enlace para registrarse si no tiene una cuenta */}
            <p className="mr-4">No tiene una cuenta?</p>
            <Link to="/register" className="font-bold">
              Registro
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
