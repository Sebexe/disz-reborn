import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Fila {
  frecuenciaObservada: number;
  probabilidad: number;
  frecuenciaEsperada: number | null;
}

export default function BondadDeAjuste() {
  const [filas, setFilas] = useState<Fila[]>([
    { frecuenciaObservada: 0, probabilidad: 0, frecuenciaEsperada: null },
  ]);
  const [totalObservado, setTotalObservado] = useState<number>(0);
  const [chiCuadrado, setChiCuadrado] = useState<number | null>(null);

  const agregarFila = () => {
    setFilas([
      ...filas,
      { frecuenciaObservada: 0, probabilidad: 0, frecuenciaEsperada: null },
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
      [campo]: parseFloat(valor),
    };
    setFilas(nuevasFilas);
  };

  const calcularFrecuenciasEsperadas = () => {
    const total = filas.reduce((acc, fila) => acc + fila.frecuenciaObservada, 0);
    setTotalObservado(total);

    const nuevasFilas = filas.map((fila) => ({
      ...fila,
      frecuenciaEsperada: total * fila.probabilidad,
    }));
    setFilas(nuevasFilas);
  };

  const calcularChiCuadrado = () => {
    let chiCuadradoCalculado = 0;

    filas.forEach((fila) => {
      if (fila.frecuenciaEsperada !== null && fila.frecuenciaEsperada > 0) {
        const diferencia = fila.frecuenciaObservada - fila.frecuenciaEsperada;
        chiCuadradoCalculado += (diferencia ** 2) / fila.frecuenciaEsperada;
      }
    });

    setChiCuadrado(chiCuadradoCalculado);
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">
            Bondad de Ajuste - Tabla de Frecuencias
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
            <Button onClick={calcularFrecuenciasEsperadas} variant="outline">
              Calcular Frecuencias Esperadas
            </Button>
            <Button onClick={calcularChiCuadrado} variant="outline">
              Calcular Chi Cuadrado
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-slate-200">
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
                        type="number"
                        value={fila.frecuenciaObservada}
                        onChange={(e) =>
                          actualizarCelda(index, "frecuenciaObservada", e.target.value)
                        }
                        placeholder="0"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={fila.probabilidad}
                        onChange={(e) =>
                          actualizarCelda(index, "probabilidad", e.target.value)
                        }
                        placeholder="0"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      {fila.frecuenciaEsperada !== null && (
                        <div className="text-sm text-gray-600">
                          {fila.frecuenciaEsperada.toFixed(2)}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-lg font-bold">
              Total Observado: {totalObservado}
            </div>
            {chiCuadrado !== null && (
              <div className="text-lg font-bold text-teal-700">
                Valor Chi Cuadrado Calculado: {chiCuadrado.toFixed(4)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
