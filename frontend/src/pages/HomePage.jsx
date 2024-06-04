import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui";

function HomePage() {
  const data = useAuth();
  console.log(data);

  return <div>

    <Card>
      <h1 className="text-3xl font-bold my-4">Pagina de Inicio</h1>
      <p>Prueba de desarrollo</p>
    </Card>

  </div>;
}

export default HomePage;
