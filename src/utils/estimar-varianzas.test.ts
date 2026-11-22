import { describe, it, expect } from 'vitest';
import { calcularLimitesConDesvio, calcularLimitesConVarianza, tanteadorDeGarcia } from "./EstimarParametros/estimar-varianza"
import { calcularCondicionRechazo, calcularBeta, tanteadorDeGarcia as tanteadorDeGarciaEnsayo } from "./EnsayoParametros/ensayo-varianza"

describe('Trabajo Practico 2', () => {
  it('Ejercicio 1 A', () => {
    const result = calcularLimitesConVarianza({
      muestra: 12,
      varianza : 0.000545,
      nivelConfianza: 0.95,
    });

    expect(result.limiteInferior).toBeCloseTo(0.00027, 4);
    expect(result.limiteSuperior).toBeCloseTo(0.00158, 4);
  });

  it('Ejercicio 2 A', () => {
    const result = calcularLimitesConVarianza({
      muestra: 5,
      varianza : 0.037,
      nivelConfianza: 0.9,
    });

    expect(result.limiteInferior).toBeCloseTo(0.0155, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.2083, 3);
  });


  it('Ejercicio 3 A', () => {
    const result = calcularLimitesConDesvio({
      muestra: 30,
      desvioEstandar : 200,
      nivelConfianza: 0.95,
    });

    expect(result.limiteInferior).toBeCloseTo(159.28, 1);
    expect(result.limiteSuperior).toBeCloseTo(268.87, 1);
  });

  it('Ejercicio 4', () => {
    const result = calcularLimitesConDesvio({
      muestra: 15,
      desvioEstandar : 120,
      nivelConfianza: 0.9,
    });

    expect(result.limiteInferior).toBeCloseTo(92.25, 1);
    expect(result.limiteSuperior).toBeCloseTo(175.17, 1);
  });

  it('Ejercicio 4 B', () => {

    const limites = calcularLimitesConDesvio({
      muestra: 15,
      desvioEstandar : 120,
      nivelConfianza: 0.9,
    });


    const result = tanteadorDeGarcia({
      valorR : (limites.limiteSuperior / limites.limiteInferior) *0.7, // El valor de R para el tanteador de garcia es (limite superior / limite inferior) * factor que afecta los limites, por ejemplo si quiero que el limite superior sea el doble del limite inferior, el factor es 2, si quiero que sea 1.5, el factor es 1.5, etc.
      valorAlpha: 0.1,
      rprima : true // R prima es true si estamos haciendo estos calculos con el desvio estandar, y false si estamos haciendo estos calculos con la varianza
    });

    expect(result).toBeCloseTo(69, 1);
  });

  it('Ejercicio 5 A', () => {
    const datos = [37.6, 38.4, 38.8, 37.9];
    const n = datos.length;
    const media = datos.reduce((acc, x) => acc + x, 0) / n;
    const varianza = datos.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);

    const result = calcularLimitesConDesvio({
      muestra: n,
      desvioEstandar: Math.sqrt(varianza),
      nivelConfianza: 0.9,
    });

    expect(result.limiteInferior).toBeCloseTo(0.32, 1);
    expect(result.limiteSuperior).toBeCloseTo(1.56, 1);
  });

  it('Ejercicio 5 B', () => {
    // Se busca que el límite superior sea el doble del inferior => R = 2
    const result = tanteadorDeGarcia({
      valorR: 2,
      valorAlpha: 0.1,
      rprima: true,
    });

    expect(result - 4).toBeCloseTo(10, 0); // 4 datos ya tomados
  });

  it('Ejercicio 6 A', () => {
    const result = calcularLimitesConDesvio({
      muestra: 20,
      desvioEstandar: 15,
      nivelConfianza: 0.95,
    });

    expect(result.limiteInferior).toBeCloseTo(11.4, 1);
    expect(result.limiteSuperior).toBeCloseTo(21.91, 1);
  });

  it('Ejercicio 6 B', () => {
    // Límite superior 50% mayor que el inferior => R = 1,5
    const result = tanteadorDeGarcia({
      valorR: 1.5,
      valorAlpha: 0.05,
      rprima: true,
    });

    expect(result).toBeCloseTo(49, 0);
  });

  it('Ejercicio 7 A', () => {
    const result = calcularLimitesConDesvio({
      muestra: 20,
      desvioEstandar: 210,
      nivelConfianza: 0.95,
    });

    expect(result.limiteInferior).toBeCloseTo(159.7, 1);
    expect(result.limiteSuperior).toBeCloseTo(306.73, 1);
  });

  it('Ejercicio 7 B', () => {
    const limites = calcularLimitesConDesvio({
      muestra: 20,
      desvioEstandar: 210,
      nivelConfianza: 0.95,
    });

    const relacionActual = limites.limiteSuperior / limites.limiteInferior;

    const result = tanteadorDeGarcia({
      valorR: relacionActual * 0.7, // disminuir la relación entre límites en un 30%
      valorAlpha: 0.05,
      rprima: true,
    });

    expect(result).toBeCloseTo(90, 0); // total de supermercados, 70 más que los 20 originales
  });

  it('Ejercicio 8 A', () => {
    const datos = [12.6, 11.9, 12.3, 12.8, 11.8, 11.7, 12.4, 12.1, 12.3, 12.0, 12.5, 12.9];
    const n = datos.length;
    const media = datos.reduce((acc, x) => acc + x, 0) / n;
    const varianza = datos.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);

    const result = calcularLimitesConVarianza({
      muestra: n,
      varianza,
      nivelConfianza: 0.9,
    });

    expect(result.limiteInferior).toBeCloseTo(0.0834, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.3591, 3);
  });

  it('Ejercicio 8 B', () => {
    const datos = [12.6, 11.9, 12.3, 12.8, 11.8, 11.7, 12.4, 12.1, 12.3, 12.0, 12.5, 12.9];
    const n = datos.length;
    const media = datos.reduce((acc, x) => acc + x, 0) / n;
    const varianza = datos.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);

    const condicionRechazo = calcularCondicionRechazo({
      sigmaValor: 0.09,
      muestra: n,
      alpha: 0.05,
      esVarianza: true,
      tipoCola: 'derecha',
    });

    expect(varianza < condicionRechazo).toBe(true); // no se rechaza H0, no hay evidencia de que la varianza sea mayor a 0,09
  });

  it('Ejercicio 8 C', () => {
    const condicionRechazo = calcularCondicionRechazo({
      sigmaValor: 0.09,
      muestra: 12,
      alpha: 0.05,
      esVarianza: true,
      tipoCola: 'derecha',
    });

    const result = calcularBeta({
      sigmaValor: condicionRechazo,
      sigmaValorReal: 0.11,
      muestra: 12,
      esVarianza: true,
      tipoCola: 'derecha',
    });

    expect(result.poderPrueba).toBeCloseTo(0.1375, 1);
  });

  it('Ejercicio 8 D', () => {
    const result = tanteadorDeGarciaEnsayo({
      valorAlpha: 0.05,
      valorBeta: 0.05,
      sigmaValorCritico: 0.09,
      sigmaValorReal: 0.11,
      esVarianza: true,
    });

    expect(result.tamanoMuestra - 12).toBeCloseTo(528, -1); // 12 láminas ya medidas
  });

  it('Ejercicio 9 A', () => {
    const result = calcularCondicionRechazo({
      sigmaValor: 15,
      muestra: 10,
      alpha: 0.05,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    expect(18.2 < result).toBe(true); // no se rechaza H0, no se recomienda detener la máquina

  });

  it('Ejercicio 9 B', () => {
    const condicionRechazo = calcularCondicionRechazo({
      sigmaValor: 15,
      muestra: 10,
      alpha: 0.05,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    const result = calcularBeta({
      sigmaValor: condicionRechazo,
      sigmaValorReal: 16,
      muestra: 10,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    expect(result.errorTipo2).toBeCloseTo(0.9054, 1);
  });

  it('Ejercicio 9 C', () => {
    const result = tanteadorDeGarciaEnsayo({
      valorAlpha: 0.05,
      valorBeta: 0.1,
      sigmaValorCritico: 15,
      sigmaValorReal: 16,
      esVarianza: false,
    });

    expect(result.tamanoMuestra - 10).toBeCloseTo(1015, -2); // 10 envases ya controlados
  });

  it('Ejercicio 9 D', () => {
    const result = calcularLimitesConDesvio({
      muestra: 10,
      desvioEstandar: 18.2,
      nivelConfianza: 0.95,
    });

    expect(result.limiteInferior).toBeCloseTo(12.51, 1);
    expect(result.limiteSuperior).toBeCloseTo(33.23, 1);
  });

  it('Ejercicio 10 A', () => {
    const result = calcularCondicionRechazo({
      sigmaValor: 15,
      muestra: 20,
      alpha: 0.05,
      esVarianza: false,
      tipoCola: 'izquierda >=',
    });

    expect(12.5 > result).toBe(true); // no se rechaza H0, no se puede asegurar que el desvío sea menor a 15

  });

  it('Ejercicio 10 B', () => {
    // Límite superior de confianza unilateral (riesgo 5%): se toma un intervalo bilateral de
    // confianza 1 - 2*alpha y se conserva solo el límite superior.
    const result = calcularLimitesConDesvio({
      muestra: 20,
      desvioEstandar: 12.5,
      nivelConfianza: 0.9,
    });

    expect(result.limiteSuperior).toBeCloseTo(17.14, 1);
  });

  it('Ejercicio 11 A', () => {
    const result = calcularCondicionRechazo({
      sigmaValor: 20,
      muestra: 20,
      alpha: 0.1,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    expect(25 > result).toBe(true); // se rechaza H0, el desvío verdadero es superior a 20

  });

  it('Ejercicio 11 B', () => {
    const result = calcularLimitesConDesvio({
      muestra: 20,
      desvioEstandar: 25,
      nivelConfianza: 0.8,
    });

    expect(result.limiteInferior).toBeCloseTo(20.89, 1);
    expect(result.limiteSuperior).toBeCloseTo(31.93, 1);
  });

  it('Ejercicio 12 A', () => {
    const result = calcularCondicionRechazo({
      sigmaValor: 5,
      muestra: 10,
      alpha: 0.05,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    expect(result).toBeCloseTo(6.86, 1);
  });

  it('Ejercicio 12 B', () => {
    const condicionRechazo = calcularCondicionRechazo({
      sigmaValor: 5,
      muestra: 10,
      alpha: 0.05,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    const result = calcularBeta({
      sigmaValor: condicionRechazo,
      sigmaValorReal: 8,
      muestra: 10,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    expect(result.errorTipo2).toBeCloseTo(0.3222, 1);
  });

  it('Ejercicio 12 C', () => {
    const result = tanteadorDeGarciaEnsayo({
      valorAlpha: 0.05,
      valorBeta: 0.05,
      sigmaValorCritico: 5,
      sigmaValorReal: 8,
      esVarianza: false,
    });

    expect(result.tamanoMuestra).toBeCloseTo(27, 0);
    expect(result.tamanoMuestra - 10).toBeCloseTo(17, 0); // 10 suelas ya realizadas
  });

  it('Ejercicio 13 A', () => {
    const datos = [1.55, 1.50, 1.54, 1.57, 1.51, 1.52, 1.53, 1.52, 1.56];
    const n = datos.length;
    const media = datos.reduce((acc, x) => acc + x, 0) / n;
    const varianza = datos.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);

    const condicionRechazo = calcularCondicionRechazo({
      sigmaValor: 0.015,
      muestra: n,
      alpha: 0.05,
      esVarianza: false,
      tipoCola: 'derecha',
    });

    expect(Math.sqrt(varianza) > condicionRechazo).toBe(true); // se rechaza H0, no se cumple con la especificación del desvío

  });

  it('Ejercicio 13 B', () => {
    const datos = [1.55, 1.50, 1.54, 1.57, 1.51, 1.52, 1.53, 1.52, 1.56];
    const n = datos.length;
    const media = datos.reduce((acc, x) => acc + x, 0) / n;
    const varianza = datos.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);

    const result = calcularLimitesConDesvio({
      muestra: n,
      desvioEstandar: Math.sqrt(varianza),
      nivelConfianza: 0.95,
    });

    expect(result.limiteInferior).toBeCloseTo(0.0158, 3);
    expect(result.limiteSuperior).toBeCloseTo(0.045, 3);
  });

  it('Ejercicio 13 C', () => {
    const datos = [1.55, 1.50, 1.54, 1.57, 1.51, 1.52, 1.53, 1.52, 1.56];
    const n = datos.length;
    const media = datos.reduce((acc, x) => acc + x, 0) / n;
    const varianza = datos.reduce((acc, x) => acc + (x - media) ** 2, 0) / (n - 1);

    const limites = calcularLimitesConDesvio({
      muestra: n,
      desvioEstandar: Math.sqrt(varianza),
      nivelConfianza: 0.95,
    });

    const relacionActual = limites.limiteSuperior / limites.limiteInferior;

    const result = tanteadorDeGarcia({
      valorR: relacionActual * 0.4, // disminuir la relación entre límites en un 60%
      valorAlpha: 0.05,
      rprima: true,
    });

    expect(result - n).toBeCloseTo(476, -1);
  });
});