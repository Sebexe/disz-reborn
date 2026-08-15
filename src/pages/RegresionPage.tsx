import { useLocation, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import RegresionLinealDinamica from "../components/Regresion/RegresionLinealDinamica";

export default function RegresionPage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPath = pathSegments[pathSegments.length - 1];

  const menuItems = [
    { path: "dinamica", label: "Regresión Lineal Dinámica", component: <RegresionLinealDinamica /> },
  ];

  const renderContent = () => {
    const item = menuItems.find(m => m.path === currentPath);
    return item ? item.component : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Regresión Lineal</h1>

      <div className="flex flex-col gap-2 max-w-md mb-8">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            asChild
            variant={currentPath === item.path ? "default" : "outline"}
            className="justify-start"
          >
            <Link to={`/regresion/${item.path}`}>{item.label}</Link>
          </Button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
