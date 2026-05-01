export const polosBase = [
  { id: 'PB001', nome: 'Polo Base Alto Solimões', municipio: 'Tabatinga' },
  { id: 'PB002', nome: 'Polo Base Médio Solimões', municipio: 'Tefé' },
  { id: 'PB003', nome: 'Polo Base Purus', municipio: 'Lábrea' },
  { id: 'PB004', nome: 'Polo Base Vale do Javari', municipio: 'Atalaia do Norte' },
  { id: 'PB005', nome: 'Polo Base Rio Negro', municipio: 'Barcelos' },
];

export const aldeias = [
  { id: 'ALD001', nome: 'Aldeia Umariaçu I', poloBaseId: 'PB001' },
  { id: 'ALD002', nome: 'Aldeia Umariaçu II', poloBaseId: 'PB001' },
  { id: 'ALD003', nome: 'Aldeia São João', poloBaseId: 'PB001' },
  { id: 'ALD004', nome: 'Aldeia Betel', poloBaseId: 'PB002' },
  { id: 'ALD005', nome: 'Aldeia Nogueira', poloBaseId: 'PB002' },
  { id: 'ALD006', nome: 'Aldeia Maraã', poloBaseId: 'PB002' },
  { id: 'ALD007', nome: 'Aldeia Pauini', poloBaseId: 'PB003' },
  { id: 'ALD008', nome: 'Aldeia Tapauá', poloBaseId: 'PB003' },
  { id: 'ALD009', nome: 'Aldeia Ituí', poloBaseId: 'PB004' },
  { id: 'ALD010', nome: 'Aldeia Itacoaí', poloBaseId: 'PB004' },
  { id: 'ALD011', nome: 'Aldeia Demini', poloBaseId: 'PB005' },
  { id: 'ALD012', nome: 'Aldeia Maturacá', poloBaseId: 'PB005' },
];

export const etnias = [
  'Tikuna', 'Yanomami', 'Sateré-Mawé', 'Kokama', 'Baré',
  'Matis', 'Kanamari', 'Paumari', 'Banawá', 'Deni',
];

export const vacinadores = [
  { id: 'VAC001', nome: 'Enf. Carlos Alberto' },
  { id: 'VAC002', nome: 'Enf. Maria Conceição' },
  { id: 'VAC003', nome: 'Enf. Rosa Lima' },
  { id: 'VAC004', nome: 'Tec. João Paulo' },
  { id: 'VAC005', nome: 'Tec. Anaísa Ferreira' },
];

export const vacinas = [
  { id: 'V001', nome: 'BCG', sigla: 'BCG', doses: 1, faixaEtaria: 'Ao nascer', fabricante: 'Fund. Ataulpho de Paiva' },
  { id: 'V002', nome: 'Hepatite B', sigla: 'HepB', doses: 3, faixaEtaria: 'Ao nascer', fabricante: 'Bio-Manguinhos' },
  { id: 'V003', nome: 'Pentavalente', sigla: 'Penta', doses: 3, faixaEtaria: '2, 4 e 6 meses', fabricante: 'Bio-Manguinhos' },
  { id: 'V004', nome: 'VIP (Poliomielite Inativada)', sigla: 'VIP', doses: 3, faixaEtaria: '2, 4 e 6 meses', fabricante: 'Bio-Manguinhos' },
  { id: 'V005', nome: 'Pneumocócica 10V', sigla: 'PCV10', doses: 3, faixaEtaria: '2, 4 meses + reforço', fabricante: 'GSK' },
  { id: 'V006', nome: 'Meningocócica C', sigla: 'MnC', doses: 2, faixaEtaria: '3 e 5 meses', fabricante: 'Novartis' },
  { id: 'V007', nome: 'Rotavírus', sigla: 'RV1', doses: 2, faixaEtaria: '2 e 4 meses', fabricante: 'GSK' },
  { id: 'V008', nome: 'Febre Amarela', sigla: 'FA', doses: 1, faixaEtaria: '9 meses', fabricante: 'Bio-Manguinhos' },
  { id: 'V009', nome: 'Tríplice Viral (SCR)', sigla: 'SCR', doses: 2, faixaEtaria: '12 e 15 meses', fabricante: 'Bio-Manguinhos' },
  { id: 'V010', nome: 'Varicela', sigla: 'VCZ', doses: 1, faixaEtaria: '15 meses', fabricante: 'GSK' },
  { id: 'V011', nome: 'Hepatite A', sigla: 'HepA', doses: 1, faixaEtaria: '15 meses', fabricante: 'GSK' },
  { id: 'V012', nome: 'HPV Quadrivalente', sigla: 'HPV4', doses: 2, faixaEtaria: '9-14 anos', fabricante: 'MSD' },
  { id: 'V013', nome: 'dT (Dupla adulto)', sigla: 'dT', doses: 3, faixaEtaria: 'A partir de 7 anos', fabricante: 'Bio-Manguinhos' },
];

