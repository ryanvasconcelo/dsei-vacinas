import { Imunobiologico } from '../types/vacina';

export const imunobiologicos: Imunobiologico[] = [
  {
    id: 'bcg',
    nome: 'BCG',
    siglaOficial: 'BCG',
    tipo: 'ATENUADA',
    viaAdministracao: ['ID'],
    laboratorios: ['Fundação Ataulpho de Paiva', 'Serum Institute of India'],
    blocoEscopo: 1
  },
  {
    id: 'hepb',
    nome: 'Hepatite B',
    siglaOficial: 'HB',
    tipo: 'RECOMBINANTE',
    viaAdministracao: ['IM'],
    laboratorios: ['Butantan', 'LG Chem'],
    blocoEscopo: 1
  },
  {
    id: 'penta',
    nome: 'Pentavalente',
    siglaOficial: 'Penta',
    tipo: 'CONJUGADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Serum Institute of India', 'Panacea Biotec'],
    blocoEscopo: 1
  },
  {
    id: 'vip',
    nome: 'Poliomielite 1, 2 e 3 (Inativada)',
    siglaOficial: 'VIP',
    tipo: 'INATIVADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Bio-Manguinhos', 'Sanofi Pasteur'],
    blocoEscopo: 1
  },
  {
    id: 'rv1',
    nome: 'Rotavírus Humano G1P[8]',
    siglaOficial: 'VRH',
    tipo: 'ATENUADA',
    viaAdministracao: ['ORAL'],
    laboratorios: ['Bio-Manguinhos', 'GSK'],
    blocoEscopo: 1
  },
  {
    id: 'pcv10',
    nome: 'Pneumocócica 10-valente',
    siglaOficial: 'VPC10',
    tipo: 'CONJUGADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Bio-Manguinhos', 'GSK'],
    blocoEscopo: 1
  },
  {
    id: 'men-c',
    nome: 'Meningocócica C',
    siglaOficial: 'MenC',
    tipo: 'CONJUGADA',
    viaAdministracao: ['IM'],
    laboratorios: ['FUNED', 'GSK'],
    blocoEscopo: 1
  },
  {
    id: 'fa',
    nome: 'Febre Amarela',
    siglaOficial: 'VFA',
    tipo: 'ATENUADA',
    viaAdministracao: ['SC'],
    laboratorios: ['Bio-Manguinhos'],
    blocoEscopo: 1
  },
  {
    id: 'scr',
    nome: 'Tríplice Viral (Sarampo, Caxumba, Rubéola)',
    siglaOficial: 'SCR',
    tipo: 'ATENUADA',
    viaAdministracao: ['SC'],
    laboratorios: ['Bio-Manguinhos', 'Serum Institute of India'],
    blocoEscopo: 1
  },
  {
    id: 'vcz',
    nome: 'Varicela',
    siglaOficial: 'VCZ',
    tipo: 'ATENUADA',
    viaAdministracao: ['SC'],
    laboratorios: ['Butantan', 'GSK', 'MSD', 'SK Bioscience'],
    blocoEscopo: 1
  },
  {
    id: 'dtp',
    nome: 'DTP (Difteria, Tétano, Pertussis)',
    siglaOficial: 'DTP',
    tipo: 'INATIVADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Serum Institute of India'],
    blocoEscopo: 1
  },
  {
    id: 'hepa',
    nome: 'Hepatite A',
    siglaOficial: 'HepA',
    tipo: 'INATIVADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Butantan', 'GSK', 'MSD'],
    blocoEscopo: 1
  },
  {
    id: 'acwy',
    nome: 'Meningocócica ACWY',
    siglaOficial: 'MenACWY',
    tipo: 'CONJUGADA',
    viaAdministracao: ['IM'],
    laboratorios: ['FUNED', 'GSK', 'Pfizer', 'Sanofi Medley'],
    blocoEscopo: 1
  },
  {
    id: 'influenza',
    nome: 'Influenza Trivalente',
    siglaOficial: 'Gripe',
    tipo: 'INATIVADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Butantan'],
    blocoEscopo: 2
  },
  {
    id: 'covid',
    nome: 'COVID-19',
    siglaOficial: 'COVID',
    tipo: 'RECOMBINANTE', // RNAm ou Recombinante dependendo do lab
    viaAdministracao: ['IM'],
    laboratorios: ['Pfizer', 'Moderna'],
    blocoEscopo: 2
  },
  {
    id: 'vpp23',
    nome: 'Pneumocócica 23-valente',
    siglaOficial: 'VPP23',
    tipo: 'POLISSACARIDICA',
    viaAdministracao: ['IM'],
    laboratorios: ['MSD'],
    blocoEscopo: 2
  },
  {
    id: 'dt',
    nome: 'Dupla Adulto (dT)',
    siglaOficial: 'dT',
    tipo: 'INATIVADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Bio-Manguinhos', 'Butantan'],
    blocoEscopo: 2
  },
  {
    id: 'hpv4',
    nome: 'HPV Quadrivalente',
    siglaOficial: 'HPV4',
    tipo: 'RECOMBINANTE',
    viaAdministracao: ['IM'],
    laboratorios: ['Butantan', 'MSD'],
    blocoEscopo: 2
  },
  {
    id: 'dengue',
    nome: 'Dengue (Atenuada)',
    siglaOficial: 'Dengue',
    tipo: 'ATENUADA',
    viaAdministracao: ['SC'],
    laboratorios: ['Takeda'],
    blocoEscopo: 2
  },
  {
    id: 'dtpa',
    nome: 'dTpa (Tríplice Bacteriana Acelular Adulto)',
    siglaOficial: 'dTpa',
    tipo: 'INATIVADA',
    viaAdministracao: ['IM'],
    laboratorios: ['Butantan', 'GSK'],
    blocoEscopo: 2
  },
  {
    id: 'vvsr',
    nome: 'Vírus Sincicial Respiratório (VVSR)',
    siglaOficial: 'VVSR',
    tipo: 'RECOMBINANTE',
    viaAdministracao: ['IM'],
    laboratorios: ['Butantan', 'Pfizer'],
    blocoEscopo: 2
  }
];
