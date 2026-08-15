import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularLimitesConDesvio,
  calcularLimitesConVarianza,
  tanteadorDeGarcia,
} from "../../utils/EstimarParametros/estimar-varianza";
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

export default function EstimarVarianza() {
  const [opcion, setOpcion] = useState("1");
  const [muestra, setMuestra] = useState("");
  const [varianza, setVarianza] = useState("");
  const [desvioEstandar, setDesvioEstandar] = useState("");
  const [nivelConfianza, setNivelConfianza] = useState("");
  const [valorR, setValorR] = useState("");
  const [valorAlpha, setValorAlpha] = useState("");
  const [rprima, setRprima] = useState(false);
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleCheckboxChange = (checked: boolean) => {
    setRprima(checked);
  };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedMuestra = parseFloat(muestra);
    const parsedVarianza = parseFloat(varianza);
    const parsedDesvioEstandar = parseFloat(desvioEstandar);
    const parsedNivelConfianza = parseFloat(nivelConfianza);
    const parsedValorR = parseFloat(valorR);
    const parsedValorAlpha = parseFloat(valorAlpha);

    if (opcion === "1") {
      const limites = calcularLimitesConVarianza({
        muestra: parsedMuestra,
        varianza: parsedVarianza,
        nivelConfianza: parsedNivelConfianza,
      });
      setResultado(
        `Límite inferior: ${limites.limiteInferior.toFixed(
          8
        )}, Límite superior: ${limites.limiteSuperior.toFixed(8)}`
      );
    } else if (opcion === "2") {
      const limites = calcularLimitesConDesvio({
        muestra: parsedMuestra,
        desvioEstandar: parsedDesvioEstandar,
        nivelConfianza: parsedNivelConfianza,
      });
      setResultado(
        `Límite inferior: ${limites.limiteInferior.toFixed(
          8
        )}, Límite superior: ${limites.limiteSuperior.toFixed(8)}`
      );
    } else if (opcion === "3") {
      const gradosLibertad = tanteadorDeGarcia({
        valorR: parsedValorR,
        valorAlpha: parsedValorAlpha,
        rprima,
      });
      setResultado(`Numero de muestras: ${gradosLibertad}`);
    } else {
      setResultado("Opción inválida");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Estimar Varianza</CardTitle>
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
                  <SelectItem value="1">Calcular límites con varianza</SelectItem>
                  <SelectItem value="2">Calcular límites con desvio estándar</SelectItem>
                  <SelectItem value="3">Tanteador de Garcia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {opcion === "1" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="muestra1">Tamaño de la muestra</Label>
                  <Input
                    id="muestra1"
                    type="number"
                    placeholder="0"
                    value={muestra}
                    onChange={handleInputChange(setMuestra)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="varianza">Varianza de la muestra</Label>
                  <Input
                    id="varianza"
                    type="number"
                    placeholder="0.0"
                    value={varianza}
                    onChange={handleInputChange(setVarianza)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivelConfianza1">
                    Nivel de confianza (ej: 0.95)
                  </Label>
                  <Input
                    id="nivelConfianza1"
                    type="number"
                    placeholder="0.95"
                    step="0.01"
                    value={nivelConfianza}
                    onChange={handleInputChange(setNivelConfianza)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "2" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="muestra2">Tamaño de la muestra</Label>
                  <Input
                    id="muestra2"
                    type="number"
                    placeholder="0"
                    value={muestra}
                    onChange={handleInputChange(setMuestra)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desvioEstandar">
                    Desvio estándar de la muestra
                  </Label>
                  <Input
                    id="desvioEstandar"
                    type="number"
                    placeholder="0.0"
                    value={desvioEstandar}
                    onChange={handleInputChange(setDesvioEstandar)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivelConfianza2">
                    Nivel de confianza (ej: 0.95)
                  </Label>
                  <Input
                    id="nivelConfianza2"
                    type="number"
                    placeholder="0.95"
                    step="0.01"
                    value={nivelConfianza}
                    onChange={handleInputChange(setNivelConfianza)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "3" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="valorR">Valor R</Label>
                  <Input
                    id="valorR"
                    type="number"
                    placeholder="0.0"
                    value={valorR}
                    onChange={handleInputChange(setValorR)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorAlpha">Valor Alpha</Label>
                  <Input
                    id="valorAlpha"
                    type="number"
                    placeholder="0.0"
                    step="0.01"
                    value={valorAlpha}
                    onChange={handleInputChange(setValorAlpha)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rprima"
                    checked={rprima}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="rprima" className="font-normal cursor-pointer">
                    Usar R prima (R')
                  </Label>
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
