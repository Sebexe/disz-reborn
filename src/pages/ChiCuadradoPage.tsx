import { useLocation, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import BondadDeAjuste from "../components/ChiCuadrado/BondadDeAjuste";
import BondadDeAjusteBinomial from "../components/ChiCuadrado/BondadDeAjusteBinomial";
import BondadDeAjustePoisson from "../components/ChiCuadrado/BondadDeAjustePoisson";
import BondadDeAjusteGamma from "../components/ChiCuadrado/BondadDeAjusteGamma";
import BondadDeAjusteLogNormal from "../components/ChiCuadrado/BondadDeAjusteLogNormal";
import PruebaDeConsistencia from "../components/ChiCuadrado/PruebaDeConsistencia";

export default function ChiCuadradoPage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPath = pathSegments[pathSegments.length - 1];

  const menuItems = [
    { path: "normal", label: "Bondad de Ajuste - Normal", component: <BondadDeAjuste /> },
    { path: "binomial", label: "Bondad de Ajuste - Binomial", component: <BondadDeAjusteBinomial /> },
    { path: "poisson", label: "Bondad de Ajuste - Poisson", component: <BondadDeAjustePoisson /> },
    { path: "gamma", label: "Bondad de Ajuste - Gamma", component: <BondadDeAjusteGamma /> },
    { path: "logNormal", label: "Bondad de Ajuste - Log Normal", component: <BondadDeAjusteLogNormal /> },
    { path: "consistencia", label: "Prueba de Consistencia", component: <PruebaDeConsistencia /> },
  ];

  const renderContent = () => {
    const item = menuItems.find(m => m.path === currentPath);
    return item ? item.component : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Chi-Cuadrado</h1>

      <div className="flex flex-col gap-2 max-w-md mb-8">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            asChild
            variant={currentPath === item.path ? "default" : "outline"}
            className="justify-start"
          >
            <Link to={`/chi/${item.path}`}>{item.label}</Link>
          </Button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
