import { useState } from 'react';
import type { Indigena } from '../data/mockData';
import { indigenas, polosBase, aldeias, etnias } from '../data/mockData';
import { UserPlus, Search, Eye, X } from 'lucide-react';
import { formatNomeComMae, formatDateBR } from '../utils/formatters';

import TagInput from '../components/TagInput';

type Props = { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void };

const emptyForm = {
  nome: '', cns: '', cpf: '',
  dataNascimento: '', sexo: '' as 'M' | 'F' | '',
  nomeMae: '', nomePai: '',
  aldeiaId: '', poloBaseId: '',
  etnia: '',
  situacao: 'PRESENTE' as 'PRESENTE' | 'AUSENTE' | 'OBITO',
  acamado: false, condicaoSaude: '',
  contraindicacoes: [] as string[],
  comorbidades: [] as string[],
};

export default function CadastroIndigena({ showToast }: Props) {
  const [lista, setLista] = useState<Indigena[]>(indigenas);
  const [busca, setBusca] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [tab, setTab] = useState<'lista' | 'novo'>('lista');
  const [detalhe, setDetalhe] = useState<Indigena | null>(null);

  const aldeiasFiltradas = form.poloBaseId
    ? aldeias.filter(a => a.poloBaseId === form.poloBaseId)
    : aldeias;

  const listaFiltrada = lista.filter(ind =>
    ind.nome.toLowerCase().includes(busca.toLowerCase()) ||
    ind.cns.includes(busca) ||
    ind.aldeia.toLowerCase().includes(busca.toLowerCase()) ||
    ind.poloBase.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.cns || !form.dataNascimento || !form.sexo || !form.nomeMae || !form.poloBaseId || !form.aldeiaId) {
      showToast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }
    const polo = polosBase.find(p => p.id === form.poloBaseId);
    const aldeia = aldeias.find(a => a.id === form.aldeiaId);
    const novo: Indigena = {
      id: `IND${String(Date.now()).slice(-4)}`,
      nome: form.nome, cns: form.cns,
      cpf: form.cpf || null,
      dataNascimento: form.dataNascimento,
      sexo: form.sexo as 'M' | 'F',
      nomeMae: form.nomeMae, nomePai: form.nomePai || null,
      aldeiaId: form.aldeiaId, aldeia: aldeia?.nome ?? '',
      poloBaseId: form.poloBaseId, poloBase: polo?.nome ?? '',
      etnia: form.etnia,
      situacao: form.situacao,
      acamado: form.acamado,
      contraindicacoes: form.contraindicacoes,
      comorbidades: form.comorbidades,
    };
    setLista(prev => [novo, ...prev]);
    setForm(emptyForm);
    setTab('lista');
    showToast(`Indígena ${novo.nome} cadastrado com sucesso.`, 'success');
  };

  const field = (label: string, children: React.ReactNode, required?: boolean) => (
    <div className="form-group">
      <label className="form-label">{label}{required && <span style={{ color: '#E24B4A', marginLeft: 2 }}>*</span>}</label>
      {children}
    </div>
  );

  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Cadastro de Indígena</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Cadastro de Indígena</div>
          <div className="page-sub">Registro de beneficiários do calendário vacinal</div>
        </div>
        <button className="btn btn-primary" onClick={() => setTab(tab === 'novo' ? 'lista' : 'novo')}>
          {tab === 'novo' ? (
            <><X size={13} /> Cancelar</>
          ) : (
            <><UserPlus size={13} /> Novo Cadastro</>
          )}
        </button>
      </div>

      <div className="tab-bar" style={{ marginBottom: '1.25rem' }}>
        <div className={`tab-item ${tab === 'lista' ? 'active' : ''}`} onClick={() => setTab('lista')}>
          Lista de Cadastrados ({lista.length})
        </div>
        <div className={`tab-item ${tab === 'novo' ? 'active' : ''}`} onClick={() => setTab('novo')}>
          + Novo Registro
        </div>
      </div>

      {/* ——— LISTA ——— */}
      {tab === 'lista' && (
        <div>
          <div className="search-wrap" style={{ marginBottom: '1rem' }}>
            <Search size={14} className="search-icon" />
            <input
              className="input"
              type="text"
              placeholder="Buscar por nome, CNS, aldeia ou polo base..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          <div className="table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CNS</th>
                  <th>Etnia</th>
                  <th>Aldeia</th>
                  <th>Polo Base</th>
                  <th>Idade</th>
                  <th>Situação</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listaFiltrada.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#888880' }}>
                      Nenhum indígena encontrado.
                    </td>
                  </tr>
                ) : listaFiltrada.map(ind => {
                  const idade = (() => {
                    const nasc = new Date(ind.dataNascimento);
                    const hoje = new Date();
                    const anos = hoje.getFullYear() - nasc.getFullYear();
                    const meses = hoje.getMonth() - nasc.getMonth();
                    if (anos === 0) return `${meses < 0 ? 0 : meses} meses`;
                    return `${anos} anos`;
                  })();

                  return (
                    <tr key={ind.id} title={`Mãe: ${ind.nomeMae}${ind.nomePai ? ` | Pai: ${ind.nomePai}` : ''}`}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{formatNomeComMae(ind.nome, ind.nomeMae)}</div>
                        <div style={{ fontSize: 10, color: '#888880', marginTop: 1 }}>
                          {ind.sexo === 'M' ? 'Masculino' : 'Feminino'}
                        </div>
                      </td>
                      <td className="mono">{ind.cns}</td>
                      <td style={{ fontSize: 11, color: '#888880' }}>{ind.etnia}</td>
                      <td style={{ fontSize: 11, color: '#888880' }}>{ind.aldeia}</td>
                      <td style={{ fontSize: 11, color: '#888880' }}>{ind.poloBase.replace('Polo Base ', '')}</td>
                      <td style={{ fontSize: 11 }}>{idade}</td>
                      <td>
                        {ind.situacao === 'OBITO' ? (
                          <span className="badge badge-default" style={{ background: '#222', color: '#fff' }}><span className="badge-dot" style={{ background: '#555' }} />Óbito</span>
                        ) : ind.contraindicacoes.length > 0 ? (
                          <span className="badge badge-danger"><span className="badge-dot" />Contraindicação</span>
                        ) : ind.acamado ? (
                          <span className="badge badge-warning"><span className="badge-dot" />Acamado</span>
                        ) : (
                          <span className="badge badge-success"><span className="badge-dot" />Regular</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => setDetalhe(ind)}>
                          <Eye size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 12, fontSize: 11, color: '#888880' }}>
            {listaFiltrada.length} de {lista.length} registros exibidos
          </div>
        </div>
      )}

      {/* ——— NOVO CADASTRO ——— */}
      {tab === 'novo' && (
        <form onSubmit={handleSalvar}>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-label">Identificação</div>
            <div className="grid-2" style={{ gap: 12, marginBottom: 12 }}>
              {field('Nome Completo', (
                <input className="input" placeholder="Nome completo do indígena"
                  value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
              ), true)}
              {field('CNS — Cartão Nacional de Saúde', (
                <input className="input" placeholder="000 0000 0000 0000"
                  value={form.cns} onChange={e => setForm({ ...form, cns: e.target.value.replace(/\D/g, '') })}
                  maxLength={15} />
              ), true)}
              {field('CPF (opcional)', (
                <input className="input" placeholder="000.000.000-00"
                  value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
              ))}
              {field('Data de Nascimento', (
                <input className="input" type="date"
                  value={form.dataNascimento} onChange={e => setForm({ ...form, dataNascimento: e.target.value })} />
              ), true)}
              {field('Sexo Biológico', (
                <select className="select" value={form.sexo} onChange={e => setForm({ ...form, sexo: e.target.value as 'M' | 'F' })}>
                  <option value="">Selecione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              ), true)}
              {field('Etnia', (
                <select className="select" value={form.etnia} onChange={e => setForm({ ...form, etnia: e.target.value })}>
                  <option value="">Selecione...</option>
                  {etnias.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              ))}
              {field('Situação', (
                <select className="select" value={form.situacao} onChange={e => setForm({ ...form, situacao: e.target.value as any })}>
                  <option value="PRESENTE">Presente na Aldeia</option>
                  <option value="AUSENTE">Ausente (Viagem/Tratamento)</option>
                  <option value="OBITO">Óbito</option>
                </select>
              ), true)}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-label">Filiação</div>
            <div className="grid-2" style={{ gap: 12 }}>
              {field('Nome da Mãe', (
                <input className="input" placeholder="Nome completo da mãe"
                  value={form.nomeMae} onChange={e => setForm({ ...form, nomeMae: e.target.value })} />
              ), true)}
              {field('Nome do Pai (opcional)', (
                <input className="input" placeholder="Nome completo do pai"
                  value={form.nomePai} onChange={e => setForm({ ...form, nomePai: e.target.value })} />
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="section-label">Localização</div>
            <div className="grid-2" style={{ gap: 12 }}>
              {field('Polo Base', (
                <select className="select" value={form.poloBaseId}
                  onChange={e => setForm({ ...form, poloBaseId: e.target.value, aldeiaId: '' })}>
                  <option value="">Selecione o Polo Base...</option>
                  {polosBase.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
              ), true)}
              {field('Aldeia', (
                <select className="select" value={form.aldeiaId}
                  onChange={e => setForm({ ...form, aldeiaId: e.target.value })}
                  disabled={!form.poloBaseId}>
                  <option value="">{form.poloBaseId ? 'Selecione a Aldeia...' : 'Selecione o Polo Base primeiro'}</option>
                  {aldeiasFiltradas.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
                </select>
              ), true)}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="section-label">Condições Especiais</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.acamado}
                  onChange={e => setForm({ ...form, acamado: e.target.checked })}
                  style={{ width: 15, height: 15, accentColor: '#1A1916' }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#1A1916' }}>Paciente Acamado</div>
                  <div style={{ fontSize: 10, color: '#888880' }}>Vacinação domiciliar necessária</div>
                </div>
              </label>
              {form.acamado && (
                <div className="form-group">
                  <label className="form-label">Condição de Saúde</label>
                  <textarea className="textarea" style={{ minHeight: 60 }}
                    placeholder="Descreva a condição de saúde que exige atendimento domiciliar..."
                    value={form.condicaoSaude}
                    onChange={e => setForm({ ...form, condicaoSaude: e.target.value })} />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Contraindicações</label>
                <TagInput tags={form.contraindicacoes} onChange={tags => setForm({ ...form, contraindicacoes: tags })} placeholder="Ex: Alergia a ovo, Imunodeficiência..." />
              </div>
              <div className="form-group">
                <label className="form-label">Comorbidades</label>
                <TagInput tags={form.comorbidades} onChange={tags => setForm({ ...form, comorbidades: tags })} placeholder="Ex: Hipertensão, Diabetes..." />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => { setForm(emptyForm); setTab('lista'); }}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={13} /> Salvar Cadastro
            </button>
          </div>
        </form>
      )}

      {/* MODAL DETALHE */}
      {detalhe && (
        <div className="modal-overlay" onClick={() => setDetalhe(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{detalhe.nome}</div>
                <div style={{ fontSize: 11, color: '#888880', marginTop: 2 }}>CNS: {detalhe.cns}</div>
              </div>
              <button className="modal-close" onClick={() => setDetalhe(null)}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: 12 }}>
              {[
                ['Data de Nascimento', formatDateBR(detalhe.dataNascimento)],
                ['Sexo', detalhe.sexo === 'M' ? 'Masculino' : 'Feminino'],
                ['Etnia', detalhe.etnia],
                ['CPF', detalhe.cpf ?? '—'],
                ['Mãe', detalhe.nomeMae],
                ['Pai', detalhe.nomePai ?? '—'],
                ['Aldeia', detalhe.aldeia],
                ['Polo Base', detalhe.poloBase],
              ].map(([key, val]) => (
                <div key={key} style={{ padding: '6px 0', borderBottom: '0.5px solid #F0EFE8' }}>
                  <div style={{ fontSize: 10, color: '#888880', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{key}</div>
                  <div style={{ color: '#1A1916', fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
            {(detalhe.acamado || detalhe.contraindicacoes.length > 0 || detalhe.comorbidades.length > 0) && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {detalhe.acamado && (
                  <div className="alert alert-warn">
                    <span style={{ fontWeight: 500 }}>Paciente Acamado</span> — vacinação domiciliar
                  </div>
                )}
                {detalhe.contraindicacoes.length > 0 && (
                  <div className="alert alert-err">
                    <div>
                      <div style={{ fontWeight: 500 }}>⚠ Contraindicações Registradas</div>
                      <div style={{ marginTop: 2 }}>{detalhe.contraindicacoes.join(', ')}</div>
                    </div>
                  </div>
                )}
                {detalhe.comorbidades.length > 0 && (
                  <div className="alert alert-warn">
                    <div>
                      <div style={{ fontWeight: 500 }}>Comorbidades</div>
                      <div style={{ marginTop: 2 }}>{detalhe.comorbidades.join(', ')}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="modal-footer" style={{ marginTop: '1.25rem' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setDetalhe(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
