import quantileChiSquare from '@stdlib/stats/base/dists/chisquare/quantile';
import cdfChiSquare from '@stdlib/stats/base/dists/chisquare/cdf';
import quantileNormal from '@stdlib/stats/base/dists/normal/quantile';


  interface DatosCondicionRechazo {
    sigmaValor: number;
    muestra: number;
    alpha: number;
    esVarianza: boolean;  // Indica si estamos trabajando con varianza o desviación estándar
    tipoCola: 'derecha' | 'izquierda >=';
  }

  function calcularCondicionRechazo(datos: DatosCondicionRechazo) {
    const { sigmaValor, muestra, alpha, esVarianza, tipoCola } = datos;

    // Determinar el valor crítico de chi-cuadrado
    const valorChi = tipoCola === 'derecha' ? 1 - alpha : alpha;

    // Calcular la condición de rechazo
    let sigmaCuadradoRechazo;
    if (esVarianza) {
      sigmaCuadradoRechazo = (quantileChiSquare(valorChi, muestra - 1) * sigmaValor) / (muestra - 1);
    } else {
      sigmaCuadradoRechazo = Math.sqrt((quantileChiSquare(valorChi, muestra - 1) * Math.pow(sigmaValor, 2)) / (muestra - 1));
    }

    return sigmaCuadradoRechazo
  }

  interface DatosCalculoBeta {
    sigmaValor: number;
    sigmaValorReal: number;
    muestra: number;
    esVarianza: boolean;  // Indica si estamos trabajando con varianza o desviación estándar
    tipoCola: 'derecha' | 'izquierda >=';
  }

  function calcularBeta(datos: DatosCalculoBeta) {
    const { sigmaValor, sigmaValorReal, muestra, esVarianza, tipoCola } = datos;

    // Cálculo de z_beta usando chi-cuadrado
    let z_beta;
    if (esVarianza) {
      z_beta = cdfChiSquare(((muestra - 1) * sigmaValor) / sigmaValorReal, muestra - 1);
    } else {
      z_beta = cdfChiSquare(((muestra - 1) * Math.pow(sigmaValor, 2)) / Math.pow(sigmaValorReal, 2), muestra - 1);
    }

    const beta = tipoCola === 'derecha' ? z_beta : 1 - z_beta;

    return {
      errorTipo2: beta,
      poderPrueba: 1 - beta,
    };
  }

  interface DatosTanteadorGarcia {
    valorAlpha: number;
    valorBeta: number;
    sigmaValorCritico: number;
    sigmaValorReal: number;
    esVarianza: boolean;  // Indica si estamos trabajando con varianza o desviación estándar
  }

  function tanteadorDeGarcia(datos: DatosTanteadorGarcia) {
    const { valorAlpha, valorBeta, sigmaValorCritico, sigmaValorReal, esVarianza } = datos;

    // Cálculo de R dependiendo si es varianza o desvio estándar
    const valorR = esVarianza ? sigmaValorReal / sigmaValorCritico : Math.pow(sigmaValorReal, 2) / Math.pow(sigmaValorCritico, 2);

    const valorANumerador = quantileNormal(1 - valorAlpha, 0, 1) + (quantileNormal(1 - valorBeta, 0, 1) * Math.pow(valorR, 1 / 3));
    const valorADenominador = 2 * (Math.pow(valorR, 1 / 3) - 1);
    const valorA = valorANumerador / valorADenominador;

    const gradosLibertad = (2 / 9) * Math.pow(valorA + Math.sqrt(Math.pow(valorA, 2) + 1), 2);

    return {
      gradosLibertad: Math.ceil(gradosLibertad),
      tamanoMuestra: Math.ceil(gradosLibertad + 1),
    };
  }



  export {calcularBeta,calcularCondicionRechazo,tanteadorDeGarcia}