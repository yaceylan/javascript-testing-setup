import { expect, test } from 'vitest';
import { validateScore } from '../src/validateScore';

test('validateScore gibt false zurück, wenn der Score undefined oder null ist', () => {
    expect(validateScore(undefined).valid).toBe(false);
    expect(validateScore(null).valid).toBe(false);
});

test('validateScore gibt false zurück, wenn der Score keine Zahl ist', () => {
    expect(validateScore('abc').valid).toBe(false);
});

test('validateScore gibt false zurück, wenn der Score kleiner als 0 oder größer als 100 ist', () => {
    expect(validateScore(-1).valid).toBe(false);
    expect(validateScore(101).valid).toBe(false);
});

test('validateScore gibt false zurück, wenn der Score NaN oder Infinity ist (strictMode)', () => {
    expect(validateScore(NaN, { strictMode: true }).valid).toBe(false);
    expect(validateScore(Infinity, { strictMode: true }).valid).toBe(false);
});

test('validateScore gibt false zurück, wenn der Score keine ganze Zahl ist (strictMode)', () => {
    expect(validateScore(50.5, { strictMode: true }).valid).toBe(false);
});

test('validateScore fügt Bonuspunkte hinzu', () => {
    expect(validateScore(90, { bonusCategories: ['A', 'B'] }).score).toBe(94);
});

test('validateScore berechnet die Note korrekt', () => {
    expect(validateScore(95).grade).toBe('A');
    expect(validateScore(85).grade).toBe('B');
    expect(validateScore(75).grade).toBe('C');
    expect(validateScore(65).grade).toBe('D');
    expect(validateScore(55).grade).toBe('F');
});

test('validateScore berücksichtigt passingScore', () => {
    expect(validateScore(65).passed).toBe(true);
    expect(validateScore(55).passed).toBe(false);
    expect(validateScore(55, { passingScore: 50 }).passed).toBe(true);
});