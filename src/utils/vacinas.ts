export function isVacinaForaCalendario(dataNascimento: string, faixaEtariaRecomendada: string, dataAplicacao?: string): boolean {
  if (faixaEtariaRecomendada === 'Ao nascer') return false; 
  
  const birth = new Date(dataNascimento);
  const aplicacao = dataAplicacao ? new Date(dataAplicacao) : new Date();
  const ageMonths = (aplicacao.getFullYear() - birth.getFullYear()) * 12 + (aplicacao.getMonth() - birth.getMonth());

  // Heurística baseada nas idades do calendário para MVP
  if (faixaEtariaRecomendada.includes('2, 4 e 6 meses') && ageMonths < 2) return true; // Less than 2 months is out of calendar

  if (faixaEtariaRecomendada.includes('15 meses') && ageMonths < 14) return true;
  if (faixaEtariaRecomendada.includes('9 meses') && ageMonths < 8) return true;
  if (faixaEtariaRecomendada.includes('7 anos') && ageMonths < 80) return true; // 80 meses = 6 anos e 8 meses (aproximado)
  
  return false;
}
