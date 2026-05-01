export type Imunobiologico = {
  id: string;
  nome: string;
  siglaOficial: string;
  tipo: 'ATENUADA' | 'INATIVADA' | 'CONJUGADA' | 'RECOMBINANTE' | 'POLISSACARIDICA';
  viaAdministracao: ('IM' | 'SC' | 'ID' | 'ORAL')[];
  laboratorios: string[];
  blocoEscopo: 1 | 2;
};

export type DoseRegra = {
  numeroDose: number | 'UNICA' | 'REFORCO_1' | 'REFORCO_2' | 'ZERO';
  idadeRecomendadaDias: number;
  idadeMinimaDias: number;
  idadeMaximaDias: number;
  observacao?: string;
};

export type RegraVacinacao = {
  imunobiologicoId: string;
  esquema: 'BASICO' | 'REFORCO' | 'ANUAL' | 'GESTACIONAL' | 'CAMPANHA';
  doses: DoseRegra[];
  intervaloMinimoEntreDoses: number;
  intervaloRecomendadoEntreDoses: number;
  idadeMinimaParaIniciar: number;
  idadeMaximaParaIniciar: number;
  perdeOportunidadeAposIdade?: number; // em dias
  populacaoIndigenaTemRegrasDiferentes: boolean;
  notas?: string[];
};

export type SimultaneidadeRegra = {
  imunobiologicoIdA: string;
  imunobiologicoIdB: string;
  permitido: boolean;
  intervaloMinimoSeNaoSimultaneo: number; // em dias
  condicaoEspecial?: string;
};

export type SugestaoDose = {
  vacinaId: string;
  vacinaNome: string;
  numeroDose: string;
  dataSugerida: Date;
  status: 'EM_DIA' | 'ATRASADA' | 'OPORTUNIDADE_PERDIDA' | 'PROXIMA';
};

export type ResultadoValidacao = {
  valido: boolean;
  motivo: string | null;
  severidade: 'BLOQUEIO' | 'ALERTA' | 'OK';
  requerJustificativa: boolean;
};