export type Indigena = {
  id: string;
  nome: string;
  cns: string;
  cpf: string | null;
  dataNascimento: string;
  sexo: 'M' | 'F';
  nomeMae: string;
  nomePai: string | null;
  aldeiaId: string;
  aldeia: string;
  poloBaseId: string;
  poloBase: string;
  etnia: string;
  acamado: boolean;
  situacao: 'PRESENTE' | 'AUSENTE' | 'OBITO';
  contraindicacoes: string[];
  comorbidades: string[];
};

export const indigenas: Indigena[] = [
  {
    id: 'IND001', nome: 'Marcos Tikuna da Silva', cns: '123456789012345',
    cpf: null, dataNascimento: '2023-08-12', sexo: 'M',
    nomeMae: 'Ana Maria Tikuna', nomePai: 'José Tikuna da Silva',
    aldeiaId: 'ALD001', aldeia: 'Aldeia Umariaçu I',
    poloBaseId: 'PB001', poloBase: 'Polo Base Alto Solimões',
    etnia: 'Tikuna', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND002', nome: 'Maria das Graças Kokama', cns: '234567890123456',
    cpf: '234.567.890-12', dataNascimento: '2021-03-22', sexo: 'F',
    nomeMae: 'Conceição Kokama', nomePai: null,
    aldeiaId: 'ALD001', aldeia: 'Aldeia Umariaçu I',
    poloBaseId: 'PB001', poloBase: 'Polo Base Alto Solimões',
    etnia: 'Kokama', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND003', nome: 'Pedro Yanomami Ferreira', cns: '345678901234567',
    cpf: null, dataNascimento: '2019-11-05', sexo: 'M',
    nomeMae: 'Rosa Yanomami', nomePai: 'Luis Yanomami Ferreira',
    aldeiaId: 'ALD011', aldeia: 'Aldeia Demini',
    poloBaseId: 'PB005', poloBase: 'Polo Base Rio Negro',
    etnia: 'Yanomami', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND004', nome: 'Antônia Baré Nascimento', cns: '456789012345678',
    cpf: '456.789.012-34', dataNascimento: '1958-07-30', sexo: 'F',
    nomeMae: 'Francisca Baré', nomePai: 'António Baré',
    aldeiaId: 'ALD012', aldeia: 'Aldeia Maturacá',
    poloBaseId: 'PB005', poloBase: 'Polo Base Rio Negro',
    etnia: 'Baré', acamado: true, situacao: 'PRESENTE', contraindicacoes: ['Hipertensão controlada — verificar antes de aplicar'], comorbidades: [],
  },
  {
    id: 'IND005', nome: 'João Kanamari de Souza', cns: '567890123456789',
    cpf: null, dataNascimento: '2020-01-15', sexo: 'M',
    nomeMae: 'Luzia Kanamari', nomePai: 'Raimundo Kanamari',
    aldeiaId: 'ALD009', aldeia: 'Aldeia Ituí',
    poloBaseId: 'PB004', poloBase: 'Polo Base Vale do Javari',
    etnia: 'Kanamari', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND006', nome: 'Cláudia Paumari Lima', cns: '678901234567890',
    cpf: '678.901.234-56', dataNascimento: '2022-05-20', sexo: 'F',
    nomeMae: 'Irene Paumari Lima', nomePai: null,
    aldeiaId: 'ALD007', aldeia: 'Aldeia Pauini',
    poloBaseId: 'PB003', poloBase: 'Polo Base Purus',
    etnia: 'Paumari', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND007', nome: 'Francisco Sateré Moraes', cns: '789012345678901',
    cpf: null, dataNascimento: '2018-09-10', sexo: 'M',
    nomeMae: 'Benedita Sateré', nomePai: 'Manoel Sateré Moraes',
    aldeiaId: 'ALD004', aldeia: 'Aldeia Betel',
    poloBaseId: 'PB002', poloBase: 'Polo Base Médio Solimões',
    etnia: 'Sateré-Mawé', acamado: false, situacao: 'PRESENTE', contraindicacoes: ['Alergia a ovo — contraindicação FA'], comorbidades: [],
  },
  {
    id: 'IND008', nome: 'Raimunda Tikuna Costa', cns: '890123456789012',
    cpf: '890.123.456-78', dataNascimento: '2023-12-01', sexo: 'F',
    nomeMae: 'Tereza Tikuna Costa', nomePai: 'Carlos Tikuna Costa',
    aldeiaId: 'ALD002', aldeia: 'Aldeia Umariaçu II',
    poloBaseId: 'PB001', poloBase: 'Polo Base Alto Solimões',
    etnia: 'Tikuna', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND009', nome: 'Sebastião Matis Pereira', cns: '901234567890123',
    cpf: null, dataNascimento: '2015-06-18', sexo: 'M',
    nomeMae: 'Iracema Matis', nomePai: 'Sebastião Matis Pai',
    aldeiaId: 'ALD010', aldeia: 'Aldeia Itacoaí',
    poloBaseId: 'PB004', poloBase: 'Polo Base Vale do Javari',
    etnia: 'Matis', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND010', nome: 'Elenice Deni Santos', cns: '012345678901234',
    cpf: '012.345.678-90', dataNascimento: '1992-04-03', sexo: 'F',
    nomeMae: 'Olinda Deni', nomePai: 'Olimpio Deni Santos',
    aldeiaId: 'ALD008', aldeia: 'Aldeia Tapauá',
    poloBaseId: 'PB003', poloBase: 'Polo Base Purus',
    etnia: 'Deni', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND011', nome: 'Naiara Yanomami Silva', cns: '112233445566778',
    cpf: null, dataNascimento: '2024-02-14', sexo: 'F',
    nomeMae: 'Tereza Yanomami', nomePai: null,
    aldeiaId: 'ALD011', aldeia: 'Aldeia Demini',
    poloBaseId: 'PB005', poloBase: 'Polo Base Rio Negro',
    etnia: 'Yanomami', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
  {
    id: 'IND012', nome: 'Davi Tikuna Souza', cns: '223344556677889',
    cpf: null, dataNascimento: '2022-11-30', sexo: 'M',
    nomeMae: 'Sara Tikuna', nomePai: 'Davi Tikuna Pai',
    aldeiaId: 'ALD003', aldeia: 'Aldeia São João',
    poloBaseId: 'PB001', poloBase: 'Polo Base Alto Solimões',
    etnia: 'Tikuna', acamado: false, situacao: 'PRESENTE', contraindicacoes: [], comorbidades: [],
  },
];

export type DoseAplicada = {
  id: string;
  indigenaId: string;
  vacinaId: string;
  vacinaNome: string;
  vacinaSigla: string;
  numeroDose: string;
  dataAplicacao: string;
  lote: string;
  fabricante: string;
  validadeLote: string;
  viaAdministracao: string;
  localAplicacao: string;
  vacinador: string;
  observacoes: string;
  justificativaForaCalendario: string | null;
};

export const dosesAplicadas: DoseAplicada[] = [
  {
    id: 'DOSE001', indigenaId: 'IND001', vacinaId: 'V001',
    vacinaNome: 'BCG', vacinaSigla: 'BCG', numeroDose: '1ª Dose',
    dataAplicacao: '2023-08-14', lote: 'BCG240012',
    fabricante: 'Fund. Ataulpho de Paiva', validadeLote: '2025-06-30',
    viaAdministracao: 'Intradérmica', localAplicacao: 'Braço Direito',
    vacinador: 'Enf. Carlos Alberto', observacoes: '', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE002', indigenaId: 'IND001', vacinaId: 'V002',
    vacinaNome: 'Hepatite B', vacinaSigla: 'HepB', numeroDose: '1ª Dose',
    dataAplicacao: '2023-08-14', lote: 'HEPB2400X',
    fabricante: 'Bio-Manguinhos', validadeLote: '2025-12-31',
    viaAdministracao: 'Intramuscular', localAplicacao: 'Coxa Esquerda',
    vacinador: 'Enf. Carlos Alberto', observacoes: '', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE003', indigenaId: 'IND002', vacinaId: 'V003',
    vacinaNome: 'Pentavalente', vacinaSigla: 'Penta', numeroDose: '1ª Dose',
    dataAplicacao: '2021-05-22', lote: 'PENTA210034',
    fabricante: 'Bio-Manguinhos', validadeLote: '2025-08-31',
    viaAdministracao: 'Intramuscular', localAplicacao: 'Coxa Direita',
    vacinador: 'Enf. Maria Conceição', observacoes: '', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE004', indigenaId: 'IND003', vacinaId: 'V004',
    vacinaNome: 'VIP (Poliomielite Inativada)', vacinaSigla: 'VIP', numeroDose: '1ª Dose',
    dataAplicacao: '2020-01-10', lote: 'VIP190023',
    fabricante: 'Bio-Manguinhos', validadeLote: '2026-03-31',
    viaAdministracao: 'Intramuscular', localAplicacao: 'Coxa Esquerda',
    vacinador: 'Enf. Rosa Lima', observacoes: '', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE005', indigenaId: 'IND005', vacinaId: 'V001',
    vacinaNome: 'BCG', vacinaSigla: 'BCG', numeroDose: '1ª Dose',
    dataAplicacao: '2020-01-20', lote: 'BCG200015',
    fabricante: 'Fund. Ataulpho de Paiva', validadeLote: '2025-06-30',
    viaAdministracao: 'Intradérmica', localAplicacao: 'Braço Direito',
    vacinador: 'Tec. João Paulo', observacoes: '', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE006', indigenaId: 'IND007', vacinaId: 'V008',
    vacinaNome: 'Febre Amarela', vacinaSigla: 'FA', numeroDose: '1ª Dose',
    dataAplicacao: '2019-09-20', lote: 'FA190045',
    fabricante: 'Bio-Manguinhos', validadeLote: '2025-09-30',
    viaAdministracao: 'Subcutânea', localAplicacao: 'Braço Esquerdo',
    vacinador: 'Enf. Maria Conceição', observacoes: 'Paciente sem reação adversa observada', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE007', indigenaId: 'IND009', vacinaId: 'V012',
    vacinaNome: 'HPV Quadrivalente', vacinaSigla: 'HPV4', numeroDose: '1ª Dose',
    dataAplicacao: '2024-03-15', lote: 'HPV240078',
    fabricante: 'MSD', validadeLote: '2026-06-30',
    viaAdministracao: 'Intramuscular', localAplicacao: 'Braço Direito',
    vacinador: 'Tec. Anaísa Ferreira', observacoes: '', justificativaForaCalendario: null,
  },
  {
    id: 'DOSE008', indigenaId: 'IND010', vacinaId: 'V013',
    vacinaNome: 'dT (Dupla adulto)', vacinaSigla: 'dT', numeroDose: '1ª Dose',
    dataAplicacao: '2024-01-10', lote: 'DT240012',
    fabricante: 'Bio-Manguinhos', validadeLote: '2026-01-31',
    viaAdministracao: 'Intramuscular', localAplicacao: 'Braço Esquerdo',
    vacinador: 'Enf. Carlos Alberto', observacoes: '', justificativaForaCalendario: null,
  },
];

export const coberturaData = [
  { polo: 'Alto Solimões', cobertura: 78, meta: 95 },
  { polo: 'Médio Solimões', cobertura: 65, meta: 95 },
  { polo: 'Purus', cobertura: 82, meta: 95 },
  { polo: 'Vale do Javari', cobertura: 54, meta: 95 },
  { polo: 'Rio Negro', cobertura: 71, meta: 95 },
];

export const dosesPorFaixaEtaria = [
  { faixa: '< 1 ano', doses: 124 },
  { faixa: '1—4 anos', doses: 98 },
  { faixa: '5—6 anos', doses: 67 },
  { faixa: '7—59 anos', doses: 145 },
  { faixa: '60+ anos', doses: 43 },
  { faixa: 'Gestantes', doses: 29 },
];

export const pendenciasVacinais = [
  { id: 'P001', indigenaId: 'IND001', nome: 'Marcos Tikuna da Silva', aldeia: 'Aldeia Umariaçu I', poloBase: 'Alto Solimões', vacina: 'Pentavalente 1ª Dose', idade: '7 meses', diasAtraso: 12 },
  { id: 'P002', indigenaId: 'IND006', nome: 'Cláudia Paumari Lima', aldeia: 'Aldeia Pauini', poloBase: 'Purus', vacina: 'Pneumocócica 10V 1ª Dose', idade: '1 ano e 10 meses', diasAtraso: 68 },
  { id: 'P003', indigenaId: 'IND008', nome: 'Raimunda Tikuna Costa', aldeia: 'Aldeia Umariaçu II', poloBase: 'Alto Solimões', vacina: 'BCG', idade: '4 meses', diasAtraso: 30 },
  { id: 'P004', indigenaId: 'IND011', nome: 'Naiara Yanomami Silva', aldeia: 'Aldeia Demini', poloBase: 'Rio Negro', vacina: 'Hepatite B 1ª Dose', idade: '1 mês e 18 dias', diasAtraso: 5 },
  { id: 'P005', indigenaId: 'IND012', nome: 'Davi Tikuna Souza', aldeia: 'Aldeia São João', poloBase: 'Alto Solimões', vacina: 'Rotavírus 2ª Dose', idade: '1 ano e 4 meses', diasAtraso: 45 },
];
