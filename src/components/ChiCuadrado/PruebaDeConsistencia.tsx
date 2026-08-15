import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Celda {
  valorObservado: number;
  valorEsperado: number | null;
}

export default function PruebaDeConsistencia() {
  const [filas, setFilas] = useState(2);
  const [columnas, setColumnas] = useState(2);
  const [datos, setDatos] = useState<Celda[][]>(
    Array(2)
      .fill(null)
      .map(() => Array(2).fill({ valorObservado: 0, valorEsperado: null }))
  );
  const [mostrarTotales] = useState(false);
  const [chiCuadrado, setChiCuadrado] = useState<number | null>(null);

  const agregarFila = () => {
    const nuevasFilas = [
      ...datos,
      Array(columnas).fill({ valorObservado: 0, valorEsperado: null }),
    ];
    setDatos(nuevasFilas);
    setFilas(filas + 1);
  };

  const agregarColumna = () => {
    const nuevasFilas = datos.map((fila) => [
      ...fila,
      { valorObservado: 0, valorEsperado: null },
    ]);
    setDatos(nuevasFilas);
    setColumnas(columnas + 1);
  };

  const eliminarFila = () => {
    if (filas > 1) {
      setDatos(datos.slice(0, -1));
      setFilas(filas - 1);
    }
  };

  const eliminarColumna = () => {
    if (columnas > 1) {
      const nuevasFilas = datos.map((fila) => fila.slice(0, -1));
      setDatos(nuevasFilas);
      setColumnas(columnas - 1);
    }
  };

  const actualizarCelda = (
    filaIndex: number,
    columnaIndex: number,
    valor: string
  ) => {
    const nuevasFilas = [...datos];
    nuevasFilas[filaIndex][columnaIndex] = {
      ...nuevasFilas[filaIndex][columnaIndex],
      valorObservado: parseFloat(valor),
    };
    setDatos(nuevasFilas);
  };

  const calcularChiCuadrado = () => {
    let chi = 0;
    const filasMuestra = mostrarTotales ? filas - 1 : filas;
    const columnasMuestra = mostrarTotales ? columnas - 1 : columnas;

    for (let i = 0; i < filasMuestra; i++) {
      for (let j = 0; j < columnasMuestra; j++) {
        const obs = datos[i][j].valorObservado;
        const esp = datos[i][j].valorEsperado;
        if (esp !== null && esp > 0) {
          chi += ((obs - esp) ** 2) / esp;
        }
      }
    }

    setChiCuadrado(chi);
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">
            Prueba de Consistencia - Tabla de Contingencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button onClick={agregarFila} variant="default">
              Agregar Fila
            </Button>
            <Button onClick={agregarColumna} variant="default">
              Agregar Columna
            </Button>
            <Button onClick={eliminarFila} variant="destructive">
              Eliminar Fila
            </Button>
            <Button onClick={eliminarColumna} variant="destructive">
              Eliminar Columna
            </Button>
            <Button onClick={calcularChiCuadrado} variant="outline">
              Calcular Chi Cuadrado
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="border-collapse border text-sm">
              <tbody>
                {datos.map((fila, filaIndex) => (
                  <tr key={filaIndex}>
                    {fila.map((celda, colIndex) => (
                      <td key={colIndex} className="border px-2 py-1">
                        <Input
                          type="number"
                          value={celda.valorObservado}
                          onChange={(e) =>
                            actualizarCelda(filaIndex, colIndex, e.target.value)
                          }
                          placeholder="0"
                          className="w-16 text-xs"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {chiCuadrado !== null && (
            <div className="mt-6 text-lg font-bold text-teal-700">
              Valor Chi Cuadrado: {chiCuadrado.toFixed(4)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
