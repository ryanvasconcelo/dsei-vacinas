# M2S1 Feedbacks Críticos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar exibição de genitores, controle de situação e comorbidades, datas no padrão BR e justificativa para vacinas fora de calendário no SisVac (DSEI-AM).

**Architecture:** Modificaremos `mockData.ts` para os novos campos no domínio. Criaremos `utils/formatters.ts` para regras de exibição e `utils/vacinas.ts` para validações simplificadas de calendário. Componentes UI receberão adequações isoladas com novos tooltips (atributos `title`), modais e inputs baseados em React hooks locais. Adicionaremos `vitest` e `@testing-library/react` para suportar TDD, já que não existia framework de teste no projeto.

**Tech Stack:** React, TypeScript, Tailwind, Recharts, Vitest (novo), React Testing Library (novo)

---

### Task 0: Setup TDD Environment

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install testing dependencies**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/dom jsdom
```

- [ ] **Step 2: Create Vitest config**
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  }
})
```

- [ ] **Step 3: Setup Jest DOM**
Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Commit**
```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.ts
git commit -m "chore: setup vitest and react-testing-library"
```

---

### Task 1: Utility functions (formatters)

**Files:**
- Create: `src/utils/formatters.ts`
- Create: `src/utils/formatters.test.ts`

- [ ] **Step 1: Write the failing tests**
Create `src/utils/formatters.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { formatDateBR, formatNomeComMae } from './formatters';

describe('formatters', () => {
  it('formatDateBR converts yyyy-mm-dd to dd/mm/yyyy', () => {
    expect(formatDateBR('2026-04-07')).toBe('07/04/2026');
  });
  it('formatNomeComMae formats name correctly', () => {
    expect(formatNomeComMae('João', 'Maria')).toBe('João (Mãe: Maria)');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/utils/formatters.test.ts`
Expected: FAIL "Cannot find module"

- [ ] **Step 3: Write minimal implementation**
Create `src/utils/formatters.ts`:
```typescript
export function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export function formatNomeComMae(nome: string, nomeMae: string): string {
  if (!nomeMae || nomeMae === 'Não informado') return nome;
  return `${nome} (Mãe: ${nomeMae})`;
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/utils/formatters.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/utils/formatters.ts src/utils/formatters.test.ts
git commit -m "feat: add formatters utility"
```

---

