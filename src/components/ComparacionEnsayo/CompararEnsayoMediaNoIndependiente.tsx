import { useState, type ChangeEvent, type FormEvent } from "react";
import { calcularValorCritico } from "../../utils/ComparacionEnsayo/comparar-ensayo-media-no-independiente";
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

export default function CompararEnsayoMediaNoIndependiente() {
  const [n, setN] = useState("");
  const [alfa, setAlfa] = useState("");
  const [desvioD, setDesvioD] = useState("");
  const [deltaO, setDeltaO] = useState("");
  const [cola, setCola] = useState("1");
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

    const parsedN = parseFloat(n);
    const parsedAlfa = parseFloat(alfa);
    const parsedDesvioD = parseFloat(desvioD);
    const parsedDeltaO = parseFloat(deltaO);
    const parsedCola = parseInt(cola, 10);

    try {
      const valorCritico = calcularValorCritico({
        n: parsedN,
        alfa: parsedAlfa,
        desvioD: parsedDesvioD,
        deltaO: parsedDeltaO,
        cola: parsedCola,
        esVarianza,
      });
      setResultado(`Valor crítico: ${valorCritico.valorCritico}`);
    } catch (_error) {
      setResultado("Error: Valor de cola inválido");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Comparar Ensayo No Independiente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalcular} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="n">Tamaño de la muestra (n)</Label>
              <Input
                id="n"
                type="number"
                placeholder="0"
                value={n}
                onChange={handleInputChange(setN)}
                required
              />
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

            <div className="space-y-2">
              <Label htmlFor="desvioD">Desviación D</Label>
              <Input
                id="desvioD"
                type="number"
                placeholder="0.0"
                value={desvioD}
                onChange={handleInputChange(setDesvioD)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deltaO">Delta O</Label>
              <Input
                id="deltaO"
                type="number"
                placeholder="0.0"
                value={deltaO}
                onChange={handleInputChange(setDeltaO)}
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
              <Label htmlFor="cola">Tipo de Cola</Label>
              <Select value={cola} onValueChange={setCola}>
                <SelectTrigger id="cola">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Cola derecha (≤)</SelectItem>
                  <SelectItem value="2">Cola izquierda (≥)</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
