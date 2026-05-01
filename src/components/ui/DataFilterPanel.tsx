import React from 'react';
import { Search, FilterX } from 'lucide-react';

export type FilterConfig<T> = {
  key: keyof T;
  label: string;
  type: 'text' | 'select' | 'boolean';
  options?: { value: string; label: string }[];
  placeholder?: string;
};

interface DataFilterPanelProps<T> {
  filters: T;
  config: FilterConfig<T>[];
  onFilterChange: (key: keyof T, value: any) => void;
  onClear: () => void;
}

export function DataFilterPanel<T extends Record<string, any>>({ 
  filters, 
  config, 
  onFilterChange, 
  onClear 
}: DataFilterPanelProps<T>) {
  return (
    <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
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

          return null;
        })}
        
        <button 
          className="btn btn-ghost" 
          onClick={onClear} 
          style={{ height: '38px', marginLeft: 'auto', color: '#888880' }}
        >
          <FilterX size={14} /> Limpar
        </button>
      </div>
    </div>
  );
}
