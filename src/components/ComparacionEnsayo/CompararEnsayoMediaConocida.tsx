import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularErrorTipo2,
  calcularMuestraRequerida,
  calcularValorRechazo,
  calcularValorRechazoDeltaEstrella,
} from "../../utils/ComparacionEnsayo/comparar-ensayo-media-varianza-conocida";
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

export default function CompararEnsayoMediaConocida() {
  const [opcion, setOpcion] = useState("1");
  const [deltaCero, setDeltaCero] = useState("");
  const [alfa, setAlfa] = useState("");
  const [sigma1, setSigma1] = useState("");
  const [sigma2, setSigma2] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [cola, setCola] = useState("1");
  const [deltaUno, setDeltaUno] = useState("");
  const [beta, setBeta] = useState("");
  const [hache, setHache] = useState("");
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedDeltaCero = parseFloat(deltaCero);
    const parsedAlfa = parseFloat(alfa);
    const parsedSigma1 = parseFloat(sigma1);
    const parsedSigma2 = parseFloat(sigma2);
    const parsedN1 = parseFloat(n1);
    const parsedN2 = parseFloat(n2);
    const parsedDeltaUno = parseFloat(deltaUno);
    const parsedBeta = parseFloat(beta);
    const parsedHache = parseFloat(hache);
    const parsedCola = parseInt(cola, 10);

    if (opcion === "1") {
      try {
        const valorRechazo = calcularValorRechazo({
          deltaCero: parsedDeltaCero,
          alfa: parsedAlfa,
          sigma1: parsedSigma1,
          sigma2: parsedSigma2,
          n1: parsedN1,
          n2: parsedN2,
          cola: parsedCola,
        });
        setResultado(`Valor crítico: ${valorRechazo.valorCritico}`);
      } catch (_error) {
        setResultado("Valor de cola inválido");
      }
    } else if (opcion === "2") {
      try {
        const errorTipo2 = calcularErrorTipo2({
          deltaCritico: parsedDeltaCero,
          deltaUno: parsedDeltaUno,
          sigma1: parsedSigma1,
          sigma2: parsedSigma2,
          n1: parsedN1,
          n2: parsedN2,
          cola: parsedCola,
        });
        setResultado(
          `Beta: ${errorTipo2.beta}, Poder de prueba: ${errorTipo2.poderPrueba}`
        );
      } catch (_error) {
        setResultado("Valor de cola inválido");
      }
    } else if (opcion === "3") {
      try {
        const muestra = calcularMuestraRequerida({
          deltaCero: parsedDeltaCero,
          deltaUno: parsedDeltaUno,
          sigma1: parsedSigma1,
          sigma2: parsedSigma2,
          alfa: parsedAlfa,
          beta: parsedBeta,
          cola: parsedCola,
        });
        setResultado(`Tamaño de muestra requerido (n): ${muestra.n}`);
      } catch (_error) {
        setResultado("Valor de cola inválido o caso no manejado");
      }
    } else if (opcion === "4") {
      try {
        const deltaEstrella = calcularValorRechazoDeltaEstrella({
          hache: parsedHache,
          alfa: parsedAlfa,
          sigma1: parsedSigma1,
          sigma2: parsedSigma2,
          n1: parsedN1,
          n2: parsedN2,
          cola: parsedCola,
        });
        setResultado(
          `Delta estrella crítico: ${deltaEstrella.deltaEstrellaCritico}`
        );
      } catch (_error) {
        setResultado("Valor de cola inválido");
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
            Comparar Ensayo Media Varianza Conocida
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
                  <SelectItem value="2">Calcular Error Tipo II</SelectItem>
                  <SelectItem value="3">Calcular Muestra Requerida</SelectItem>
                  <SelectItem value="4">Calcular Delta Estrella Crítico</SelectItem>
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

            {(opcion === "1" || opcion === "2" || opcion === "3" || opcion === "4") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="deltaCero">Delta Cero</Label>
                  <Input
                    id="deltaCero"
                    type="number"
                    placeholder="0.0"
                    value={deltaCero}
                    onChange={handleInputChange(setDeltaCero)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sigma1">Sigma 1</Label>
                  <Input
                    id="sigma1"
                    type="number"
                    placeholder="0.0"
                    value={sigma1}
                    onChange={handleInputChange(setSigma1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sigma2">Sigma 2</Label>
                  <Input
                    id="sigma2"
                    type="number"
                    placeholder="0.0"
                    value={sigma2}
                    onChange={handleInputChange(setSigma2)}
                    required
                  />
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

            {(opcion === "2" || opcion === "3") && (
              <div className="space-y-2">
                <Label htmlFor="deltaUno">Delta Uno</Label>
                <Input
                  id="deltaUno"
                  type="number"
                  placeholder="0.0"
                  value={deltaUno}
                  onChange={handleInputChange(setDeltaUno)}
                  required
                />
              </div>
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

            {opcion === "4" && (
              <div className="space-y-2">
                <Label htmlFor="hache">Hache</Label>
                <Input
                  id="hache"
                  type="number"
                  placeholder="0.0"
                  value={hache}
                  onChange={handleInputChange(setHache)}
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
