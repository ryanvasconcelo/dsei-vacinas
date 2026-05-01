import { useState } from 'react';
import { X } from 'lucide-react';

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

export default function TagInput({ tags, onChange, placeholder }: TagInputProps) {
  const [val, setVal] = useState('');
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = val.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setVal('');
    }
  };

  const removeTag = (tag: string) => onChange(tags.filter(t => t !== tag));

  return (
    <div style={{ border: '1px solid #DDDDD5', borderRadius: 6, padding: '4px 8px', minHeight: 38, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', background: '#fff' }}>
      {tags.map(t => (
        <span key={t} style={{ background: '#F0EFE8', fontSize: 11, padding: '2px 6px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
          {t} <X size={10} style={{ cursor: 'pointer' }} onClick={() => removeTag(t)} />
        </span>
      ))}
      <input type="text" value={val} onChange={e => setVal(e.target.value)} onKeyDown={handleKeyDown} placeholder={tags.length === 0 ? placeholder : ''} style={{ border: 'none', outline: 'none', flex: 1, minWidth: 120, fontSize: 13 }} />
    </div>
  );
}
