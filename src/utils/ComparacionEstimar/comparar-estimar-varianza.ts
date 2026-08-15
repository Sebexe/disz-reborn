import quantileF from '@stdlib/stats/base/dists/f/quantile';
import quantileT from '@stdlib/stats/base/dists/t/quantile';

interface CalcularLimitesInput {
    muestra1: number;
    muestra2: number;
    varianza1: number; // Puede ser varianza o desviación estándar según esVarianza
    varianza2: number;
    alfa: number;
    esVarianza: boolean;
}

interface CalcularLimitesOutput {
    limiteInferior: number;
    limiteSuperior: number;
    relacionR: number;
}

function calcularLimites(input: CalcularLimitesInput): CalcularLimitesOutput {
    const { muestra1, muestra2, varianza1, varianza2, alfa, esVarianza } = input;
    const libertadNumerador = muestra1 - 1;
    const libertadDenominador = muestra2 - 1;

    let jota: number;
    if (esVarianza) {
        jota = varianza1 / varianza2;
    } else {
        jota = (varianza1 ** 2) / (varianza2 ** 2);
    }

    const fValueLower = quantileF(1 - alfa / 2, libertadNumerador, libertadDenominador);
    const fValueUpper = quantileF(alfa / 2, libertadNumerador, libertadDenominador);

    let limiteInferior = jota / fValueLower;
    let limiteSuperior = jota / fValueUpper;

    if (!esVarianza) {
        limiteInferior = Math.sqrt(limiteInferior);
        limiteSuperior = Math.sqrt(limiteSuperior);
    }

    const relacionR = parseFloat((limiteSuperior / limiteInferior).toFixed(8));

    return {
        limiteInferior: parseFloat(limiteInferior.toFixed(8)),
        limiteSuperior: parseFloat(limiteSuperior.toFixed(8)),
        relacionR,
    };
}

interface CalcularMuestraRequeridaInput {
    relacionR: number; // R para varianza, R' para desviación estándar
    alfa: number;
    esVarianza: boolean;
}

interface CalcularMuestraRequeridaOutput {
    v: number;
    n: number;
}

function calcularMuestraRequerida(input: CalcularMuestraRequeridaInput): CalcularMuestraRequeridaOutput {
    let { relacionR, alfa, esVarianza } = input;
    let v = 1;

    if (!esVarianza) {
        relacionR = relacionR ** 2; // Si es desviación estándar, elevamos al cuadrado R'
    }

    while (true) {
        const tValue = quantileT(1 - alfa / 2, v);
        const sqrtRelacionR = Math.sqrt(relacionR);

        const numerator = 4 * tValue ** 2 * sqrtRelacionR;
        const denominator = (sqrtRelacionR - 1) ** 2;

        const vNuevo = numerator / denominator;
        const vRedondeado = Math.ceil(vNuevo);

        if (vRedondeado === v) {
            break;
        }

        v = vRedondeado;
    }

    const n = v + 1;

    return { v, n };
}


export {calcularLimites,calcularMuestraRequerida}


