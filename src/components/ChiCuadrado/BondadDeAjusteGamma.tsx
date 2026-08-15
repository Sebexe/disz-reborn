import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Fila {
  k: string;
  frecuenciaObservada: number;
  probabilidad: number | null;
  frecuenciaEsperada: number | null;
}

export default function BondadDeAjusteGamma() {
  const [filas, setFilas] = useState<Fila[]>([
    { k: "30 - 40", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
    { k: "40 - 50", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
    { k: "50 - 60", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
  ]);
  const [chiCuadrado, setChiCuadrado] = useState<number | null>(null);
  const [mediaMuestra, setMediaMuestra] = useState<number | null>(null);
  const [desvioMuestral, setDesvioMuestral] = useState<number | null>(null);

  const agregarFila = () => {
    setFilas([
      ...filas,
      { k: "0 - 0", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
    ]);
  };

  const eliminarFila = () => {
    if (filas.length > 1) {
      setFilas(filas.slice(0, -1));
    }
  };

  const actualizarCelda = (index: number, campo: keyof Fila, valor: string) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index] = {
      ...nuevasFilas[index],
      [campo]: campo === "k" ? valor : parseFloat(valor),
    };
    setFilas(nuevasFilas);
  };

  const calcularParametrosGamma = () => {
    const totalFrec = filas.reduce((acc, f) => acc + f.frecuenciaObservada, 0);
    if (totalFrec === 0) return;

    const sumaFrecPorK = filas.reduce((acc, fila) => {
      if (fila.k.includes("-")) {
        const limites = fila.k.split("-").map((l) => l.trim());
        const limiteInf = parseFloat(limites[0]);
        const limiteSup = parseFloat(limites[1]);
        const puntoMedio = (limiteInf + limiteSup) / 2;
        return acc + puntoMedio * fila.frecuenciaObservada;
      }
      return acc;
    }, 0);

    const media = sumaFrecPorK / totalFrec;
    const sumaCuadrados = filas.reduce((acc, fila) => {
      if (fila.k.includes("-")) {
        const limites = fila.k.split("-").map((l) => l.trim());
        const limiteInf = parseFloat(limites[0]);
        const limiteSup = parseFloat(limites[1]);
        const puntoMedio = (limiteInf + limiteSup) / 2;
        return acc + fila.frecuenciaObservada * (puntoMedio - media) ** 2;
      }
      return acc;
    }, 0);

    const desvio = Math.sqrt(sumaCuadrados / totalFrec);
    setMediaMuestra(media);
    setDesvioMuestral(desvio);
  };

  const calcularChiCuadrado = () => {
    const chiCuadradoCalculado = filas.reduce((acc, fila) => {
      if (fila.frecuenciaEsperada !== null && fila.frecuenciaEsperada > 0) {
        const diferencia = fila.frecuenciaObservada - fila.frecuenciaEsperada;
        return acc + (diferencia ** 2) / fila.frecuenciaEsperada;
      }
      return acc;
    }, 0);

    setChiCuadrado(chiCuadradoCalculado);
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">
            Bondad de Ajuste - Distribución Gamma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button onClick={agregarFila} variant="default">
              Agregar Fila
            </Button>
            <Button onClick={eliminarFila} variant="destructive">
              Eliminar Fila
            </Button>
            <Button onClick={calcularParametrosGamma} variant="outline">
              Calcular Parámetros Gamma
            </Button>
            <Button onClick={calcularChiCuadrado} variant="outline">
              Calcular Chi Cuadrado
            </Button>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-slate-200">
                  <th className="border px-4 py-2">Rango (k)</th>
                  <th className="border px-4 py-2">Frecuencia Observada</th>
                  <th className="border px-4 py-2">Probabilidad</th>
                  <th className="border px-4 py-2">Frecuencia Esperada</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila, index) => (
                  <tr key={index} className="odd:bg-white even:bg-slate-50">
                    <td className="border px-4 py-2">
                      <Input
                        type="text"
                        value={fila.k}
                        onChange={(e) => actualizarCelda(index, "k", e.target.value)}
                        className="text-xs"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        type="number"
                        value={fila.frecuenciaObservada}
                        onChange={(e) =>
                          actualizarCelda(index, "frecuenciaObservada", e.target.value)
                        }
                        placeholder="0"
                        className="text-xs"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      {fila.probabilidad !== null && (
                        <div className="text-xs">{fila.probabilidad.toFixed(4)}</div>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {fila.frecuenciaEsperada !== null && (
                        <div className="text-xs">{fila.frecuenciaEsperada.toFixed(2)}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2">
            {mediaMuestra !== null && (
              <div className="font-semibold">Media Muestral: {mediaMuestra.toFixed(4)}</div>
            )}
            {desvioMuestral !== null && (
              <div className="font-semibold">
                Desvio Muestral: {desvioMuestral.toFixed(4)}
              </div>
            )}
            {chiCuadrado !== null && (
              <div className="text-lg font-bold text-teal-700">
                Chi Cuadrado: {chiCuadrado.toFixed(4)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
