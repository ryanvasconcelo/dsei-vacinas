# Handoff: Mês 2 - Semana 1 para Semana 2

## Contexto Geral
O sistema de Gestão Vacinal Offline-First do DSEI-AM passou pela primeira semana do Mês 2 (07 a 11 de abril de 2026). O foco desta semana foi a implementação de feedbacks críticos validados com a cliente (Vívian).

## O que foi implementado (S1)
1. **Identificação por Genitores:**
   - Implementado utilitário `formatNomeComMae` e formatadores de datas.
   - Atualizados Dashboard, listagem de Cadastro Indígena e Relatórios para exibir o formato `Nome (Mãe: Nome da Mãe)` com tooltips detalhados de genitores.
   - Criada funcionalidade de exportação CSV funcional na tabela de Pendências Nominais (Relatórios).

2. **Situação do Indígena e Tags Clínicas:**
   - O esquema de dados `Indigena` (`src/data/mockData.ts`) foi migrado. O campo único `contraindicacao` foi removido.
   - Adicionados: `situacao` ('PRESENTE', 'AUSENTE', 'OBITO'), `contraindicacoes: string[]` e `comorbidades: string[]`.
   - Adicionado componente genérico `TagInput`.
   - Formulário de Cadastro atualizado para incluir a nova situação e inputs de múltiplas tags clínicas, com alertas visuais dinâmicos.
   - Registro de Vacina agora **filtra Óbitos** da busca de indígenas.

3. **Validação de Calendário e Justificativas:**
   - Criado motor de validação para MVP `isVacinaForaCalendario` em `src/utils/vacinas.ts`.
   - Incluído fluxo de interceptação na tela "Registrar Vacina" (`RegistrarVacina.tsx`), que exibe um **Modal de Justificativa** sempre que uma dose for aplicada fora da faixa etária recomendada, exigindo texto mínimo de 20 caracteres.

4. **Infraestrutura Técnica (TDD):**
   - Configurado `vitest`, `jsdom` e `@testing-library/react`.
   - Todos os utilitários e lógicas core (`formatters.ts`, `vacinas.ts`) estão cobertos por testes e compilando sem erros no Typescript (`tsc -b`).

## Próximos Passos (S2)
A Semana 2 deverá iniciar com este branch/contexto mesclado.
Qualquer nova funcionalidade a ser implementada precisará se integrar com a nova estrutura de `mockData.ts` e com os utilitários testados desta semana.
As decisões de UX adotadas (alertas vermelhos/amarelos para contraindicações/comorbidades, e formatação do nome por genitores) devem ser mantidas como padrão para as próximas telas.
