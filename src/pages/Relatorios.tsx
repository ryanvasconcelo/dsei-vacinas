import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { indigenas, dosesAplicadas, coberturaData, polosBase, pendenciasVacinais, vacinas } from '../data/mockData';
import { Download, Filter } from 'lucide-react';
import { formatNomeComMae, formatDateBR } from '../utils/formatters';

export default function Relatorios() {
  const [tab, setTab] = useState<'cobertura' | 'doses' | 'pendencias'>('cobertura');
  const [filtroPoloCobertura, setFiltroPoloCobertura] = useState('');
  const [filtroPolo, setFiltroPolo] = useState('');
  const [filtroVacina, setFiltroVacina] = useState('');

  const pendenciasFiltradas = pendenciasVacinais.filter(p =>
    (!filtroPolo || p.poloBase.includes(filtroPolo.replace('Polo Base ', ''))) &&
    (!filtroVacina || p.vacina.includes(filtroVacina))
  );

  const coberturaFiltrada = filtroPoloCobertura
    ? coberturaData.filter(d => d.polo.toLowerCase().includes(filtroPoloCobertura.toLowerCase()))
    : coberturaData;

  const dosesPorPolo = polosBase.map(polo => {
    const count = dosesAplicadas.filter(d => {
      const ind = indigenas.find(i => i.id === d.indigenaId);
      return ind?.poloBaseId === polo.id;
    }).length;
    return { polo: polo.nome.replace('Polo Base ', ''), doses: count };
  });

  const handleExportarPendencias = () => {
    const headers = ['Nome', 'Mãe', 'Pai', 'CNS', 'Polo Base', 'Aldeia', 'Vacina Pendente', 'Idade', 'Atraso (dias)'];
    const rows = pendenciasFiltradas.map(p => {
      const ind = indigenas.find(i => i.id === p.indigenaId);
      return [
        `"${p.nome}"`, `"${ind?.nomeMae ?? ''}"`, `"${ind?.nomePai ?? ''}"`,
        `"${ind?.cns ?? ''}"`, `"${p.poloBase}"`, `"${p.aldeia}"`,
        `"${p.vacina}"`, `"${p.idade}"`, p.diasAtraso
      ].join(',');
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pendencias_vacinais.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Relatórios</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Relatórios de Vacinação</div>
          <div className="page-sub">Análise consolidada · DSEI-AM · Abril 2026</div>
        </div>
        <button className="btn btn-secondary btn-sm">
          <Download size={12} /> Exportar Excel
        </button>
      </div>

      <div className="tab-bar" style={{ marginBottom: '1.25rem' }}>
        <div className={`tab-item ${tab === 'cobertura' ? 'active' : ''}`} onClick={() => setTab('cobertura')}>
          Cobertura Vacinal
        </div>
        <div className={`tab-item ${tab === 'doses' ? 'active' : ''}`} onClick={() => setTab('doses')}>
          Doses por Polo
        </div>
        <div className={`tab-item ${tab === 'pendencias' ? 'active' : ''}`} onClick={() => setTab('pendencias')}>
          Pendências Nominais
        </div>
      </div>

      {/* ——— ABA 1: COBERTURA VACINAL ——— */}
      {tab === 'cobertura' && (
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label"><Filter size={10} style={{ display: 'inline', marginRight: 4 }} />Filtrar por Polo Base</label>
                <select className="select" value={filtroPoloCobertura} onChange={e => setFiltroPoloCobertura(e.target.value)}>
                  <option value="">Todos os Polos</option>
                  {polosBase.map(p => <option key={p.id} value={p.nome.replace('Polo Base ', '')}>{p.nome}</option>)}
                </select>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setFiltroPoloCobertura('')}>Limpar</button>
            </div>

            <div className="card-title" style={{ marginBottom: 8 }}>Cobertura Vacinal por Polo Base</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={coberturaFiltrada} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EFE8" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#888880' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `${v}%`} />
                <YAxis dataKey="polo" type="category" tick={{ fontSize: 10, fill: '#888880' }} tickLine={false} axisLine={false} width={100} />
                <Tooltip formatter={(val: any) => [`${val}%`, '']} contentStyle={{ fontSize: 11, borderRadius: 7, border: '0.5px solid #DDDDD5' }} />
                <Bar dataKey="meta" fill="#EEEEE8" radius={[0, 3, 3, 0]} barSize={16} name="Meta (95%)" />
                <Bar dataKey="cobertura" radius={[0, 3, 3, 0]} barSize={16} name="Cobertura">
                  {coberturaFiltrada.map((entry, i) => (
                    <Cell key={i} fill={entry.cobertura >= 80 ? '#639922' : entry.cobertura >= 70 ? '#BA7517' : '#E24B4A'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Polo Base</th>
                  <th>Cobertura</th>
                  <th>Meta</th>
                  <th>Status</th>
                  <th>Progresso</th>
                </tr>
              </thead>
              <tbody>
                {coberturaFiltrada.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>Polo Base {row.polo}</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{row.cobertura}%</td>
                    <td style={{ fontFamily: "'DM Mono', monospace", color: '#888880' }}>{row.meta}%</td>
                    <td>
                      {row.cobertura >= 80 ? (
                        <span className="badge badge-success"><span className="badge-dot" />Adequada</span>
                      ) : row.cobertura >= 70 ? (
                        <span className="badge badge-warning"><span className="badge-dot" />Atenção</span>
                      ) : (
                        <span className="badge badge-danger"><span className="badge-dot" />Crítica</span>
                      )}
                    </td>
                    <td style={{ width: 160 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-track" style={{ flex: 1 }}>
                          <div
                            className={`progress-bar ${row.cobertura >= 80 ? 'progress-bar-success' : row.cobertura >= 70 ? 'progress-bar-warning' : 'progress-bar-danger'}`}
                            style={{ width: `${(row.cobertura / row.meta) * 100}%` }}
                          />
                        </div>
                        <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: '#888880', flexShrink: 0 }}>
                          {Math.round((row.cobertura / row.meta) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ——— ABA 2: DOSES POR POLO ——— */}
      {tab === 'doses' && (
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-title" style={{ marginBottom: 8 }}>Doses Aplicadas por Polo Base</div>
            <div className="card-sub" style={{ marginBottom: '1rem' }}>Total acumulado no período</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dosesPorPolo} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EFE8" vertical={false} />
                <XAxis dataKey="polo" tick={{ fontSize: 9, fill: '#888880' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#888880' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 7, border: '0.5px solid #DDDDD5' }} />
                <Bar dataKey="doses" fill="#1A1916" radius={[3, 3, 0, 0]} barSize={32} name="Doses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Polo Base</th>
                  <th>Total de Doses</th>
                  <th>Indígenas Atendidos</th>
                  <th>Última Aplicação</th>
                </tr>
              </thead>
              <tbody>
                {dosesPorPolo.map((row, i) => {
                  const polo = polosBase[i];
                  const dosasNestePolo = dosesAplicadas.filter(d => {
                    const ind = indigenas.find(x => x.id === d.indigenaId);
                    return ind?.poloBaseId === polo.id;
                  });
                  const indigenasUnicos = new Set(dosasNestePolo.map(d => d.indigenaId)).size;
                  const ultima = dosasNestePolo.sort((a, b) => b.dataAplicacao.localeCompare(a.dataAplicacao))[0];

                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{polo.nome}</td>
                      <td style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{row.doses}</td>
                      <td style={{ fontFamily: "'DM Mono', monospace" }}>{indigenasUnicos}</td>
                      <td className="mono">{ultima ? formatDateBR(ultima.dataAplicacao) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ——— ABA 3: PENDÊNCIAS NOMINAIS ——— */}
      {tab === 'pendencias' && (
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label"><Filter size={10} style={{ display: 'inline', marginRight: 4 }} />Polo Base</label>
                <select className="select" value={filtroPolo} onChange={e => setFiltroPolo(e.target.value)}>
                  <option value="">Todos os Polos</option>
                  {polosBase.map(p => <option key={p.id} value={p.nome.replace('Polo Base ', '')}>{p.nome}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Vacina</label>
                <select className="select" value={filtroVacina} onChange={e => setFiltroVacina(e.target.value)}>
                  <option value="">Todas as Vacinas</option>
                  {vacinas.slice(0, 5).map(v => <option key={v.id} value={v.sigla}>{v.sigla} — {v.nome}</option>)}
                </select>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => { setFiltroPolo(''); setFiltroVacina(''); }}>
                Limpar
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleExportarPendencias}>
                <Download size={12} /> Exportar
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CNS</th>
                  <th>Polo Base</th>
                  <th>Aldeia</th>
                  <th>Vacina Pendente</th>
                  <th>Idade</th>
                  <th>Atraso</th>
                  <th>Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {pendenciasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#888880' }}>
                      Nenhuma pendência encontrada com os filtros aplicados.
                    </td>
                  </tr>
                ) : pendenciasFiltradas.map(p => {
                  const ind = indigenas.find(i => i.id === p.indigenaId);
                  return (
                    <tr key={p.id} title={`Mãe: ${ind?.nomeMae}${ind?.nomePai ? ` | Pai: ${ind.nomePai}` : ''}`}>
                      <td style={{ fontWeight: 500 }}>{formatNomeComMae(p.nome, ind?.nomeMae ?? '')}</td>
                      <td className="mono">{ind?.cns ?? '—'}</td>
                      <td style={{ fontSize: 11, color: '#888880' }}>{p.poloBase}</td>
                      <td style={{ fontSize: 11, color: '#888880' }}>{p.aldeia}</td>
                      <td>
                        <span className="badge badge-warning">
                          <span className="badge-dot" /> {p.vacina}
                        </span>
                      </td>
                      <td style={{ fontSize: 11 }}>{p.idade}</td>
                      <td>
                        <span style={{
                          fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500,
                          color: p.diasAtraso > 30 ? '#A32D2D' : p.diasAtraso > 14 ? '#854F0B' : '#444440',
                        }}>
                          {p.diasAtraso}d
                        </span>
                      </td>
                      <td>
                        {p.diasAtraso > 30 ? (
                          <span className="badge badge-danger"><span className="badge-dot" />Alta</span>
                        ) : p.diasAtraso > 14 ? (
                          <span className="badge badge-warning"><span className="badge-dot" />Média</span>
                        ) : (
                          <span className="badge badge-default"><span className="badge-dot" />Baixa</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 10, fontSize: 11, color: '#888880' }}>
            {pendenciasFiltradas.length} pendência(s) encontrada(s)
          </div>
        </div>
      )}
    </div>
  );
}
