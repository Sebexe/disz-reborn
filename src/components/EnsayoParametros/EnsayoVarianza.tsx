import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularBeta,
  calcularCondicionRechazo,
  tanteadorDeGarcia,
} from "../../utils/EnsayoParametros/ensayo-varianza";
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

export default function EnsayoVarianza() {
  const [opcion, setOpcion] = useState("1");
  const [sigmaValor, setSigmaValor] = useState("");
  const [muestra, setMuestra] = useState("");
  const [alpha, setAlpha] = useState("");
  const [sigmaValorReal, setSigmaValorReal] = useState("");
  const [valorAlpha, setValorAlpha] = useState("");
  const [valorBeta, setValorBeta] = useState("");
  const [sigmaValorCritico, setSigmaValorCritico] = useState("");
  const [esVarianza, setEsVarianza] = useState(true);
  const [tipoCola, setTipoCola] = useState<"izquierda >=" | "derecha <=">("izquierda >=");
  const [resultado, setResultado] = useState("");
  const [valorRechazo, setValorRechazo] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
      };

  const handleCheckboxChange = (checked: boolean) => {
    setEsVarianza(checked);
  };

  const handleTipoCola = (value: string) => {
    setTipoCola(value as "izquierda >=" | "derecha <=");
  };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedSigmaValor = parseFloat(sigmaValor);
    const parsedMuestra = parseFloat(muestra);
    const parsedAlpha = parseFloat(alpha);
    const parsedSigmaValorReal = parseFloat(sigmaValorReal);
    const parsedValorAlpha = parseFloat(valorAlpha);
    const parsedValorBeta = parseFloat(valorBeta);
    const parsedSigmaValorCritico = parseFloat(sigmaValorCritico);
    const parsedSigmaValorRechazo = parseFloat(valorRechazo);

    if (opcion === "1") {
      const condicion = calcularCondicionRechazo({
        sigmaValor: parsedSigmaValor,
        muestra: parsedMuestra,
        alpha: parsedAlpha,
        esVarianza,
        tipoCola,
      });
      setResultado(`Condición de rechazo: ${condicion.toFixed(8)}`);
    } else if (opcion === "2") {
      const beta = calcularBeta({
        sigmaValor: parsedSigmaValorRechazo,
        sigmaValorReal: parsedSigmaValorReal,
        muestra: parsedMuestra,
        esVarianza,
        tipoCola,
      });
      setResultado(
        `Error tipo 2 (Beta): ${beta.errorTipo2.toFixed(8)}, Poder de prueba: ${beta.poderPrueba.toFixed(
          8
        )}`
      );
    } else if (opcion === "3") {
      const garcia = tanteadorDeGarcia({
        valorAlpha: parsedValorAlpha,
        valorBeta: parsedValorBeta,
        sigmaValorCritico: parsedSigmaValorCritico,
        sigmaValorReal: parsedSigmaValorReal,
        esVarianza,
      });
      setResultado(
        `Grados de libertad: ${garcia.gradosLibertad}, Tamaño de muestra requerido: ${garcia.tamanoMuestra}`
      );
    } else {
      setResultado("Opción inválida");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Ensayo Varianza</CardTitle>
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
                  <SelectItem value="1">Calcular condición de rechazo</SelectItem>
                  <SelectItem value="2">Calcular Beta (Error tipo 2)</SelectItem>
                  <SelectItem value="3">Tanteador de Garcia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {opcion === "2" && (
              <div className="space-y-2">
                <Label htmlFor="valorRechazo">Valor rechazo</Label>
                <Input
                  id="valorRechazo"
                  type="number"
                  placeholder="0.0"
                  value={valorRechazo}
                  onChange={handleInputChange(setValorRechazo)}
                  required
                />
              </div>
            )}

            {opcion === "1" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="sigmaValor">Sigma (valor)</Label>
                  <Input
                    id="sigmaValor"
                    type="number"
                    placeholder="0.0"
                    value={sigmaValor}
                    onChange={handleInputChange(setSigmaValor)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muestra">Tamaño de la muestra</Label>
                  <Input
                    id="muestra"
                    type="number"
                    placeholder="0"
                    value={muestra}
                    onChange={handleInputChange(setMuestra)}
                    required
                  />
                </div>
              </>
            )}

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
              <Label htmlFor="tipoCola">Tipo de Cola</Label>
              <Select value={tipoCola} onValueChange={handleTipoCola}>
                <SelectTrigger id="tipoCola">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="izquierda >=">Izquierda ≥</SelectItem>
                  <SelectItem value="derecha <=">Derecha ≤</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(opcion === "1" || opcion === "2") && (
              <div className="space-y-2">
                <Label htmlFor="alpha">Alpha (nivel de significancia)</Label>
                <Input
                  id="alpha"
                  type="number"
                  placeholder="0.05"
                  step="0.01"
                  value={alpha}
                  onChange={handleInputChange(setAlpha)}
                  required
                />
              </div>
            )}

            {(opcion === "2" || opcion === "3") && (
              <div className="space-y-2">
                <Label htmlFor="sigmaValorReal">Sigma valor real</Label>
                <Input
                  id="sigmaValorReal"
                  type="number"
                  placeholder="0.0"
                  value={sigmaValorReal}
                  onChange={handleInputChange(setSigmaValorReal)}
                  required
                />
              </div>
            )}

            {opcion === "3" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="valorAlpha">Valor Alpha</Label>
                  <Input
                    id="valorAlpha"
                    type="number"
                    placeholder="0.05"
                    step="0.01"
                    value={valorAlpha}
                    onChange={handleInputChange(setValorAlpha)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorBeta">Valor Beta</Label>
                  <Input
                    id="valorBeta"
                    type="number"
                    placeholder="0.2"
                    step="0.01"
                    value={valorBeta}
                    onChange={handleInputChange(setValorBeta)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sigmaValorCritico">Sigma valor crítico</Label>
                  <Input
                    id="sigmaValorCritico"
                    type="number"
                    placeholder="0.0"
                    value={sigmaValorCritico}
                    onChange={handleInputChange(setSigmaValorCritico)}
                    required
                  />
                </div>
              </>
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
