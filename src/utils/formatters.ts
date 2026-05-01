export function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dateString;
}

export function formatNomeComMae(nome: string, nomeMae: string): string {
  if (!nomeMae || nomeMae.trim() === '' || nomeMae.toLowerCase() === 'não informado') return nome;
  return `${nome} (Mãe: ${nomeMae})`;
}
