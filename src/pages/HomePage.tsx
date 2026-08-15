import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function HomePage() {
  const sections = [
    {
      title: "Estimación de Parámetros",
      description: "Estimación puntual e intervalar de parámetros poblacionales",
      href: "/estimacion",
    },
    {
      title: "Ensayo de Hipótesis",
      description: "Pruebas de hipótesis para diferentes tipos de parámetros",
      href: "/ensayo",
    },
    {
      title: "Comparación",
      description: "Comparación entre dos muestras (estimación y ensayo)",
      href: "/comparacion",
    },
    {
      title: "Chi-Cuadrado",
      description: "Pruebas de bondad de ajuste y consistencia",
      href: "/chi",
    },
    {
      title: "Regresión Lineal",
      description: "Análisis de regresión lineal dinámica",
      href: "/regresion",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">DISz - Herramienta de Análisis Estadístico</h1>
        <p className="text-xl text-muted-foreground">
          Realiza pruebas estadísticas y análisis con facilidad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card key={section.href} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={section.href}>Ir a {section.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
