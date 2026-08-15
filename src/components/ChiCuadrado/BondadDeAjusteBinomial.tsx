import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Fila {
  k: string;
  frecuenciaObservada: number;
  probabilidad: number | null;
  frecuenciaEsperada: number | null;
}

export default function BondadDeAjusteBinomial() {
  const [filas, setFilas] = useState<Fila[]>([
    { k: "<= 0", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
    { k: "1", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
    { k: ">= 2", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
  ]);
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [chiCuadrado, setChiCuadrado] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");

  const actualizarCelda = (index: number, campo: keyof Fila, valor: string) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index] = {
      ...nuevasFilas[index],
      [campo]: campo === "k" ? valor : parseFloat(valor),
    };
    setFilas(nuevasFilas);
  };

  const calcularProbabilidades = () => {
    setMensaje("Funcionalidad de cálculo requiere migración completa de dependencias jStat");
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

  const agregarFila = () => {
    setFilas([
      ...filas.slice(0, -1),
      { k: "0", frecuenciaObservada: 0, probabilidad: null, frecuenciaEsperada: null },
      filas[filas.length - 1],
    ]);
  };

  const eliminarFila = () => {
    if (filas.length > 3) {
      setFilas(filas.slice(0, -2).concat(filas.slice(-1)));
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">
            Bondad de Ajuste - Distribución Binomial
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
            <div className="flex items-center gap-2">
              <Label htmlFor="n" className="font-bold">
                n:
              </Label>
              <Input
                id="n"
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="0"
                className="w-24"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="p" className="font-bold">
                p:
              </Label>
              <Input
                id="p"
                type="number"
                step="0.01"
                value={p}
                onChange={(e) => setP(e.target.value)}
                placeholder="0"
                className="w-24"
              />
            </div>
            <Button onClick={calcularProbabilidades} variant="outline">
              Calcular Probabilidades
            </Button>
            <Button onClick={calcularChiCuadrado} variant="outline">
              Calcular Chi Cuadrado
            </Button>
          </div>

          {mensaje && <div className="mb-4 text-sm text-amber-600">{mensaje}</div>}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-slate-200">
                  <th className="border px-4 py-2">k</th>
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
                        <div className="text-xs text-gray-600">
                          {fila.probabilidad.toFixed(4)}
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {fila.frecuenciaEsperada !== null && (
                        <div className="text-xs text-gray-600">
                          {fila.frecuenciaEsperada.toFixed(2)}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {chiCuadrado !== null && (
            <div className="mt-6 text-lg font-bold text-teal-700">
              Valor Chi Cuadrado Calculado: {chiCuadrado.toFixed(4)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
