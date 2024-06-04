import { useAuth } from "../context/AuthContext"; // Importamos el hook useAuth del contexto de autenticación

function ProfilePage() {
  const { user } = useAuth(); // Obtenemos el usuario del contexto de autenticación

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre> {/* Mostramos la información del usuario en formato JSON*/}
    </div>
  );
}

export default ProfilePage;
