import { describe, it, expect } from 'vitest';
import { formatDateBR, formatNomeComMae } from './formatters';

describe('formatters', () => {
  it('formatDateBR converts yyyy-mm-dd to dd/mm/yyyy', () => {
    expect(formatDateBR('2026-04-07')).toBe('07/04/2026');
  });
  it('formatDateBR handles empty strings', () => {
    expect(formatDateBR('')).toBe('');
  });
  it('formatNomeComMae formats name correctly', () => {
    expect(formatNomeComMae('João', 'Maria')).toBe('João (Mãe: Maria)');
  });
  it('formatNomeComMae handles missing mother', () => {
    expect(formatNomeComMae('João', '')).toBe('João');
    expect(formatNomeComMae('João', 'Não informado')).toBe('João');
  });
});
