import quantileNormal from '@stdlib/stats/base/dists/normal/quantile';
import quantileT from '@stdlib/stats/base/dists/t/quantile';

interface DatosEstimarLimite {
  muestra: number;
  media: number;
  sigmaPoblacional: number;
  nivelConfianza: number;
  muestral: boolean;
}

interface DatosEstimarError {
  muestra: number;
  sigmaPoblacional: number;
  nivelConfianza: number;
  muestral: boolean;
}

interface DatosEstimarSize {
  sigmaPoblacional: number;
  nivelConfianza: number;
  errorMuestral: number;
  muestral: boolean;
}

function calcularLimitesConDatos(datos: DatosEstimarLimite) {
  const { muestra, media, sigmaPoblacional, nivelConfianza, muestral } = datos;

  const riesgo = 1 - nivelConfianza;
  let score;

  if (muestral) {
    // T-score correspondiente al nivel de confianza utilizando quantileT
    score = quantileT(1 - riesgo / 2, muestra - 1);
  } else {
    // Z-score correspondiente al nivel de confianza utilizando quantileNormal
    score = quantileNormal(1 - riesgo / 2, 0, 1);
  }

  // Cálculo de los límites
  const limiteInf = media - (sigmaPoblacional / Math.sqrt(muestra)) * score;
  const limiteSup = media + (sigmaPoblacional / Math.sqrt(muestra)) * score;

  // Retornando los límites como un objeto
  return {
    limiteInferior: limiteInf,
    limiteSuperior: limiteSup,
  };
}

function calcularErrorMuestral(datos: DatosEstimarError) {
  const { muestra, sigmaPoblacional, nivelConfianza, muestral } = datos;

  const riesgo = 1 - nivelConfianza;
  let score;

  if (muestral) {
    // T-score correspondiente al nivel de confianza utilizando quantileT
    score = quantileT(1 - riesgo / 2, muestra - 1);
  } else {
    // Z-score correspondiente al nivel de confianza utilizando quantileNormal
    score = quantileNormal(1 - riesgo / 2, 0, 1);
  }

  // Cálculo del error muestral
  const errorMuestral = (sigmaPoblacional / Math.sqrt(muestra)) * score;

  // Retornando el error muestral
  return errorMuestral;
}

function calcularSizeMuestral(datos: DatosEstimarSize) {
  const { sigmaPoblacional, nivelConfianza, errorMuestral, muestral} = datos;

  const riesgo = 1 - nivelConfianza;
  let score;

  if (muestral) {
    let n = 2;
    while (true) {
        // T-score correspondiente al nivel de confianza utilizando quantileT
        const tCritico = quantileT(1 - riesgo / 2, n - 1);
        const muestraCalculada = Math.pow((sigmaPoblacional * tCritico) / errorMuestral, 2);
        if (muestraCalculada <= n) {
          break;
        }
        n += 1;
      }
      return Math.ceil(n);
     
  } else {
    // Z-score correspondiente al nivel de confianza utilizando quantileNormal
    score = quantileNormal(1 - riesgo / 2, 0, 1);
  }

  // Cálculo del tamaño de muestra requerido
  const muestra = Math.pow((sigmaPoblacional * score) / errorMuestral, 2);

  // Retornando el tamaño de muestra requerido redondeado hacia arriba
  return Math.ceil(muestra);
}
export {calcularSizeMuestral,calcularErrorMuestral,calcularLimitesConDatos, type DatosEstimarError,type DatosEstimarLimite,type DatosEstimarSize};


// Ejecuta la función si el script se ejecuta directamente
