import React, { useState } from 'react';
import { Search, BookOpen, Info, ShieldAlert, FileText, ChevronRight, Filter } from 'lucide-react';

const notasTecnicas = [
  {
    id: 'NT01',
    titulo: 'Pneumo 23 em População Indígena',
    data: '2026-02-15',
    conteudo: 'A vacina Pneumocócica 23-valente (polissacarídica) está indicada para a população indígena a partir dos 5 anos de idade, sem necessidade de comprovação de comorbidade, conforme Manual de Normas 2026.',
    severidade: 'INFO'
  },
  {
    id: 'NT02',
    titulo: 'Varicela: Sem Limite de Idade',
    data: '2026-03-01',
    conteudo: 'Diferente da população geral, para os povos indígenas a vacina Varicela não possui limite de idade superior para resgate. Deve ser ofertada a todos não vacinados ou sem histórico da doença.',
    severidade: 'URGENTE'
  },
  {
    id: 'NT03',
    titulo: 'Simultaneidade SCR + Febre Amarela',
    data: '2026-01-10',
    conteudo: 'Em crianças menores de 2 anos, as vacinas SCR e Febre Amarela não devem ser aplicadas simultaneamente. Respeitar intervalo mínimo de 30 dias entre as doses.',
    severidade: 'BLOQUEIO'
  }
];

const calendarioData = [
  {
    faixaEtaria: 'Ao nascer',
    vacinas: [
      { nome: 'BCG', doses: '1 dose', via: 'Intradérmica', obs: 'Ao nascimento, antes da alta hospitalar' },
      { nome: 'Hepatite B', doses: '1ª dose', via: 'Intramuscular', obs: 'Preferencialmente nas primeiras 12h' },
    ],
  },
  {
    faixaEtaria: '2 meses',
    vacinas: [
      { nome: 'Pentavalente (DTP+Hib+HepB)', doses: '1ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'VIP (Poliomielite inativada)', doses: '1ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Pneumocócica 10V', doses: '1ª dose', via: 'Intramuscular', obs: '' },
      { nome: 'Rotavírus Humano', doses: '1ª dose', via: 'Oral', obs: 'Não repetir se regurgitar' },
    ],
  },
  {
    faixaEtaria: '3 meses',
    vacinas: [
      { nome: 'Meningocócica C', doses: '1ª dose', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '9 meses',
    vacinas: [
      { nome: 'Febre Amarela', doses: '1ª dose', via: 'Subcutânea', obs: 'Área endêmica DSEI-AM' },
    ],
  },
  {
    faixaEtaria: '12 meses',
    vacinas: [
      { nome: 'Tríplice Viral (SCR)', doses: '1ª dose', via: 'Subcutânea', obs: '' },
      { nome: 'Pneumocócica 10V', doses: 'Reforço', via: 'Intramuscular', obs: '' },
      { nome: 'Meningocócica C', doses: 'Reforço', via: 'Intramuscular', obs: '' },
    ],
  },
  {
    faixaEtaria: '15 meses',
    vacinas: [
      { nome: 'Varicela', doses: '1ª dose', via: 'Subcutânea', obs: '' },
      { nome: 'Hepatite A', doses: '1 dose', via: 'Intramuscular', obs: '' },
      { nome: 'DTP', doses: '1º Reforço', via: 'Intramuscular', obs: '' },
      { nome: 'VOP (Poliomielite oral)', doses: '1º Reforço', via: 'Oral', obs: '' },
    ],
  },
];

export default function CalendarioVacinal() {
  const [busca, setBusca] = useState('');
  const [filtroFaixa, setFiltroFaixa] = useState('TODOS');
  const [ntAberta, setNtAberta] = useState<string | null>(null);

  const dadosFiltrados = calendarioData.filter(g => 
    filtroFaixa === 'TODOS' || g.faixaEtaria === filtroFaixa
  ).map(g => ({
    ...g,
    vacinas: g.vacinas.filter(v => 
      v.nome.toLowerCase().includes(busca.toLowerCase()) || 
      v.obs.toLowerCase().includes(busca.toLowerCase())
    )
  })).filter(g => g.vacinas.length > 0);

  return (
    <div className="pb-10">
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Guia Técnico Vacinal</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manual de Normas e Procedimentos 2026</h1>
          <p className="text-slate-500 text-sm">Biblioteca de consulta técnica e calendário para populações indígenas</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm border border-slate-200">
            <FileText size={14} className="mr-2" /> PDF Completo (53p)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUNA ESQUERDA: CALENDÁRIO */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="card p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                className="input pl-9" 
                placeholder="Buscar vacina, via ou observação..." 
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
            </div>
            <select 
              className="select w-full md:w-48"
              value={filtroFaixa}
              onChange={e => setFiltroFaixa(e.target.value)}
            >
              <option value="TODOS">Todas as faixas</option>
              {calendarioData.map(g => (
                <option key={g.faixaEtaria} value={g.faixaEtaria}>{g.faixaEtaria}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {dadosFiltrados.map((grupo, gi) => (
              <div key={gi} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{grupo.faixaEtaria}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{grupo.vacinas.length} IMUNOBIOLÓGICOS</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {grupo.vacinas.map((vac, vi) => (
                    <div key={vi} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-slate-900">{vac.nome}</div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase">
                          {vac.doses}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-slate-400" />
                          {vac.via}
                        </div>
                        {vac.obs && (
                          <div className="flex items-center gap-1">
                            <Info className="w-3 h-3 text-indigo-400" />
                            {vac.obs}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: NOTAS TÉCNICAS E RECURSOS */}
        <div className="flex flex-col gap-6">
          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10 rotate-12" />
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Notas Técnicas SESAI
            </h3>
            <p className="text-indigo-100 text-xs mb-6 leading-relaxed">
              Orientações específicas para o território e atualizações normativas de 2026.
            </p>
            
            <div className="space-y-3 relative z-10">
              {notasTecnicas.map(nt => (
                <div 
                  key={nt.id} 
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    ntAberta === nt.id ? 'bg-white text-slate-900 border-white' : 'bg-indigo-800/50 border-indigo-700/50 hover:bg-indigo-800'
                  }`}
                  onClick={() => setNtAberta(ntAberta === nt.id ? null : nt.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold opacity-60">{nt.id} · {nt.data}</span>
                    {nt.severidade === 'URGENTE' && (
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    )}
                  </div>
                  <div className="font-bold text-sm flex items-center justify-between">
                    {nt.titulo}
                    <ChevronRight className={`w-4 h-4 transition-transform ${ntAberta === nt.id ? 'rotate-90' : ''}`} />
                  </div>
                  {ntAberta === nt.id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                      {nt.conteudo}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-tighter">Fluxogramas Decisórios</h4>
            <div className="space-y-2">
              {[
                'Atraso vacinal > 2 anos',
                'Contatos de Hanseníase',
                'Esquema de Resgate Hepatite B',
                'Profilaxia Pós-Exposição'
              ].map(item => (
                <button key={item} className="w-full text-left p-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-between group">
                  {item}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
