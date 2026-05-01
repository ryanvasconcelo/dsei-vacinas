import { RegraVacinacao, SimultaneidadeRegra } from '../types/vacina';

const MES = 30;
const ANO = 365;

export const regrasVacinais: RegraVacinacao[] = [
  {
    imunobiologicoId: 'bcg',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 0,
    idadeMaximaParaIniciar: 5 * ANO - 1,
    intervaloMinimoEntreDoses: 0,
    intervaloRecomendadoEntreDoses: 0,
    doses: [
      { numeroDose: 'UNICA', idadeMinimaDias: 0, idadeRecomendadaDias: 0, idadeMaximaDias: 5 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'hepb',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 0,
    idadeMaximaParaIniciar: 100 * ANO, // Sem limite superior para rotina de resgate
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 30,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 0, idadeRecomendadaDias: 0, idadeMaximaDias: 30 },
      { numeroDose: 2, idadeMinimaDias: 30, idadeRecomendadaDias: 1 * MES, idadeMaximaDias: 100 * ANO },
      { numeroDose: 3, idadeMinimaDias: 180, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 100 * ANO }
    ]
  },
  {
    imunobiologicoId: 'vip',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 2 * MES,
    idadeMaximaParaIniciar: 5 * ANO - 1,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 60,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 2 * MES, idadeRecomendadaDias: 2 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 2, idadeMinimaDias: 4 * MES, idadeRecomendadaDias: 4 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 3, idadeMinimaDias: 6 * MES, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 15 * MES, idadeRecomendadaDias: 15 * MES, idadeMaximaDias: 5 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'penta',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 2 * MES,
    idadeMaximaParaIniciar: 7 * ANO - 1,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 60,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 2 * MES, idadeRecomendadaDias: 2 * MES, idadeMaximaDias: 7 * ANO - 1 },
      { numeroDose: 2, idadeMinimaDias: 3 * MES, idadeRecomendadaDias: 4 * MES, idadeMaximaDias: 7 * ANO - 1 },
      { numeroDose: 3, idadeMinimaDias: 5 * MES, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 7 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'rv1',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 45, // 1m 15d
    idadeMaximaParaIniciar: 105, // 3m 15d (limite D1)
    perdeOportunidadeAposIdade: 105, // Se não iniciou até 3m15d, perde tudo
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 60,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 45, idadeRecomendadaDias: 2 * MES, idadeMaximaDias: 105 },
      { numeroDose: 2, idadeMinimaDias: 3 * MES + 15, idadeRecomendadaDias: 4 * MES, idadeMaximaDias: 7 * MES + 29 }
    ]
  },
  {
    imunobiologicoId: 'pcv10',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 2 * MES,
    idadeMaximaParaIniciar: 5 * ANO - 1,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 60,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 2 * MES, idadeRecomendadaDias: 2 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 2, idadeMinimaDias: 4 * MES, idadeRecomendadaDias: 4 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 12 * MES, idadeRecomendadaDias: 12 * MES, idadeMaximaDias: 5 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'men-c',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 3 * MES,
    idadeMaximaParaIniciar: 5 * ANO - 1,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 60,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 3 * MES, idadeRecomendadaDias: 3 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 2, idadeMinimaDias: 5 * MES, idadeRecomendadaDias: 5 * MES, idadeMaximaDias: 5 * ANO - 1 },
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 12 * MES, idadeRecomendadaDias: 12 * MES, idadeMaximaDias: 5 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'fa',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 9 * MES,
    idadeMaximaParaIniciar: 60 * ANO,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 4 * ANO,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 9 * MES, idadeRecomendadaDias: 9 * MES, idadeMaximaDias: 60 * ANO },
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 4 * ANO, idadeRecomendadaDias: 4 * ANO, idadeMaximaDias: 60 * ANO },
      { numeroDose: 'ZERO', idadeMinimaDias: 6 * MES, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 9 * MES - 1, observacao: 'Área de risco/surto' }
    ]
  },
  {
    imunobiologicoId: 'scr',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 12 * MES,
    idadeMaximaParaIniciar: 60 * ANO,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 3 * MES,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 12 * MES, idadeRecomendadaDias: 12 * MES, idadeMaximaDias: 60 * ANO },
      { numeroDose: 2, idadeMinimaDias: 15 * MES, idadeRecomendadaDias: 15 * MES, idadeMaximaDias: 60 * ANO },
      { numeroDose: 'ZERO', idadeMinimaDias: 6 * MES, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 12 * MES - 1, observacao: 'Dose de intensificação (surto)' }
    ]
  },
  {
    imunobiologicoId: 'vcz',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: true,
    idadeMinimaParaIniciar: 15 * MES,
    idadeMaximaParaIniciar: 7 * ANO - 1, // Geral
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 3 * ANO,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 15 * MES, idadeRecomendadaDias: 15 * MES, idadeMaximaDias: 100 * ANO }, // Indígena sem limite
      { numeroDose: 2, idadeMinimaDias: 4 * ANO, idadeRecomendadaDias: 4 * ANO, idadeMaximaDias: 100 * ANO }
    ]
  },
  {
    imunobiologicoId: 'dtp',
    esquema: 'REFORCO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 15 * MES,
    idadeMaximaParaIniciar: 7 * ANO - 1,
    intervaloMinimoEntreDoses: 6 * MES,
    intervaloRecomendadoEntreDoses: 3 * ANO,
    doses: [
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 15 * MES, idadeRecomendadaDias: 15 * MES, idadeMaximaDias: 7 * ANO - 1 },
      { numeroDose: 'REFORCO_2', idadeMinimaDias: 4 * ANO, idadeRecomendadaDias: 4 * ANO, idadeMaximaDias: 7 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'hepa',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 15 * MES,
    idadeMaximaParaIniciar: 5 * ANO - 1,
    intervaloMinimoEntreDoses: 0,
    intervaloRecomendadoEntreDoses: 0,
    doses: [
      { numeroDose: 'UNICA', idadeMinimaDias: 15 * MES, idadeRecomendadaDias: 15 * MES, idadeMaximaDias: 5 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'acwy',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 11 * ANO,
    idadeMaximaParaIniciar: 15 * ANO - 1,
    intervaloMinimoEntreDoses: 0,
    intervaloRecomendadoEntreDoses: 0,
    doses: [
      { numeroDose: 'UNICA', idadeMinimaDias: 11 * ANO, idadeRecomendadaDias: 11 * ANO, idadeMaximaDias: 15 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'hpv4',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 9 * ANO,
    idadeMaximaParaIniciar: 15 * ANO - 1,
    intervaloMinimoEntreDoses: 0,
    intervaloRecomendadoEntreDoses: 0,
    doses: [
      { numeroDose: 'UNICA', idadeMinimaDias: 9 * ANO, idadeRecomendadaDias: 9 * ANO, idadeMaximaDias: 15 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'dengue',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 10 * ANO,
    idadeMaximaParaIniciar: 15 * ANO - 1,
    intervaloMinimoEntreDoses: 90,
    intervaloRecomendadoEntreDoses: 90,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 10 * ANO, idadeRecomendadaDias: 10 * ANO, idadeMaximaDias: 15 * ANO - 1 },
      { numeroDose: 2, idadeMinimaDias: 10 * ANO + 90, idadeRecomendadaDias: 10 * ANO + 90, idadeMaximaDias: 15 * ANO - 1 }
    ]
  },
  {
    imunobiologicoId: 'influenza',
    esquema: 'ANUAL',
    populacaoIndigenaTemRegrasDiferentes: true, // Grupo prioritário em todas as idades
    idadeMinimaParaIniciar: 6 * MES,
    idadeMaximaParaIniciar: 100 * ANO,
    intervaloMinimoEntreDoses: 30,
    intervaloRecomendadoEntreDoses: 365,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 6 * MES, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 100 * ANO }
    ]
  },
  {
    imunobiologicoId: 'covid',
    esquema: 'ANUAL',
    populacaoIndigenaTemRegrasDiferentes: true, // Dose anual reforço
    idadeMinimaParaIniciar: 6 * MES,
    idadeMaximaParaIniciar: 100 * ANO,
    intervaloMinimoEntreDoses: 180,
    intervaloRecomendadoEntreDoses: 365,
    doses: [
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 6 * MES, idadeRecomendadaDias: 6 * MES, idadeMaximaDias: 100 * ANO }
    ]
  },
  {
    imunobiologicoId: 'vpp23',
    esquema: 'BASICO',
    populacaoIndigenaTemRegrasDiferentes: true, // A partir de 5 anos para indígenas
    idadeMinimaParaIniciar: 5 * ANO,
    idadeMaximaParaIniciar: 100 * ANO,
    intervaloMinimoEntreDoses: 5 * ANO,
    intervaloRecomendadoEntreDoses: 5 * ANO,
    doses: [
      { numeroDose: 1, idadeMinimaDias: 5 * ANO, idadeRecomendadaDias: 5 * ANO, idadeMaximaDias: 100 * ANO },
      { numeroDose: 2, idadeMinimaDias: 10 * ANO, idadeRecomendadaDias: 10 * ANO, idadeMaximaDias: 100 * ANO }
    ]
  },
  {
    imunobiologicoId: 'dt',
    esquema: 'REFORCO',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 7 * ANO,
    idadeMaximaParaIniciar: 100 * ANO,
    intervaloMinimoEntreDoses: 10 * ANO,
    intervaloRecomendadoEntreDoses: 10 * ANO,
    doses: [
      { numeroDose: 'REFORCO_1', idadeMinimaDias: 7 * ANO, idadeRecomendadaDias: 7 * ANO, idadeMaximaDias: 100 * ANO }
    ]
  },
  {
    imunobiologicoId: 'dtpa',
    esquema: 'GESTACIONAL',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 20 * 7, // 20 semanas
    idadeMaximaParaIniciar: 45 * 7,
    intervaloMinimoEntreDoses: 0,
    intervaloRecomendadoEntreDoses: 0,
    doses: [
      { numeroDose: 'UNICA', idadeMinimaDias: 20 * 7, idadeRecomendadaDias: 20 * 7, idadeMaximaDias: 45 * 7 }
    ]
  },
  {
    imunobiologicoId: 'vvsr',
    esquema: 'GESTACIONAL',
    populacaoIndigenaTemRegrasDiferentes: false,
    idadeMinimaParaIniciar: 28 * 7, // 28 semanas
    idadeMaximaParaIniciar: 36 * 7,
    intervaloMinimoEntreDoses: 0,
    intervaloRecomendadoEntreDoses: 0,
    doses: [
      { numeroDose: 'UNICA', idadeMinimaDias: 28 * 7, idadeRecomendadaDias: 28 * 7, idadeMaximaDias: 36 * 7 }
    ]
  }
];

export const regrasSimultaneidade: SimultaneidadeRegra[] = [
  {
    imunobiologicoIdA: 'scr',
    imunobiologicoIdB: 'fa',
    permitido: false,
    intervaloMinimoSeNaoSimultaneo: 30,
    condicaoEspecial: 'Menores de 2 anos'
  },
  {
    imunobiologicoIdA: 'vcz',
    imunobiologicoIdB: 'fa',
    permitido: false,
    intervaloMinimoSeNaoSimultaneo: 30,
    condicaoEspecial: 'Menores de 2 anos'
  }
];
