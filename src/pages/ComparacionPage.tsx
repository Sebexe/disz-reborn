import { useLocation } from "react-router-dom";
import CompararEnsayoMediaConocida from "../components/ComparacionEnsayo/CompararEnsayoMediaConocida";
import CompararEnsayoMediaDesconocidaIgual from "../components/ComparacionEnsayo/CompararEnsayoMediaDesconocidaIgual";
import CompararEnsayoMediaDesconocidaDistinta from "../components/ComparacionEnsayo/CompararEnsayoMediaDesconocidaDistinta";
import CompararEnsayoMediaNoIndependiente from "../components/ComparacionEnsayo/CompararEnsayoMediaNoIndependiente";
import CompararEnsayoVarianza from "../components/ComparacionEnsayo/CompararEnsayoVarianza";
import CompararEstimarMediaConocida from "../components/ComparacionEstimar/CompararEstimarMediaConocida";
import CompararEstimarMediaDesconocidaIgual from "../components/ComparacionEstimar/CompararEstimarMediaDesconocidaIgual";
import CompararEstimarMediaDesconocidaDistinta from "../components/ComparacionEstimar/CompararEstimarMediaDesconocidaDistinta";
import CompararEstimarMediaNoIndependiente from "../components/ComparacionEstimar/CompararEstimarMediaNoIndependiente";
import CompararEstimarVarianza from "../components/ComparacionEstimar/CompararEstimarVarianza";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function ComparacionPage() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const category = pathSegments[1]; // ensayo or estimar
  const subPath = pathSegments[2]; // specific component

  const ensayoMap: Record<string, JSX.Element> = {
    "media-varianza-conocida": <CompararEnsayoMediaConocida />,
    "media-varianza-desconocida-igual": <CompararEnsayoMediaDesconocidaIgual />,
    "media-varianza-desconocida-distinta": <CompararEnsayoMediaDesconocidaDistinta />,
    "media-no-independiente": <CompararEnsayoMediaNoIndependiente />,
    "varianza": <CompararEnsayoVarianza />,
  };

  const estimarMap: Record<string, JSX.Element> = {
    "media-varianza-conocida": <CompararEstimarMediaConocida />,
    "media-varianza-desconocida-igual": <CompararEstimarMediaDesconocidaIgual />,
    "media-varianza-desconocida-distinta": <CompararEstimarMediaDesconocidaDistinta />,
    "media-no-independiente": <CompararEstimarMediaNoIndependiente />,
    "varianza": <CompararEstimarVarianza />,
  };

  const renderContent = () => {
    if (category === "ensayo" && subPath) {
      return ensayoMap[subPath] || <div className="text-center py-12">Componente no encontrado</div>;
    }
    if (category === "estimar" && subPath) {
      return estimarMap[subPath] || <div className="text-center py-12">Componente no encontrado</div>;
    }
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-6">
          Selecciona una comparación
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Comparación</h1>

      <Tabs defaultValue="ensayo" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="ensayo">Ensayo</TabsTrigger>
          <TabsTrigger value="estimar">Estimar</TabsTrigger>
        </TabsList>

        <TabsContent value="ensayo" className="mt-8">
          <div className="grid gap-4 max-w-2xl">
            <div className="space-y-2">
              <h3 className="font-semibold">Selecciona un tipo de comparación:</h3>
              <div className="flex flex-col gap-2">
                <a href="/comparacion/ensayo/media-varianza-conocida" className="text-sm text-primary hover:underline">Media - Varianza Conocida</a>
                <a href="/comparacion/ensayo/media-varianza-desconocida-igual" className="text-sm text-primary hover:underline">Media - Varianza Desconocida Igual</a>
                <a href="/comparacion/ensayo/media-varianza-desconocida-distinta" className="text-sm text-primary hover:underline">Media - Varianza Desconocida Distinta</a>
                <a href="/comparacion/ensayo/media-no-independiente" className="text-sm text-primary hover:underline">Media - No Independiente</a>
                <a href="/comparacion/ensayo/varianza" className="text-sm text-primary hover:underline">Varianza</a>
              </div>
            </div>
            {category === "ensayo" && subPath && renderContent()}
          </div>
        </TabsContent>

        <TabsContent value="estimar" className="mt-8">
          <div className="grid gap-4 max-w-2xl">
            <div className="space-y-2">
              <h3 className="font-semibold">Selecciona un tipo de comparación:</h3>
              <div className="flex flex-col gap-2">
                <a href="/comparacion/estimar/media-varianza-conocida" className="text-sm text-primary hover:underline">Media - Varianza Conocida</a>
                <a href="/comparacion/estimar/media-varianza-desconocida-igual" className="text-sm text-primary hover:underline">Media - Varianza Desconocida Igual</a>
                <a href="/comparacion/estimar/media-varianza-desconocida-distinta" className="text-sm text-primary hover:underline">Media - Varianza Desconocida Distinta</a>
                <a href="/comparacion/estimar/media-no-independiente" className="text-sm text-primary hover:underline">Media - No Independiente</a>
                <a href="/comparacion/estimar/varianza" className="text-sm text-primary hover:underline">Varianza</a>
              </div>
            </div>
            {category === "estimar" && subPath && renderContent()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
