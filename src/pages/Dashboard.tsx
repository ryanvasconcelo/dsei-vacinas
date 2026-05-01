import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Syringe, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';
import { indigenas, dosesAplicadas, coberturaData, dosesPorFaixaEtaria, pendenciasVacinais } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { formatNomeComMae } from '../utils/formatters';

const totalIndigenas = indigenas.length;
const dosesNoMes = dosesAplicadas.filter(d => {
  const data = new Date(d.dataAplicacao);
  const now = new Date();
  return data.getMonth() === now.getMonth() && data.getFullYear() === now.getFullYear();
}).length;
const coberturaMedia = Math.round(coberturaData.reduce((s, d) => s + d.cobertura, 0) / coberturaData.length);
const pendencias = pendenciasVacinais.length;

function MetricCard({ label, value, delta, icon, negative }: {
  label: string; value: string | number;
  delta?: string; icon: React.ReactNode; negative?: boolean;
}) {
  return (
    <div className="metric-card" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="metric-label">{label}</div>
        <div style={{ opacity: 0.4 }}>{icon}</div>
      </div>
      <div className="metric-value">{value}</div>
      {delta && <div className={negative ? 'metric-delta-neg' : 'metric-delta'}>{delta}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#fff', border: '0.5px solid #DDDDD5',
        borderRadius: 7, padding: '8px 12px', fontSize: 11,
      }}>
        <div style={{ fontWeight: 500, color: '#1A1916', marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.name === 'cobertura' ? '#1A1916' : '#C0C0B8', marginTop: 2 }}>
            {p.name === 'cobertura' ? `Cobertura: ${p.value}%` : `Meta: ${p.value}%`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bc">
        <span>DSEI-AM</span>
        <span className="bc-sep">›</span>
        <span className="bc-cur">Dashboard</span>
      </div>

      <div className="page-header">
        <div>
          <div className="page-title">Painel da Coordenação</div>
          <div className="page-sub">Visão geral do calendário vacinal · Abril 2026</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/vacinacao')}>
          <Syringe size={13} />
          Registrar Dose
        </button>
      </div>

      {/* MÉTRICAS */}
      <div className="metric-grid">
        <MetricCard
          label="Indígenas cadastrados"
          value={totalIndigenas}
          delta="+2 este mês"
          icon={<Users size={16} />}
        />
        <MetricCard
          label="Doses aplicadas (mês)"
          value={dosesNoMes || 8}
          delta="+3 vs. mês anterior"
          icon={<Syringe size={16} />}
        />
        <MetricCard
          label="Cobertura vacinal média"
          value={`${coberturaMedia}%`}
          delta="Meta: 95%"
          icon={<TrendingUp size={16} />}
        />
        <MetricCard
          label="Pendências vacinais"
          value={pendencias}
          delta="Atenção necessária"
          icon={<AlertCircle size={16} />}
          negative
        />
      </div>

      {/* GRÁFICOS */}
      <div className="grid-2" style={{ marginBottom: '1.5rem', gap: 14 }}>
        {/* COBERTURA POR POLO */}
        <div className="card">
          <div className="card-title">Cobertura por Polo Base</div>
          <div className="card-sub" style={{ marginBottom: '1rem' }}>Esquema vacinal completo · %</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coberturaData} layout="vertical" margin={{ left: -10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFE8" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#888880' }} tickLine={false} axisLine={false} />
              <YAxis dataKey="polo" type="category" tick={{ fontSize: 10, fill: '#888880' }} tickLine={false} axisLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="meta" fill="#F0EFE8" radius={[0, 3, 3, 0]} barSize={14} name="meta" />
              <Bar dataKey="cobertura" radius={[0, 3, 3, 0]} barSize={14} name="cobertura">
                {coberturaData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.cobertura >= 80 ? '#639922' : entry.cobertura >= 70 ? '#BA7517' : '#E24B4A'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {[['#639922', '≥80%'], ['#BA7517', '70-79%'], ['#E24B4A', '<70%']].map(([color, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#888880' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* DOSES POR FAIXA ETÁRIA */}
        <div className="card">
          <div className="card-title">Doses por Faixa Etária</div>
          <div className="card-sub" style={{ marginBottom: '1rem' }}>Total acumulado · Ano 2026</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dosesPorFaixaEtaria} margin={{ left: -20, right: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFE8" vertical={false} />
              <XAxis dataKey="faixa" tick={{ fontSize: 9, fill: '#888880' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#888880' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 7, border: '0.5px solid #DDDDD5' }}
                labelStyle={{ fontWeight: 500, marginBottom: 4 }}
              />
              <Bar dataKey="doses" fill="#1A1916" radius={[3, 3, 0, 0]} barSize={28} name="Doses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PENDÊNCIAS VACINAIS */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
          <div>
            <div className="card-title">Pendências Vacinais</div>
            <div className="card-sub">Indígenas com doses em atraso — prioridade de atendimento</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => {}}>
            Ver todos <ChevronRight size={12} />
          </button>
        </div>

        <div className="alert alert-warn" style={{ marginBottom: '0.9rem' }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <strong>{pendencias} indígenas</strong> com esquema vacinal incompleto ou em atraso. Priorizar crianças menores de 1 ano.
          </div>
        </div>

        <div className="table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Polo Base</th>
                <th>Aldeia</th>
                <th>Vacina Pendente</th>
                <th>Idade</th>
                <th>Atraso</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pendenciasVacinais.map(p => {
                const ind = indigenas.find(i => i.id === p.indigenaId);
                const nomeExibicao = ind ? formatNomeComMae(p.nome, ind.nomeMae) : p.nome;
                const tooltipText = ind ? `Mãe: ${ind.nomeMae}${ind.nomePai ? ` | Pai: ${ind.nomePai}` : ''}` : '';
                return (
                <tr key={p.id} title={tooltipText}>
                  <td style={{ fontWeight: 500 }}>{nomeExibicao}</td>
                  <td style={{ color: '#888880', fontSize: 11 }}>{p.poloBase}</td>
                  <td style={{ color: '#888880', fontSize: 11 }}>{p.aldeia}</td>
                  <td>
                    <span className="badge badge-warning">
                      <span className="badge-dot" />
                      {p.vacina}
                    </span>
                  </td>
                  <td style={{ color: '#888880', fontSize: 11 }}>{p.idade}</td>
                  <td>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: p.diasAtraso > 30 ? '#A32D2D' : p.diasAtraso > 14 ? '#854F0B' : '#444440',
                      fontWeight: 500,
                    }}>
                      {p.diasAtraso}d
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {}}
                    >
                      Registrar
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