### Task 2: Dashboard Genitores (Bloco 1.1)

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Write the failing test**
Create `src/pages/Dashboard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { pendenciasVacinais } from '../data/mockData';

describe('Dashboard', () => {
  it('should display mother name format in pending list and tooltip', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    const firstPendente = pendenciasVacinais[0];
    const expectedNome = `${firstPendente.nome} (Mãe: `; // We mock later or just check presence
    expect(screen.getByText(/Mãe:/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/pages/Dashboard.test.tsx`
Expected: FAIL because `Mãe:` is not rendered yet.

- [ ] **Step 3: Write minimal implementation**
In `src/pages/Dashboard.tsx`:
1. Import formatter: `import { formatNomeComMae } from '../utils/formatters';`
2. Since `pendenciasVacinais` does not have `nomeMae`, import `indigenas` to find it.
3. Update the table row rendering:
```tsx
<tbody>
  {pendenciasVacinais.map(p => {
    const ind = indigenas.find(i => i.id === p.indigenaId);
    const nomeExibicao = ind ? formatNomeComMae(p.nome, ind.nomeMae) : p.nome;
    const tooltipText = ind ? `Mãe: ${ind.nomeMae}${ind.nomePai ? ` | Pai: ${ind.nomePai}` : ''}` : '';
    return (
      <tr key={p.id} title={tooltipText}>
        <td style={{ fontWeight: 500 }}>{nomeExibicao}</td>
        {/* ... */}
      </tr>
    );
  })}
</tbody>
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/pages/Dashboard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/pages/Dashboard.tsx src/pages/Dashboard.test.tsx
git commit -m "feat: show genitores in dashboard"
```

---

### Task 3: Lista Cadastros Genitores (Bloco 1.1)

**Files:**
- Modify: `src/pages/CadastroIndigena.tsx`

- [ ] **Step 1: Write minimal implementation**
In `src/pages/CadastroIndigena.tsx`:
1. Import formatter: `import { formatNomeComMae } from '../utils/formatters';`
2. Update the Name td in `listaFiltrada.map`:
```tsx
<tr key={ind.id} title={`Mãe: ${ind.nomeMae}${ind.nomePai ? ` | Pai: ${ind.nomePai}` : ''}`}>
  <td>
    <div style={{ fontWeight: 500 }}>{formatNomeComMae(ind.nome, ind.nomeMae)}</div>
    <div style={{ fontSize: 10, color: '#888880', marginTop: 1 }}>
      {ind.sexo === 'M' ? 'Masculino' : 'Feminino'}
    </div>
  </td>
  {/* ... */}
</tr>
```

- [ ] **Step 2: Commit**
```bash
git add src/pages/CadastroIndigena.tsx
git commit -m "feat: show genitores in cadastro list"
```

---

### Task 4: Relatórios Genitores e Exportação CSV (Bloco 1.1)

**Files:**
- Modify: `src/pages/Relatorios.tsx`

- [ ] **Step 1: Write minimal implementation**
In `src/pages/Relatorios.tsx`:
1. Import `formatNomeComMae`.
2. Update table rows for Pendencias Nominais:
```tsx
<tr key={p.id} title={`Mãe: ${ind?.nomeMae}${ind?.nomePai ? ` | Pai: ${ind.nomePai}` : ''}`}>
  <td style={{ fontWeight: 500 }}>{formatNomeComMae(p.nome, ind?.nomeMae ?? '')}</td>
```
3. Implement CSV download logic. Add a function inside `Relatorios`:
```tsx
const handleExportarPendencias = () => {
  const headers = ['Nome', 'Mãe', 'Pai', 'CNS', 'Polo Base', 'Aldeia', 'Vacina Pendente', 'Idade', 'Atraso (dias)'];
  const rows = pendenciasFiltradas.map(p => {
    const ind = indigenas.find(i => i.id === p.indigenaId);
    return [
      `"${p.nome}"`, `"${ind?.nomeMae ?? ''}"`, `"${ind?.nomePai ?? ''}"`,
      `"${ind?.cns ?? ''}"`, `"${p.poloBase}"`, `"${p.aldeia}"`,
      `"${p.vacina}"`, `"${p.idade}"`, p.diasAtraso
    ].join(',');
  });
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "pendencias_vacinais.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```
4. Attach `onClick={handleExportarPendencias}` to the Exportar button in the Pendencias tab.

- [ ] **Step 2: Commit**
```bash
git add src/pages/Relatorios.tsx
git commit -m "feat: genitores and csv export in relatorios"
```

---

### Task 5: Domain Update (mockData.ts) (Bloco 1.2)

**Files:**
- Modify: `src/data/mockData.ts`

- [ ] **Step 1: Modify mockData.ts**
Update `Indigena` type:
```typescript
export type Indigena = {
  // ... existing fields until acamado
  acamado: boolean;
  situacao: 'PRESENTE' | 'AUSENTE' | 'OBITO';
  contraindicacoes: string[];
  comorbidades: string[];
};
```
Update all items in `indigenas` array:
- Add `situacao: 'PRESENTE'` to all.
- Change `contraindicacao: '...'` to `contraindicacoes: ['...'], comorbidades: []`.
- If `contraindicacao` was `null`, make `contraindicacoes: []`.
- Update `DoseAplicada` type: add `justificativaForaCalendario: string | null;`
- Add `justificativaForaCalendario: null` to all items in `dosesAplicadas`.

- [ ] **Step 2: Fix TS Errors in App**
Run `npx tsc -b`. 
Update `CadastroIndigena.tsx` `emptyForm` and `handleSalvar` to match new `Indigena` signature.
Temporarily use `contraindicacoes: []` and `comorbidades: []`, `situacao: 'PRESENTE'` in `novo` object.
In `CadastroIndigena.tsx`, replace `ind.contraindicacao` references with `ind.contraindicacoes.length > 0`.

- [ ] **Step 3: Commit**
```bash
git add src/data/mockData.ts src/pages/CadastroIndigena.tsx
git commit -m "feat: domain updates for situacao and contraindicacoes"
```

---

### Task 6: TagInput Component (Bloco 1.2)

**Files:**
- Create: `src/components/TagInput.tsx`

- [ ] **Step 1: Write TagInput implementation**
Create `src/components/TagInput.tsx`:
```tsx
import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ tags, onChange, placeholder }: { tags: string[], onChange: (tags: string[]) => void, placeholder: string }) {
  const [val, setVal] = useState('');
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (val.trim() && !tags.includes(val.trim())) {
        onChange([...tags, val.trim()]);
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
```

- [ ] **Step 2: Commit**
```bash
git add src/components/TagInput.tsx
git commit -m "feat: tag input component"
```

---

### Task 7: Situação and Tags in Form & Profile (Bloco 1.2)

**Files:**
- Modify: `src/pages/CadastroIndigena.tsx`

- [ ] **Step 1: Implement UI**
1. Import `TagInput`.
2. Add state fields: `situacao`, `contraindicacoes`, `comorbidades` to `emptyForm`.
3. Add Situação to "Identificação" section:
```tsx
{field('Situação', (
  <select className="select" value={form.situacao} onChange={e => setForm({ ...form, situacao: e.target.value as any })}>
    <option value="PRESENTE">Presente na Aldeia</option>
    <option value="AUSENTE">Ausente (Viagem/Tratamento)</option>
    <option value="OBITO">Óbito</option>
  </select>
), true)}
```
4. Replace `contraindicacao` textarea with `TagInput` for both `contraindicacoes` and `comorbidades`.
5. Display tags in `detalhe` Modal.
6. In `tab === 'lista'`, add `<select>` filter for `filtroSituacao`. Filter `listaFiltrada`. Add `opacity: ind.situacao === 'OBITO' ? 0.6 : 1` to `<tr>`.

- [ ] **Step 2: Commit**
```bash
git add src/pages/CadastroIndigena.tsx
git commit -m "feat: situacao and tags UI in cadastro"
```

---

### Task 8: Hide Óbitos in Registration (Bloco 1.2)

**Files:**
- Modify: `src/pages/RegistrarVacina.tsx`

- [ ] **Step 1: Filter indigenas**
```tsx
// Inside RegistrarVacina.tsx
const indigenasFiltrados = busca.length >= 2
  ? indigenas.filter(i =>
      i.situacao !== 'OBITO' &&
      (i.nome.toLowerCase().includes(busca.toLowerCase()) ||
      i.cns.includes(busca))
    )
  : [];
```
Fix references to `contraindicacao` (string) to `contraindicacoes.length > 0` in `RegistrarVacina.tsx`.

- [ ] **Step 2: Commit**
```bash
git add src/pages/RegistrarVacina.tsx
git commit -m "feat: hide obitos in vacinacao"
```

---

### Task 9: Out of Calendar Validation Engine (Bloco 1.3)

**Files:**
- Create: `src/utils/vacinas.ts`
- Create: `src/utils/vacinas.test.ts`

- [ ] **Step 1: Write test**
```typescript
import { describe, it, expect } from 'vitest';
import { isVacinaForaCalendario } from './vacinas';

describe('vacinas', () => {
  it('returns false for adult receiving dT', () => {
    // mock indigena adult
    expect(isVacinaForaCalendario('1990-01-01', 'A partir de 7 anos')).toBe(false);
  });
  it('returns true for 1 month old receiving 2 month vaccine', () => {
    expect(isVacinaForaCalendario('2026-03-01', '2, 4 e 6 meses', '2026-04-01')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to fail**
Run: `npx vitest run src/utils/vacinas.test.ts`

- [ ] **Step 3: Implement validation**
```typescript
export function isVacinaForaCalendario(dataNascimento: string, faixaEtariaRecomendada: string, dataAplicacao?: string): boolean {
  if (faixaEtariaRecomendada === 'Ao nascer') return false; // Simplified
  
  const birth = new Date(dataNascimento);
  const aplicacao = dataAplicacao ? new Date(dataAplicacao) : new Date();
  const ageMonths = (aplicacao.getFullYear() - birth.getFullYear()) * 12 + (aplicacao.getMonth() - birth.getMonth());

  // Simplified basic heuristic for the MVP:
  if (faixaEtariaRecomendada.includes('2, 4 e 6 meses') && ageMonths < 1) return true;
  if (faixaEtariaRecomendada.includes('15 meses') && ageMonths < 14) return true;
  if (faixaEtariaRecomendada.includes('9 meses') && ageMonths < 8) return true;
  if (faixaEtariaRecomendada.includes('7 anos') && ageMonths < 80) return true;
  
  return false;
}
```

- [ ] **Step 4: Run test to pass and commit**
```bash
npx vitest run src/utils/vacinas.test.ts
git add src/utils/vacinas.ts src/utils/vacinas.test.ts
git commit -m "feat: isVacinaForaCalendario validation"
```

---

### Task 10: Justificativa Modal (Bloco 1.3)

**Files:**
- Modify: `src/pages/RegistrarVacina.tsx`

- [ ] **Step 1: Add Modal State and intercept Save**
Add state: `const [showJustificativa, setShowJustificativa] = useState(false);`
Add state: `const [justificativa, setJustificativa] = useState('');`
In `handleSalvar`:
```tsx
const fora = indigenaSelecionado && vacinaSelecionada ? isVacinaForaCalendario(indigenaSelecionado.dataNascimento, vacinaSelecionada.faixaEtaria, form.dataAplicacao) : false;

if (fora && !showJustificativa) {
  e.preventDefault();
  setShowJustificativa(true);
  return;
}
if (showJustificativa && justificativa.length < 20) {
  e.preventDefault();
  showToast('Justificativa deve ter pelo menos 20 caracteres.', 'error');
  return;
}
// Proceed to save. Add justificativaForaCalendario to the nova DoseAplicada object.
```
Add Modal rendering when `showJustificativa` is true. Render textarea, preset buttons, save and cancel buttons.

- [ ] **Step 2: Commit**
```bash
git add src/pages/RegistrarVacina.tsx
git commit -m "feat: justificativa modal"
```

---

### Task 11: Format Dates in Display (Bloco 1.3)

**Files:**
- Modify: `src/pages/RegistrarVacina.tsx`
- Modify: `src/pages/Dashboard.tsx`
- Modify: `src/pages/Relatorios.tsx`

- [ ] **Step 1: Replace raw dates with `formatDateBR` in tables**
Ensure any `td` displaying dates (`d.dataAplicacao`, etc) passes the value through `formatDateBR` imported from `utils/formatters.ts`.
In `CadastroIndigena.tsx`, `Dashboard.tsx`, `Relatorios.tsx`, find `dataAplicacao` and wrap it.

- [ ] **Step 2: Commit**
```bash
git add src/pages
git commit -m "feat: apply formatDateBR globally"
```

---
