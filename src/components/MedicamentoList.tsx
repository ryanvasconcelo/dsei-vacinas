import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Medicamento } from '../data/mockData';

const quadro11 = [
  'Prednisona', 'Metotrexato', 'Rituximabe', 'Adalimumabe', 'Infliximabe', 'Ciclosporina'
];

type Props = {
  medicamentos: Medicamento[];
  onChange: (meds: Medicamento[]) => void;
};

export default function MedicamentoList({ medicamentos, onChange }: Props) {
  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [frequencia, setFrequencia] = useState('');

  const handleAdd = () => {
    if (!nome.trim()) return;
    const novo: Medicamento = {
      id: `MED${Date.now()}`,
      nome: nome.trim(),
      dosagem: dosagem.trim(),
      frequencia: frequencia.trim()
    };
    onChange([...medicamentos, novo]);
    setNome(''); setDosagem(''); setFrequencia('');
  };

  const handleRemove = (id: string) => {
    onChange(medicamentos.filter(m => m.id !== id));
  };

  return (
    <div style={{ background: '#FAFAF5', padding: '1rem', borderRadius: 7, border: '0.5px solid #EAEAE0' }}>
      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12, color: '#1A1916' }}>Medicamentos em Uso</div>
      
      {medicamentos.length > 0 && (
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {medicamentos.map(m => (
            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '8px 12px', borderRadius: 5, border: '0.5px solid #F0EFE8' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#1A1916' }}>{m.nome}</div>
                <div style={{ fontSize: 10, color: '#888880' }}>{m.dosagem} {m.frequencia ? `· ${m.frequencia}` : ''}</div>
              </div>
              <button type="button" onClick={() => handleRemove(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E24B4A' }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 8, alignItems: 'end' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: 10 }}>Nome (Autocompletar)</label>
          <input className="input" list="meds-list" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Prednisona" style={{ height: 32, fontSize: 12 }} />
          <datalist id="meds-list">
            {quadro11.map(m => <option key={m} value={m} />)}
          </datalist>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: 10 }}>Dosagem</label>
          <input className="input" value={dosagem} onChange={e => setDosagem(e.target.value)} placeholder="Ex: 20mg" style={{ height: 32, fontSize: 12 }} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: 10 }}>Frequência</label>
          <input className="input" value={frequencia} onChange={e => setFrequencia(e.target.value)} placeholder="Ex: 12/12h" style={{ height: 32, fontSize: 12 }} />
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleAdd} style={{ height: 32, padding: '0 12px', background: '#E8E8E0' }}>
          <Plus size={14} /> Adicionar
        </button>
      </div>
    </div>
  );
}
