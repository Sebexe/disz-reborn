import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularCondicionRechazo,
  calcularErrorTipo2,
  calcularMuestraRequerida,
} from "../../utils/EnsayoParametros/ensayo-media";
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

export default function EnsayoMedia() {
  const [opcion, setOpcion] = useState("1");
  const [valorCritico, setValorCritico] = useState("");
  const [sigma, setSigma] = useState("");
  const [alpha, setAlpha] = useState("");
  const [muestra, setMuestra] = useState("");
  const [tipoDeCola, setTipoDeCola] = useState<"izquierda >=" | "derecha" | "doble">("izquierda >=");
  const [mediaReal, setMediaReal] = useState("");
  const [valorRechazo, setValorRechazo] = useState("");
  const [valorCriticoSuperior, setValorCriticoSuperior] = useState("");
  const [valorCriticoInferior, setValorCriticoInferior] = useState("");
  const [beta, setBeta] = useState("");
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleTipoDeCola = (value: string) => {
    setTipoDeCola(value as "izquierda >=" | "derecha" | "doble");
  };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedValorCritico = parseFloat(valorCritico);
    const parsedSigma = parseFloat(sigma);
    const parsedAlpha = parseFloat(alpha);
    const parsedMuestra = parseFloat(muestra);
    const parsedMediaReal = parseFloat(mediaReal);
    const parsedValorCriticoSuperior = parseFloat(valorCriticoSuperior);
    const parsedValorCriticoInferior = parseFloat(valorCriticoInferior);
    const parsedBeta = parseFloat(beta);
    const parsedValorRechazo = parseFloat(valorRechazo);

    if (opcion === "1") {
      const condicion = calcularCondicionRechazo({
        valorCritico: parsedValorCritico,
        sigma: parsedSigma,
        alpha: parsedAlpha,
        muestra: parsedMuestra,
        tipoDeCola,
      });
      if (Array.isArray(condicion)) {
        setResultado(
          `Límite inferior: ${condicion[0].toFixed(8)}, Límite superior: ${condicion[1].toFixed(8)}`
        );
      } else {
        setResultado(`Condición de rechazo: ${condicion.toFixed(8)}`);
      }
    } else if (opcion === "2") {
      try {
        const errorTipo2 = calcularErrorTipo2({
          valorCritico: parsedValorRechazo,
          sigma: parsedSigma,
          muestra: parsedMuestra,
          mediaReal: parsedMediaReal,
          tipoDeCola,
          valorCriticoSuperior: parsedValorCriticoSuperior,
          valorCriticoInferior: parsedValorCriticoInferior,
        });
        setResultado(
          `Beta: ${errorTipo2.beta.toFixed(8)}, Poder: ${errorTipo2.poder.toFixed(8)}`
        );
      } catch (_error) {
        setResultado("Datos no válidos para calcular error tipo 2.");
      }
    } else if (opcion === "3") {
      const muestraCalculada = calcularMuestraRequerida({
        sigma: parsedSigma,
        alpha: parsedAlpha,
        beta: parsedBeta,
        mediaReal: parsedMediaReal,
        valorCritico: parsedValorCritico,
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
          <CardTitle className="text-center">Ensayo Media</CardTitle>
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
                  <SelectItem value="2">Calcular error tipo 2</SelectItem>
                  <SelectItem value="3">Calcular muestra requerida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {opcion !== "2" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="valorCritico">Valor crítico</Label>
                  <Input
                    id="valorCritico"
                    type="number"
                    placeholder="0.0"
                    value={valorCritico}
                    onChange={handleInputChange(setValorCritico)}
                    required
                  />
                </div>
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
              </>
            )}

            {(opcion === "1" || opcion === "2" || opcion === "3") && (
              <div className="space-y-2">
                <Label htmlFor="sigma">Sigma (desviación estándar)</Label>
                <Input
                  id="sigma"
                  type="number"
                  placeholder="0.0"
                  value={sigma}
                  onChange={handleInputChange(setSigma)}
                  required
                />
              </div>
            )}

            {(opcion === "1" || opcion === "2") && (
              <>
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
                <div className="space-y-2">
                  <Label htmlFor="tipoDeCola">Tipo de Cola</Label>
                  <Select value={tipoDeCola} onValueChange={handleTipoDeCola}>
                    <SelectTrigger id="tipoDeCola">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="izquierda >=">Izquierda ≥</SelectItem>
                      <SelectItem value="derecha">Derecha ≤</SelectItem>
                      <SelectItem value="doble">Doble</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {opcion === "2" && tipoDeCola === "doble" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="valorCriticoSuperior">Valor crítico superior</Label>
                  <Input
                    id="valorCriticoSuperior"
                    type="number"
                    placeholder="0.0"
                    value={valorCriticoSuperior}
                    onChange={handleInputChange(setValorCriticoSuperior)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorCriticoInferior">Valor crítico inferior</Label>
                  <Input
                    id="valorCriticoInferior"
                    type="number"
                    placeholder="0.0"
                    value={valorCriticoInferior}
                    onChange={handleInputChange(setValorCriticoInferior)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "2" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mediaReal">Media real</Label>
                  <Input
                    id="mediaReal"
                    type="number"
                    placeholder="0.0"
                    value={mediaReal}
                    onChange={handleInputChange(setMediaReal)}
                    required
                  />
                </div>
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
              </>
            )}

            {opcion === "3" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="beta">Beta (error tipo 2)</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="mediaReal2">Media real</Label>
                  <Input
                    id="mediaReal2"
                    type="number"
                    placeholder="0.0"
                    value={mediaReal}
                    onChange={handleInputChange(setMediaReal)}
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
