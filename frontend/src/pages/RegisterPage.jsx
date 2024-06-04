import { Button, Card, Container, Input, Label } from "../components/ui"; // Importamos componentes de interfaz de usuario
import { useForm } from "react-hook-form"; // Importamos el hook useForm para manejar formularios
import { Link, useNavigate } from "react-router-dom"; // Importamos Link y useNavigate de react-router-dom para la navegación
import { useAuth } from "../context/AuthContext"; // Importamos el hook useAuth del contexto de autenticación

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Configuramos el hook useForm para manejar el formulario
  const { signup, errors: signupErrors } = useAuth(); // Obtenemos la función de registro y los errores del contexto de autenticación
  const navigate = useNavigate(); // Obtenemos la función de navegación

  const onSubmit = handleSubmit(async (data) => { // Función para manejar el envío del formulario
    const user = await signup(data); // Llamamos a la función de registro con los datos del formulario

    if (user) navigate("/tasks"); // Si el registro es exitoso, redirigimos al usuario a la página de tareas
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center"> 
      <Card> 
        {signupErrors && // Mostramos errores de registro si los hay
          signupErrors.map((err) => (
            <p className="bg-red-500 text-white p-2 text-center">{err}</p>
          ))}

        <h3 className="text-2xl font-bold">Registro</h3> 
        <form onSubmit={onSubmit}> 
          <Label htmlFor="name">Nombre</Label> 
          <Input
            placeholder="Enter your fullname"
            {...register("name", {
              required: true,
            })}
          />

          {errors.name && <p className="text-red-500">name is required</p>} 

          <Label htmlFor="email">Correo</Label> 
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="text-red-500">El correo es requerido</p>} 
          <Label htmlFor="password">Contraseña</Label> 
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Contraseña requerida</p>
          )} 

          <Button>Registrar</Button> 

          <div className="flex justify-between my-4"> 
            <p className="mr-4">Ya tiene una cuenta?</p>
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </div>
        </form>
      </Card>
    </Container>
  );
}

export default RegisterPage;
