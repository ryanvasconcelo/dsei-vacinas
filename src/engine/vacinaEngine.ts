import { Indigena, DoseAplicada } from '../data/mockData';
import { SugestaoDose, RegraVacinacao, DoseRegra } from '../types/vacina';
import { regrasVacinais } from '../data/regrasVacinais';
import { differenceInDays, differenceInCalendarDays, addDays, parseISO, startOfDay } from 'date-fns';

export function sugerirProximasDoses(
  paciente: Indigena,
  hoje: Date,
  dosesJaAplicadas: DoseAplicada[]
): SugestaoDose[] {
  if (paciente.situacao === 'OBITO') return [];

  const dataNasc = startOfDay(parseISO(paciente.dataNascimento));
  const hojeLimpo = startOfDay(hoje);
  const idadeEmDias = differenceInDays(hojeLimpo, dataNasc);

  const sugestoes: SugestaoDose[] = [];

  regrasVacinais.forEach(regra => {
    // 1. Filtrar doses já aplicadas para esta vacina
    const dosesDestaVacina = dosesJaAplicadas.filter(d => d.vacinaId === regra.imunobiologicoId);
    
    // 2. Identificar qual a próxima dose esperada
    const dosesDaRegra = [...regra.doses].sort((a, b) => {
      const numA = typeof a.numeroDose === 'number' ? a.numeroDose : 99;
      const numB = typeof b.numeroDose === 'number' ? b.numeroDose : 99;
      return numA - numB;
    });

    const proximaDoseIndex = dosesDestaVacina.length;
    
    if (proximaDoseIndex >= dosesDaRegra.length && regra.esquema !== 'ANUAL') {
      // Esquema completo (exceto anual)
      return;
    }

    const doseRegra = dosesDaRegra[proximaDoseIndex] || dosesDaRegra[0];
    
    // 3. Verificar perda de oportunidade (Rotavírus)
    if (regra.perdeOportunidadeAposIdade && idadeEmDias > regra.perdeOportunidadeAposIdade && dosesDestaVacina.length === 0) {
      sugestoes.push({
        vacinaId: regra.imunobiologicoId,
        vacinaNome: regra.imunobiologicoId.toUpperCase(),
        numeroDose: String(doseRegra.numeroDose),
        dataSugerida: hojeLimpo,
        status: 'OPORTUNIDADE_PERDIDA'
      });
      return;
    }

    // 4. Calcular status inicial baseado na idade
    let status: SugestaoDose['status'] = 'PROXIMA';
    const dataSugeridaBase = addDays(dataNasc, doseRegra.idadeRecomendadaDias);
    let dataSugerida = dataSugeridaBase;

    if (idadeEmDias >= doseRegra.idadeMinimaDias) {
      status = 'EM_DIA';
      if (idadeEmDias >= doseRegra.idadeRecomendadaDias) {
        status = 'ATRASADA';
      }
    }

    // 5. Ajustar para última dose aplicada (intervalo mínimo) - CRÍTICO PARA RESGATE
    if (dosesDestaVacina.length > 0) {
      const ultimaDose = dosesDestaVacina[dosesDestaVacina.length - 1];
      const dataUltima = startOfDay(parseISO(ultimaDose.dataAplicacao));
      const diasDesdeUltima = differenceInCalendarDays(hojeLimpo, dataUltima);
      
      // A data sugerida agora é baseada na última dose + intervalo recomendado
      dataSugerida = addDays(dataUltima, regra.intervaloRecomendadoEntreDoses);
      
      if (diasDesdeUltima < regra.intervaloMinimoEntreDoses) {
        status = 'PROXIMA';
      } else if (diasDesdeUltima > regra.intervaloRecomendadoEntreDoses) {
        status = 'ATRASADA';
      } else {
        status = 'EM_DIA';
      }
    }

    // Varicela indígena s/ limite superior
    if (status === 'ATRASADA' && regra.imunobiologicoId === 'vcz' && paciente.etnia) {
       // Permanece ATRASADA mas nunca vira PERDIDA
    } else if (regra.idadeMaximaParaIniciar && idadeEmDias > regra.idadeMaximaParaIniciar && dosesDestaVacina.length === 0) {
        status = 'OPORTUNIDADE_PERDIDA';
    }

    // Adicionar sugestão se não for perda total (já tratada acima)
    sugestoes.push({
      vacinaId: regra.imunobiologicoId,
      vacinaNome: regra.imunobiologicoId.toUpperCase(),
      numeroDose: String(doseRegra.numeroDose),
      dataSugerida: dataSugerida,
      status: status
    });
  });

  return sugestoes;
}

export function validarAplicacao() {
    // TODO: Implementar Task 4
}

export function validarSimultaneidade() {
    // TODO: Implementar Task 5
}
