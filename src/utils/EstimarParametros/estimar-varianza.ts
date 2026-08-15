import quantileChiSquare from '@stdlib/stats/base/dists/chisquare/quantile';
import quantileNormal from '@stdlib/stats/base/dists/normal/quantile';

  // Interfaces for input data
  interface DatosEstimarLimitesVarianza {
    muestra: number;
    varianza: number;
    nivelConfianza: number;
  }

  interface DatosEstimarLimitesDesvio {
    muestra: number;
    desvioEstandar: number;
    nivelConfianza: number;
  }

  interface DatosTanteadorGarcia {
    valorR: number;
    valorAlpha: number;
    rprima : boolean
  }

  // Function to calculate limits with variance
  function calcularLimitesConVarianza(datos: DatosEstimarLimitesVarianza) {
    const { muestra, varianza, nivelConfianza } = datos;

    const riesgo = 1 - nivelConfianza;
    const limiteInf = ((muestra - 1) * varianza) / quantileChiSquare(1 - riesgo / 2, muestra - 1);
    const limiteSup = ((muestra - 1) * varianza) / quantileChiSquare(riesgo / 2, muestra - 1);

    return {
      limiteInferior: limiteInf,
      limiteSuperior: limiteSup,
    };
  }

  // Function to calculate limits with standard deviation
  function calcularLimitesConDesvio(datos: DatosEstimarLimitesDesvio) {
    const { muestra, desvioEstandar, nivelConfianza } = datos;

    const riesgo = 1 - nivelConfianza;
    const limiteInf = ((muestra - 1) * Math.pow(desvioEstandar, 2)) / quantileChiSquare(1 - riesgo / 2, muestra - 1);
    const limiteSup = ((muestra - 1) * Math.pow(desvioEstandar, 2)) / quantileChiSquare(riesgo / 2, muestra - 1);

    return {
      limiteInferior: Math.sqrt(limiteInf),
      limiteSuperior: Math.sqrt(limiteSup),
    };
  }

  // Function for Tanteador de Garcia
  function tanteadorDeGarcia(datos: DatosTanteadorGarcia) {
    let { valorR, valorAlpha, rprima } = datos;

    if (rprima) {
      valorR = valorR ** 2;
    }

    const valorA = (quantileNormal(1 - valorAlpha / 2, 0, 1) * (Math.cbrt(valorR) + 1)) /
      (2 * (Math.cbrt(valorR) - 1));
    const gradosLibertad = (2 / 9) * Math.pow(valorA + Math.sqrt(Math.pow(valorA, 2) + 1), 2);

    return Math.ceil(gradosLibertad + 1)
  }


  export {tanteadorDeGarcia,calcularLimitesConDesvio,calcularLimitesConVarianza}


  // Ejecuta la función si el script se ejecuta directamente
