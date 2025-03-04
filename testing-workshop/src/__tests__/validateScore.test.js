import { describe, expect, it } from 'vitest';
import { validateScore } from '../src/validateScore';

describe('validateScore', () => {
  // Basisvalidierung
  describe('Basisvalidierung', () => {
    it('soll eine gültige Punktzahl akzeptieren', () => {
      const result = validateScore(75);
      expect(result.valid).toBe(true);
    });

    it('soll eine ungültige Punktzahl ablehnen (undefined)', () => {
      const result = validateScore(undefined);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score ist erforderlich');
    });

    it('soll eine ungültige Punktzahl ablehnen (null)', () => {
      const result = validateScore(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score ist erforderlich');
    });

    it('soll eine ungültige Punktzahl ablehnen (keine Zahl)', () => {
      const result = validateScore('abc');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine Zahl sein');
    });

    it('soll eine ungültige Punktzahl ablehnen (kleiner 0)', () => {
      const result = validateScore(-1);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });

    it('soll eine ungültige Punktzahl ablehnen (größer 100)', () => {
      const result = validateScore(101);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });

    it('soll eine gültige Punktzahl akzeptieren (genau 0)', () => {
      const result = validateScore(0);
      expect(result.valid).toBe(true);
    });

    it('soll eine gültige Punktzahl akzeptieren (genau 100)', () => {
      const result = validateScore(100);
      expect(result.valid).toBe(true);
    });
  });

  // Strikte Validierung
  describe('Strikte Validierung', () => {
    it('soll eine gültige ganze Zahl akzeptieren (strictMode)', () => {
      const result = validateScore(75, { strictMode: true });
      expect(result.valid).toBe(true);
    });

    it('soll eine ungültige Zahl ablehnen (NaN, strictMode)', () => {
      const result = validateScore(NaN, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine gültige Zahl sein');
    });

    it('soll eine ungültige Zahl ablehnen (Infinity, strictMode)', () => {
      const result = validateScore(Infinity, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine gültige Zahl sein');
    });

    it('soll eine ungültige Zahl ablehnen (Dezimalzahl, strictMode)', () => {
      const result = validateScore(75.5, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine ganze Zahl sein');
    });
  });

  // Bonuskategorien
  describe('Bonuskategorien', () => {
    it('soll Bonuspunkte korrekt hinzufügen', () => {
      const result = validateScore(80, { bonusCategories: ['A', 'B'] });
      expect(result.score).toBe(84);
    });

    it('soll maximale Bonuspunkte korrekt hinzufügen', () => {
      const result = validateScore(70, { bonusCategories: ['A', 'B', 'C', 'D', 'E', 'F'] });
      expect(result.score).toBe(80);
    });

    it('soll keine Bonuspunkte hinzufügen, wenn keine Kategorien vorhanden sind', () => {
      const result = validateScore(80);
      expect(result.score).toBe(80);
    });
  });

  // Bestandsprüfung
  describe('Bestandsprüfung', () => {
    it('soll die bestandene Punktzahl korrekt erkennen', () => {
      const result = validateScore(70);
      expect(result.passed).toBe(true);
    });

    it('soll die nicht bestandene Punktzahl korrekt erkennen', () => {
      const result = validateScore(50);
      expect(result.passed).toBe(false);
    });

    it('soll die bestandene Punktzahl mit benutzerdefiniertem Schwellenwert erkennen', () => {
      const result = validateScore(55, { passingScore: 50 });
      expect(result.passed).toBe(true);
    });

    it('soll die nicht bestandene Punktzahl mit benutzerdefiniertem Schwellenwert erkennen', () => {
      const result = validateScore(45, { passingScore: 50 });
      expect(result.passed).toBe(false);
    });
  });

  // Notenberechnung
  describe('Notenberechnung', () => {
    it('soll die Note A korrekt zuweisen', () => {
      const result = validateScore(95);
      expect(result.grade).toBe('A');
    });

    it('soll die Note B korrekt zuweisen', () => {
      const result = validateScore(85);
      expect(result.grade).toBe('B');
    });

    it('soll die Note C korrekt zuweisen', () => {
      const result = validateScore(75);
      expect(result.grade).toBe('C');
    });

    it('soll die Note D korrekt zuweisen', () => {
      const result = validateScore(65);
      expect(result.grade).toBe('D');
    });

    it('soll die Note F korrekt zuweisen', () => {
      const result = validateScore(55);
      expect(result.grade).toBe('F');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('soll die maximale Punktzahl (100) korrekt verarbeiten', () => {
      const result = validateScore(100);
      expect(result.score).toBe(100);
      expect(result.grade).toBe('A');
    });

    it('soll die minimale Punktzahl (0) korrekt verarbeiten', () => {
      const result = validateScore(0);
      expect(result.score).toBe(0);
      expect(result.grade).toBe('F');
    });

    it('soll die Grenze für das Bestehen (60) korrekt verarbeiten', () => {
      const result = validateScore(60);
      expect(result.passed).toBe(true);
      expect(result.grade).toBe('D');
    });

    it('soll die Grenze für die Note C (70) korrekt verarbeiten', () => {
      const result = validateScore(70);
      expect(result.grade).toBe('C');
    });

    it('soll die Grenze für die Note B (80) korrekt verarbeiten', () => {
      const result = validateScore(80);
      expect(result.grade).toBe('B');
    });

    it('soll die Grenze für die Note A (90) korrekt verarbeiten', () => {
      const result = validateScore(90);
      expect(result.grade).toBe('A');
    });
  });
});