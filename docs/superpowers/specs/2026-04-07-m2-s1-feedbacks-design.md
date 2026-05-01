# Sistema Vacinal DSEI-AM - M2S1 Feedbacks Críticos

## Objetivos
Implementar melhorias focadas na identificação por genitores, controle de situação/contraindicações/comorbidades, padronização de datas e justificativas para vacinas fora de calendário.

## Estrutura de Domínio
A entidade `Indigena` será modificada (via `mockData.ts`) e o campo `contraindicacao: string | null` será removido, adicionando:
- `situacao: 'PRESENTE' | 'AUSENTE' | 'OBITO'`
- `contraindicacoes: string[]`
- `comorbidades: string[]`

A entidade `DoseAplicada` receberá:
- `justificativaForaCalendario: string | null`

## Componentes a Serem Alterados

1. **Dashboard.tsx**
   - Alterar "Pendências Vacinais" para incluir a mãe no formato `Nome (Mãe: Nome da Mãe)`.
   - Adicionar tooltip nativo (atributo `title`) nas linhas da tabela de pendências com `Nome da Mãe: X`.

2. **CadastroIndigena.tsx**
   - **Formulário:** 
     - Substituir checkbox/texto de contraindicação por um campo de tags customizado (ou input separado por vírgula se não houver componente de tags) para `contraindicacoes` e `comorbidades`.
     - Adicionar select para Situação.
   - **Listagem:**
     - Nome formatado `Nome (Mãe: Nome da Mãe)`.
     - Tratamento visual para `'OBITO'` (opacidade reduzida e badge escuro).
     - Filtro novo para a Situação.
   - **Modal de Detalhe:**
     - Exibir as tags de contraindicações e comorbidades.

3. **RegistrarVacina.tsx**
   - Na busca (autocomplete), filtrar fora os indígenas com situação `'OBITO'`.
   - Incluir a lógica "fora do calendário" ao aplicar.
     - Lógica baseada em faixa etária, data atual e validações simples, a ser extraída para `utils/vacinas.ts`.
   - Adicionar Modal de Justificativa com botões de atalho ("Campanha emergencial", etc.) e textarea limitando de 20 a 500 caracteres.

4. **Relatorios.tsx**
   - Formatar o nome nas tabelas (Pendências Nominais).
   - O botão "Exportar" na aba Pendências fará download via JavaScript de um `.csv` contendo as colunas "Nome", "Mãe", "CNS", "Vacina", "Atraso".

5. **utils/formatters.ts** (Novo Arquivo)
   - Adicionar `formatDateBR` (converte ISO date string ou yyyy-mm-dd para dd/mm/yyyy).

## Tratamento de Dados (Migration de mockData.ts)
- Indígenas legados sem `situacao` receberão `'PRESENTE'`.
- O valor antigo `contraindicacao` será movido para o array `contraindicacoes`.

## Testes e Bibliotecas
Como não há ambiente de testes atual, a implementação dos testes solicitados ("renderização", "validações") demandará a instalação de bibliotecas (`vitest`, `jsdom`, `@testing-library/react`). Isso será proposto no Plano.
