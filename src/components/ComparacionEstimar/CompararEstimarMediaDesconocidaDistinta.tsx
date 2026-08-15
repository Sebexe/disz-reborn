import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularLimites,
  calcularMuestraRequerida,
} from "../../utils/ComparacionEstimar/comparar-estimar-media-varianza-desconocida-distinta";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export default function CompararEstimarMediaDesconocidaDistinta() {
  const [opcion, setOpcion] = useState("1");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [desvio1, setDesvio1] = useState("");
  const [desvio2, setDesvio2] = useState("");
  const [media1, setMedia1] = useState("");
  const [media2, setMedia2] = useState("");
  const [alfa, setAlfa] = useState("");
  const [error, setError] = useState("");
  const [esVarianza, setEsVarianza] = useState(true);
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleCheckboxChange = (checked: boolean) => {
    setEsVarianza(checked);
  };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedN1 = parseFloat(n1);
    const parsedN2 = parseFloat(n2);
    const parsedDesvio1 = parseFloat(desvio1);
    const parsedDesvio2 = parseFloat(desvio2);
    const parsedMedia1 = parseFloat(media1);
    const parsedMedia2 = parseFloat(media2);
    const parsedAlfa = parseFloat(alfa);
    const parsedError = parseFloat(error);

    if (opcion === "1") {
      try {
        const limites = calcularLimites({
          n1: parsedN1,
          n2: parsedN2,
          desvio1: parsedDesvio1,
          desvio2: parsedDesvio2,
          media1: parsedMedia1,
          media2: parsedMedia2,
          alfa: parsedAlfa,
          esVarianza,
        });
        setResultado(
          `Límite inferior: ${limites.limiteInferior}, Límite superior: ${limites.limiteSuperior}, Error muestral: ${limites.errorMuestral}`
        );
      } catch (_error) {
        setResultado("Error al calcular los límites");
      }
    } else if (opcion === "2") {
      try {
        const muestraRequerida = calcularMuestraRequerida({
          desvio1: parsedDesvio1,
          desvio2: parsedDesvio2,
          alfa: parsedAlfa,
          error: parsedError,
          esVarianza,
        });
        setResultado(`Muestra requerida: ${muestraRequerida.n}`);
      } catch (_error) {
        setResultado("Error al calcular la muestra requerida");
      }
    } else {
      setResultado("Opción inválida");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Comparar Estimar Media Varianza Desconocida Distinta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalcular} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="opcion">Tipo de Cálculo</Label>
              <Select value={opcion} onValueChange={setOpcion}>
                <SelectTrigger id="opcion">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Calcular Límites</SelectItem>
                  <SelectItem value="2">Calcular Muestra Requerida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alfa">Nivel de significancia (alfa)</Label>
              <Input
                id="alfa"
                type="number"
                placeholder="0.05"
                step="0.01"
                value={alfa}
                onChange={handleInputChange(setAlfa)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="esVarianza"
                checked={esVarianza}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="esVarianza" className="font-normal cursor-pointer">
                Es varianza
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="n1">Muestra 1 (n1)</Label>
              <Input
                id="n1"
                type="number"
                placeholder="0"
                value={n1}
                onChange={handleInputChange(setN1)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="n2">Muestra 2 (n2)</Label>
              <Input
                id="n2"
                type="number"
                placeholder="0"
                value={n2}
                onChange={handleInputChange(setN2)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desvio1">Desviación 1</Label>
              <Input
                id="desvio1"
                type="number"
                placeholder="0.0"
                value={desvio1}
                onChange={handleInputChange(setDesvio1)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desvio2">Desviación 2</Label>
              <Input
                id="desvio2"
                type="number"
                placeholder="0.0"
                value={desvio2}
                onChange={handleInputChange(setDesvio2)}
                required
              />
            </div>

            {opcion === "1" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="media1">Media 1</Label>
                  <Input
                    id="media1"
                    type="number"
                    placeholder="0.0"
                    value={media1}
                    onChange={handleInputChange(setMedia1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media2">Media 2</Label>
                  <Input
                    id="media2"
                    type="number"
                    placeholder="0.0"
                    value={media2}
                    onChange={handleInputChange(setMedia2)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "2" && (
              <div className="space-y-2">
                <Label htmlFor="error">Error muestral deseado</Label>
                <Input
                  id="error"
                  type="number"
                  placeholder="0.0"
                  value={error}
                  onChange={handleInputChange(setError)}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Calcular
            </Button>
          </form>

          {resultado && (
            <div className="mt-4 p-4 bg-muted rounded-lg border">
              <strong>Resultado:</strong>
              <p className="text-sm mt-2">{resultado}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
