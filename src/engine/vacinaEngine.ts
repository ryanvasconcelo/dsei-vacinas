import { Indigena, DoseAplicada } from '../data/mockData';
import { SugestaoDose, RegraVacinacao, DoseRegra } from '../types/vacina';
import { regrasVacinais, regrasSimultaneidade } from '../data/regrasVacinais';
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

export function validarAplicacao(
  paciente: Indigena,
  vacinaId: string,
  numeroDose: number | string,
  dataAplicacao: Date,
  dosesJaAplicadas: DoseAplicada[]
): ResultadoValidacao {
  const regra = regrasVacinais.find(r => r.imunobiologicoId === vacinaId);
  if (!regra) {
    return { valido: true, motivo: null, severidade: 'OK', requerJustificativa: false };
  }

  const dataNasc = startOfDay(parseISO(paciente.dataNascimento));
  const dataAppStart = startOfDay(dataAplicacao);
  const idadeEmDias = differenceInCalendarDays(dataAppStart, dataNasc);

  // 1. Validar Idade Mínima/Máxima
  const doseRegra = regra.doses.find(d => String(d.numeroDose) === String(numeroDose)) || regra.doses[0];

  if (idadeEmDias < doseRegra.idadeMinimaDias) {
    return {
      valido: false,
      motivo: `Idade mínima para esta dose é ${doseRegra.idadeMinimaDias} dias. Paciente tem ${idadeEmDias} dias.`,
      severidade: 'BLOQUEIO',
      requerJustificativa: true
    };
  }

  if (doseRegra.idadeMaximaDias && idadeEmDias > doseRegra.idadeMaximaDias) {
    // Exceção: Varicela Indígena sem limite
    const isVaricelaIndigena = vacinaId === 'vcz' && paciente.etnia;
    if (!isVaricelaIndigena) {
      return {
        valido: false,
        motivo: `Idade máxima para esta dose é ${doseRegra.idadeMaximaDias} dias. Paciente tem ${idadeEmDias} dias.`,
        severidade: 'ALERTA',
        requerJustificativa: true
      };
    }
  }

  // 2. Validar Intervalo Mínimo
  const dosesDestaVacina = dosesJaAplicadas.filter(d => d.vacinaId === vacinaId);
  if (dosesDestaVacina.length > 0) {
    const ultimaDose = dosesDestaVacina[dosesDestaVacina.length - 1];
    const dataUltima = startOfDay(parseISO(ultimaDose.dataAplicacao));
    const diasDesdeUltima = differenceInCalendarDays(dataAppStart, dataUltima);

    if (diasDesdeUltima < regra.intervaloMinimoEntreDoses) {
      return {
        valido: false,
        motivo: `Intervalo mínimo de ${regra.intervaloMinimoEntreDoses} dias não respeitado. Passaram-se apenas ${diasDesdeUltima} dias.`,
        severidade: 'BLOQUEIO',
        requerJustificativa: true
      };
    }
  }

  return { valido: true, motivo: null, severidade: 'OK', requerJustificativa: false };
}

export function validarSimultaneidade(
  paciente: Indigena,
  vacinaIdA: string,
  vacinaIdB: string,
  hoje: Date
): { permitido: boolean; intervaloMinimoSeNaoSimultaneo: number } {
  const dataNasc = startOfDay(parseISO(paciente.dataNascimento));
  const hojeLimpo = startOfDay(hoje);
  const idadeEmDias = differenceInCalendarDays(hojeLimpo, dataNasc);

  const regra = regrasSimultaneidade.find(r => 
    (r.imunobiologicoIdA === vacinaIdA && r.imunobiologicoIdB === vacinaIdB) ||
    (r.imunobiologicoIdA === vacinaIdB && r.imunobiologicoIdB === vacinaIdA)
  );

  if (!regra) {
    return { permitido: true, intervaloMinimoSeNaoSimultaneo: 0 };
  }

  // Regra especial: SCR + FA em menores de 2 anos
  if (regra.condicaoEspecial === 'Menores de 2 anos' && idadeEmDias >= 2 * 365) {
    return { permitido: true, intervaloMinimoSeNaoSimultaneo: 0 };
  }

  return { 
    permitido: regra.permitido, 
    intervaloMinimoSeNaoSimultaneo: regra.intervaloMinimoSeNaoSimultaneo 
  };
}
