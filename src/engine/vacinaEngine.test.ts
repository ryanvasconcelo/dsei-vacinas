import { describe, it, expect } from 'vitest';
import { sugerirProximasDoses, validarAplicacao, validarSimultaneidade } from './vacinaEngine';
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

describe('vacinaEngine - validarAplicacao', () => {
  const pacienteBebe = {
    id: 'P001',
    dataNascimento: '2026-03-01',
    etnia: 'Tikuna',
    situacao: 'PRESENTE'
  } as Indigena;

  const hoje = parseISO('2026-05-01'); // 2 meses

  it('deve validar positivamente uma aplicação correta (Penta aos 2 meses)', () => {
    const resultado = validarAplicacao(pacienteBebe, 'penta', 1, hoje, []);
    expect(resultado.valido).toBe(true);
    expect(resultado.severidade).toBe('OK');
  });

  it('deve bloquear aplicação se idade for inferior à mínima (Penta aos 1 mês)', () => {
    const hojeCedo = parseISO('2026-04-01');
    const resultado = validarAplicacao(pacienteBebe, 'penta', 1, hojeCedo, []);
    expect(resultado.valido).toBe(false);
    expect(resultado.severidade).toBe('BLOQUEIO');
    expect(resultado.motivo).toContain('Idade mínima');
  });

  it('deve alertar se intervalo entre doses for inferior ao mínimo', () => {
    // D1 aplicada com 90 dias (limite inferior da D1)
    const dataD1 = parseISO('2026-06-01'); // 3 meses
    const doses: DoseAplicada[] = [{
      id: 'D1', vacinaId: 'penta', numeroDose: '1', dataAplicacao: '2026-06-01',
      indigenaId: 'P001', vacinaNome: 'Penta', vacinaSigla: 'Penta', lote: 'X', fabricante: 'Y', 
      validadeLote: 'Z', viaAdministracao: 'IM', localAplicacao: 'Coxa', vacinador: 'E1', observacoes: '', justificativaForaCalendario: null
    }];
    
    // Tenta D2 apenas 10 dias depois (com 100 dias de vida, idade OK para D2, mas intervalo NO)
    const hojeProximo = parseISO('2026-06-11');
    const resultado = validarAplicacao(pacienteBebe, 'penta', 2, hojeProximo, doses);
    
    expect(resultado.valido).toBe(false);
    expect(resultado.severidade).toBe('BLOQUEIO');
    expect(resultado.motivo).toContain('Intervalo mínimo');
  });
});

describe('vacinaEngine - validarSimultaneidade', () => {
  it('deve bloquear simultaneidade de SCR e FA em crianças < 2 anos', () => {
    const pacienteBebe = { dataNascimento: '2026-03-01' } as Indigena;
    const hoje = parseISO('2026-12-01'); // 9 meses
    
    const resultado = validarSimultaneidade(pacienteBebe, 'scr', 'fa', hoje);
    expect(resultado.permitido).toBe(false);
    expect(resultado.intervaloMinimoSeNaoSimultaneo).toBe(30);
  });

  it('deve permitir simultaneidade se idade for >= 2 anos', () => {
    const pacienteCriança = { dataNascimento: '2023-01-01' } as Indigena;
    const hoje = parseISO('2026-01-01'); // 3 anos
    
    const resultado = validarSimultaneidade(pacienteCriança, 'scr', 'fa', hoje);
    expect(resultado.permitido).toBe(true);
  });
});
