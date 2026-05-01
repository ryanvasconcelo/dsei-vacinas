import { describe, it, expect } from 'vitest';
import { isVacinaForaCalendario } from './vacinas';

describe('vacinas', () => {
  it('returns false for adult receiving dT', () => {
    // 1990-01-01 is adult
    expect(isVacinaForaCalendario('1990-01-01', 'A partir de 7 anos', '2026-04-01')).toBe(false);
  });
  it('returns true for 0 month old receiving 2 month vaccine', () => {
    expect(isVacinaForaCalendario('2026-04-01', '2, 4 e 6 meses', '2026-04-15')).toBe(true);
  });
  it('returns false for 2 month old receiving 2 month vaccine', () => {
    expect(isVacinaForaCalendario('2026-02-01', '2, 4 e 6 meses', '2026-04-01')).toBe(false);
  });
});
