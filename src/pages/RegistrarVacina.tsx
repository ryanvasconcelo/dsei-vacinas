import { useState } from 'react';
import type { DoseAplicada } from '../data/mockData';
import { indigenas, vacinas, vacinadores, dosesAplicadas } from '../data/mockData';
import { Syringe, Search, AlertTriangle, AlertCircle } from 'lucide-react';
import { isVacinaForaCalendario } from '../utils/vacinas';
import { formatDateBR } from '../utils/formatters';
import { useFilters } from '../hooks/useFilters';
import { DataFilterPanel, type FilterConfig } from '../components/ui/DataFilterPanel';

type Props = { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void };

const viasAdmin = ['Intramuscular', 'Subcutânea', 'Intradérmica', 'Oral'];
const locaisAplicacao = ['Braço Direito', 'Braço Esquerdo', 'Coxa Direita', 'Coxa Esquerda', 'Boca (oral)'];
const numerosDose = ['1ª Dose', '2ª Dose', '3ª Dose', 'Reforço 1', 'Reforço 2', 'Dose Única'];

const emptyForm = {
  indigenaId: '', vacinaId: '', numeroDose: '',
  dataAplicacao: '', lote: '', fabricante: '',
  validadeLote: '', viaAdministracao: '', localAplicacao: '',
  vacinador: '', observacoes: '',
};

