import React, { useState } from 'react';
import { db } from '../../services/mockDatabase';
import { SlideOver } from '../ui/SlideOver';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AldeiaTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void }) {
  const [lista, setLista] = useState(() => db.aldeias.list(true));
  const polosAtivos = db.polos.list(); // Only active polos for creation
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ nome: '', poloBaseId: '' });

  const handleOpenNew = () => {
    setEditingId(null);
    setForm({ nome: '', poloBaseId: '' });
    setIsSlideOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    const aldeia = db.aldeias.get(id);
    if (aldeia) {
      setEditingId(id);
      setForm({ nome: aldeia.nome, poloBaseId: aldeia.poloBaseId });
      setIsSlideOpen(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nome.trim().length < 3) {
      showToast('Nome da aldeia deve ter pelo menos 3 caracteres.', 'error');
      return;
    }
    if (!form.poloBaseId) {
      showToast('Selecione um Polo Base.', 'error');
      return;
    }
    if (editingId) {
      db.aldeias.update(editingId, { nome: form.nome.trim(), poloBaseId: form.poloBaseId });
      showToast('Aldeia atualizada com sucesso.', 'success');
    } else {
      db.aldeias.add({ nome: form.nome.trim(), poloBaseId: form.poloBaseId });
      showToast('Aldeia criada com sucesso.', 'success');
    }
    setLista(db.aldeias.list(true));
    setIsSlideOpen(false);
  };

  const handleToggleActive = (id: string, ativo: boolean) => {
    if (ativo) {
      if (window.confirm('Desativar esta aldeia a ocultará dos novos cadastros. Continuar?')) {
        db.aldeias.softDelete(id);
        setLista(db.aldeias.list(true));
        showToast('Aldeia desativada.', 'default');
      }
    } else {
      db.aldeias.update(id, { ativo: true });
      setLista(db.aldeias.list(true));
      showToast('Aldeia reativada.', 'success');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1A1916' }}>Gestão de Aldeias</h3>
          <p style={{ fontSize: '0.875rem', color: '#888880' }}>Cadastre as aldeias e vincule aos Polos Base</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenNew}>
          <Plus size={14} /> Nova Aldeia
        </button>
      </div>

      <div className="table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Nome da Aldeia</th>
              <th>Polo Base Vinculado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map(aldeia => {
              const polo = db.polos.get(aldeia.poloBaseId);
              return (
                <tr key={aldeia.id} style={{ opacity: aldeia.ativo ? 1 : 0.6 }}>
                  <td style={{ fontWeight: 500 }}>{aldeia.nome}</td>
                  <td style={{ fontSize: '0.875rem', color: '#555550' }}>{polo?.nome || 'Polo Desconhecido'}</td>
                  <td>
                    {aldeia.ativo ? (
                      <span className="badge badge-success"><span className="badge-dot" />Ativo</span>
                    ) : (
                      <span className="badge badge-default"><span className="badge-dot" />Desativado</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleOpenEdit(aldeia.id)} title="Editar">
                      <Edit2 size={14} />
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm" 
                      onClick={() => handleToggleActive(aldeia.id, aldeia.ativo)}
                      title={aldeia.ativo ? "Desativar" : "Reativar"}
                      style={{ color: aldeia.ativo ? '#E24B4A' : '#10b981' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {lista.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Nenhuma aldeia encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOpen} onClose={() => setIsSlideOpen(false)} title={editingId ? 'Editar Aldeia' : 'Nova Aldeia'}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <div className="form-group">
            <label className="form-label">Nome da Aldeia</label>
            <input 
              className="input" 
              placeholder="Ex: Aldeia Umariaçu I" 
              value={form.nome} 
              onChange={e => setForm({ ...form, nome: e.target.value })} 
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Polo Base</label>
            <select 
              className="select" 
              value={form.poloBaseId} 
              onChange={e => setForm({ ...form, poloBaseId: e.target.value })}
            >
              <option value="">Selecione o Polo Base...</option>
              {polosAtivos.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsSlideOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar Aldeia</button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
