import React, { useState, useRef, useEffect } from 'react';
import { Search, FilterX, ChevronDown, Check } from 'lucide-react';

export type FilterConfig<T> = {
  key: keyof T;
  label: string;
  type: 'text' | 'select' | 'multi-select' | 'boolean' | 'date-range';
  options?: { value: string; label: string }[];
  placeholder?: string;
};

interface DataFilterPanelProps<T> {
  filters: T;
  config: FilterConfig<T>[];
  onFilterChange: (key: keyof T, value: any) => void;
  onClear: () => void;
}

function MultiSelect({ 
  label, 
  options, 
  selected, 
  onChange 
}: { 
  label: string; 
  options: {value: string, label: string}[]; 
  selected: string[]; 
  onChange: (val: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleOption = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter(v => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative', flex: '1 1 160px', minWidth: 160 }}>
      <button 
        type="button"
        className="input" 
        onClick={() => setOpen(!open)}
        style={{ height: '38px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', cursor: 'pointer', color: selected.length ? '#1A1916' : '#888880' }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected.length === 0 ? label : `${label} (${selected.length})`}
        </span>
        <ChevronDown size={14} />
      </button>
      
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, zIndex: 50,
          background: '#fff', border: '0.5px solid #DDDDD5', borderRadius: 7,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: 250, overflowY: 'auto'
        }}>
          {options.map(opt => (
            <div 
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              style={{
                padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
                cursor: 'pointer', fontSize: 12, borderBottom: '0.5px solid #F0EFE8',
                background: selected.includes(opt.value) ? '#FAFAF5' : '#fff'
              }}
            >
              <div style={{ 
                width: 14, height: 14, border: '1px solid #DDDDD5', borderRadius: 3, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: selected.includes(opt.value) ? '#1A1916' : '#fff',
                borderColor: selected.includes(opt.value) ? '#1A1916' : '#DDDDD5'
              }}>
                {selected.includes(opt.value) && <Check size={10} color="#fff" />}
              </div>
              {opt.label}
            </div>
          ))}
          {options.length === 0 && (
            <div style={{ padding: '8px 12px', fontSize: 12, color: '#888880' }}>Nenhuma opção</div>
          )}
        </div>
      )}
    </div>
  );
}

export function DataFilterPanel<T extends Record<string, any>>({ 
  filters, 
  config, 
  onFilterChange, 
  onClear 
}: DataFilterPanelProps<T>) {

  // Calcula o número de filtros ativos
  const activeCount = Object.entries(filters).reduce((acc, [key, val]) => {
    // Ignorar busca livre no count se preferir, ou incluir
    if (val === true) return acc + 1;
    if (typeof val === 'string' && val.trim() !== '') return acc + 1;
    if (Array.isArray(val) && val.length > 0) return acc + 1;
    if (typeof val === 'object' && val !== null && (val.start || val.end)) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        {config.map(field => {
          if (field.type === 'text') {
            return (
              <div key={String(field.key)} style={{ flex: '1 1 200px', minWidth: 200 }}>
                <div className="search-wrap" style={{ margin: 0 }}>
                  <Search size={14} className="search-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder={field.placeholder || `Buscar ${field.label}...`}
                    value={(filters[field.key] as string) || ''}
                    onChange={e => onFilterChange(field.key, e.target.value)}
                  />
                </div>
              </div>
            );
          }
          
          if (field.type === 'select') {
            return (
              <div key={String(field.key)} style={{ flex: '1 1 150px', minWidth: 150 }}>
                <select 
                  className="select" 
                  value={(filters[field.key] as string) || ''} 
                  onChange={e => onFilterChange(field.key, e.target.value)}
                  style={{ height: '38px', padding: '0 12px' }}
                >
                  <option value="">{field.placeholder || field.label}</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === 'multi-select') {
            const selectedArr = Array.isArray(filters[field.key]) ? filters[field.key] : [];
            return (
              <MultiSelect 
                key={String(field.key)}
                label={field.placeholder || field.label}
                options={field.options || []}
                selected={selectedArr}
                onChange={val => onFilterChange(field.key, val)}
              />
            );
          }

          if (field.type === 'boolean') {
            return (
              <div key={String(field.key)} style={{ display: 'flex', alignItems: 'center', height: '38px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#1A1916' }}>
                  <input 
                    type="checkbox" 
                    checked={!!filters[field.key]} 
                    onChange={e => onFilterChange(field.key, e.target.checked)}
                    style={{ width: 14, height: 14, accentColor: '#1A1916' }}
                  />
                  {field.label}
                </label>
              </div>
            );
          }

          if (field.type === 'date-range') {
            const range = (filters[field.key] || { start: '', end: '' }) as { start: string, end: string };
            return (
              <div key={String(field.key)} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 240px', minWidth: 240 }}>
                <input 
                  type="date" 
                  className="input" 
                  value={range.start} 
                  onChange={e => onFilterChange(field.key, { ...range, start: e.target.value })}
                  style={{ height: '38px' }}
                />
                <span style={{ color: '#888880', fontSize: 12 }}>até</span>
                <input 
                  type="date" 
                  className="input" 
                  value={range.end} 
                  onChange={e => onFilterChange(field.key, { ...range, end: e.target.value })}
                  style={{ height: '38px' }}
                />
              </div>
            )
          }

          return null;
        })}
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          {activeCount > 0 && (
            <div style={{ fontSize: 11, fontWeight: 500, color: '#1A1916', background: '#F0EFE8', padding: '4px 8px', borderRadius: 12 }}>
              {activeCount} ativo{activeCount > 1 ? 's' : ''}
            </div>
          )}
          <button 
            className="btn btn-ghost" 
            onClick={onClear} 
            style={{ height: '38px', color: '#888880' }}
          >
            <FilterX size={14} /> Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
