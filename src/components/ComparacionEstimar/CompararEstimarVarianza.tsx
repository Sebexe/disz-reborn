import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularLimites,
  calcularMuestraRequerida,
} from "../../utils/ComparacionEstimar/comparar-estimar-varianza";
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

export default function CompararEstimarVarianza() {
  const [opcion, setOpcion] = useState("1");
  const [muestra1, setMuestra1] = useState("");
  const [muestra2, setMuestra2] = useState("");
  const [varianza1, setVarianza1] = useState("");
  const [varianza2, setVarianza2] = useState("");
  const [alfa, setAlfa] = useState("");
  const [relacionR, setRelacionR] = useState("");
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

    const parsedMuestra1 = parseFloat(muestra1);
    const parsedMuestra2 = parseFloat(muestra2);
    const parsedVarianza1 = parseFloat(varianza1);
    const parsedVarianza2 = parseFloat(varianza2);
    const parsedAlfa = parseFloat(alfa);
    const parsedRelacionR = parseFloat(relacionR);

    if (opcion === "1") {
      const limites = calcularLimites({
        muestra1: parsedMuestra1,
        muestra2: parsedMuestra2,
        varianza1: parsedVarianza1,
        varianza2: parsedVarianza2,
        alfa: parsedAlfa,
        esVarianza,
      });
      setResultado(
        `Límite inferior: ${limites.limiteInferior}, Límite superior: ${limites.limiteSuperior}, Relación R: ${limites.relacionR}`
      );
    } else if (opcion === "2") {
      const muestra = calcularMuestraRequerida({
        relacionR: parsedRelacionR,
        alfa: parsedAlfa,
        esVarianza,
      });
      setResultado(
        `Grados de libertad (v): ${muestra.v}, Tamaño de muestra requerido (n): ${muestra.n}`
      );
    } else {
      setResultado("Opción inválida");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Comparar y Estimar Varianza
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

            {(opcion === "1" || opcion === "2") && (
              <>
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
              </>
            )}

            {opcion === "1" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="muestra1">Muestra 1</Label>
                  <Input
                    id="muestra1"
                    type="number"
                    placeholder="0"
                    value={muestra1}
                    onChange={handleInputChange(setMuestra1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muestra2">Muestra 2</Label>
                  <Input
                    id="muestra2"
                    type="number"
                    placeholder="0"
                    value={muestra2}
                    onChange={handleInputChange(setMuestra2)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="varianza1">Varianza 1</Label>
                  <Input
                    id="varianza1"
                    type="number"
                    placeholder="0.0"
                    value={varianza1}
                    onChange={handleInputChange(setVarianza1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="varianza2">Varianza 2</Label>
                  <Input
                    id="varianza2"
                    type="number"
                    placeholder="0.0"
                    value={varianza2}
                    onChange={handleInputChange(setVarianza2)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "2" && (
              <div className="space-y-2">
                <Label htmlFor="relacionR">Relación R</Label>
                <Input
                  id="relacionR"
                  type="number"
                  placeholder="0.0"
                  value={relacionR}
                  onChange={handleInputChange(setRelacionR)}
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
