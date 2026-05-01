import React, { useState } from 'react';
import { db } from '../../services/mockDatabase';
import { indigenas } from '../../data/mockData';
import { SlideOver } from '../ui/SlideOver';
import { DataFilterPanel, type FilterConfig } from '../ui/DataFilterPanel';
import { useFilters } from '../../hooks/useFilters';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function EtniaTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error' | 'default') => void }) {
  const [lista, setLista] = useState(() => db.etnias.list(true));
  const { filters, setFilter, resetFilters } = useFilters({ busca: '' });
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nome, setNome] = useState('');

  const filterConfig: FilterConfig<typeof filters>[] = [
    { key: 'busca', label: 'Nome da Etnia', type: 'text', placeholder: 'Buscar etnia...' },
  ];

  const etniasFiltradas = lista.filter(e => 
    e.nome.toLowerCase().includes(filters.busca.toLowerCase())
  );

  const getPatientCount = (etniaNome: string) => {
    return indigenas.filter(i => i.etnia === etniaNome).length;
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setNome('');
    setIsSlideOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    const etnia = db.etnias.get(id);
    if (etnia) {
      setEditingId(id);
      setNome(etnia.nome);
      setIsSlideOpen(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim().length < 3) {
      showToast('O nome deve ter pelo menos 3 caracteres.', 'error');
      return;
    }
    
    // Validar nome único
    const exists = db.etnias.list(true).some(et => 
      et.nome.toLowerCase() === nome.trim().toLowerCase() && et.id !== editingId
    );
    if (exists) {
      showToast('Já existe uma etnia com este nome.', 'error');
      return;
    }

    if (editingId) {
      db.etnias.update(editingId, { nome: nome.trim() });
      showToast('Etnia atualizada com sucesso.', 'success');
    } else {
      db.etnias.add({ nome: nome.trim() });
      showToast('Etnia criada com sucesso.', 'success');
    }
    setLista(db.etnias.list(true));
    setIsSlideOpen(false);
  };

  const handleToggleActive = (id: string, ativo: boolean) => {
    const etnia = db.etnias.get(id);
    if (!etnia) return;

    if (ativo) {
      const count = getPatientCount(etnia.nome);
      if (window.confirm(`${count} pacientes vinculados — eles continuarão exibidos com esta etnia, mas ela não aparecerá em novos cadastros. Desativar?`)) {
        db.etnias.softDelete(id);
        setLista(db.etnias.list(true));
        showToast('Etnia desativada.', 'default');
      }
    } else {
      db.etnias.update(id, { ativo: true });
      setLista(db.etnias.list(true));
      showToast('Etnia reativada.', 'success');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1A1916' }}>Gestão de Etnias</h3>
          <p style={{ fontSize: '0.875rem', color: '#888880' }}>Gerencie as etnias disponíveis para cadastro</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenNew}>
          <Plus size={14} /> Nova Etnia
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
              <th>Nome da Etnia</th>
              <th style={{ textAlign: 'center' }}>Pacientes</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {etniasFiltradas.map(etnia => (
              <tr key={etnia.id} style={{ opacity: etnia.ativo ? 1 : 0.6 }}>
                <td style={{ fontWeight: 500 }}>{etnia.nome}</td>
                <td style={{ textAlign: 'center', fontSize: '0.875rem' }}>{getPatientCount(etnia.nome)}</td>
                <td>
                  {etnia.ativo ? (
                    <span className="badge badge-success"><span className="badge-dot" />Ativo</span>
                  ) : (
                    <span className="badge badge-default"><span className="badge-dot" />Desativado</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleOpenEdit(etnia.id)} title="Editar">
                    <Edit2 size={14} />
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm" 
                    onClick={() => handleToggleActive(etnia.id, etnia.ativo)}
                    title={etnia.ativo ? "Desativar" : "Reativar"}
                    style={{ color: etnia.ativo ? '#E24B4A' : '#10b981' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {etniasFiltradas.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Nenhuma etnia encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <SlideOver isOpen={isSlideOpen} onClose={() => setIsSlideOpen(false)} title={editingId ? 'Editar Etnia' : 'Nova Etnia'}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <div className="form-group">
            <label className="form-label">Nome da Etnia</label>
            <input 
              className="input" 
              placeholder="Ex: Tikuna" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              autoFocus
            />
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsSlideOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar Etnia</button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
