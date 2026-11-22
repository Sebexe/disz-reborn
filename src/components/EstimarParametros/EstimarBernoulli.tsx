import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularMuestra,
  estimarBernoulli,
  estimarBernoulliCompleto,
} from "../../utils/EstimarParametros/estimar-bernoulli";
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

export default function EstimarBernoulli() {
  const [opcion, setOpcion] = useState("1");
  const [muestra, setMuestra] = useState("");
  const [exitos, setExitos] = useState("");
  const [riesgo, setRiesgo] = useState("");
  const [errorBuscado, setErrorBuscado] = useState("");
  const [tasaOcurrencias, setTasaOcurrencias] = useState("");
  const [muestraOriginal, setMuestraOriginal] = useState("");
  const [R, setR] = useState("");
  const [iteracionesMaximas, setIteracionesMaximas] = useState("");
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedMuestra = parseFloat(muestra);
    const parsedExitos = parseFloat(exitos);
    const parsedRiesgo = parseFloat(riesgo);
    const parsedErrorBuscado = parseFloat(errorBuscado);
    const parsedTasaOcurrencias = parseFloat(tasaOcurrencias);
    const parsedMuestraOriginal = parseFloat(muestraOriginal);
    const parsedR = parseFloat(R);
    const parsedIteracionesMaximas = parseInt(iteracionesMaximas);

    if (opcion === "1") {
      const limites = estimarBernoulli({
        muestra: parsedMuestra,
        exitos: parsedExitos,
        riesgo: parsedRiesgo,
      });
      setResultado(
        `Límite inferior: ${limites.limiteInferior.toFixed(
          8,
        )}, Límite superior: ${limites.limiteSuperior.toFixed(
          8,
        )}, Error muestral: ${limites.errorMuestral.toFixed(8)}`,
      );
    } else if (opcion === "2") {
      const limites = estimarBernoulliCompleto({
        muestra: parsedMuestra,
        exitos: parsedExitos,
        riesgo: parsedRiesgo,
      });
      setResultado(
        `Fracción mínima: ${limites.fraccionMinima.toFixed(
          8,
        )}, Fracción máxima: ${limites.fraccionMaxima.toFixed(8)}`,
      );
    } else if (opcion === "3") {
      console.log("Calculando muestra requerida...");
      const muestraCalculada = calcularMuestra({
        riesgo: parsedRiesgo,
        errorBuscado: isNaN(parsedErrorBuscado)
          ? undefined
          : parsedErrorBuscado,
        tasaOcurrencias: parsedTasaOcurrencias,
        muestraOriginal: parsedMuestraOriginal,
        R: isNaN(parsedR) ? undefined : parsedR,
        iteracionesMaximas: isNaN(parsedIteracionesMaximas)
          ? undefined
          : parsedIteracionesMaximas,
      });
      setResultado(`Tamaño de muestra requerido: ${muestraCalculada}`);
    } else {
      setResultado("Opción inválida");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Estimar Bernoulli</CardTitle>
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
                  <SelectItem value="1">Calcular límites Bernoulli</SelectItem>
                  <SelectItem value="2">
                    Calcular fraccion maxima y minima
                  </SelectItem>
                  <SelectItem value="3">Calcular muestra requerida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(opcion === "1" || opcion === "2") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="muestra">Tamaño de la muestra (n)</Label>
                  <Input
                    id="muestra"
                    type="number"
                    placeholder="0"
                    value={muestra}
                    onChange={handleInputChange(setMuestra)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitos">Número de éxitos (r)</Label>
                  <Input
                    id="exitos"
                    type="number"
                    placeholder="0"
                    value={exitos}
                    onChange={handleInputChange(setExitos)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riesgo">Riesgo (ej: 0.05) (alfa)</Label>
                  <Input
                    id="riesgo"
                    type="number"
                    placeholder="0.05"
                    step="0.01"
                    value={riesgo}
                    onChange={handleInputChange(setRiesgo)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "3" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="riesgo3">Riesgo (ej: 0.05)</Label>
                  <Input
                    id="riesgo3"
                    type="number"
                    placeholder="0.05"
                    step="0.01"
                    value={riesgo}
                    onChange={handleInputChange(setRiesgo)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="errorBuscado">Error buscado (ej: 0.05)</Label>
                  <Input
                    id="errorBuscado"
                    type="number"
                    placeholder="0.05"
                    step="0.01"
                    value={errorBuscado}
                    onChange={handleInputChange(setErrorBuscado)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tasaOcurrencias">
                    Tasa de ocurrencias (ej: 0.5) (p)
                  </Label>
                  <Input
                    id="tasaOcurrencias"
                    type="number"
                    placeholder="0.5"
                    step="0.01"
                    value={tasaOcurrencias}
                    onChange={handleInputChange(setTasaOcurrencias)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muestraOriginal">
                    Tamaño de muestra original
                  </Label>
                  <Input
                    id="muestraOriginal"
                    type="number"
                    placeholder="0"
                    value={muestraOriginal}
                    onChange={handleInputChange(setMuestraOriginal)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="R">Valor de R (opcional)</Label>
                  <Input
                    id="R"
                    type="number"
                    placeholder="0.0"
                    value={R}
                    onChange={handleInputChange(setR)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iteracionesMaximas">
                    Número máximo de iteraciones (opcional)
                  </Label>
                  <Input
                    id="iteracionesMaximas"
                    type="number"
                    placeholder="0"
                    value={iteracionesMaximas}
                    onChange={handleInputChange(setIteracionesMaximas)}
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
