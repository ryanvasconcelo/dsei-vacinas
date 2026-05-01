import React, { useState } from 'react';
import { db } from '../../services/mockDatabase';
import { indigenas } from '../../data/mockData';
import { SlideOver } from '../ui/SlideOver';
import { DataFilterPanel, type FilterConfig } from '../ui/DataFilterPanel';
import { useFilters } from '../../hooks/useFilters';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AldeiaTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void }) {
  const [lista, setLista] = useState(() => db.aldeias.list(true));
  const polos = db.polos.list(true);
  const { filters, setFilter, resetFilters } = useFilters({ 
    busca: '',
    poloBaseIds: [] as string[]
  });
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ nome: '', poloBaseId: '' });

  const filterConfig: FilterConfig<typeof filters>[] = [
    { key: 'busca', label: 'Nome da Aldeia', type: 'text', placeholder: 'Buscar aldeia...' },
    { key: 'poloBaseIds', label: 'Polo Base', type: 'multi-select', options: polos.map(p => ({ value: p.id, label: p.nome })) },
  ];

  const aldeiasFiltradas = lista.filter(a => {
    if (filters.busca && !a.nome.toLowerCase().includes(filters.busca.toLowerCase())) return false;
    if (filters.poloBaseIds.length > 0 && !filters.poloBaseIds.includes(a.poloBaseId)) return false;
    return true;
  });

  const getPatientCount = (aldeiaId: string) => {
    return indigenas.filter(i => i.aldeiaId === aldeiaId).length;
  };

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

    // Validar nome único no mesmo polo
    const exists = db.aldeias.list(true).some(a => 
      a.nome.toLowerCase() === form.nome.trim().toLowerCase() && 
      a.poloBaseId === form.poloBaseId &&
      a.id !== editingId
    );
    if (exists) {
      showToast('Já existe uma aldeia com este nome neste Polo Base.', 'error');
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
      const patientCount = getPatientCount(id);
      if (window.confirm(`${patientCount} pacientes vinculados — eles continuarão exibidos com esta aldeia, mas ela não aparecerá em novos cadastros. Continuar?`)) {
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
              <th>Nome da Aldeia</th>
              <th>Polo Base Vinculado</th>
              <th style={{ textAlign: 'center' }}>Pacientes</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aldeiasFiltradas.map(aldeia => {
              const polo = db.polos.get(aldeia.poloBaseId);
              return (
                <tr key={aldeia.id} style={{ opacity: aldeia.ativo ? 1 : 0.6 }}>
                  <td style={{ fontWeight: 500 }}>{aldeia.nome}</td>
                  <td style={{ fontSize: '0.875rem', color: '#555550' }}>{polo?.nome || 'Polo Desconhecido'}</td>
                  <td style={{ textAlign: 'center', fontSize: '0.875rem' }}>{getPatientCount(aldeia.id)}</td>
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
            {aldeiasFiltradas.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Nenhuma aldeia encontrada.</td></tr>
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
              {polos.filter(p => p.ativo).map(p => (
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
