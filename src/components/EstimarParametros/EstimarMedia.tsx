import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularErrorMuestral,
  calcularLimitesConDatos,
  calcularSizeMuestral,
} from "../../utils/EstimarParametros/estimar-media";
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

export default function EstimarMedia() {
  const [opcion, setOpcion] = useState("1");
  const [muestra, setMuestra] = useState("");
  const [media, setMedia] = useState("");
  const [sigmaPoblacional, setSigmaPoblacional] = useState("");
  const [nivelConfianza, setNivelConfianza] = useState("");
  const [errorMuestral, setErrorMuestral] = useState("");
  const [muestral, setMuestral] = useState(false);
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleCheckboxChange = (checked: boolean) => {
    setMuestral(checked);
  };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedMuestra = parseFloat(muestra);
    const parsedMedia = parseFloat(media);
    const parsedSigmaPoblacional = parseFloat(sigmaPoblacional);
    const parsedNivelConfianza = parseFloat(nivelConfianza);
    const parsedErrorMuestral = parseFloat(errorMuestral);

    if (opcion === "1") {
      const limites = calcularLimitesConDatos({
        muestra: parsedMuestra,
        media: parsedMedia,
        sigmaPoblacional: parsedSigmaPoblacional,
        nivelConfianza: parsedNivelConfianza,
        muestral,
      });
      setResultado(
        `Límite inferior: ${limites.limiteInferior.toFixed(
          8
        )}, Límite superior: ${limites.limiteSuperior.toFixed(8)}`
      );
    } else if (opcion === "2") {
      const error = calcularErrorMuestral({
        muestra: parsedMuestra,
        sigmaPoblacional: parsedSigmaPoblacional,
        nivelConfianza: parsedNivelConfianza,
        muestral,
      });
      setResultado(`Error muestral: ${error.toFixed(8)}`);
    } else if (opcion === "3") {
      const muestraRequerida = calcularSizeMuestral({
        sigmaPoblacional: parsedSigmaPoblacional,
        nivelConfianza: parsedNivelConfianza,
        errorMuestral: parsedErrorMuestral,
        muestral,
      });
      setResultado(`Muestra requerida: ${muestraRequerida}`);
    } else {
      setResultado("Opción inválida");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Estimar Media</CardTitle>
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
                  <SelectItem value="1">Calcular límites de confianza</SelectItem>
                  <SelectItem value="2">Calcular error muestral</SelectItem>
                  <SelectItem value="3">Calcular muestra requerida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {opcion !== "3" && (
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
            )}

            {opcion === "1" && (
              <div className="space-y-2">
                <Label htmlFor="media">Media de la muestra</Label>
                <Input
                  id="media"
                  type="number"
                  placeholder="0.0"
                  value={media}
                  onChange={handleInputChange(setMedia)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="sigmaPoblacional">
                Desviación estándar poblacional
              </Label>
              <Input
                id="sigmaPoblacional"
                type="number"
                placeholder="0.0"
                value={sigmaPoblacional}
                onChange={handleInputChange(setSigmaPoblacional)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivelConfianza">
                Nivel de confianza (ej: 0.95)
              </Label>
              <Input
                id="nivelConfianza"
                type="number"
                placeholder="0.95"
                step="0.01"
                value={nivelConfianza}
                onChange={handleInputChange(setNivelConfianza)}
                required
              />
            </div>

            {opcion === "3" && (
              <div className="space-y-2">
                <Label htmlFor="errorMuestral">Error muestral deseado</Label>
                <Input
                  id="errorMuestral"
                  type="number"
                  placeholder="0.0"
                  value={errorMuestral}
                  onChange={handleInputChange(setErrorMuestral)}
                  required
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="muestral"
                checked={muestral}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="muestral" className="font-normal cursor-pointer">
                Es desvio muestral (usar t-student)
              </Label>
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
