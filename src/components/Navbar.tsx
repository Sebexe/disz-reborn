import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">DISz</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/estimacion">Estimación</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/ensayo">Ensayo</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/comparacion">Comparación</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/chi">Chi-Cuadrado</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/regresion">Regresión</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
