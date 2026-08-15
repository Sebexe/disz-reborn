import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function RegresionLinealDinamica() {
  const [filas, setFilas] = useState(1);
  const [columnas] = useState(2);
  const [datos, setDatos] = useState<string[][]>([Array(2).fill("0")]);
  const [estadisticas, setEstadisticas] = useState<string | null>(null);
  const [coeficienteRegresion, setCoeficienteRegresion] = useState<string | null>(null);
  const [alfa, setAlfa] = useState("0.05");
  const [intervaloConfianza, setIntervaloConfianza] = useState<string | null>(null);
  const [intervaloConfianzaB1, setIntervaloConfianzaB1] = useState<string | null>(null);
  const [x0, setX0] = useState("0");
  const [intervaloConfianzaY0, setIntervaloConfianzaY0] = useState<string | null>(null);
  const [pronosticoConfianzaY0, setPronosticoConfianzaY0] = useState<string | null>(null);

  const agregarFila = () => {
    const nuevasFilas = [...datos, Array(columnas).fill("0")];
    setDatos(nuevasFilas);
    setFilas(filas + 1);
  };

  const eliminarFila = () => {
    if (filas > 1) {
      const nuevasFilas = datos.slice(0, -1);
      setDatos(nuevasFilas);
      setFilas(filas - 1);
    }
  };

  const actualizarCelda = (filaIndex: number, columnaIndex: number, valor: string) => {
    const nuevasFilas = [...datos];
    nuevasFilas[filaIndex][columnaIndex] = valor;
    setDatos(nuevasFilas);
  };

  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

  const calcularEstadisticas = () => {
    try {
      const y = datos.map((fila) => parseFloat(fila[0]));
      const xColumnas = columnas - 1;
      const x = datos.map((fila) => fila.slice(1).map(parseFloat));

      if (y.some(isNaN) || x.some((fila) => fila.some(isNaN))) {
        throw new Error("Todos los valores deben ser números válidos.");
      }

      const sumX = Array(xColumnas)
        .fill(0)
        .map((_, i) => sum(x.map((fila) => fila[i])));
      const sumX2 = Array(xColumnas)
        .fill(0)
        .map((_, i) => sum(x.map((fila) => fila[i] ** 2)));
      const meanX = sumX.map((s) => s / filas);
      const sumY = sum(y);
      const sumY2 = sum(y.map((val) => val ** 2));
      const meanY = sumY / filas;
      const sumXY = Array(xColumnas)
        .fill(0)
        .map((_, i) => sum(y.map((val, j) => val * x[j][i])));

      let estadisticasStr = `ΣY = ${sumY.toFixed(3)}, Ȳ = ${meanY.toFixed(
        3
      )}, ΣY² = ${sumY2.toFixed(3)}\n`;
      sumX.forEach((s, i) => {
        estadisticasStr += `ΣX${i + 1} = ${s.toFixed(3)}, X̄${i + 1} = ${meanX[
          i
        ].toFixed(3)}, ΣX${i + 1}² = ${sumX2[i].toFixed(3)}, Σ(Y * X${i + 1}) = ${sumXY[
          i
        ].toFixed(3)}\n`;
      });

      setEstadisticas(estadisticasStr);

      if (xColumnas === 1) {
        const n = filas;
        const b1Numerador = sumXY[0] - (sumY * sumX[0]) / n;
        const b1Denominador = sumX2[0] - (sumX[0] ** 2) / n;
        const b1 = b1Numerador / b1Denominador;
        const b0 = meanY - b1 * meanX[0];

        const sNumerador = sumY2 - b0 * sumY - b1 * sumXY[0];
        const s = Math.sqrt(sNumerador / (n - 2));

        const rNumerador = sumXY[0] - n * meanY * meanX[0];
        const rDenominador = Math.sqrt(
          (sumX2[0] - n * meanX[0] ** 2) * (sumY2 - n * meanY ** 2)
        );
        const r = rNumerador / rDenominador;

        const sb1x = s / Math.sqrt(sumX2[0] - (sumX[0] ** 2) / n);

        setCoeficienteRegresion(
          `Estimador del coeficiente de regresión: b1 = ${b1.toFixed(
            8
          )}, Estimador del término independiente: b0 = ${b0.toFixed(
            8
          )}, s = ${s.toFixed(8)}, r = ${r.toFixed(8)}, Sb1 = ${sb1x.toFixed(8)}`
        );

        // Approximate normal inverse
        const z = 1.96; // For alfa = 0.05, z ≈ 1.96
        const zPrima = 0.5 * Math.log((1 + r) / (1 - r));
        const zMin = zPrima - z * Math.sqrt(1 / (n - 3));
        const zMax = zPrima + z * Math.sqrt(1 / (n - 3));
        const A = (Math.exp(2 * zMin) - 1) / (Math.exp(2 * zMin) + 1);
        const B = (Math.exp(2 * zMax) - 1) / (Math.exp(2 * zMax) + 1);

        setIntervaloConfianza(
          `Intervalo de confianza para r: A = ${A.toFixed(8)}, B = ${B.toFixed(8)}`
        );

        // Approximate t-critical value
        const tCritico = 2.048; // For df=n-2=10, t ≈ 2.048 at alpha=0.05
        const sb1 = s / Math.sqrt(sumX2[0] - (sumX[0] ** 2) / n);
        const intervaloA = b1 - tCritico * sb1;
        const intervaloB = b1 + tCritico * sb1;

        setIntervaloConfianzaB1(
          `Intervalo de confianza para b1: A = ${intervaloA.toFixed(8)}, B = ${intervaloB.toFixed(8)}`
        );

        const x0Num = parseFloat(x0);
        const y0Estimado = b0 + b1 * x0Num;
        const errorEstandarY0 = s * Math.sqrt(
          1 / n + ((x0Num - meanX[0]) ** 2) / (sumX2[0] - n * meanX[0] ** 2)
        );
        const intervaloY0A = y0Estimado - tCritico * errorEstandarY0;
        const intervaloY0B = y0Estimado + tCritico * errorEstandarY0;

        setIntervaloConfianzaY0(
          `Intervalo de confianza para ŷ0: A = ${intervaloY0A.toFixed(8)}, B = ${intervaloY0B.toFixed(8)}`
        );

        const pronostico = s *
          Math.sqrt(
            1 + 1 / n + ((x0Num - meanX[0]) ** 2) / (sumX2[0] - n * meanX[0] ** 2)
          );

        const PronosticoA = y0Estimado - tCritico * pronostico;
        const PronosticoB = y0Estimado + tCritico * pronostico;
        setPronosticoConfianzaY0(
          `Pronostico para ŷ0 (Redondear): A = ${PronosticoA.toFixed(2)}, B = ${PronosticoB.toFixed(2)}`
        );
      }
    } catch (error) {
      setEstadisticas("Error en el cálculo: " + String(error));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">
            Regresión Lineal - Tabla Dinámica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={agregarFila} variant="default">
              Agregar Fila
            </Button>
            <Button onClick={eliminarFila} variant="destructive">
              Eliminar Fila
            </Button>
            <Button onClick={calcularEstadisticas} variant="outline">
              Calcular Estadísticas
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-slate-200">
                  <th className="px-4 py-2 border">Y</th>
                  {[...Array(columnas - 1)].map((_, i) => (
                    <th key={i} className="px-4 py-2 border">
                      X{i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datos.map((fila, filaIndex) => (
                  <tr key={filaIndex} className="odd:bg-white even:bg-slate-50">
                    {fila.map((valor, columnaIndex) => (
                      <td key={columnaIndex} className="border px-4 py-2">
                        <Input
                          type="text"
                          value={valor}
                          onChange={(e) =>
                            actualizarCelda(filaIndex, columnaIndex, e.target.value)
                          }
                          className="text-xs"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="alfa">Alfa:</Label>
              <Input
                id="alfa"
                type="text"
                value={alfa}
                onChange={(e) => setAlfa(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="x0">Valor de x0:</Label>
              <Input
                id="x0"
                type="text"
                value={x0}
                onChange={(e) => setX0(e.target.value)}
              />
            </div>
          </div>

          {estadisticas && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas de los Datos</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-xs overflow-x-auto">
                  {estadisticas}
                </pre>
              </CardContent>
            </Card>
          )}

          {coeficienteRegresion && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Coeficiente de Regresión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{coeficienteRegresion}</p>
              </CardContent>
            </Card>
          )}

          {intervaloConfianza && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Intervalo de Confianza para r</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{intervaloConfianza}</p>
              </CardContent>
            </Card>
          )}

          {intervaloConfianzaB1 && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Intervalo de Confianza para b1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{intervaloConfianzaB1}</p>
              </CardContent>
            </Card>
          )}

          {intervaloConfianzaY0 && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">
                  Intervalo de Confianza para ŷ0 dado x0
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{intervaloConfianzaY0}</p>
              </CardContent>
            </Card>
          )}

          {pronosticoConfianzaY0 && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Pronostico para ŷ0 dado x0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{pronosticoConfianzaY0}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
