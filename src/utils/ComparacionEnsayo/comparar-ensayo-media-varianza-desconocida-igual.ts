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

function calcularDeltaCritico(
    input: CalcularDeltaCriticoInput,
): CalcularDeltaCriticoOutput {
    const { deltaCero, n1, n2, desvio1, desvio2, alfa, cola, esVarianza } =
        input;

    // Convertir a varianza si es necesario
    const s1Squared = esVarianza ? desvio1 : desvio1 ** 2;
    const s2Squared = esVarianza ? desvio2 : desvio2 ** 2;

    const v = n1 + n2 - 2; // Grados de libertad

    // Calcular la desviación estándar agrupada (amalgamiento)
    const amalgamiento = Math.sqrt(
        ((n1 - 1) * s1Squared + (n2 - 1) * s2Squared) / v,
    );

    // Calcular el valor crítico de t
    let tValue: number;
    if (cola === 1) { // Izquierda >=
        tValue = quantileT(1 - alfa, v);
    } else if (cola === 2) { // Derecha <=
        tValue = quantileT(1 - alfa, v);
    } else {
        throw new Error("Valor de cola inválido");
    }

    // Calcular el error estándar
    const errorEstandar = amalgamiento * Math.sqrt(1 / n1 + 1 / n2);

    let deltaCritico: number;
    if (cola === 1) { // Izquierda >=
        console.log(tValue);
        console.log(errorEstandar);

        deltaCritico = deltaCero - tValue * errorEstandar;
    } else { // Derecha <=
        deltaCritico = deltaCero + tValue * errorEstandar;
    }

    return {
        deltaCritico: parseFloat(deltaCritico.toFixed(8)),
    };
}

interface CalcularDeltaCriticoEstrellaInput {
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

function calcularDeltaCriticoEstrella(
    input: CalcularDeltaCriticoEstrellaInput,
): CalcularDeltaCriticoEstrellaOutput {
    const { hache, n1, n2, desvio1, desvio2, alfa, cola, esVarianza } = input;

    // Convertir a varianza si es necesario
    const s1Squared = esVarianza ? desvio1 : desvio1 ** 2;
    const s2Squared = esVarianza ? desvio2 : desvio2 ** 2;

    const v = n1 + n2 - 2; // Grados de libertad

    // Calcular la desviación estándar agrupada (amalgamiento)
    const amalgamiento = Math.sqrt(
        ((n1 - 1) * s1Squared + (n2 - 1) * s2Squared) / v,
    );

    // Calcular el valor crítico de t
    let tValue: number;
    if (cola === 1) { // Izquierda >=
        tValue = quantileT(alfa, v);
    } else if (cola === 2) { // Derecha <=
        tValue = quantileT(1 - alfa, v);
    } else {
        throw new Error("Valor de cola inválido");
    }

    // Calcular el error estándar ajustado con hache
    let errorEstandar: number;
    if (cola === 1) { // Izquierda >=
        errorEstandar = amalgamiento * Math.sqrt(1 / n1 + 1 / n2);
        const deltaCritico = tValue * errorEstandar;
        return {
            deltaCritico: parseFloat(deltaCritico.toFixed(8)),
        };
    } else { // Derecha <=
        errorEstandar = amalgamiento * Math.sqrt(1 / n1 + (hache ** 2) / n2);
    }

    const deltaCritico = tValue * errorEstandar;

    return {
        deltaCritico: parseFloat(deltaCritico.toFixed(8)),
    };

    // Calcular delta crítico
}

export { calcularDeltaCritico, calcularDeltaCriticoEstrella };

