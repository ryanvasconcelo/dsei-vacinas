import React, { useState } from 'react';
import { Search, BookOpen, Info, ShieldAlert, FileText, ChevronRight, Filter } from 'lucide-react';

const notasTecnicasIniciais = [
  { id: 'NT 23/2025', titulo: 'Influenza - Campanha 2026', data: '2025-04-10', vacinas: ['influenza'], conteudo: 'Orientações sobre a composição da vacina trivalente e grupos prioritários (incluindo povos indígenas).', severidade: 'INFO' },
  { id: 'NT 39/2025', titulo: 'Febre Amarela em Idosos', data: '2025-06-15', vacinas: ['fa'], conteudo: 'Protocolo de avaliação de risco-benefício para primeira dose em pessoas acima de 60 anos.', severidade: 'ALERTA' },
  { id: 'NT 49/2025', titulo: 'SCR e Alergia à Lactoalbumina', data: '2025-08-20', vacinas: ['scr'], conteudo: 'Procedimentos para vacinação de crianças com histórico de alergia grave a componentes do ovo.', severidade: 'ALERTA' },
  { id: 'NT 165/2025', titulo: 'Atualização Coqueluche (dTpa)', data: '2025-11-05', vacinas: ['dtpa'], conteudo: 'Ampliação da oferta de dTpa para profissionais de saúde e estagiários da área.', severidade: 'INFO' },
  { id: 'NT 14/2025', titulo: 'Manejo de Anafilaxia', data: '2025-02-12', vacinas: [], conteudo: 'Protocolo de urgência para eventos adversos graves pós-vacinação.', severidade: 'BLOQUEIO' },
  { id: 'NT 27/2025', titulo: 'Febre Amarela Conjunta', data: '2025-05-22', vacinas: ['fa'], conteudo: 'Estratégia de vacinação em massa em territórios com circulação viral ativa.', severidade: 'URGENTE' },
  { id: 'NT 06/2026', titulo: 'Dose Fracionada Febre Amarela', data: '2026-01-15', vacinas: ['fa'], conteudo: 'Regras para utilização de doses fracionadas em situações de desabastecimento ou surto.', severidade: 'INFO' },
  { id: 'NT 02/2026', titulo: 'Varicela: Sem Limite para Indígenas', data: '2026-03-01', vacinas: ['vcz'], conteudo: 'Para povos indígenas, a vacina Varicela não possui limite de idade superior para resgate.', severidade: 'URGENTE' },
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
  const [notas, setNotas] = useState(notasTecnicasIniciais);
  const [adminMode, setAdminMode] = useState(false);
  const [showAddNt, setShowAddNt] = useState(false);
  const [newNt, setNewNt] = useState({ id: '', titulo: '', conteudo: '', severidade: 'INFO' as const });

  const handleAddNt = (e: React.FormEvent) => {
    e.preventDefault();
    setNotas(prev => [{ ...newNt, data: new Date().toISOString().split('T')[0], vacinas: [] }, ...prev]);
    setShowAddNt(false);
    setNewNt({ id: '', titulo: '', conteudo: '', severidade: 'INFO' });
  };

  const dadosFiltrados = calendarioData.filter(g => 
    filtroFaixa === 'TODOS' || g.faixaEtaria === filtroFaixa
  ).map(g => ({
    ...g,
    vacinas: g.vacinas.filter(v => 
      v.nome.toLowerCase().includes(busca.toLowerCase()) || 
      v.obs.toLowerCase().includes(busca.toLowerCase()) ||
      // Busca por "sintoma/condição" nos metadados ou obs
      (busca.toLowerCase() === 'gestante' && g.faixaEtaria === 'Gestantes') ||
      (busca.toLowerCase() === 'idoso' && g.faixaEtaria.includes('60 anos'))
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
          <button className={`btn btn-sm ${adminMode ? 'btn-primary' : 'btn-ghost border border-slate-200'}`} onClick={() => setAdminMode(!adminMode)}>
            {adminMode ? 'Sair do Modo Admin' : 'Modo Admin (NTs)'}
          </button>
          <button className="btn btn-ghost btn-sm border border-slate-200">
            <FileText size={14} className="mr-2" /> PDF Completo (53p)
          </button>
        </div>
      </div>

      {adminMode && (
        <div className="card bg-indigo-50 border-indigo-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-indigo-900 uppercase">Painel de Gerenciamento de Notas Técnicas</h3>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddNt(true)}>+ Nova Nota Técnica</button>
          </div>
          <p className="text-xs text-indigo-700">Como administrador, você pode cadastrar novas diretrizes que aparecerão na biblioteca para todos os vacinadores.</p>
        </div>
      )}

      {showAddNt && (
        <div className="modal-overlay" onClick={() => setShowAddNt(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <div className="modal-title">Cadastrar Nova Nota Técnica</div>
              <button className="modal-close" onClick={() => setShowAddNt(false)}>×</button>
            </div>
            <form onSubmit={handleAddNt} className="space-y-4 p-4">
              <div className="grid-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Número/ID da NT</label>
                  <input className="input" placeholder="Ex: NT 15/2026" required value={newNt.id} onChange={e => setNewNt({...newNt, id: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Severidade</label>
                  <select className="select" value={newNt.severidade} onChange={e => setNewNt({...newNt, severidade: e.target.value as any})}>
                    <option value="INFO">Informativa</option>
                    <option value="ALERTA">Alerta</option>
                    <option value="URGENTE">Urgente</option>
                    <option value="BLOQUEIO">Bloqueio Normativo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Título</label>
                <input className="input" placeholder="Ex: Protocolo de Vacinação em Área de Surto" required value={newNt.titulo} onChange={e => setNewNt({...newNt, titulo: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Conteúdo/Resumo Técnico</label>
                <textarea className="textarea" style={{ minHeight: 100 }} placeholder="Descreva a regra técnica..." required value={newNt.conteudo} onChange={e => setNewNt({...newNt, conteudo: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Anexo PDF (Simulado)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-slate-400 text-xs">
                  Arraste o PDF da Nota Técnica aqui
                </div>
              </div>
              <div className="modal-footer flex gap-2 justify-end">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowAddNt(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-sm">Salvar Nota Técnica</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              {notas.map(nt => (
                <div 
                  key={nt.id} 
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    ntAberta === nt.id ? 'bg-white text-slate-900 border-white' : 'bg-indigo-800/50 border-indigo-700/50 hover:bg-indigo-800'
                  }`}
                  onClick={() => setNtAberta(ntAberta === nt.id ? null : nt.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold opacity-60">{nt.id} · {nt.data}</span>
                    {nt.severidade === 'URGENTE' || nt.severidade === 'BLOQUEIO' ? (
                      <span className={`w-2 h-2 rounded-full animate-pulse ${nt.severidade === 'BLOQUEIO' ? 'bg-red-500' : 'bg-orange-400'}`} />
                    ) : null}
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
