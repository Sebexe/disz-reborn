import quantileNormal from '@stdlib/stats/base/dists/normal/quantile';
import cdfNormal from '@stdlib/stats/base/dists/normal/cdf';

interface CalcularValorRechazoInput {
    deltaCero: number;
    alfa: number;
    sigma1: number;
    sigma2: number;
    n1: number;
    n2: number;
    cola: number; // 1: Izquierda >=, 2: Derecha <=, 3: Bilateral
}

interface CalcularValorRechazoOutput {
    valorCritico: number;
}

function calcularValorRechazo(input: CalcularValorRechazoInput): CalcularValorRechazoOutput {
    const { deltaCero, alfa, sigma1, sigma2, n1, n2, cola } = input;
    const sigmaD = Math.sqrt((sigma1 ** 2) / n1 + (sigma2 ** 2) / n2);
    let valorCritico: number;

    if (cola === 2) { // Derecha <=
        valorCritico = deltaCero + quantileNormal(1 - alfa, 0, 1) * sigmaD;
    } else if (cola === 1) { // Izquierda >=
        valorCritico = deltaCero - quantileNormal(1 - alfa, 0, 1) * sigmaD;
    } else if (cola === 3) { // Bilateral
        valorCritico = deltaCero + quantileNormal(1 - alfa / 2, 0, 1) * sigmaD;
    } else {
        throw new Error("Valor de cola inválido");
    }

    return {
        valorCritico: parseFloat(valorCritico.toFixed(8)),
    };
}

interface CalcularErrorTipo2Input {
    deltaCritico: number;
    deltaUno: number;
    sigma1: number;
    sigma2: number;
    n1: number;
    n2: number;
    cola: number; // 1: Izquierda >=, 2: Derecha <=, 3: Bilateral
}

interface CalcularErrorTipo2Output {
    beta: number;
    poderPrueba: number;
}

function calcularErrorTipo2(input: CalcularErrorTipo2Input): CalcularErrorTipo2Output {
    const { deltaCritico, deltaUno, sigma1, sigma2, n1, n2, cola } = input;
    const sigmaD = Math.sqrt((sigma1 ** 2) / n1 + (sigma2 ** 2) / n2);
    let beta: number;

    if (cola === 2) { // Derecha <=
        beta = cdfNormal((deltaCritico - deltaUno) / sigmaD, 0, 1);
    } else if (cola === 1) { // Izquierda >=
        beta = 1 - cdfNormal((deltaCritico - deltaUno) / sigmaD, 0, 1);
    } else {
        throw new Error("Valor de cola inválido");
    }

    const poderPrueba = 1 - beta;

    return {
        beta: parseFloat(beta.toFixed(8)),
        poderPrueba: parseFloat(poderPrueba.toFixed(8)),
    };
}

interface CalcularMuestraRequeridaInput {
    deltaCero: number;
    deltaUno: number;
    sigma1: number;
    sigma2: number;
    alfa: number;
    beta: number;
    cola: number; // 1: Izquierda >=, 2: Derecha <=, 3: Bilateral
}

interface CalcularMuestraRequeridaOutput {
    n: number;
}

function calcularMuestraRequerida(input: CalcularMuestraRequeridaInput): CalcularMuestraRequeridaOutput {
    const { deltaCero, deltaUno, sigma1, sigma2, alfa, beta, cola } = input;
    let n: number;

    if (cola === 2) { // Derecha <=
        n = ((quantileNormal(1 - alfa, 0, 1) + quantileNormal(1 - beta, 0, 1)) / (deltaUno - deltaCero)) ** 2
            * (sigma1 ** 2 + sigma2 ** 2);
    } else if (cola === 1) { // Izquierda >=
        n = ((quantileNormal(alfa, 0, 1) + quantileNormal(beta, 0, 1)) / (deltaCero - deltaUno)) ** 2
            * (sigma1 ** 2 + sigma2 ** 2);
    } else {
        throw new Error("Valor de cola inválido o caso no manejado");
    }

    return {
        n: parseFloat(n.toFixed(8)),
    };
}

interface CalcularValorRechazoDeltaEstrellaInput {
    hache: number;
    alfa: number;
    sigma1: number;
    sigma2: number;
    n1: number;
    n2: number;
    cola: number; // 1: Izquierda >=, 2: Derecha <=, 3: Bilateral
}

interface CalcularValorRechazoDeltaEstrellaOutput {
    deltaEstrellaCritico: number;
}

function calcularValorRechazoDeltaEstrella(input: CalcularValorRechazoDeltaEstrellaInput): CalcularValorRechazoDeltaEstrellaOutput {
    const { hache, alfa, sigma1, sigma2, n1, n2, cola } = input;
    const sigmaD = Math.sqrt((sigma1 ** 2) / n1 + hache ** 2 * (sigma2 ** 2) / n2);
    let deltaEstrellaCritico: number;

    if (cola === 2) { // Derecha <=
        deltaEstrellaCritico = quantileNormal(1 - alfa, 0, 1) * sigmaD;
    } else if (cola === 1) { // Izquierda >=
        deltaEstrellaCritico = quantileNormal(alfa, 0, 1) * sigmaD;
    } else {
        throw new Error("Valor de cola inválido");
    }

    return {
        deltaEstrellaCritico: parseFloat(deltaEstrellaCritico.toFixed(8)),
    };
}



export {calcularErrorTipo2,calcularMuestraRequerida,calcularValorRechazo, calcularValorRechazoDeltaEstrella};