import quantileT from '@stdlib/stats/base/dists/t/quantile';

interface CalcularDeltaCriticoInput {
    deltaCero: number;
    n1: number;
    n2: number;
    desvio1: number; // Puede ser desviación estándar o varianza dependiendo de esVarianza
    desvio2: number;
    alfa: number;
    cola: number; // 1: Izquierda >=, 2: Derecha <=, 3: Bilateral
    esVarianza: boolean;
}

interface CalcularDeltaCriticoOutput {
    deltaCritico: number;
}

function calcularDeltaCritico(input: CalcularDeltaCriticoInput): CalcularDeltaCriticoOutput {
    const { deltaCero, n1, n2, desvio1, desvio2, alfa, cola, esVarianza } = input;

    // Convertir a varianza si es necesario
    const s1Squared = esVarianza ? desvio1 : desvio1 ** 2;
    const s2Squared = esVarianza ? desvio2 : desvio2 ** 2;

    // Calcular grados de libertad aproximados de Welch
    const numerator = (s1Squared / n1 + s2Squared / n2) ** 2;
    const denominator =
        ((s1Squared / n1) ** 2) / (n1 - 1) + ((s2Squared / n2) ** 2) / (n2 - 1);
    const gradosAproximadosWelch = Math.floor(numerator / denominator);

    // Calcular el valor crítico de t
    let tValue: number;
    if (cola === 1) { // Izquierda >=
        tValue = quantileT(alfa, gradosAproximadosWelch);
    } else if (cola === 2) { // Derecha <=
        tValue = quantileT(1 - alfa, gradosAproximadosWelch);
    } else {
        throw new Error("Valor de cola inválido");
    }

    // Calcular el error estándar
    const errorEstandar = Math.sqrt(s1Squared / n1 + s2Squared / n2);

    // Calcular delta crítico
    let deltaCritico: number;
    if (cola === 1) { // Izquierda >=
        deltaCritico = deltaCero - tValue * errorEstandar;
    } else  { // Derecha <=
        deltaCritico = deltaCero + tValue * errorEstandar;
    }

    return {
        deltaCritico: parseFloat(deltaCritico.toFixed(8)),
    };
}

interface CalcularDeltaCriticoEstrellaInput {
    deltaCero: number;
    hache: number;
    n1: number;
    n2: number;
    desvio1: number; // Puede ser desviación estándar o varianza dependiendo de esVarianza
    desvio2: number;
    alfa: number;
    cola: number; // 1: Izquierda >=, 2: Derecha <=, 3: Bilateral
    esVarianza: boolean;
}

interface CalcularDeltaCriticoEstrellaOutput {
    deltaCritico: number;
}

function calcularDeltaCriticoEstrella(input: CalcularDeltaCriticoEstrellaInput): CalcularDeltaCriticoEstrellaOutput {
    const { deltaCero, hache, n1, n2, desvio1, desvio2, alfa, cola, esVarianza } = input;

    // Convertir a varianza si es necesario
    const s1Squared = esVarianza ? desvio1 : desvio1 ** 2;
    const s2Squared = esVarianza ? desvio2 : desvio2 ** 2;

    // Calcular grados de libertad aproximados de Welch
    const numerator = (s1Squared / n1 + hache ** 2 * s2Squared / n2) ** 2;
    const denominator =
        ((s1Squared / n1) ** 2) / (n1 - 1) + ((hache ** 2 * s2Squared / n2) ** 2) / (n2 - 1);
    const gradosAproximadosWelch = Math.floor(numerator / denominator);

    // Calcular el valor crítico de t
    let tValue: number;
    if (cola === 1) { // Izquierda >=
        tValue = quantileT(alfa, gradosAproximadosWelch);
    } else if (cola === 2) { // Derecha <=
        tValue = quantileT(1 - alfa, gradosAproximadosWelch);
    } else {
        throw new Error("Valor de cola inválido");
    }

    // Calcular el error estándar ajustado
    const errorEstandar = Math.sqrt(s1Squared / n1 + hache ** 2 * s2Squared / n2);

    // Calcular delta crítico
    let deltaCritico: number;
    if (cola === 1) {
        deltaCritico = deltaCero - tValue * errorEstandar;
    } else  {
        deltaCritico = deltaCero + tValue * errorEstandar;
    }

    return {
        deltaCritico: parseFloat(deltaCritico.toFixed(8)),
    };
}



export { calcularDeltaCritico, calcularDeltaCriticoEstrella };