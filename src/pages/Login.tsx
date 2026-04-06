import { useState } from 'react';
import { Activity, Shield } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (usuario && senha) {
        onLogin();
      } else {
        setErro('Preencha usuário e senha para continuar.');
      }
    }, 800);
  };

  return (
    <div className="login-page">
      {/* PAINEL ESQUERDO */}
      <div className="login-left">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#2A2926',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Activity size={16} color="#888880" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#F7F6F2', letterSpacing: '0.05em' }}>SisVac</div>
              <div style={{ fontSize: 9, color: '#555550', letterSpacing: '0.08em' }}>DSEI-AM</div>
            </div>
          </div>

          <div style={{ fontSize: 26, fontWeight: 300, color: '#F7F6F2', lineHeight: 1.2, fontStyle: 'italic', marginBottom: 12 }}>
            Gestão vacinal<br />sem planilhas.
          </div>
          <div style={{ fontSize: 12, color: '#555550', lineHeight: 1.7, maxWidth: 280 }}>
            Sistema integrado de registro e monitoramento do calendário vacinal para populações indígenas do Amazonas.
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Hierarquia DSEI-AM → Polo Base → Aldeia',
              'Identificação por CNS (Cartão Nacional de Saúde)',
              'Relatórios de cobertura por faixa etária',
              'Controle de estoque de lotes por polo',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 11, color: '#555550', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#555550', marginTop: 5, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Shield size={11} color="#3A3936" />
          <span style={{ fontSize: 10, color: '#3A3936' }}>
            Ministério da Saúde — SESAI · Uso exclusivo DSEI-AM
          </span>
        </div>
      </div>

      {/* PAINEL DIREITO */}
      <div className="login-right">
        <div className="login-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#F7F6F2', marginBottom: 3 }}>
              Acessar o sistema
            </div>
            <div style={{ fontSize: 11, color: '#555550' }}>
              Insira suas credenciais institucionais
            </div>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-group">
              <label className="login-label">Usuário</label>
              <input
                className="login-input"
                type="text"
                placeholder="ex: vivian.lima"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="login-label">Senha</label>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
            </div>

            {erro && (
              <div style={{
                fontSize: 11, color: '#E24B4A',
                background: 'rgba(226,75,74,0.08)',
                border: '0.5px solid rgba(226,75,74,0.2)',
                borderRadius: 5, padding: '7px 10px',
              }}>
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, fontWeight: 500,
                padding: '9px 16px',
                background: loading ? '#2A2926' : '#F7F6F2',
                color: '#1A1916',
                border: 'none', borderRadius: 5, cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%', transition: 'all 0.15s',
                marginTop: 4,
              }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '0.9rem', background: '#111110', borderRadius: 7, border: '0.5px solid #2A2926' }}>
            <div style={{ fontSize: 10, color: '#555550', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
              Demo — qualquer usuário/senha
            </div>
            <div style={{ fontSize: 11, color: '#888880', lineHeight: 1.5 }}>
              Ex: <span style={{ color: '#C8C8C0', fontFamily: "'DM Mono', monospace" }}>vivian.lima</span> /{' '}
              <span style={{ color: '#C8C8C0', fontFamily: "'DM Mono', monospace" }}>sesai2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
