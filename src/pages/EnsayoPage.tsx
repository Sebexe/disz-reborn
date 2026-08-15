import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import EnsayoMedia from "../components/EnsayoParametros/EnsayoMedia";
import EnsayoBernoulli from "../components/EnsayoParametros/EnsayoBernoulli";
import EnsayoVarianza from "../components/EnsayoParametros/EnsayoVarianza";

export default function EnsayoPage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPath = pathSegments[pathSegments.length - 1];

  const menuItems = [
    { path: "media", label: "Media" },
    { path: "bernoulli", label: "Bernoulli" },
    { path: "varianza", label: "Varianza" },
  ];

  const renderContent = () => {
    switch (currentPath) {
      case "media":
        return <EnsayoMedia />;
      case "bernoulli":
        return <EnsayoBernoulli />;
      case "varianza":
        return <EnsayoVarianza />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              Selecciona un tipo de ensayo
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ensayo de Hipótesis</h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            asChild
            variant={currentPath === item.path ? "default" : "outline"}
          >
            <Link to={`/ensayo/${item.path}`}>{item.label}</Link>
          </Button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
