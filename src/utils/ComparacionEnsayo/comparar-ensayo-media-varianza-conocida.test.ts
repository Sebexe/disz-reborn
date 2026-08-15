import { describe, it, expect } from 'vitest';
import {
  calcularValorRechazo,
  calcularErrorTipo2,
  calcularMuestraRequerida,
  calcularValorRechazoDeltaEstrella,
} from './comparar-ensayo-media-varianza-conocida';

describe('calcularValorRechazo', () => {
  it('should calculate rejection value for right-tailed test', () => {
    const result = calcularValorRechazo({
      deltaCero: 0,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2, // right-tailed
    });

    expect(result.valorCritico).toBeCloseTo(0.424699, 5);
  });

  it('should calculate rejection value for left-tailed test', () => {
    const result = calcularValorRechazo({
      deltaCero: 0,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 1, // left-tailed
    });

    expect(result.valorCritico).toBeCloseTo(-0.424699, 5);
  });

  it('should calculate rejection value for two-tailed test', () => {
    const result = calcularValorRechazo({
      deltaCero: 0,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 3, // two-tailed
    });

    expect(result.valorCritico).toBeCloseTo(0.506060, 5);
  });

  it('should throw error for invalid cola value', () => {
    expect(() =>
      calcularValorRechazo({
        deltaCero: 0,
        alfa: 0.05,
        sigma1: 1,
        sigma2: 1,
        n1: 30,
        n2: 30,
        cola: 4, // invalid
      })
    ).toThrow('Valor de cola inválido');
  });

  it('should use deltaCero as offset in calculation', () => {
    const result1 = calcularValorRechazo({
      deltaCero: 0,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    const result2 = calcularValorRechazo({
      deltaCero: 5,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    expect(result2.valorCritico - result1.valorCritico).toBeCloseTo(5, 6);
  });

  it('should account for different variances in calculation', () => {
    const result1 = calcularValorRechazo({
      deltaCero: 0,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    const result2 = calcularValorRechazo({
      deltaCero: 0,
      alfa: 0.05,
      sigma1: 2,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    expect(Math.abs(result2.valorCritico)).toBeGreaterThan(Math.abs(result1.valorCritico));
  });
});

describe('calcularErrorTipo2', () => {
  it('should calculate beta and power for right-tailed test', () => {
    const result = calcularErrorTipo2({
      deltaCritico: 0.5,
      deltaUno: 1.5,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    expect(result.beta).toBeGreaterThan(0);
    expect(result.beta).toBeLessThan(1);
    expect(result.poderPrueba).toBeGreaterThan(0);
    expect(result.poderPrueba).toBeLessThan(1);
    expect(result.poderPrueba + result.beta).toBeCloseTo(1, 6);
  });

  it('should calculate beta and power for left-tailed test', () => {
    const result = calcularErrorTipo2({
      deltaCritico: -0.5,
      deltaUno: -1.5,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 1,
    });

    expect(result.beta).toBeGreaterThan(0);
    expect(result.beta).toBeLessThan(1);
    expect(result.poderPrueba).toBeGreaterThan(0);
    expect(result.poderPrueba).toBeLessThan(1);
    expect(result.poderPrueba + result.beta).toBeCloseTo(1, 6);
  });

  it('power increases when effect size increases', () => {
    const result1 = calcularErrorTipo2({
      deltaCritico: 1.64485,
      deltaUno: 1,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    const result2 = calcularErrorTipo2({
      deltaCritico: 1.64485,
      deltaUno: 3,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    expect(result2.poderPrueba).toBeGreaterThan(result1.poderPrueba);
  });

  it('should throw error for invalid cola value', () => {
    expect(() =>
      calcularErrorTipo2({
        deltaCritico: 1.64485,
        deltaUno: 2,
        sigma1: 1,
        sigma2: 1,
        n1: 30,
        n2: 30,
        cola: 0,
      })
    ).toThrow('Valor de cola inválido');
  });
});

describe('calcularMuestraRequerida', () => {
  it('should calculate required sample size for right-tailed test', () => {
    const result = calcularMuestraRequerida({
      deltaCero: 0,
      deltaUno: 2,
      sigma1: 1,
      sigma2: 1,
      alfa: 0.05,
      beta: 0.1,
      cola: 2,
    });

    expect(result.n).toBeGreaterThan(0);
  });

  it('should calculate required sample size for left-tailed test', () => {
    const result = calcularMuestraRequerida({
      deltaCero: 0,
      deltaUno: -2,
      sigma1: 1,
      sigma2: 1,
      alfa: 0.05,
      beta: 0.1,
      cola: 1,
    });

    expect(result.n).toBeGreaterThan(0);
  });

  it('sample size increases with smaller effect size', () => {
    const result1 = calcularMuestraRequerida({
      deltaCero: 0,
      deltaUno: 1,
      sigma1: 1,
      sigma2: 1,
      alfa: 0.05,
      beta: 0.1,
      cola: 2,
    });

    const result2 = calcularMuestraRequerida({
      deltaCero: 0,
      deltaUno: 2,
      sigma1: 1,
      sigma2: 1,
      alfa: 0.05,
      beta: 0.1,
      cola: 2,
    });

    expect(result1.n).toBeGreaterThan(result2.n);
  });

  it('sample size increases with stricter alpha and beta levels', () => {
    const result1 = calcularMuestraRequerida({
      deltaCero: 0,
      deltaUno: 2,
      sigma1: 1,
      sigma2: 1,
      alfa: 0.01,
      beta: 0.05,
      cola: 2,
    });

    const result2 = calcularMuestraRequerida({
      deltaCero: 0,
      deltaUno: 2,
      sigma1: 1,
      sigma2: 1,
      alfa: 0.05,
      beta: 0.1,
      cola: 2,
    });

    expect(result1.n).toBeGreaterThan(result2.n);
  });

  it('should throw error for invalid cola value', () => {
    expect(() =>
      calcularMuestraRequerida({
        deltaCero: 0,
        deltaUno: 2,
        sigma1: 1,
        sigma2: 1,
        alfa: 0.05,
        beta: 0.1,
        cola: 5,
      })
    ).toThrow('Valor de cola inválido o caso no manejado');
  });
});

describe('calcularValorRechazoDeltaEstrella', () => {
  it('should calculate delta star critical value for right-tailed test', () => {
    const result = calcularValorRechazoDeltaEstrella({
      hache: 1,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    expect(result.deltaEstrellaCritico).toBeCloseTo(0.424699, 5);
  });

  it('should calculate delta star critical value for left-tailed test', () => {
    const result = calcularValorRechazoDeltaEstrella({
      hache: 1,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 1,
    });

    expect(result.deltaEstrellaCritico).toBeCloseTo(-0.424699, 5);
  });

  it('hache parameter affects sigma calculation', () => {
    const result1 = calcularValorRechazoDeltaEstrella({
      hache: 1,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    const result2 = calcularValorRechazoDeltaEstrella({
      hache: 2,
      alfa: 0.05,
      sigma1: 1,
      sigma2: 1,
      n1: 30,
      n2: 30,
      cola: 2,
    });

    expect(Math.abs(result2.deltaEstrellaCritico)).toBeGreaterThan(Math.abs(result1.deltaEstrellaCritico));
  });

  it('should throw error for invalid cola value', () => {
    expect(() =>
      calcularValorRechazoDeltaEstrella({
        hache: 1,
        alfa: 0.05,
        sigma1: 1,
        sigma2: 1,
        n1: 30,
        n2: 30,
        cola: 3,
      })
    ).toThrow('Valor de cola inválido');
  });
});
