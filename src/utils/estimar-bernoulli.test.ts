import { describe, it, expect } from 'vitest';
import { calcularMuestra,estimarBernoulli,estimarBernoulliCompleto } from "./EstimarParametros/estimar-bernoulli"
import { calcularBeta,calcularCondicionDeRechazoBernoulli, calcularMuestraAdecuada } from "./EnsayoParametros/ensayo-bernoulli"

describe('Trabajo Practico 2', () => {
  it('Ejercicio 1 A', () => {
    const result = estimarBernoulli({
      exitos : 150,
      muestra : 600,
      riesgo : 0.1,
    })
    expect(result.limiteInferior).toBeCloseTo(0.2210, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.2808, 3);

  });

  it('Ejercicio 1 B', () => {
    const result = calcularMuestra({
      tasaOcurrencias : 0.25,
      riesgo : 0.1,
      errorBuscado : 0.01
    })
    expect(result).toBeCloseTo(5074, 3);

  });
  it('Ejercicio 2 A', () => {
    const result = estimarBernoulli({
      exitos : 3,
      muestra : 25,
      riesgo : 0.05,
    })
    expect(result.limiteInferior).toBeCloseTo(0.0254, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.3122, 3);

  });

  it('Ejercicio 2 B', () => {
    const result = estimarBernoulliCompleto({
      exitos : 3,
      muestra : 25,
      riesgo : 0.05,
    })
    expect(result.fraccionMaxima).toBeCloseTo(0.2818, 3);

  });


  it('Ejercicio 3 A', () => {
    const result = estimarBernoulli({
      exitos : 1,
      muestra : 10,
      riesgo : 0.1,
    })
    expect(result.limiteInferior).toBeCloseTo(0.0051, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.3942, 3);

  });

  it('Ejercicio 3 B', () => {
    const result = estimarBernoulli({
      exitos : 0,
      muestra : 10,
      riesgo : 0.1,
    })
    expect(result.limiteInferior).toBeCloseTo(0, 10);
    expect(result.limiteSuperior).toBeCloseTo(0.2589, 3);

  });

  it('Ejercicio 4 A', () => {
    const result = estimarBernoulli({
      exitos : 60,
      muestra : 600,
      riesgo : 0.05,
    })
    expect(result.limiteInferior).toBeCloseTo(0.0771, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.1269, 3);

  });

  it('Ejercicio 5 A', () => {
    const result = estimarBernoulli({
      exitos : 198,
      muestra : 1000,
      riesgo : 0.05,
    })
    expect(result.limiteInferior).toBeCloseTo(0.1737, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.2241, 3);

  });

  it('Ejercicio 6 A', () => {
    const result = estimarBernoulli({
      exitos : 9,
      muestra : 30,
      riesgo : 0.05,
    })
    expect(result.limiteInferior).toBeCloseTo(0.1473, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.4940, 3);
  });

  it('Ejercicio 7 A', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa : 0.1,
      n : 1000,
      pCritico : 0.07,
      tipoDeCola :'derecha <='
    })

    expect(0.085 > result.pEstimado).toBe(true); // Se rechazo por lo que supera el p estimado.
  });

  it('Ejercicio 8 A', () => {
    const result = estimarBernoulli({
      exitos : 14,
      muestra : 100,
      riesgo : 0.1,
    })
    expect(result.limiteInferior).toBeCloseTo(0.08666758, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.21017393, 3);

  });


  it('Ejercicio 8 B', () => {
    const result = calcularMuestra({
      tasaOcurrencias : 0.14,
      riesgo : 0.1,
      errorBuscado : 0.02
    })
    expect(result).toBeCloseTo(816, 1);
  })

  it('Ejercicio 8 C', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa : 0.05,
      n : 100,
      pCritico : 0.10,
      tipoDeCola :'derecha <='
    })
    expect(0.14 < result.pEstimado).toBe(true); // No se rechazo por lo que no supera el p estimado.
  });

  it('Ejercicio 8 C', () => {
    const result = calcularBeta({
      n : 100,
      pUno : 0.12,
      rRechazo : calcularCondicionDeRechazoBernoulli({
      alfa : 0.05,
      n : 100,
      pCritico : 0.10,
      tipoDeCola :'derecha <='
    }).rCritico,
      tipoDeCola : 'derecha <='
    })
    expect(result.potencia).toBeCloseTo(0.1415,2);
  });

  it('Ejercicio 9 A', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.1,
      n: 500,
      pCritico: 0.6,
      tipoDeCola: 'derecha <=',
    });

    expect(325 > result.rCritico).toBe(true); // se rechaza H0, se aconseja iniciar la campaña

  });

  it('Ejercicio 9 B', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.1,
      n: 500,
      pCritico: 0.6,
      tipoDeCola: 'derecha <=',
    }).rCritico;

    const result = calcularBeta({
      n: 500,
      pUno: 0.66,
      rRechazo: rCritico,
      tipoDeCola: 'derecha <=',
    });

    expect(result.beta).toBeCloseTo(0.0724, 2);
  });

  it('Ejercicio 9 C', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.1,
      n: 500,
      pCritico: 0.6,
      tipoDeCola: 'derecha <=',
    }).rCritico;

    const result = calcularBeta({
      n: 500,
      pUno: 0.68,
      rRechazo: rCritico,
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.9922, 2);
  });

  it('Ejercicio 10 A', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.2,
      beta: 0.1,
      p0: 0.05,
      p1: 0.07,
      valorMaximo: 660,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 638, rCritico: 37 });
  });

  it('Ejercicio 10 B', () => {
    // calcularMuestraAdecuada devuelve el umbral de rechazo ("37 o más"), pero calcularBeta
    // espera el número de aceptación (36); se recalcula con calcularCondicionDeRechazoBernoulli
    // para obtener el valor correctamente emparejado.
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.2,
      n: 638,
      pCritico: 0.05,
      tipoDeCola: 'derecha <=',
    }).rCritico;

    const result = calcularBeta({
      n: 638,
      pUno: 0.06,
      rRechazo: rCritico,
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.608, 2);
  });

  it('Ejercicio 10 C', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.2,
      n: 638,
      pCritico: 0.05,
      tipoDeCola: 'derecha <=',
    });

    expect(0.052 < result.pEstimado).toBe(true); // no se puede asegurar que la proporción haya aumentado

  });

  it('Ejercicio 10 D', () => {
    const result = calcularBeta({
      n: 638,
      pUno: 0.07,
      rRechazo: 37,
      tipoDeCola: 'derecha <=',
    });

    expect(result.beta).toBeCloseTo(0.1, 1); // es dato del enunciado

  });

  it('Ejercicio 11 A', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 50,
      pCritico: 0.12,
      tipoDeCola: 'derecha <=',
    });

    expect(result.rCritico).toBe(10); // se detiene con 11 o más defectuosas

  });

  it('Ejercicio 11 B', () => {
    const result = calcularBeta({
      n: 50,
      pUno: 0.14,
      rRechazo: 10,
      tipoDeCola: 'derecha <=',
    });

    expect(result.beta).toBeCloseTo(0.9176, 2);
  });

  it('Ejercicio 11 C', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.05,
      beta: 0.5,
      p0: 0.12,
      p1: 0.14,
      valorMaximo: 800,
      tipoDeCola: 'derecha <=',
    });

    expect((result as { n: number }).n).toBe(755);
  });

  it('Ejercicio 12 A', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.05,
      beta: 0.01,
      p0: 0.11,
      p1: 0.16,
      valorMaximo: 780,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 739, rCritico: 96 });
  });

  it('Ejercicio 12 B', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 739,
      pCritico: 0.11,
      tipoDeCola: 'derecha <=',
    }).rCritico;

    const result = calcularBeta({
      n: 739,
      pUno: 0.14,
      rRechazo: rCritico,
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.7996, 2);
  });

  it('Ejercicio 13 A', () => {
    // n=100, se rechaza el lote con 9 o más defectuosas => número de aceptación = 8
    const result = calcularBeta({
      n: 100,
      pUno: 0.05,
      rRechazo: 8,
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.0631, 2); // riesgo del proveedor

  });

  it('Ejercicio 13 B', () => {
    // Se verifica que p1=11,83% produce el riesgo del comprador (15%) buscado
    const result = calcularBeta({
      n: 100,
      pUno: 0.1183,
      rRechazo: 8,
      tipoDeCola: 'derecha <=',
    });

    expect(result.beta).toBeCloseTo(0.15, 1);
  });

  it('Ejercicio 14 A', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.01,
      beta: 0.05,
      p0: 0.14,
      p1: 0.1,
      valorMaximo: 1100,
      tipoDeCola: 'izquierda >=',
    });

    expect((result as { n: number }).n).toBe(1043);
  });

  it('Ejercicio 14 B', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.01,
      n: 1043,
      pCritico: 0.14,
      tipoDeCola: 'izquierda >=',
    }).rCritico;

    const result = calcularBeta({
      n: 1043,
      pUno: 0.12,
      rRechazo: rCritico,
      tipoDeCola: 'izquierda >=',
    });

    expect(result.beta).toBeCloseTo(0.668, 2);
  });

  it('Ejercicio 15 A', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 30,
      pCritico: 0.7,
      tipoDeCola: 'derecha <=',
    });

    expect(25 <= result.rCritico).toBe(true); // no se aconseja explotar el monte

  });

  it('Ejercicio 15 B', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 100,
      pCritico: 0.7,
      tipoDeCola: 'derecha <=',
    });

    expect(result.rCritico).toBe(77); // se aconseja explotar con 78 o más árboles mayores a 5m

  });

  it('Ejercicio 15 C', () => {
    const result = estimarBernoulli({
      exitos: 25,
      muestra: 30,
      riesgo: 0.05,
    });

    expect(result.limiteInferior).toBeCloseTo(0.6527, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.9436, 3);
  });

  it('Ejercicio 15 D ARREGLAR', () => {
    const result = estimarBernoulli({
      exitos: 25,
      muestra: 30,
      riesgo: 0.05,
    });

    expect(result.limiteInferior).toBeCloseTo(0.6527, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.9436, 3);
  });

  it('Ejercicio 15 E', () => {
    const limites = estimarBernoulli({
      exitos: 25,
      muestra: 30,
      riesgo: 0.05,
    });

    const errorActual = (limites.limiteSuperior - limites.limiteInferior) / 2;

    const result = calcularMuestra({
      riesgo: 0.05,
      tasaOcurrencias: 25 / 30,
      errorBuscado: errorActual * 0.5,
    });

    expect(result).toBeCloseTo(102, 0);
  });

  it('Ejercicio 16 A', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.01,
      beta: 0.1,
      p0: 0.12,
      p1: 0.15,
      valorMaximo: 1700,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 1675, rCritico: 233 });
  }, 15000);

  it('Ejercicio 16 B', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.01,
      n: 1675,
      pCritico: 0.12,
      tipoDeCola: 'derecha <=',
    }).rCritico;

    const result = calcularBeta({
      n: 1675,
      pUno: 0.14,
      rRechazo: rCritico,
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.5527, 2);
  });

  it('Ejercicio 16 C', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.01,
      beta: 0.1,
      p0: 0.12,
      p1: 0.14,
      valorMaximo: 3700,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 3667, rCritico: 487 });
  }, 30000);

  it('Ejercicio 17 A', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.1,
      n: 226,
      pCritico: 0.041,
      tipoDeCola: 'izquierda >=',
    }).rCritico;

    const result = calcularBeta({
      n: 226,
      pUno: 0.041,
      rRechazo: rCritico,
      tipoDeCola: 'izquierda >=',
    });

    expect(result.potencia).toBeCloseTo(0.1, 1); // riesgo de adoptar la nueva aleación sin necesidad

  });

  it('Ejercicio 18 A', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.01,
      n: 1585,
      pCritico: 0.06,
      tipoDeCola: 'izquierda >=',
    }).rCritico;

    const result = calcularBeta({
      n: 1585,
      pUno: 0.06,
      rRechazo: rCritico,
      tipoDeCola: 'izquierda >=',
    });

    expect(result.potencia).toBeCloseTo(0.01, 1);
  });

  it('Ejercicio 18 B', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.01,
      n: 1585,
      pCritico: 0.06,
      tipoDeCola: 'izquierda >=',
    }).rCritico;

    const resultCuatroPorciento = calcularBeta({
      n: 1585,
      pUno: 0.04,
      rRechazo: rCritico,
      tipoDeCola: 'izquierda >=',
    });
    expect(resultCuatroPorciento.potencia).toBeCloseTo(0.9, 1);

    const resultCincoPorciento = calcularBeta({
      n: 1585,
      pUno: 0.05,
      rRechazo: rCritico,
      tipoDeCola: 'izquierda >=',
    });
    expect(resultCincoPorciento.potencia).toBeCloseTo(0.2569, 2);
  });

  it('Ejercicio 19 A', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 1000,
      pCritico: 1 / 37,
      tipoDeCola: 'derecha <=',
    });

    expect(42 > result.rCritico).toBe(true); // la denuncia tiene fundamento estadístico

  });

  it('Ejercicio 19 B', () => {
    const rCritico = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 1000,
      pCritico: 1 / 37,
      tipoDeCola: 'derecha <=',
    }).rCritico;

    const result = calcularBeta({
      n: 1000,
      pUno: 0.05,
      rRechazo: rCritico,
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.9789, 2);
  });

  it('Ejercicio 20 A', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.05,
      beta: 0.1,
      p0: 0.015,
      p1: 0.04,
      valorMaximo: 400,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 353, rCritico: 10 });
  });

  it('Ejercicio 20 B', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.15,
      beta: 0.1,
      p0: 0.02,
      p1: 0.05,
      valorMaximo: 260,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 218, rCritico: 7 });
  });

  it('Ejercicio 21', () => {
    const result = calcularBeta({
      n: 80,
      pUno: 0.055,
      rRechazo: 4, // se detiene con 5 o más defectuosas => número de aceptación = 4
      tipoDeCola: 'derecha <=',
    });

    expect(result.potencia).toBeCloseTo(0.451, 2);
  });

  it('Ejercicio 22 A', () => {
    const result = calcularBeta({
      n: 40,
      pUno: 0.05,
      rRechazo: 2,
      tipoDeCola: 'derecha <=',
    });

    expect(result.beta).toBeCloseTo(0.6767, 2); // probabilidad de aceptación del lote

  });

  it('Ejercicio 22 B', () => {
    const result = calcularBeta({
      n: 40,
      pUno: 0.0625,
      rRechazo: 2,
      tipoDeCola: 'derecha <=',
    });

    expect(result.beta).toBeCloseTo(0.5397, 2);
  });

  it('Ejercicio 23', () => {
    const result = calcularCondicionDeRechazoBernoulli({
      alfa: 0.05,
      n: 160,
      pCritico: 0.05,
      tipoDeCola: 'izquierda >=',
    });

    expect(2 < result.rCritico).toBe(true); // se puede asegurar que la presencia de NDMA disminuyó

  });

  it('Ejercicio 24', () => {
    const result = calcularMuestraAdecuada({
      alfa: 0.01,
      beta: 0.05,
      p0: 0.01,
      p1: 0.02,
      valorMaximo: 2300,
      tipoDeCola: 'derecha <=',
    });

    expect(result).toEqual({ n: 2258, rCritico: 35 });
  }, 15000);

});