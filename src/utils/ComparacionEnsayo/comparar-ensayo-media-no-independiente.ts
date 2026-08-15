import quantileT from '@stdlib/stats/base/dists/t/quantile';

interface CalcularValorCriticoInput {
  n: number;
  alfa: number;
  desvioD: number; // Puede ser varianza o desviación estándar dependiendo de esVarianza
  deltaO: number;
  cola: number; // 1: Cola derecha (<=), 2: Cola izquierda (>=)
  esVarianza: boolean;
}

interface CalcularValorCriticoOutput {
  valorCritico: number;
}

function calcularValorCritico(input: CalcularValorCriticoInput): CalcularValorCriticoOutput {
  const { n, alfa, desvioD, deltaO, cola, esVarianza } = input;
  const degreesOfFreedom = n - 1;

  // Convertir a desviación estándar si es necesario
  const standardDeviation = esVarianza ? Math.sqrt(desvioD) : desvioD;

  // Calcular el error estándar
  const standardError = standardDeviation / Math.sqrt(n);

  // Calcular el valor crítico de t
  const tValue = quantileT(1 - alfa, degreesOfFreedom);

  let valorCritico: number;

  if (cola === 1) { // Cola derecha (<=)
    valorCritico = deltaO + tValue * standardError;
  } else if (cola === 2) { // Cola izquierda (>=)
    valorCritico = deltaO - tValue * standardError;
  } else {
    throw new Error("Valor de cola inválido");
  }

  return {
    valorCritico: parseFloat(valorCritico.toFixed(8)),
  };
}


export {calcularValorCritico}