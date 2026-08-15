import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularBeta,
  calcularMuestraRequerida,
  calcularValorRechazo,
} from "../../utils/ComparacionEnsayo/comparar-ensayo-varianza";
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

export default function CompararEnsayoVarianza() {
  const [opcion, setOpcion] = useState("1");
  const [muestra1, setMuestra1] = useState("");
  const [muestra2, setMuestra2] = useState("");
  const [alfa, setAlfa] = useState("");
  const [phi, setPhi] = useState("");
  const [phi1, setPhi1] = useState("");
  const [phi2, setPhi2] = useState("");
  const [beta, setBeta] = useState("");
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

    const parsedMuestra1 = parseFloat(muestra1);
    const parsedMuestra2 = parseFloat(muestra2);
    const parsedAlfa = parseFloat(alfa);
    const parsedPhi = parseFloat(phi);
    const parsedPhi1 = parseFloat(phi1);
    const parsedPhi2 = parseFloat(phi2);
    const parsedBeta = parseFloat(beta);
    const parsedCola = parseInt(cola, 10);

    if (opcion === "1") {
      try {
        const valorRechazo = calcularValorRechazo({
          muestra1: parsedMuestra1,
          muestra2: parsedMuestra2,
          alfa: parsedAlfa,
          cola: parsedCola,
          phi: parsedPhi,
          esVarianza,
        });
        if (valorRechazo.valorCritico1 && valorRechazo.valorCritico2) {
          setResultado(
            `Valor crítico 1: ${valorRechazo.valorCritico1.toFixed(
              5
            )}, Valor crítico 2: ${valorRechazo.valorCritico2.toFixed(5)}`
          );
        } else if (valorRechazo.valorCritico) {
          setResultado(`Valor crítico: ${valorRechazo.valorCritico.toFixed(5)}`);
        }
      } catch (_error) {
        setResultado("Valor de cola inválido");
      }
    } else if (opcion === "2") {
      const betaResult = calcularBeta({
        phi1: parsedPhi1,
        phi2: parsedPhi2,
        alfa: parsedAlfa,
        muestra1: parsedMuestra1,
        muestra2: parsedMuestra2,
        cola: parsedCola,
        esVarianza,
      });
      setResultado(
        `Beta: ${betaResult.beta.toFixed(5)}, Poder de ensayo: ${betaResult.poderEnsayo.toFixed(5)}`
      );
    } else if (opcion === "3") {
      const muestra = calcularMuestraRequerida({
        phi1: parsedPhi1,
        phi2: parsedPhi2,
        alfa: parsedAlfa,
        beta: parsedBeta,
        esVarianza,
      });
      setResultado(
        `Grados de libertad (v): ${muestra.v}, Tamaño de muestra requerido (n): ${muestra.n}`
      );
    } else if (opcion === "4") {
      const valorRechazo = calcularValorRechazo({
        muestra1: parsedMuestra1,
        muestra2: parsedMuestra2,
        alfa: 0.1,
        cola: 1,
        phi: 1,
        esVarianza: false,
      });
      if (valorRechazo.valorCritico) {
        setResultado(
          `El valor de rechazo es: ${valorRechazo.valorCritico.toFixed(
            5
          )}, si es mayor significa que son distintos.`
        );
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
            Comparar Ensayo Varianza
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
                  <SelectItem value="1">Calcular Valor de Rechazo</SelectItem>
                  <SelectItem value="2">Calcular Beta</SelectItem>
                  <SelectItem value="3">Calcular Muestra Requerida</SelectItem>
                  <SelectItem value="4">Verificar Desigualdad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(opcion === "1" || opcion === "2" || opcion === "3") && (
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
                <div className="space-y-2">
                  <Label htmlFor="cola">Tipo de Cola</Label>
                  <Select value={cola} onValueChange={setCola}>
                    <SelectTrigger id="cola">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Cola derecha (≤)</SelectItem>
                      <SelectItem value="2">Cola izquierda (≥)</SelectItem>
                      <SelectItem value="3">Cola bilateral (=)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {(opcion === "1" || opcion === "2" || opcion === "4") && (
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
              </>
            )}

            {opcion === "1" && (
              <div className="space-y-2">
                <Label htmlFor="phi">Phi (valor)</Label>
                <Input
                  id="phi"
                  type="number"
                  placeholder="0.0"
                  value={phi}
                  onChange={handleInputChange(setPhi)}
                  required
                />
              </div>
            )}

            {(opcion === "2" || opcion === "3") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phi1">Phi 1</Label>
                  <Input
                    id="phi1"
                    type="number"
                    placeholder="0.0"
                    value={phi1}
                    onChange={handleInputChange(setPhi1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phi2">Phi 2</Label>
                  <Input
                    id="phi2"
                    type="number"
                    placeholder="0.0"
                    value={phi2}
                    onChange={handleInputChange(setPhi2)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "3" && (
              <div className="space-y-2">
                <Label htmlFor="beta">Beta</Label>
                <Input
                  id="beta"
                  type="number"
                  placeholder="0.2"
                  step="0.01"
                  value={beta}
                  onChange={handleInputChange(setBeta)}
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
