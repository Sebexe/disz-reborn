import quantileT from '@stdlib/stats/base/dists/t/quantile';

interface CalcularLimitesInput {
    n1: number;
    n2: number;
    desvio1: number; // Puede ser desviación estándar o varianza según esVarianza
    desvio2: number;
    media1: number;
    media2: number;
    alfa: number;
    esVarianza: boolean;
}

interface CalcularLimitesOutput {
    limiteInferior: number;
    limiteSuperior: number;
    errorMuestral: number;
}

function calcularLimites(input: CalcularLimitesInput): CalcularLimitesOutput {
    const { n1, n2, desvio1, desvio2, media1, media2, alfa, esVarianza } = input;
    const v = n1 + n2 - 2; // Grados de libertad

    // Convertir a varianza si es necesario
    const s1Squared = esVarianza ? desvio1 : desvio1 ** 2;
    const s2Squared = esVarianza ? desvio2 : desvio2 ** 2;

    // Calcular la desviación estándar agrupada (amalgamiento)
    const amalgamiento = Math.sqrt(((n1 - 1) * s1Squared + (n2 - 1) * s2Squared) / v);

    // Calcular el valor crítico de t
    const tValue = quantileT(1 - alfa / 2, v);

    // Calcular el error muestral
    const errorMuestral = tValue * amalgamiento * Math.sqrt(1 / n1 + 1 / n2);

    // Calcular los límites inferior y superior
    const diferenciaMedias = media1 - media2;
    const limiteInferior = diferenciaMedias - errorMuestral;
    const limiteSuperior = diferenciaMedias + errorMuestral;

    return {
        limiteInferior: parseFloat(limiteInferior.toFixed(8)),
        limiteSuperior: parseFloat(limiteSuperior.toFixed(8)),
        errorMuestral: parseFloat(errorMuestral.toFixed(8)),
    };
}

interface CalcularMuestraRequeridaInput {
    desvio1: number; // Puede ser desviación estándar o varianza según esVarianza
    desvio2: number;
    alfa: number;
    error: number;
    esVarianza: boolean;
}

interface CalcularMuestraRequeridaOutput {
    n: number;
}

function calcularMuestraRequerida(input: CalcularMuestraRequeridaInput): CalcularMuestraRequeridaOutput {
    const { desvio1, desvio2, alfa, error, esVarianza } = input;
    let n = 2; // Valor inicial de n

    // Convertir a varianza si es necesario
    const s1Squared = esVarianza ? desvio1 : desvio1 ** 2;
    const s2Squared = esVarianza ? desvio2 : desvio2 ** 2;

    while (true) {
        const v = 2 * n - 2; // Grados de libertad

        // Calcular la desviación estándar agrupada (amalgamiento)
        const amalgamiento = Math.sqrt(((n - 1) * s1Squared + (n - 1) * s2Squared) / v);

        // Calcular el valor crítico de t
        const tValue = quantileT(1 - alfa / 2, v);

        // Calcular el nuevo valor de n
        const nNuevo = 2 * Math.pow((tValue * amalgamiento) / error, 2);

        const nRedondeado = Math.ceil(nNuevo);

        if (nRedondeado === n) {
            break;
        }

        n = nRedondeado;
    }

    return {
        n,
    };
}


export {calcularLimites, calcularMuestraRequerida};