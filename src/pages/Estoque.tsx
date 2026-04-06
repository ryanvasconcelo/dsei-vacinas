import { AlertTriangle, Package } from 'lucide-react';

const estoque = [
  { id: 'E001', vacina: 'BCG', sigla: 'BCG', lote: 'BCG240012', fabricante: 'Fund. Ataulpho de Paiva', poloBase: 'Polo Base Alto Solimões', validade: '2025-06-30', quantidade: 48, minimo: 20 },
  { id: 'E002', vacina: 'Hepatite B', sigla: 'HepB', lote: 'HEPB2400X', fabricante: 'Bio-Manguinhos', poloBase: 'Polo Base Alto Solimões', validade: '2025-12-31', quantidade: 120, minimo: 40 },
  { id: 'E003', vacina: 'Pentavalente', sigla: 'Penta', lote: 'PENTA210034', fabricante: 'Bio-Manguinhos', poloBase: 'Polo Base Médio Solimões', validade: '2025-08-31', quantidade: 75, minimo: 30 },
  { id: 'E004', vacina: 'Febre Amarela', sigla: 'FA', lote: 'FA190045', fabricante: 'Bio-Manguinhos', poloBase: 'Polo Base Vale do Javari', validade: '2025-04-15', quantidade: 22, minimo: 50 },
  { id: 'E005', vacina: 'Pneumocócica 10V', sigla: 'PCV10', lote: 'PCV240056', fabricante: 'GSK', poloBase: 'Polo Base Purus', validade: '2026-03-31', quantidade: 60, minimo: 25 },
  { id: 'E006', vacina: 'HPV Quadrivalente', sigla: 'HPV4', lote: 'HPV240078', fabricante: 'MSD', poloBase: 'Polo Base Rio Negro', validade: '2026-06-30', quantidade: 30, minimo: 15 },
  { id: 'E007', vacina: 'dT (Dupla adulto)', sigla: 'dT', lote: 'DT240012', fabricante: 'Bio-Manguinhos', poloBase: 'Polo Base Alto Solimões', validade: '2026-01-31', quantidade: 14, minimo: 20 },
  { id: 'E008', vacina: 'VIP (Poliomielite)', sigla: 'VIP', lote: 'VIP190023', fabricante: 'Bio-Manguinhos', poloBase: 'Polo Base Médio Solimões', validade: '2026-03-31', quantidade: 88, minimo: 30 },
  { id: 'E009', vacina: 'Tríplice Viral (SCR)', sigla: 'SCR', lote: 'SCR240034', fabricante: 'Bio-Manguinhos', poloBase: 'Polo Base Purus', validade: '2025-05-12', quantidade: 35, minimo: 25 },
  { id: 'E010', vacina: 'Meningocócica C', sigla: 'MnC', lote: 'MNC240089', fabricante: 'Novartis', poloBase: 'Polo Base Rio Negro', validade: '2026-09-30', quantidade: 50, minimo: 20 },
];

function diasParaVencer(dataValidade: string): number {
  const hoje = new Date();
  const val = new Date(dataValidade);
  return Math.ceil((val.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Estoque() {
  const criticos = estoque.filter(e => diasParaVencer(e.validade) <= 30 || e.quantidade < e.minimo);

  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Estoque</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Gestão de Estoque</div>
          <div className="page-sub">Controle de lotes por Polo Base · Desconto automático ao registrar doses</div>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="metric-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="metric-card">
          <div className="metric-label">Total de Lotes</div>
          <div className="metric-value">{estoque.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Lotes Críticos</div>
          <div className="metric-value" style={{ color: criticos.length > 0 ? '#A32D2D' : '#639922' }}>{criticos.length}</div>
          <div className="metric-delta-neg">{criticos.length > 0 ? 'Ação necessária' : ''}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total de Doses</div>
          <div className="metric-value">{estoque.reduce((s, e) => s + e.quantidade, 0)}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Polos Abastecidos</div>
          <div className="metric-value">{new Set(estoque.map(e => e.poloBase)).size}</div>
        </div>
      </div>

      {/* ALERTAS CRÍTICOS */}
      {criticos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.25rem' }}>
          {criticos.map(e => {
            const dias = diasParaVencer(e.validade);
            const baixoEstoque = e.quantidade < e.minimo;
            return (
              <div key={e.id} className={`alert ${dias <= 30 ? 'alert-err' : 'alert-warn'}`}>
                <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong>{e.vacina} ({e.sigla})</strong> · Lote {e.lote} · {e.poloBase}
                  {dias <= 30 && <span> — <strong>vence em {dias} dias</strong> ({e.validade})</span>}
                  {baixoEstoque && <span> — <strong>estoque abaixo do mínimo</strong> ({e.quantidade}/{e.minimo} doses)</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Vacina</th>
              <th>Lote</th>
              <th>Fabricante</th>
              <th>Polo Base</th>
              <th>Validade</th>
              <th>Qtde</th>
              <th>Estoque</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map(e => {
              const dias = diasParaVencer(e.validade);
              const pct = Math.min(100, Math.round((e.quantidade / (e.minimo * 3)) * 100));
              const vencendo = dias <= 30;
              const baixo = e.quantidade < e.minimo;

              return (
                <tr key={e.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{e.vacina}</div>
                    <div style={{ fontSize: 10, color: '#888880', fontFamily: "'DM Mono', monospace" }}>{e.sigla}</div>
                  </td>
                  <td className="mono">{e.lote}</td>
                  <td style={{ fontSize: 11, color: '#888880' }}>{e.fabricante}</td>
                  <td style={{ fontSize: 11, color: '#888880' }}>{e.poloBase.replace('Polo Base ', '')}</td>
                  <td>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 11,
                      color: vencendo ? '#A32D2D' : '#444440',
                      fontWeight: vencendo ? 500 : 400,
                    }}>
                      {e.validade}
                    </span>
                    {vencendo && (
                      <div style={{ fontSize: 9, color: '#A32D2D', marginTop: 1 }}>
                        {dias}d restantes
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontWeight: 500,
                      color: baixo ? '#A32D2D' : '#1A1916',
                    }}>
                      {e.quantidade}
                    </span>
                    <span style={{ fontSize: 10, color: '#888880' }}> / {e.minimo} mín.</span>
                  </td>
                  <td style={{ width: 120 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="progress-track" style={{ flex: 1 }}>
                        <div
                          className={`progress-bar ${pct < 35 ? 'progress-bar-danger' : pct < 65 ? 'progress-bar-warning' : 'progress-bar-success'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: '#888880' }}>{pct}%</span>
                    </div>
                  </td>
                  <td>
                    {vencendo ? (
                      <span className="badge badge-danger"><span className="badge-dot" />Vencendo</span>
                    ) : baixo ? (
                      <span className="badge badge-warning"><span className="badge-dot" />Baixo Estoque</span>
                    ) : (
                      <span className="badge badge-success"><span className="badge-dot" />Normal</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
