import { describe, it, expect } from 'vitest';
import { calcularLimitesConDatos, calcularSizeMuestral } from "./EstimarParametros/estimar-media"
import { calcularMuestraRequerida, calcularCondicionRechazo, calcularErrorTipo2 } from "./EnsayoParametros/ensayo-media"

describe('Trabajo Practico 1', () => {
  it('Ejercicio 1 A', () => {
    const result = calcularLimitesConDatos({
      muestra: 10,
      media: 246,
      sigmaPoblacional: 15,
      nivelConfianza: 0.9,
      muestral: false,
    });

    expect(result.limiteInferior).toBeCloseTo(238.19, 1);
    expect(result.limiteSuperior).toBeCloseTo(253.81, 1);
  });
  it('Ejercicio 1 B', () => {
    const result = calcularSizeMuestral({
      errorMuestral: 5,
      nivelConfianza: 0.9,
      sigmaPoblacional: 15,
      muestral: false
    });

    expect(result).toBeCloseTo(25, 1);
  });

  it('Ejercicio 2 A', () => {
    const result = calcularSizeMuestral({
      errorMuestral: 2,
      nivelConfianza: 0.99,
      sigmaPoblacional: 5,
      muestral: false
    });

    expect(result).toBeCloseTo(42, 1);
  });

  it('Ejercicio 2 B', () => {
    const result = calcularLimitesConDatos({
      muestra: 42,
      media: 15,
      sigmaPoblacional: 5,
      nivelConfianza: 0.99,
      muestral: false,
    });

    expect(result.limiteInferior).toBeCloseTo(13.01, 1);
    expect(result.limiteSuperior).toBeCloseTo(16.99, 1);
  });


  it('Ejercicio 3 A', () => {
    const result = calcularSizeMuestral({
      errorMuestral: 0.5,
      nivelConfianza: 0.95,
      sigmaPoblacional: 1.2,
      muestral: false
    });

    expect(result).toBeCloseTo(23, 1);
  });

  it('Ejercicio 3 B', () => {
    const result = calcularLimitesConDatos({
      muestra: 23,
      media: 2.5,
      sigmaPoblacional: 1.2,
      nivelConfianza: 0.95,
      muestral: false,
    });

    expect(result.limiteInferior).toBeCloseTo(2.03, 1);
    expect(result.limiteSuperior).toBeCloseTo(3.02, 1);
  });

  it('Ejercicio 3 C', () => {
    const result = calcularSizeMuestral({
      errorMuestral: 0.5,
      nivelConfianza: 0.95,
      sigmaPoblacional: 1.44,
      muestral: true
    });

    expect(result).toBeCloseTo(35, 1);
  });

  it('Ejercicio 3 D', () => {
    const result = calcularLimitesConDatos({
      muestra: 23,
      media: 2.5,
      sigmaPoblacional: 1.44,
      nivelConfianza: 0.95,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(1.89, 1);
    expect(result.limiteSuperior).toBeCloseTo(3.15, 1);
  });

  it('Ejercicio 4 A', () => {
    const result = calcularLimitesConDatos({
      muestra: 4,
      media: 17350,
      sigmaPoblacional: 1793.51,
      nivelConfianza: 0.95,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(14496.13, 1);
    expect(result.limiteSuperior).toBeCloseTo(20203.88, 1);
  });
  it('Ejercicio 4 B', () => {
    const result = calcularSizeMuestral({
      errorMuestral: 1000,
      nivelConfianza: 0.95,
      sigmaPoblacional: 1793.51,
      muestral: true
    });

    expect(result).toBeCloseTo(15, 1);
  });

  it('Ejercicio 5 A', () => {
    const result = calcularLimitesConDatos({
      muestra: 20,
      media: 38,
      sigmaPoblacional: 4.2,
      nivelConfianza: 0.95,
      muestral: false,
    });

    expect(result.limiteInferior).toBeCloseTo(36.15, 1);
    expect(result.limiteSuperior).toBeCloseTo(39.85, 1);
  });
  it('Ejercicio 5 B', () => {
    const result = calcularSizeMuestral({
      errorMuestral: 1,
      nivelConfianza: 0.95,
      sigmaPoblacional: 4.2,
      muestral: false
    });

    expect(result).toBeCloseTo(68, 1);
  });

  it('Ejercicio 6 A', () => {
    const result = calcularLimitesConDatos({
      muestra: 60,
      media: 48.5,
      sigmaPoblacional: 42,
      nivelConfianza: 0.90,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(39.43, 1);
    expect(result.limiteSuperior).toBeCloseTo(57.57, 1);
  });

  it('Ejercicio 7 A', () => {
    const result = calcularLimitesConDatos({
      muestra: 25,
      media: 214,
      sigmaPoblacional: 21.3541565,
      nivelConfianza: 0.95,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(205.18, 1);
    expect(result.limiteSuperior).toBeCloseTo(222.82, 1);
  });

  it('Ejercicio 8', () => {
    const result = calcularCondicionRechazo({
      muestra: 10,
      alpha: 0.05,
      sigma: 15,
      tipoDeCola: "izquierda >=",
      valorCritico: 250,
    });

    expect(result.condicionRechazo).toBeCloseTo(242.19, 1);
  });

  it('Ejercicio 9 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 5,
      alpha: 0.05,
      sigma: 0.15,
      tipoDeCola: 'izquierda >=',
      valorCritico: 4,
    });

    expect(3.904 > result.condicionRechazo).toBe(true);

  });

  it('Ejercicio 9 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 3.85,
      muestra: 5,
      sigma: 0.15,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 5,
        alpha: 0.05,
        sigma: 0.15,
        tipoDeCola: 'izquierda >=',
        valorCritico: 4,
      }).condicionRechazo,
    })

    expect(result.beta).toBeCloseTo(0.2775, 1);

  });

  it('Ejercicio 9 D', () => {
    const result = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 3.85,
      sigma: 0.15,
      valorCritico: 4,
    })

    expect(result).toBeCloseTo(9, 1);

  });

  it('Ejercicio 10 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 10,
      alpha: 0.05,
      sigma: 1.3,
      tipoDeCola: 'izquierda >=',
      valorCritico: 11.2,
    });

    expect(10.6 < result.condicionRechazo).toBe(false);

  });

  it('Ejercicio 10 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 10.5,
      muestra: 10,
      sigma: 1.3,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 10,
        alpha: 0.05,
        sigma: 1.3,
        tipoDeCola: 'izquierda >=',
        valorCritico: 11.2,
      }).condicionRechazo,
    })

    expect(result.poder).toBeCloseTo(0.5231, 1);

  });

  it('Ejercicio 10 C', () => {
    const result = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 10.5,
      sigma: 1.3,
      valorCritico: 11.2,
    })

    expect(result).toBeCloseTo(30, 1);

  });


  it('Ejercicio 11 A', () => {
      const result = calcularCondicionRechazo({
        muestra: 10,
        alpha: 0.1,
        sigma: 0.1,
        tipoDeCola: 'derecha <=',
        valorCritico: 1,
      });
    expect(1.06 > result.condicionRechazo).toBe(true); // El ejercicio dice que se rechaza, por lo que tiene que ser mayor a la condicion de rechazo

  });

  it('Ejercicio 11 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 1.05,
      muestra: 10,
      sigma: 0.1,
      tipoDeCola: "derecha <=",
      valorRechazo: calcularCondicionRechazo({
      muestra: 10,
      alpha: 0.1,
      sigma: 0.1,
      tipoDeCola: 'derecha <=',
      valorCritico: 1,
    }).condicionRechazo,

    })

    expect(result.beta).toBeCloseTo(0.3831, 1);

  });

  it('Ejercicio 11 C', () => {
    const result = calcularMuestraRequerida({
      alpha: 0.1,
      beta: 0.1,
      mediaReal: 1.05,
      sigma: 0.1,
      valorCritico: 1,
    })

    expect(result).toBeCloseTo(27, 1);

  });


  it('Ejercicio 12 A', () => {
      const result = calcularCondicionRechazo({
        muestra: 40,
        alpha: 0.05,
        sigma: 1.5,
        tipoDeCola: 'izquierda >=',
        valorCritico: 2,
      });
    expect(1.7 < result.condicionRechazo).toBe(false); // El ejercicio dice que se rechaza, por lo que tiene que ser mayor a la condicion de rechazo

  });

  it('Ejercicio 12 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 1.8,
      muestra: 40,
      sigma: 1.5,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 40,
        alpha: 0.05,
        sigma: 1.5,
        tipoDeCola: 'izquierda >=',
        valorCritico: 2,
      }).condicionRechazo,

    })

    expect(result.poder).toBeCloseTo(0.2113, 1);

  });


  it('Ejercicio 13 A', () => {
      const result = calcularCondicionRechazo({
        muestra: 5,
        alpha: 0.05,
        sigma: 23,
        tipoDeCola: 'izquierda >=',
        valorCritico: 200,
      });

    expect(180 < result.condicionRechazo).toBe(true); // El ejercicio dice que se rechaza, por lo que tiene que ser menor a la condicion de rechazo

  });

  it('Ejercicio 13 B', () => {
      const result = calcularLimitesConDatos({
      muestra: 5,
      media: 180,
      sigmaPoblacional: 23,
      nivelConfianza: 0.8,
      muestral: false,
    });

    expect(result.limiteInferior).toBeCloseTo(166.81, 1);
    expect(result.limiteSuperior).toBeCloseTo(193.19, 1);
  });



  it('Ejercicio 14 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 522,
      sigma: 72,
      valorCritico: 580,
    })

    expect(muestra).toBeCloseTo(14, 1);


    const result = calcularCondicionRechazo({
        muestra,
        alpha: 0.05,
        sigma: 72,
        tipoDeCola: 'izquierda >=',
        valorCritico: 580,
      });

    expect(result.condicionRechazo).toBeCloseTo(548.34839514,1); // El ejercicio dice que se rechaza, por lo que tiene que ser menor a la condicion de rechazo

  });

  it('Ejercicio 14 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 551,
      muestra: 14,
      sigma: 72,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 14,
        alpha: 0.05,
        sigma: 72,
        tipoDeCola: 'izquierda >=',
        valorCritico: 580,
      }).condicionRechazo,

    })

    expect(result.poder).toBeCloseTo(0.4452, 1);

  });

  it('Ejercicio 14 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 551,
      muestra: 14,
      sigma: 72,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 14,
        alpha: 0.05,
        sigma: 72,
        tipoDeCola: 'izquierda >=',
        valorCritico: 580,
      }).condicionRechazo,

    })

    expect(result.beta * result.beta).toBeCloseTo(0.3078, 1);

  });

  it('Ejercicio 15 A', () => {
      const result = calcularCondicionRechazo({
        muestra: 25,
        alpha: 0.05,
        sigma: 2,
        tipoDeCola: 'izquierda >=',
        valorCritico: 12,
      });
    expect(10.8 < result.condicionRechazo).toBe(true); // El ejercicio dice que se rechaza, por lo que tiene que ser mayor a la condicion de rechazo

  });

  it('Ejercicio 15 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 11,
      muestra: 25,
      sigma: 2,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
      muestra: 25,
      alpha: 0.05,
      sigma: 2,
      tipoDeCola: 'izquierda >=',
      valorCritico: 12,
    }).condicionRechazo,

    })

    expect(result.beta).toBeCloseTo(0.1963, 1);

  });

  it('Ejercicio 15 C', () => {
    const result = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 11,
      sigma: 2,
      valorCritico: 12,
    })

    expect(result).toBeCloseTo(35, 1);

  });

  it('Ejercicio 16 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.1,
      beta: 0.05,
      mediaReal: 37,
      sigma: 1.3,
      valorCritico: 38,
    });

    expect(muestra).toBeCloseTo(15, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.1,
      sigma: 1.3,
      tipoDeCola: 'izquierda >=',
      valorCritico: 38,
    });

    expect(result.condicionRechazo).toBeCloseTo(37.56, 1);
  });

  it('Ejercicio 16 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 37.5,
      muestra: 15,
      sigma: 1.3,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 15,
        alpha: 0.1,
        sigma: 1.3,
        tipoDeCola: 'izquierda >=',
        valorCritico: 38,
      }).condicionRechazo,
    });

    expect(result.poder).toBeCloseTo(0.5824, 1);
  });

  it('Ejercicio 17 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 75,
      sigma: 6,
      valorCritico: 80,
    });

    expect(muestra).toBeCloseTo(13, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.05,
      sigma: 6,
      tipoDeCola: 'izquierda >=',
      valorCritico: 80,
    });

    expect(result.condicionRechazo).toBeCloseTo(77.26, 1);
  });

  it('Ejercicio 17 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 76,
      muestra: 13,
      sigma: 6,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 13,
        alpha: 0.05,
        sigma: 6,
        tipoDeCola: 'izquierda >=',
        valorCritico: 80,
      }).condicionRechazo,
    });

    expect(result.poder).toBeCloseTo(0.776, 1);
  });

  it('Ejercicio 17 D', () => {
    const result = calcularCondicionRechazo({
      muestra: 13,
      alpha: 0.05,
      sigma: 6,
      tipoDeCola: 'izquierda >=',
      valorCritico: 80,
    });

    expect(75 < result.condicionRechazo).toBe(true); // 75% cae en zona de rechazo, se detiene el proceso

  });

  it('Ejercicio 18 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.15,
      mediaReal: 290,
      sigma: 20,
      valorCritico: 280,
    });

    expect(muestra).toBeCloseTo(29, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.05,
      sigma: 20,
      tipoDeCola: 'derecha <=',
      valorCritico: 280,
    });

    expect(result.condicionRechazo).toBeCloseTo(286.11, 1);
  });

  it('Ejercicio 18 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 285,
      muestra: 29,
      sigma: 20,
      tipoDeCola: "derecha <=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 29,
        alpha: 0.05,
        sigma: 20,
        tipoDeCola: 'derecha <=',
        valorCritico: 280,
      }).condicionRechazo,
    });

    expect(result.poder).toBeCloseTo(0.3826, 1);
  });

  it('Ejercicio 19 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 1100,
      sigma: 180,
      valorCritico: 1250,
    });

    expect(muestra).toBeCloseTo(13, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.05,
      sigma: 180,
      tipoDeCola: 'izquierda >=',
      valorCritico: 1250,
    });

    expect(result.condicionRechazo).toBeCloseTo(1167.88, 1);
  });

  it('Ejercicio 19 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 1200,
      muestra: 13,
      sigma: 180,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 13,
        alpha: 0.05,
        sigma: 180,
        tipoDeCola: 'izquierda >=',
        valorCritico: 1250,
      }).condicionRechazo,
    });

    expect(result.poder).toBeCloseTo(0.26, 1);
  });

  it('Ejercicio 20 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.01,
      mediaReal: 4.7,
      sigma: 0.3,
      valorCritico: 4.5,
    });

    expect(muestra).toBeCloseTo(36, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.05,
      sigma: 0.3,
      tipoDeCola: 'derecha <=',
      valorCritico: 4.5,
    });

    expect(result.condicionRechazo).toBeCloseTo(4.59, 1);
  });

  it('Ejercicio 21 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 6,
      alpha: 0.01,
      sigma: 30,
      tipoDeCola: 'izquierda >=',
      valorCritico: 250,
    });

    expect(232 > result.condicionRechazo).toBe(true); // no se rechaza H0, no se cambia de aceite

  });

  it('Ejercicio 21 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 225,
      muestra: 6,
      sigma: 30,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 6,
        alpha: 0.01,
        sigma: 30,
        tipoDeCola: 'izquierda >=',
        valorCritico: 250,
      }).condicionRechazo,
    });

    expect(result.beta).toBeCloseTo(0.6122, 1);
  });

  it('Ejercicio 22 A - Alternativa 1', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.1,
      beta: 0.05,
      mediaReal: 27,
      sigma: 5.5,
      valorCritico: 30,
    });

    expect(muestra).toBeCloseTo(29, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.1,
      sigma: 5.5,
      tipoDeCola: 'izquierda >=',
      valorCritico: 30,
    });

    expect(result.condicionRechazo).toBeCloseTo(28.69, 1);
  });

  it('Ejercicio 22 A - Alternativa 2', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05,
      beta: 0.1,
      mediaReal: 32,
      sigma: 5.5,
      valorCritico: 30,
    });

    expect(muestra).toBeCloseTo(65, 1);

    const result = calcularCondicionRechazo({
      muestra,
      alpha: 0.05,
      sigma: 5.5,
      tipoDeCola: 'derecha <=',
      valorCritico: 30,
    });

    expect(result.condicionRechazo).toBeCloseTo(31.13, 1);
  });

  it('Ejercicio 23 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 10,
      alpha: 0.05,
      sigma: 2.2,
      tipoDeCola: 'izquierda >=',
      valorCritico: 25,
    });

    expect(result.condicionRechazo).toBeCloseTo(23.86, 1);
  });

  it('Ejercicio 23 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 22.23,
      muestra: 10,
      sigma: 2.2,
      tipoDeCola: "izquierda >=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 10,
        alpha: 0.05,
        sigma: 2.2,
        tipoDeCola: 'izquierda >=',
        valorCritico: 25,
      }).condicionRechazo,
    });

    expect(result.poder).toBeCloseTo(0.99, 1);
  });

  it('Ejercicio 24 A', () => {
    // n = 2 prototipos: dado por el presupuesto experimental, no derivado de la fórmula de tamaño muestral
    const result = calcularCondicionRechazo({
      muestra: 2,
      alpha: 0.05,
      sigma: 2300000,
      tipoDeCola: 'derecha <=',
      valorCritico: 10000000,
    });

    expect(result.condicionRechazo).toBeCloseTo(12675100.45, -3);
  });

  it('Ejercicio 25 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 4,
      alpha: 0.1,
      sigma: 12500,
      tipoDeCola: 'derecha <=',
      valorCritico: 128000,
    });

    // Recaudación neta: 140.000 - 5.000 de comisión fija
    expect(135000 < result.condicionRechazo).toBe(true); // no se rechaza H0, no se recomienda continuar

  });

  it('Ejercicio 25 B', () => {
    const result = calcularErrorTipo2({
      mediaReal: 140000,
      muestra: 4,
      sigma: 12500,
      tipoDeCola: "derecha <=",
      valorRechazo: calcularCondicionRechazo({
        muestra: 4,
        alpha: 0.1,
        sigma: 12500,
        tipoDeCola: 'derecha <=',
        valorCritico: 128000,
      }).condicionRechazo,
    });

    expect(result.beta).toBeCloseTo(0.2616, 1);
  });

  it('Ejercicio 25 C', () => {
    const result = calcularCondicionRechazo({
      muestra: 4,
      alpha: 0.1,
      sigma: 12500,
      tipoDeCola: 'derecha <=',
      valorCritico: 128000,
    });

    // Con comisión del 2%: neto = 140.000 * 0,98 = 137.200
    expect(137200 > result.condicionRechazo).toBe(true); // se rechaza H0, se recomienda continuar

  });

  it('Ejercicio 26 A', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05, // alpha/2 del 0,10 a dos colas
      beta: 0.05,
      mediaReal: 11.4,
      sigma: 0.1,
      valorCritico: 11.5,
    });

    expect(muestra).toBeCloseTo(11, 1);
  });

  it('Ejercicio 26 B', () => {
    const result = calcularCondicionRechazo({
      muestra: 11,
      alpha: 0.1,
      sigma: 0.1,
      tipoDeCola: 'doble',
      valorCritico: 11.5,
    });

    expect(result.condicionRechazo).toBeCloseTo(11.45, 1);
    expect(result.limiteSuperior).toBeCloseTo(11.55, 1);
  });

  it('Ejercicio 26 C', () => {
    const limites = calcularCondicionRechazo({
      muestra: 11,
      alpha: 0.1,
      sigma: 0.1,
      tipoDeCola: 'doble',
      valorCritico: 11.5,
    });

    const result = calcularErrorTipo2({
      mediaReal: 11.46,
      muestra: 11,
      sigma: 0.1,
      tipoDeCola: 'doble',
      valorCriticoSuperior: limites.limiteSuperior!,
      valorCriticoInferior: limites.condicionRechazo,
      valorRechazo: 0,
    });

    expect(result.poder).toBeCloseTo(0.3766, 1);
  });

  it('Ejercicio 27 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 10,
      alpha: 0.1,
      sigma: 0.1,
      tipoDeCola: 'doble',
      valorCritico: 2,
    });

    expect(2.04 > result.condicionRechazo && 2.04 < result.limiteSuperior!).toBe(true); // no se rechaza, torno no necesita ajuste

  });

  it('Ejercicio 27 B', () => {
    const limites = calcularCondicionRechazo({
      muestra: 10,
      alpha: 0.1,
      sigma: 0.1,
      tipoDeCola: 'doble',
      valorCritico: 2,
    });

    const result = calcularErrorTipo2({
      mediaReal: 1.95,
      muestra: 10,
      sigma: 0.1,
      tipoDeCola: 'doble',
      valorCriticoSuperior: limites.limiteSuperior!,
      valorCriticoInferior: limites.condicionRechazo,
      valorRechazo: 0,
    });

    expect(result.beta).toBeCloseTo(0.5259, 1);
  });

  it('Ejercicio 27 C', () => {
    const muestra = calcularMuestraRequerida({
      alpha: 0.05, // alpha/2 del 0,10 a dos colas
      beta: 0.2,
      mediaReal: 1.95,
      sigma: 0.1,
      valorCritico: 2,
    });

    expect(muestra).toBeCloseTo(25, 1);
  });

  it('Ejercicio 28 B', () => {
    // Datos: 607, 725, 784, 790, 810 (miles de unidades)
    const result = calcularLimitesConDatos({
      muestra: 5,
      media: 743.2,
      sigmaPoblacional: 82.46,
      nivelConfianza: 0.95,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(640.81, 1);
    expect(result.limiteSuperior).toBeCloseTo(845.59, 1);
  });

  it('Ejercicio 28 C', () => {
    const limites = calcularLimitesConDatos({
      muestra: 5,
      media: 743.2,
      sigmaPoblacional: 82.46,
      nivelConfianza: 0.95,
      muestral: true,
    });

    const errorMuestral = (limites.limiteSuperior - limites.limiteInferior) / 4; // mitad del error actual

    const result = calcularSizeMuestral({
      errorMuestral,
      nivelConfianza: 0.95,
      sigmaPoblacional: 82.46,
      muestral: true,
    });

    expect(result).toBeCloseTo(13, 1); // 5 meses ya realizados + 8 meses más
  });

  it('Ejercicio 29', () => {
    const result = calcularCondicionRechazo({
      muestra: 50,
      alpha: 0.05,
      sigma: 10,
      tipoDeCola: 'derecha <=',
      valorCritico: 110,
    });

    expect(120 > result.condicionRechazo).toBe(true); // se instala el nuevo dispositivo

  });

  it('Ejercicio 30 B', () => {
    const result = calcularLimitesConDatos({
      muestra: 16,
      media: 114,
      sigmaPoblacional: 18,
      nivelConfianza: 0.9,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(106.11, 1);
    expect(result.limiteSuperior).toBeCloseTo(121.89, 1);
  });

  it('Ejercicio 30 C', () => {
    const limites = calcularLimitesConDatos({
      muestra: 16,
      media: 114,
      sigmaPoblacional: 18,
      nivelConfianza: 0.9,
      muestral: true,
    });

    const errorMuestral = (limites.limiteSuperior - limites.limiteInferior) / 4;

    const result = calcularSizeMuestral({
      errorMuestral,
      nivelConfianza: 0.9,
      sigmaPoblacional: 18,
      muestral: true,
    });

    expect(result).toBeCloseTo(59, 1); // 16 clientes ya consultados + 43 más
  });

  it('Ejercicio 31 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 100,
      alpha: 0.01,
      sigma: 923,
      tipoDeCola: 'derecha <=',
      valorCritico: 1000,
    });

    expect(1100 < result.condicionRechazo).toBe(true); // no se rechaza H0, no se aconseja comenzar la campaña

  });

  it('Ejercicio 31 B', () => {
    const result = calcularLimitesConDatos({
      muestra: 100,
      media: 1100,
      sigmaPoblacional: 923,
      nivelConfianza: 0.9,
      muestral: true,
    });

    expect(result.limiteSuperior).toBeCloseTo(1253.26, 1);
    expect(result.limiteInferior).toBeCloseTo(946.74, 1);
  });

  it('Ejercicio 31 C', () => {
    const limites = calcularLimitesConDatos({
      muestra: 100,
      media: 1100,
      sigmaPoblacional: 923,
      nivelConfianza: 0.9,
      muestral: true,
    });

    const errorMuestral = (limites.limiteSuperior - limites.limiteInferior) / 4;

    const result = calcularSizeMuestral({
      errorMuestral,
      nivelConfianza: 0.9,
      sigmaPoblacional: 923,
      muestral: true,
    });

    expect(result).toBeCloseTo(395, 1);
  });

  it('Ejercicio 32 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 20,
      alpha: 0.01,
      sigma: 15,
      tipoDeCola: 'doble',
      valorCritico: 250,
    });

    expect(280 > result.limiteSuperior!).toBe(true); // se rechaza H0, la máquina está fuera de control

  });

  it('Ejercicio 32 B', () => {
    const result = calcularLimitesConDatos({
      muestra: 20,
      media: 280,
      sigmaPoblacional: 15,
      nivelConfianza: 0.99,
      muestral: true,
    });

    expect(result.limiteInferior).toBeCloseTo(270.4, 1);
    expect(result.limiteSuperior).toBeCloseTo(289.6, 1);
  });

  it('Ejercicio 32 C', () => {
    const limites = calcularLimitesConDatos({
      muestra: 20,
      media: 280,
      sigmaPoblacional: 15,
      nivelConfianza: 0.99,
      muestral: true,
    });

    const errorActual = (limites.limiteSuperior - limites.limiteInferior) / 2;

    const result = calcularSizeMuestral({
      errorMuestral: errorActual * 0.7, // reducir el error en un 30%
      nivelConfianza: 0.99,
      sigmaPoblacional: 15,
      muestral: true,
    });

    expect(result).toBeCloseTo(37, 1);
  });

  it('Ejercicio 33 A', () => {
    // Marcas de clase y frecuencias de la tabla de tiempos de armado
    const marcasDeClase = [9.65, 9.95, 10.25, 10.55, 10.85, 11.15];
    const frecuencias = [4, 10, 35, 12, 8, 6];
    const n = frecuencias.reduce((acc, f) => acc + f, 0);
    const media = marcasDeClase.reduce((acc, x, i) => acc + x * frecuencias[i], 0) / n;

    const result = calcularCondicionRechazo({
      muestra: n,
      alpha: 0.05,
      sigma: 0.65,
      tipoDeCola: 'derecha <=',
      valorCritico: 10.25,
    });

    expect(media < result.condicionRechazo).toBe(true); // no hay razón para creer que el tiempo medio es mayor a 10,25

  });

  it('Ejercicio 34 A', () => {
    const result = calcularCondicionRechazo({
      muestra: 80,
      alpha: 0.05,
      sigma: 50,
      tipoDeCola: 'doble',
      valorCritico: 360,
    });

    expect(result.condicionRechazo).toBeCloseTo(349.04, 1);
    expect(result.limiteSuperior).toBeCloseTo(370.96, 1);
  });

  it('Ejercicio 34 B', () => {
    const limites = calcularCondicionRechazo({
      muestra: 20,
      alpha: 0.05,
      sigma: 50,
      tipoDeCola: 'doble',
      valorCritico: 360,
    });

    const result = calcularErrorTipo2({
      mediaReal: 388.8,
      muestra: 20,
      sigma: 50,
      tipoDeCola: 'doble',
      valorCriticoSuperior: limites.limiteSuperior!,
      valorCriticoInferior: limites.condicionRechazo,
      valorRechazo: 0,
    });

    expect(result.beta).toBeCloseTo(0.269, 1);
  });

});
