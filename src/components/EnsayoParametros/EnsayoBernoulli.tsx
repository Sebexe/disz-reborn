import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  calcularBeta,
  calcularCondicionDeRechazoBernoulli,
  calcularMuestraAdecuada,
} from "../../utils/EnsayoParametros/ensayo-bernoulli";
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

export default function EnsayoBernoulli() {
  const [opcion, setOpcion] = useState("1");
  const [alfa, setAlfa] = useState("");
  const [pCritico, setPCritico] = useState("");
  const [n, setN] = useState("");
  const [tipoDeCola, setTipoDeCola] = useState<"izquierda >=" | "derecha <=">(
    "izquierda >=",
  );
  const [rCritico, setRCritico] = useState("");
  const [pUno, setPUno] = useState("");
  const [beta, setBeta] = useState("");
  const [p0, setP0] = useState("");
  const [p1, setP1] = useState("");
  const [valorMaximo, setValorMaximo] = useState("");
  const [resultado, setResultado] = useState("");

  const handleInputChange =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleTipoDeCola = (value: string) => {
    setTipoDeCola(value as "izquierda >=" | "derecha <=");
  };

  const handleCalcular = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedAlfa = parseFloat(alfa);
    const parsedPCritico = parseFloat(pCritico);
    const parsedN = parseFloat(n);
    const parsedRCritico = parseFloat(rCritico);
    const parsedPUno = parseFloat(pUno);
    const parsedBeta = parseFloat(beta);
    const parsedP0 = parseFloat(p0);
    const parsedP1 = parseFloat(p1);
    const parsedValorMaximo = parseFloat(valorMaximo);

    if (opcion === "1") {
      const condicion = calcularCondicionDeRechazoBernoulli({
        alfa: parsedAlfa,
        pCritico: parsedPCritico,
        n: parsedN,
        tipoDeCola,
      });
      setResultado(
        `R Crítico: ${condicion.rCritico}, P Estimado: ${condicion.pEstimado.toFixed(3)}`,
      );
    } else if (opcion === "2") {
      const betaResult = calcularBeta({
        rRechazo: parsedRCritico,
        pUno: parsedPUno,
        n: parsedN,
        tipoDeCola,
      });
      setResultado(
        `Beta VERIFICAR QUE PUEDE SER LA OTRA COLA O ESTAR INVERTIDOS: ${betaResult.beta.toFixed(
          5,
        )}, Potencia: ${betaResult.potencia.toFixed(5)}`,
      );
    } else if (opcion === "3") {
      const muestraAdecuada = calcularMuestraAdecuada({
        alfa: parsedAlfa,
        beta: parsedBeta,
        p0: parsedP0,
        p1: parsedP1,
        valorMaximo: parsedValorMaximo,
        tipoDeCola,
      });
      if (typeof muestraAdecuada === "string") {
        setResultado(muestraAdecuada);
      } else {
        setResultado(
          `Tamaño de muestra requerido: ${muestraAdecuada.n}, R Crítico: ${muestraAdecuada.rCritico}`,
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
          <CardTitle className="text-center">Ensayo Bernoulli</CardTitle>
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
                  <SelectItem value="1">
                    Calcular condición de rechazo Bernoulli
                  </SelectItem>
                  <SelectItem value="2">Calcular Beta</SelectItem>
                  <SelectItem value="3">Calcular muestra adecuada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(opcion === "1" || opcion === "2" || opcion === "3") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="alfa">Alfa</Label>
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
                  <Label htmlFor="tipoDeCola">Tipo de Cola</Label>
                  <Select value={tipoDeCola} onValueChange={handleTipoDeCola}>
                    <SelectTrigger id="tipoDeCola">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="izquierda >=">Izquierda ≥</SelectItem>
                      <SelectItem value="derecha <=">Derecha ≤</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {opcion === "1" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pCritico">P0</Label>
                  <Input
                    id="pCritico"
                    type="number"
                    placeholder="0.0"
                    step="0.01"
                    value={pCritico}
                    onChange={handleInputChange(setPCritico)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n1">Tamaño de muestra (n)</Label>
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
              <>
                <div className="space-y-2">
                  <Label htmlFor="rCritico">
                    R Crítico (lo sacas en la condicion de rechazo)
                  </Label>
                  <Input
                    id="rCritico"
                    type="number"
                    placeholder="0"
                    value={rCritico}
                    onChange={handleInputChange(setRCritico)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pUno">P1</Label>
                  <Input
                    id="pUno"
                    type="number"
                    placeholder="0.0"
                    step="0.01"
                    value={pUno}
                    onChange={handleInputChange(setPUno)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n2">Tamaño de muestra (n)</Label>
                  <Input
                    id="n2"
                    type="number"
                    placeholder="0"
                    value={n}
                    onChange={handleInputChange(setN)}
                    required
                  />
                </div>
              </>
            )}

            {opcion === "3" && (
              <>
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
                <div className="space-y-2">
                  <Label htmlFor="p0">P0</Label>
                  <Input
                    id="p0"
                    type="number"
                    placeholder="0.0"
                    step="0.01"
                    value={p0}
                    onChange={handleInputChange(setP0)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p1">P1</Label>
                  <Input
                    id="p1"
                    type="number"
                    placeholder="0.0"
                    step="0.01"
                    value={p1}
                    onChange={handleInputChange(setP1)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorMaximo">Valor máximo para iterar</Label>
                  <Input
                    id="valorMaximo"
                    type="number"
                    placeholder="0"
                    value={valorMaximo}
                    onChange={handleInputChange(setValorMaximo)}
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
