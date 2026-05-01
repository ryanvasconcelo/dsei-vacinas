import React, { useMemo } from 'react';
import { Indigena, DoseAplicada } from '../../data/mockData';
import { sugerirProximasDoses } from '../../engine/vacinaEngine';
import { Calendar, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { formatDateBR } from '../../utils/date';

interface SugestoesVacinaisProps {
  paciente: Indigena;
  dosesJaAplicadas: DoseAplicada[];
}

const SugestoesVacinais: React.FC<SugestoesVacinaisProps> = ({ paciente, dosesJaAplicadas }) => {
  const hoje = useMemo(() => new Date(), []);
  
  const sugestoes = useMemo(() => {
    return sugerirProximasDoses(paciente, hoje, dosesJaAplicadas)
      .filter(s => s.status !== 'EM_DIA') // No perfil, focamos no que é urgente ou próximo
      .sort((a, b) => {
        if (a.status === 'ATRASADA') return -1;
        if (b.status === 'ATRASADA') return 1;
        return a.dataSugerida.getTime() - b.dataSugerida.getTime();
      });
  }, [paciente, dosesJaAplicadas, hoje]);

  if (sugestoes.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-slate-800">Próximas Vacinas Sugeridas</h3>
        </div>
        <span className="text-xs text-slate-500 uppercase font-medium tracking-wider">Motor de Regras 2026</span>
      </div>

      <div className="divide-y divide-slate-100">
        {sugestoes.slice(0, 5).map((sugestao, idx) => (
          <div key={`${sugestao.vacinaId}-${idx}`} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                sugestao.status === 'ATRASADA' ? 'bg-red-50 text-red-600' :
                sugestao.status === 'OPORTUNIDADE_PERDIDA' ? 'bg-slate-100 text-slate-400' :
                'bg-indigo-50 text-indigo-600'
              }`}>
                {sugestao.status === 'ATRASADA' ? <AlertCircle className="w-5 h-5" /> :
                 sugestao.status === 'OPORTUNIDADE_PERDIDA' ? <AlertCircle className="w-5 h-5" /> :
                 <Clock className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{sugestao.vacinaId.toUpperCase()}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase font-medium">
                    {sugestao.numeroDose.includes('REFORCO') ? 'Reforço' : `Dose ${sugestao.numeroDose}`}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  {sugestao.status === 'OPORTUNIDADE_PERDIDA' 
                    ? 'Esquema não iniciado na janela correta' 
                    : `Previsão: ${formatDateBR(sugestao.dataSugerida.toISOString())}`}
                </p>
              </div>
            </div>

            <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
              sugestao.status === 'ATRASADA' ? 'bg-red-100 text-red-700' :
              sugestao.status === 'OPORTUNIDADE_PERDIDA' ? 'bg-slate-200 text-slate-600' :
              'bg-blue-100 text-blue-700'
            }`}>
              {sugestao.status === 'ATRASADA' ? 'Em Atraso' :
               sugestao.status === 'OPORTUNIDADE_PERDIDA' ? 'Perda de Oportunidade' :
               'Agendada'}
            </div>
          </div>
        ))}
      </div>

      {sugestoes.length > 5 && (
        <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-tight">
            Ver plano vacinal completo ({sugestoes.length} itens)
          </button>
        </div>
      )}
    </div>
  );
};

export default SugestoesVacinais;
