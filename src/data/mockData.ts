export const polosBase = [
  { id: 'PB001', nome: 'Polo Base Alto Solimões', municipio: 'Tabatinga', ativo: true },
  { id: 'PB002', nome: 'Polo Base Médio Solimões', municipio: 'Tefé', ativo: true },
  { id: 'PB003', nome: 'Polo Base Purus', municipio: 'Lábrea', ativo: true },
  { id: 'PB004', nome: 'Polo Base Vale do Javari', municipio: 'Atalaia do Norte', ativo: true },
  { id: 'PB005', nome: 'Polo Base Rio Negro', municipio: 'Barcelos', ativo: true },
];

export const aldeias = [
  { id: 'ALD001', nome: 'Aldeia Umariaçu I', poloBaseId: 'PB001', ativo: true },
  { id: 'ALD002', nome: 'Aldeia Umariaçu II', poloBaseId: 'PB001', ativo: true },
  { id: 'ALD003', nome: 'Aldeia São João', poloBaseId: 'PB001', ativo: true },
  { id: 'ALD004', nome: 'Aldeia Betel', poloBaseId: 'PB002', ativo: true },
  { id: 'ALD005', nome: 'Aldeia Nogueira', poloBaseId: 'PB002', ativo: true },
  { id: 'ALD006', nome: 'Aldeia Maraã', poloBaseId: 'PB002', ativo: true },
  { id: 'ALD007', nome: 'Aldeia Pauini', poloBaseId: 'PB003', ativo: true },
  { id: 'ALD008', nome: 'Aldeia Tapauá', poloBaseId: 'PB003', ativo: true },
  { id: 'ALD009', nome: 'Aldeia Ituí', poloBaseId: 'PB004', ativo: true },
  { id: 'ALD010', nome: 'Aldeia Itacoaí', poloBaseId: 'PB004', ativo: true },
  { id: 'ALD011', nome: 'Aldeia Demini', poloBaseId: 'PB005', ativo: true },
  { id: 'ALD012', nome: 'Aldeia Maturacá', poloBaseId: 'PB005', ativo: true },
];

export const etnias = [
  { id: 'ETN001', nome: 'Tikuna', ativo: true },
  { id: 'ETN002', nome: 'Yanomami', ativo: true },
  { id: 'ETN003', nome: 'Sateré-Mawé', ativo: true },
  { id: 'ETN004', nome: 'Kokama', ativo: true },
  { id: 'ETN005', nome: 'Baré', ativo: true },
  { id: 'ETN006', nome: 'Matis', ativo: true },
  { id: 'ETN007', nome: 'Kanamari', ativo: true },
  { id: 'ETN008', nome: 'Paumari', ativo: true },
  { id: 'ETN009', nome: 'Banawá', ativo: true },
  { id: 'ETN010', nome: 'Deni', ativo: true },
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

export type Medicamento = {
  id: string;
  nome: string;
  dosagem?: string;
  frequencia?: string;
  observacoes?: string;
};

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
  emTratamento?: boolean;
  tratamentoDescricao?: string | null;
  medicamentosEmUso?: Medicamento[];
};


export const indigenas: Indigena[] = Array.from({ length: 50 }).map((_, i) => {
  const etniasDisp = etnias.map(e => e.nome);
  const polosDisp = polosBase;
  const p = polosDisp[i % polosDisp.length];
  const aldeiasDisp = aldeias.filter(a => a.poloBaseId === p.id);
  const a = aldeiasDisp[i % aldeiasDisp.length] || aldeias[0];
  const isAcamado = Math.random() > 0.8;
  const isTratamento = Math.random() > 0.8;
  const hasContra = Math.random() > 0.8;
  const hasComorb = Math.random() > 0.7;
  
  return {
    id: `IND${i.toString().padStart(4, '0')}`,
    nome: `Paciente Mockado ${i+1}`,
    nomeMae: `Mãe do Paciente ${i+1}`,
    nomePai: Math.random() > 0.3 ? `Pai do Paciente ${i+1}` : null,
    cns: `7${Math.floor(Math.random() * 90000000000000).toString().padStart(14, '0')}`,
    cpf: Math.random() > 0.5 ? `${Math.floor(Math.random() * 900).toString().padStart(3, '0')}.${Math.floor(Math.random() * 900).toString().padStart(3, '0')}.${Math.floor(Math.random() * 900).toString().padStart(3, '0')}-${Math.floor(Math.random() * 90).toString().padStart(2, '0')}` : null,
    dataNascimento: new Date(Date.now() - Math.random() * 80 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sexo: Math.random() > 0.5 ? 'M' : 'F',
    etnia: etniasDisp[i % etniasDisp.length],
    aldeiaId: a.id,
    aldeia: a.nome,
    poloBaseId: p.id,
    poloBase: p.nome,
    situacao: Math.random() > 0.9 ? 'AUSENTE' : Math.random() > 0.95 ? 'OBITO' : 'PRESENTE',
    acamado: isAcamado,
    condicaoSaude: isAcamado ? 'Dificuldade de locomoção' : '',
    contraindicacoes: hasContra ? ['Alergia a proteína do ovo'] : [],
    comorbidades: hasComorb ? ['Diabetes Tipo 2'] : [],
    emTratamento: isTratamento,
    tratamentoDescricao: isTratamento ? 'Quimioterapia em curso' : null,
    medicamentosEmUso: isTratamento ? [{id: `med${i}`, nome: 'Rituximabe', dosagem: '10mg', frequencia: 'Mensal'}] : []
  };
});


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
