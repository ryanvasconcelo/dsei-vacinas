# Design Spec: Engine de Calendário Vacinal (Nível C)

**Data:** 01 de Maio de 2026
**Status:** Em Brainstorming (Pendente Aprovação)
**Branch:** `feature/m2-s3-engine-calendario`

## 1. Objetivo
Implementar o motor de regras do Calendário Nacional de Vacinação 2026, com foco em Validação Ativa (Nível C). O sistema deve sugerir próximas doses, validar aplicações em tempo real e alertar sobre conflitos de simultaneidade ou contraindicações clínicas.

## 2. Arquitetura da Engine
Adotaremos a abordagem **Rule-Object (Abordagem 1)**, onde as regras não são hard-coded em funções, mas sim estruturadas em objetos de dados que a engine processa. Isso garante flexibilidade para evoluir para o Nível D (regras condicionais avançadas) sem refatoração.

### 2.1 Estrutura de Dados (Bloco 3.1)
Seguiremos rigorosamente os tipos solicitados no prompt:

- `Imunobiologico`: Metadados da vacina (nome, sigla, tipo, laboratórios).
- `RegraVacinacao`: Definição do esquema (Básico, Reforço, Anual) e janelas de idade.
- `DoseRegra`: Detalhes de cada dose (idade mínima, recomendada e máxima).
- `SimultaneidadeRegra`: Matriz de compatibilidade entre vacinas (ex: SCR vs FA).

### 2.2 Funções Core (Bloco 3.2)
A engine será composta por funções puras e testáveis:

1.  **`sugerirProximasDoses(paciente, hoje)`**:
    - Cruza a idade e o histórico de vacinação.
    - Retorna lista de `SugestaoDose` com status (`EM_DIA`, `ATRASADA`, `PROXIMA`, `OPORTUNIDADE_PERDIDA`).
2.  **`validarAplicacao(paciente, vacinaId, data, histórico)`**:
    - Verifica se o paciente está na faixa etária permitida.
    - Verifica se o intervalo mínimo desde a última dose foi respeitado.
    - Retorna `ResultadoValidacao` com severidade (`BLOQUEIO`, `ALERTA`, `OK`).
3.  **`validarSimultaneidade(paciente, vacinasDoDia)`**:
    - Checa regras do Quadro 7 (ex: 30 dias entre SCR e FA para < 2 anos).

## 3. Fluxo de Integração (Bloco 3.3)
- **Perfil do Paciente**: Novo card "Calendário Sugerido".
- **Registro de Vacina**: Ao selecionar uma vacina, a engine dispara `validarAplicacao`. Se houver bloqueio/alerta, o modal de justificativa (S1) é acionado.
- **Dashboard**: Widget de "Atrasos Nominais" alimentado por `sugerirProximasDoses` em lote.

## 4. Guia e Notas Técnicas (Bloco 3.4)
- **Guia**: Módulo de consulta com busca por vacina ou condição. Conteúdo extraído da IN 2026.
- **Notas Técnicas**: Painel administrativo para upload de PDFs e metadados. As notas da IN 2026 virão pré-cadastradas.

## 5. Estratégia de Testes (TDD)
- Cobertura alvo: **> 90%** no diretório `src/engine`.
- Casos de teste críticos:
    - Janela rígida do Rotavírus (Perda de oportunidade).
    - Varicela Indígena (sem limite de idade).
    - COVID-19 Anual Indígena.
    - Conflito SCR + FA em crianças < 2 anos.

## 6. Limitações Conhecidas (Nível C)
- Não implementaremos "esquemas especiais" (ex: BCG para contatos de hanseníase) nesta etapa.
- Não haverá parse automático de PDFs de Notas Técnicas.
