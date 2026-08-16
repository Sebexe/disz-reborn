import quantileNormal from '@stdlib/stats/base/dists/normal/quantile';
import cdfNormal from '@stdlib/stats/base/dists/normal/cdf';


interface DatosCondicionRechazo {
  valorCritico: number;
  sigma: number;
  alpha: number;
  muestra: number;
  tipoDeCola: "izquierda >=" | "derecha <=" | "doble";
}

interface DatosErrorTipo2 {

  /** 
   * Valor de rechazo utilizado en el ensayo de hipotesis
   */
  valorRechazo: number;
  sigma: number;
  muestra: number;
  mediaReal: number;
  tipoDeCola: "izquierda >=" | "derecha <=" | "doble";
  valorCriticoSuperior?: number;
  valorCriticoInferior?: number;
}

interface DatosMuestraRequerida {
  sigma: number;
  alpha: number;
  beta: number;
  mediaReal: number;
  valorCritico: number;
}

interface condicionRechazoResponse {
  condicionRechazo: number,
  limiteSuperior?: number
}


function calcularCondicionRechazo(datos: DatosCondicionRechazo): condicionRechazoResponse {
  const { valorCritico, sigma, alpha, muestra, tipoDeCola } = datos;

  let valorNormal: number;
  let condicionRechazo: number | [number, number];

  if (tipoDeCola === "izquierda >=") {
    valorNormal = 1 - alpha;
  } else if (tipoDeCola === "derecha <=") {
    valorNormal = alpha;
  } else {
    valorNormal = 1 - alpha / 2;
  }

  if (tipoDeCola === "izquierda >=" || tipoDeCola === "derecha <=") {
    condicionRechazo =
      valorCritico - (quantileNormal(valorNormal, 0, 1) * sigma) / Math.sqrt(muestra);
  } else {
    const limiteInferior =
      valorCritico - (quantileNormal(1 - alpha / 2, 0, 1) * sigma) / Math.sqrt(muestra);
    const limiteSuperior =
      valorCritico + (quantileNormal(1 - alpha / 2, 0, 1) * sigma) / Math.sqrt(muestra);

    return {
      condicionRechazo: limiteInferior,
      limiteSuperior
    }
  }

  return { condicionRechazo };
}

function calcularErrorTipo2(datos: DatosErrorTipo2) {
  const { valorRechazo: valorCritico, sigma, muestra, mediaReal, tipoDeCola, valorCriticoSuperior, valorCriticoInferior } = datos;

  let beta: number;

  if (tipoDeCola === "izquierda >=") {
    const z_beta = cdfNormal((valorCritico - mediaReal) / (sigma / Math.sqrt(muestra)), 0, 1);
    beta = 1 - z_beta;
  } else if (tipoDeCola === "derecha <=") {
    const z_beta = cdfNormal((valorCritico - mediaReal) / (sigma / Math.sqrt(muestra)), 0, 1);
    beta = z_beta;
  } else if (tipoDeCola === "doble" && valorCriticoSuperior !== undefined && valorCriticoInferior !== undefined) {
    const z_beta1 = cdfNormal((valorCriticoSuperior - mediaReal) / (sigma / Math.sqrt(muestra)), 0, 1);
    const z_beta2 = cdfNormal((valorCriticoInferior - mediaReal) / (sigma / Math.sqrt(muestra)), 0, 1);
    beta = z_beta1 - z_beta2;
  } else {
    throw new Error("Datos no válidos para calcular error tipo 2.");
  }

  return {
    beta: beta,
    poder: 1 - beta
  };
}

function calcularMuestraRequerida(datos: DatosMuestraRequerida) {
  const { sigma, alpha, beta, mediaReal, valorCritico } = datos;

  const z_alpha = quantileNormal(1 - alpha, 0, 1);
  const z_beta = quantileNormal(1 - beta, 0, 1);

  const muestra = Math.pow((z_alpha + z_beta) * sigma / (mediaReal - valorCritico), 2);

  return Math.ceil(muestra);
}
export { calcularCondicionRechazo, calcularErrorTipo2, calcularMuestraRequerida }


