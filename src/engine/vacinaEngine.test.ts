import { describe, it, expect } from 'vitest';
import { sugerirProximasDoses } from './vacinaEngine';
import { Indigena, DoseAplicada } from '../data/mockData';
import { parseISO } from 'date-fns';

describe('vacinaEngine - sugerirProximasDoses', () => {
  const pacienteBebe: Indigena = {
    id: 'P001',
    nome: 'Bebe Teste',
    dataNascimento: '2026-03-01', // Nasceu em 1º de Março de 2026
    sexo: 'M',
    nomeMae: 'Mãe Teste',
    nomePai: null,
    aldeiaId: 'A1',
    aldeia: 'Aldeia 1',
    poloBaseId: 'PB1',
    poloBase: 'Polo 1',
    etnia: 'Tikuna',
    acamado: false,
    situacao: 'PRESENTE',
    contraindicacoes: [],
    comorbidades: []
  };

  const hoje = parseISO('2026-05-01'); // 2 meses de idade

  it('deve sugerir as vacinas de 2 meses para um bebê de 2 meses sem histórico', () => {
    const sugestoes = sugerirProximasDoses(pacienteBebe, hoje, []);
    
    const siglasSugeridas = sugestoes.map(s => s.vacinaId);
    expect(siglasSugeridas).toContain('penta');
    expect(siglasSugeridas).toContain('vip');
    expect(siglasSugeridas).toContain('rv1');
    expect(siglasSugeridas).toContain('pcv10');
  });

  it('deve marcar Rotavírus como OPORTUNIDADE_PERDIDA se D1 atrasada > 3m15d', () => {
    const bebeAtrasado: Indigena = { ...pacienteBebe, dataNascimento: '2025-12-01' }; // ~5 meses de idade
    const sugestoes = sugerirProximasDoses(bebeAtrasado, hoje, []);
    
    const rv1Sugestao = sugestoes.find(s => s.vacinaId === 'rv1');
    expect(rv1Sugestao?.status).toBe('OPORTUNIDADE_PERDIDA');
  });

  it('deve sugerir a próxima dose da Hepatite B considerando o esquema acelerado se houver atraso', () => {
    // Caso de resgate para indígena > 7 anos
    const indigenaAdulto: Indigena = { ...pacienteBebe, dataNascimento: '2010-01-01' };
    const dosesAplicadas: DoseAplicada[] = [
      {
        id: 'D1', indigenaId: 'P001', vacinaId: 'hepb', vacinaNome: 'Hepatite B', vacinaSigla: 'HB',
        numeroDose: '1', dataAplicacao: '2026-04-01', lote: 'X', fabricante: 'Y', validadeLote: 'Z',
        viaAdministracao: 'IM', localAplicacao: 'Coxa', vacinador: 'E1', observacoes: '', justificativaForaCalendario: null
      }
    ];

    const sugestoes = sugerirProximasDoses(indigenaAdulto, hoje, dosesAplicadas);
    const hepbSugestao = sugestoes.find(s => s.vacinaId === 'hepb');
    
    // Intervalo de 1 mês para D2 no esquema acelerado
    expect(hepbSugestao?.numeroDose).toBe('2');
    expect(hepbSugestao?.status).toBe('EM_DIA');
  });
});
