import quantileF from '@stdlib/stats/base/dists/f/quantile';
import cdfF from '@stdlib/stats/base/dists/f/cdf';
import quantileT from '@stdlib/stats/base/dists/t/quantile';

interface CalcularValorRechazoInput {
    muestra1: number;
    muestra2: number;
    alfa: number;
    cola: number; // 1: Cola derecha (<=), 2: Cola izquierda (>=), 3: Cola bilateral (=)
    phi: number; // phi o phi cuadrado dependiendo de esVarianza
    esVarianza: boolean;
}

interface CalcularMuestraRequeridaInput {
    phi1: number;
    phi2: number;
    alfa: number;
    beta: number;
    esVarianza: boolean;
}

interface CalcularMuestraRequeridaOutput {
    v: number;
    n: number;
}

interface CalcularValorRechazoOutput {
    valorCritico?: number;
    valorCritico1?: number;
    valorCritico2?: number;
}

interface CalcularBetaInput {
    phi1: number;
    phi2: number;
    alfa: number;
    muestra1: number;
    muestra2: number;
    cola: number;
    esVarianza: boolean;
}

interface CalcularBetaOutput {
    beta: number;
    poderEnsayo: number;
}


function calcularValorRechazo(input: CalcularValorRechazoInput): CalcularValorRechazoOutput {
    const { muestra1, muestra2, alfa, cola, phi, esVarianza } = input;
    const libertadNumerador = muestra1 - 1;
    const libertadDenominador = muestra2 - 1;

    if (cola === 1) {
        const fValue = quantileF(1-alfa, libertadNumerador, libertadDenominador);
        console.log(fValue);

        const valorCritico = esVarianza ? phi * fValue : phi * Math.sqrt(fValue);
        return { valorCritico };
    } else if (cola === 2) {
        const fValue = quantileF(alfa, libertadNumerador, libertadDenominador);
        console.log(fValue);
        const valorCritico = esVarianza ? phi * fValue : phi * Math.sqrt(fValue);
        return { valorCritico };
    } else if (cola === 3) {
        const fValue1 = quantileF(alfa / 2, libertadNumerador, libertadDenominador);
        const fValue2 = quantileF(1 - alfa / 2, libertadNumerador, libertadDenominador);
        const valorCritico1 = esVarianza ? phi * fValue1 : phi * Math.sqrt(fValue1);
        const valorCritico2 = esVarianza ? phi * fValue2 : phi * Math.sqrt(fValue2);
        return { valorCritico1, valorCritico2 };
    } else {
        throw new Error("Valor de cola inválido");
    }
}



function calcularBetaUnilateral(phi0: number, phi1: number, alfa: number, vn: number, vd: number): number {
    const Fcritico = quantileF(alfa, vn, vd);
    const razonPhiF = (phi0 / phi1) * Fcritico;
    const beta = cdfF(razonPhiF, vn, vd);
    return beta;
}

function calcularBetaBilateral(phi1: number, alfa: number, vn: number, vd: number): number {
    const Fcritico1 = quantileF(1 - alfa / 2, vn, vd);
    const Fcritico2 = quantileF(alfa / 2, vn, vd);
    const razonPhiF1 = (1 / phi1) * Fcritico1;
    const razonPhiF2 = (1 / phi1) * Fcritico2;
    const beta = cdfF(razonPhiF1, vn, vd) - cdfF(razonPhiF2, vn, vd);
    return beta;
}

function calcularBeta(input: CalcularBetaInput): CalcularBetaOutput {
    const { phi1, phi2, alfa, muestra1, muestra2, cola, esVarianza } = input;
    const vn = muestra1 - 1;
    const vd = muestra2 - 1;
    let beta: number;

    if (cola === 1) {
        const phi1Val = esVarianza ? phi1 : phi1 ** 2;
        const phi2Val = esVarianza ? phi2 : phi2 ** 2;
        beta = calcularBetaUnilateral(phi1Val, phi2Val, 1 - alfa, vn, vd);
    } else if (cola === 2) {
        const phi1Val = esVarianza ? phi1 : phi1 ** 2;
        const phi2Val = esVarianza ? phi2 : phi2 ** 2;
        beta = calcularBetaUnilateral(phi1Val, phi2Val, alfa, vn, vd);
    } else if (cola === 3) {
        const phi2Val = esVarianza ? phi2 : phi2 ** 2;
        beta = calcularBetaBilateral(phi2Val, alfa, vn, vd);
    } else {
        throw new Error("Valor de cola inválido");
    }

    const poderEnsayo = 1 - beta;
    return { beta, poderEnsayo };
}



function calcularMuestraRequerida(input: CalcularMuestraRequeridaInput): CalcularMuestraRequeridaOutput {
    const { phi1, phi2, alfa, beta, esVarianza } = input;
    let v = 1;
    const relacionR = esVarianza ? phi1 / phi2 : (phi1 ** 2) / (phi2 ** 2);

    while (true) {
        const tValueAlfa = quantileT(1 - alfa, v);
        const tValueBeta = quantileT(1 - beta, v);
        const sqrtRelacionR = Math.sqrt(relacionR);

        const numerator = 4 * sqrtRelacionR * (tValueAlfa + tValueBeta * sqrtRelacionR) *
            (tValueAlfa * sqrtRelacionR + tValueBeta);
        const denominator = (relacionR - 1) ** 2;

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



export {calcularBeta,calcularBetaBilateral,calcularBetaUnilateral,calcularMuestraRequerida,calcularValorRechazo};


