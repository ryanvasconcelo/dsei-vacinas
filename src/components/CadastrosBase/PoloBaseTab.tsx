import React, { useState } from 'react';
import { db } from '../../services/mockDatabase';
import { SlideOver } from '../ui/SlideOver';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function PoloBaseTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void }) {
  const [lista, setLista] = useState(() => db.polos.list(true));
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ nome: '', municipio: '' });

  const handleOpenNew = () => {
    setEditingId(null);
    setForm({ nome: '', municipio: '' });
    setIsSlideOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    const polo = db.polos.get(id);
    if (polo) {
      setEditingId(id);
      setForm({ nome: polo.nome, municipio: polo.municipio || '' });
      setIsSlideOpen(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nome.trim().length < 3 || form.municipio.trim().length < 3) {
      showToast('Nome e município devem ter pelo menos 3 caracteres.', 'error');
      return;
    }
    if (editingId) {
      db.polos.update(editingId, { nome: form.nome.trim(), municipio: form.municipio.trim() });
      showToast('Polo Base atualizado com sucesso.', 'success');
    } else {
      db.polos.add({ nome: form.nome.trim(), municipio: form.municipio.trim() });
      showToast('Polo Base criado com sucesso.', 'success');
    }
    setLista(db.polos.list(true));
    setIsSlideOpen(false);
  };

  const handleToggleActive = (id: string, ativo: boolean) => {
    if (ativo) {
      if (window.confirm('Desativar este Polo Base também desativará todas as suas Aldeias em cascata. Deseja continuar?')) {
        db.polos.softDelete(id);
        setLista(db.polos.list(true));
        showToast('Polo Base e aldeias vinculadas desativadas.', 'default');
      }
    } else {
      db.polos.update(id, { ativo: true });
      setLista(db.polos.list(true));
      showToast('Polo Base reativado. (Aldeias continuam inativas)', 'success');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1A1916' }}>Gestão de Polos Base</h3>
          <p style={{ fontSize: '0.875rem', color: '#888880' }}>Polos de referência de saúde indígena</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenNew}>
          <Plus size={14} /> Novo Polo Base
        </button>
      </div>

      <div className="table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Nome do Polo Base</th>
              <th>Município SEDE</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map(polo => (
              <tr key={polo.id} style={{ opacity: polo.ativo ? 1 : 0.6 }}>
                <td style={{ fontWeight: 500 }}>{polo.nome}</td>
                <td>{polo.municipio}</td>
                <td>
                  {polo.ativo ? (
                    <span className="badge badge-success"><span className="badge-dot" />Ativo</span>
                  ) : (
                    <span className="badge badge-default"><span className="badge-dot" />Desativado</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleOpenEdit(polo.id)} title="Editar">
                    <Edit2 size={14} />
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm" 
                    onClick={() => handleToggleActive(polo.id, polo.ativo)}
                    title={polo.ativo ? "Desativar" : "Reativar"}
                    style={{ color: polo.ativo ? '#E24B4A' : '#10b981' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {lista.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum polo base encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOpen} onClose={() => setIsSlideOpen(false)} title={editingId ? 'Editar Polo Base' : 'Novo Polo Base'}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <div className="form-group">
            <label className="form-label">Nome do Polo Base</label>
            <input 
              className="input" 
              placeholder="Ex: Polo Base Alto Solimões" 
              value={form.nome} 
              onChange={e => setForm({ ...form, nome: e.target.value })} 
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Município SEDE</label>
            <input 
              className="input" 
              placeholder="Ex: Tabatinga" 
              value={form.municipio} 
              onChange={e => setForm({ ...form, municipio: e.target.value })} 
            />
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsSlideOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar Polo</button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
