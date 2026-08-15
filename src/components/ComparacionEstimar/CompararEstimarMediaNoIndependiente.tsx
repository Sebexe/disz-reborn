import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularLimites,
  calcularMuestra,
} from "../../utils/ComparacionEstimar/comparar-estimar-media-no-independiente";
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

export default function CompararEstimarMediaNoIndependiente() {
  const [opcion, setOpcion] = useState("1");
  const [dRaya, setDRaya] = useState("");
  const [desvioD, setDesvioD] = useState("");
  const [n, setN] = useState("");
  const [alfa, setAlfa] = useState("");
  const [errorBuscado, setErrorBuscado] = useState("");
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

    const parsedDRaya = parseFloat(dRaya);
    const parsedDesvioD = parseFloat(desvioD);
    const parsedN = parseInt(n, 10);
    const parsedAlfa = parseFloat(alfa);
    const parsedErrorBuscado = parseFloat(errorBuscado);

    if (opcion === "1") {
      try {
        const limites = calcularLimites({
          dRaya: parsedDRaya,
          desvioD: parsedDesvioD,
          n: parsedN,
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
        const muestra = calcularMuestra({
          errorBuscado: parsedErrorBuscado,
          alfa: parsedAlfa,
          desvioD: parsedDesvioD,
          esVarianza,
        });
        setResultado(`Muestra requerida: ${muestra.n}`);
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
            Comparar Estimar Media No Independiente
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
              <Label htmlFor="desvioD">Desvio Estandar</Label>
              <Input
                id="desvioD"
                type="number"
                placeholder="0.0"
                value={desvioD}
                onChange={handleInputChange(setDesvioD)}
                required
              />
            </div>

            {opcion === "1" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dRaya">Valor de d̅</Label>
                  <Input
                    id="dRaya"
                    type="number"
                    placeholder="0.0"
                    value={dRaya}
                    onChange={handleInputChange(setDRaya)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n1">Tamaño de la muestra (n)</Label>
                  <Input
                    id="n1"
                    type="number"
                    placeholder="0"
                    value={n}
                    onChange={handleInputChange(setN)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "2" && (
              <div className="space-y-2">
                <Label htmlFor="errorBuscado">Error muestral deseado</Label>
                <Input
                  id="errorBuscado"
                  type="number"
                  placeholder="0.0"
                  value={errorBuscado}
                  onChange={handleInputChange(setErrorBuscado)}
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