export default function RegistrarVacina({ showToast }: Props) {
  const [busca, setBusca] = useState('');
  const [buscaOpen, setBuscaOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [doses, setDoses] = useState<DoseAplicada[]>(dosesAplicadas);
  const { filters, setFilter, resetFilters } = useFilters({
    periodo: { start: '', end: '' },
    vacinaIds: [] as string[],
    vacinadorIds: [] as string[],
    numeroDoseIds: [] as string[]
  });
  const [tab, setTab] = useState<'registrar' | 'historico'>('registrar');
  const [showJustificativa, setShowJustificativa] = useState(false);
  const [justificativa, setJustificativa] = useState('');

  const indigenaSelecionado = indigenas.find(i => i.id === form.indigenaId);
  const vacinaSelecionada = vacinas.find(v => v.id === form.vacinaId);

  const indigenasFiltrados = busca.length >= 2
    ? indigenas.filter(i =>
        i.situacao !== 'OBITO' && (
        i.nome.toLowerCase().includes(busca.toLowerCase()) ||
        i.cns.includes(busca)
        )
      )
    : [];

  const historicoFiltrado = doses.filter(d => {
    if (filters.vacinaIds.length > 0 && !filters.vacinaIds.includes(d.vacinaId)) return false;
    if (filters.vacinadorIds.length > 0 && !filters.vacinadorIds.includes(d.vacinador)) return false;
    if (filters.numeroDoseIds.length > 0 && !filters.numeroDoseIds.includes(d.numeroDose)) return false;
    
    if (filters.periodo?.start) {
      if (d.dataAplicacao < filters.periodo.start) return false;
    }
    if (filters.periodo?.end) {
      if (d.dataAplicacao > filters.periodo.end) return false;
    }
    return true;
  });

  const filterConfig: FilterConfig<typeof filters>[] = [
    { key: 'periodo', label: 'Período', type: 'date-range' },
    { key: 'vacinaIds', label: 'Imunobiológico', type: 'multi-select', options: vacinas.map(v => ({ value: v.id, label: v.sigla })) },
    { key: 'vacinadorIds', label: 'Vacinador', type: 'multi-select', options: vacinadores.map(v => ({ value: v.nome, label: v.nome })) },
    { key: 'numeroDoseIds', label: 'Dose', type: 'multi-select', options: numerosDose.map(dose => ({ value: dose, label: dose })) },
  ];

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.indigenaId || !form.vacinaId || !form.numeroDose || !form.dataAplicacao || !form.lote) {
      showToast('Preencha os campos obrigatórios.', 'error');
      return;
    }
    const isFora = indigenaSelecionado && vacinaSelecionada ? isVacinaForaCalendario(indigenaSelecionado.dataNascimento, vacinaSelecionada.faixaEtaria, form.dataAplicacao) : false;

    if (isFora && !showJustificativa) {
      setShowJustificativa(true);
      return;
    }

    if (showJustificativa && justificativa.length < 20) {
      showToast('Justificativa deve ter pelo menos 20 caracteres.', 'error');
      return;
    }

    const nova: DoseAplicada = {
      id: `DOSE${String(Date.now()).slice(-5)}`,
      indigenaId: form.indigenaId,
      vacinaId: form.vacinaId,
      vacinaNome: vacinaSelecionada?.nome ?? '',
      vacinaSigla: vacinaSelecionada?.sigla ?? '',
      numeroDose: form.numeroDose,
      dataAplicacao: form.dataAplicacao,
      lote: form.lote,
      fabricante: form.fabricante,
      validadeLote: form.validadeLote,
      viaAdministracao: form.viaAdministracao,
      localAplicacao: form.localAplicacao,
      vacinador: form.vacinador,
      observacoes: form.observacoes,
      justificativaForaCalendario: showJustificativa ? justificativa : null,
    };
    setDoses(prev => [nova, ...prev]);
    setForm(emptyForm);
    setBusca('');
    setShowJustificativa(false);
    setJustificativa('');
    showToast(`Dose de ${nova.vacinaNome} registrada com sucesso!`, 'success');
  };

  const field = (label: string, children: React.ReactNode, required?: boolean) => (
    <div className="form-group">
      <label className="form-label">
        {label}{required && <span style={{ color: '#E24B4A', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Registrar Vacina</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Registro de Vacinação</div>
          <div className="page-sub">Aplicar dose e registrar no prontuário vacinal</div>
        </div>
      </div>

      <div className="tab-bar" style={{ marginBottom: '1.25rem' }}>
        <div className={`tab-item ${tab === 'registrar' ? 'active' : ''}`} onClick={() => setTab('registrar')}>
          Registrar Nova Dose
        </div>
        <div className={`tab-item ${tab === 'historico' ? 'active' : ''}`} onClick={() => setTab('historico')}>
          Histórico ({doses.length})
        </div>
      </div>

      {tab === 'registrar' && (
        <form onSubmit={handleSalvar}>
          {/* BUSCA DO INDÍGENA */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-label">Identificação do Paciente</div>
            {!indigenaSelecionado ? (
              <div className="search-wrap" style={{ position: 'relative' }}>
                <Search size={14} className="search-icon" />
                <input
                  className="input"
                  placeholder="Buscar indígena por nome ou CNS (mínimo 2 caracteres)..."
                  value={busca}
                  onChange={e => { setBusca(e.target.value); setBuscaOpen(true); }}
                  onFocus={() => setBuscaOpen(true)}
                  autoComplete="off"
                />
                {buscaOpen && indigenasFiltrados.length > 0 && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                    background: '#fff', border: '0.5px solid #DDDDD5', borderRadius: 7,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginTop: 4,
                  }}>
                    {indigenasFiltrados.slice(0, 6).map(ind => (
                      <div
                        key={ind.id}
                        onClick={() => {
                          setForm(prev => ({ ...prev, indigenaId: ind.id }));
                          setBusca(''); setBuscaOpen(false);
                        }}
                        style={{
                          padding: '10px 12px', cursor: 'pointer', fontSize: 12,
                          borderBottom: '0.5px solid #F0EFE8',
                          transition: 'background 0.1s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#FAFAF5')}
                        onMouseLeave={e => (e.currentTarget.style.background = '')}
                      >
                        <div style={{ fontWeight: 500, color: '#1A1916' }}>{ind.nome}</div>
                        <div style={{ fontSize: 10, color: '#888880', marginTop: 2, fontFamily: "'DM Mono', monospace" }}>
                          CNS: {ind.cns} · {ind.aldeia} · {ind.etnia}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                background: '#F7F6F2', border: '0.5px solid #DDDDD5',
                borderRadius: 7, padding: '0.9rem 1rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#1A1916', marginBottom: 4 }}>
                    {indigenaSelecionado.nome}
                  </div>
                  <div style={{ fontSize: 11, color: '#888880', display: 'flex', gap: 12 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace" }}>CNS: {indigenaSelecionado.cns}</span>
                    <span>·</span>
                    <span>{indigenaSelecionado.aldeia}</span>
                    <span>·</span>
                    <span>{indigenaSelecionado.poloBase.replace('Polo Base ', '')}</span>
                    <span>·</span>
                    <span>{indigenaSelecionado.etnia}</span>
                  </div>

                  {/* ALERTAS DO PACIENTE */}
                  {indigenaSelecionado.contraindicacoes.length > 0 && (
                    <div className="alert alert-err" style={{ marginTop: 10 }}>
                      <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                      <div>
                        <strong>ATENÇÃO — Contraindicações registradas:</strong>
                        <div style={{ marginTop: 2 }}>{indigenaSelecionado.contraindicacoes.join(', ')}</div>
                      </div>
                    </div>
                  )}
                  {indigenaSelecionado.acamado && (
                    <div className="alert alert-warn" style={{ marginTop: 10 }}>
                      <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                      <div><strong>Paciente Acamado</strong> — confirmar endereço para vacinação domiciliar</div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setForm(prev => ({ ...prev, indigenaId: '' }))}
                >
                  Trocar
                </button>
              </div>
            )}
          </div>

          {/* DADOS DA VACINA */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-label">Dados da Vacina</div>
            <div className="grid-2" style={{ gap: 12, marginBottom: 12 }}>
              {field('Vacina', (
                <select className="select" value={form.vacinaId}
                  onChange={e => {
                    const v = vacinas.find(vac => vac.id === e.target.value);
                    setForm(prev => ({ ...prev, vacinaId: e.target.value, fabricante: v?.fabricante ?? '' }));
                  }}>
                  <option value="">Selecione a vacina...</option>
                  {vacinas.map(v => (
                    <option key={v.id} value={v.id}>{v.sigla} — {v.nome}</option>
                  ))}
                </select>
              ), true)}
              {field('Número da Dose', (
                <select className="select" value={form.numeroDose}
                  onChange={e => setForm({ ...form, numeroDose: e.target.value })}>
                  <option value="">Selecione...</option>
                  {numerosDose.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              ), true)}
              {field('Data de Aplicação', (
                <input className="input" type="date"
                  value={form.dataAplicacao}
                  onChange={e => setForm({ ...form, dataAplicacao: e.target.value })} />
              ), true)}
              {field('Profissional que Aplicou', (
                <select className="select" value={form.vacinador}
                  onChange={e => setForm({ ...form, vacinador: e.target.value })}>
                  <option value="">Selecione o vacinador...</option>
                  {vacinadores.map(v => <option key={v.id} value={v.nome}>{v.nome}</option>)}
                </select>
              ))}
            </div>
          </div>

          {/* DADOS DO LOTE */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-label">Lote e Fabricante</div>
            <div className="grid-3" style={{ gap: 12, marginBottom: 12 }}>
              {field('Número do Lote', (
                <input className="input" placeholder="Ex: BCG240012"
                  value={form.lote} onChange={e => setForm({ ...form, lote: e.target.value })} />
              ), true)}
              {field('Fabricante', (
                <input className="input" placeholder="Ex: Bio-Manguinhos"
                  value={form.fabricante} onChange={e => setForm({ ...form, fabricante: e.target.value })} />
              ))}
              {field('Validade do Lote', (
                <input className="input" type="date"
                  value={form.validadeLote} onChange={e => setForm({ ...form, validadeLote: e.target.value })} />
              ))}
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              {field('Via de Administração', (
                <select className="select" value={form.viaAdministracao}
                  onChange={e => setForm({ ...form, viaAdministracao: e.target.value })}>
                  <option value="">Selecione...</option>
                  {viasAdmin.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              ))}
              {field('Local de Aplicação', (
                <select className="select" value={form.localAplicacao}
                  onChange={e => setForm({ ...form, localAplicacao: e.target.value })}>
                  <option value="">Selecione...</option>
                  {locaisAplicacao.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              ))}
            </div>
          </div>

          {/* OBSERVAÇÕES */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="section-label">Observações</div>
            <textarea className="textarea" style={{ minHeight: 70 }}
              placeholder="Reações observadas, condições de aplicação, eventos adversos menores..."
              value={form.observacoes}
              onChange={e => setForm({ ...form, observacoes: e.target.value })} />
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost"
              onClick={() => { setForm(emptyForm); setBusca(''); }}>
              Limpar
            </button>
            <button type="submit" className="btn btn-primary">
              <Syringe size={13} /> Aplicar Vacina
            </button>
          </div>
        </form>
      )}

      {/* HISTÓRICO */}
      {tab === 'historico' && (
        <div>
          <DataFilterPanel 
            filters={filters} 
            config={filterConfig} 
            onFilterChange={setFilter as any} 
            onClear={resetFilters} 
          />
          <div className="table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Indígena</th>
                <th>Vacina</th>
                <th>Dose</th>
                <th>Data</th>
                <th>Lote</th>
                <th>Vacinador</th>
                <th>Local</th>
              </tr>
            </thead>
            <tbody>
              {historicoFiltrado.map(d => {
                const ind = indigenas.find(i => i.id === d.indigenaId);
                return (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: 12 }}>{ind?.nome ?? '—'}</div>
                      {ind && <div style={{ fontSize: 10, color: '#888880', fontFamily: "'DM Mono', monospace" }}>{ind.cns}</div>}
                    </td>
                    <td>
                      <span className="badge badge-info" style={{ fontSize: 10 }}>
                        <span className="badge-dot" /> {d.vacinaSigla}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: '#888880' }}>{d.numeroDose}</td>
                    <td className="mono">{formatDateBR(d.dataAplicacao)}</td>
                    <td className="mono">{d.lote}</td>
                    <td style={{ fontSize: 11, color: '#888880' }}>{d.vacinador}</td>
                    <td style={{ fontSize: 11, color: '#888880' }}>{d.localAplicacao}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {/* MODAL JUSTIFICATIVA */}
      {showJustificativa && (
        <div className="modal-overlay" onClick={() => setShowJustificativa(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={18} color="#E24B4A" />
                <div className="modal-title">Vacinação Fora do Calendário</div>
              </div>
              <button className="modal-close" onClick={() => setShowJustificativa(false)}>×</button>
            </div>
            <div style={{ fontSize: 13, color: '#444440', marginBottom: '1rem', lineHeight: 1.5 }}>
              A vacina <strong>{vacinaSelecionada?.nome}</strong> possui faixa etária recomendada de <strong>{vacinaSelecionada?.faixaEtaria}</strong>. O paciente possui idade fora desta faixa.
              <br /><br />
              Por favor, informe a justificativa técnica para a aplicação (mín. 20 caracteres).
            </div>
            
            <div style={{ display: 'flex', gap: 6, marginBottom: '1rem', flexWrap: 'wrap' }}>
              {['Campanha emergencial', 'Atraso justificado pelo genitor', 'Área de difícil acesso/isolada'].map(btn => (
                <button key={btn} type="button" className="btn btn-ghost btn-sm"
                  style={{ background: '#F0EFE8', fontSize: 11 }}
                  onClick={() => setJustificativa(btn + ' - ')}
                >
                  {btn}
                </button>
              ))}
            </div>

            <textarea
              className="textarea"
              style={{ minHeight: 80, marginBottom: '1rem' }}
              placeholder="Digite a justificativa detalhada..."
              value={justificativa}
              onChange={e => setJustificativa(e.target.value)}
              maxLength={500}
            />

            <div className="modal-footer" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowJustificativa(false)}>Cancelar</button>
              <button className="btn btn-primary btn-sm" onClick={handleSalvar} disabled={justificativa.length < 20}>
                Confirmar Aplicação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
