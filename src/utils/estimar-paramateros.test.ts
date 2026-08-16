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

    console.log(result.condicionRechazo)
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



});
