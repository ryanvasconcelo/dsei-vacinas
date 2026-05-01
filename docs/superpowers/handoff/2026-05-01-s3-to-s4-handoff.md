# Handoff: Semana 3 -> Semana 4
**Projeto:** SisVac - DSEI-AM
**Data:** 01/05/2026

## 1. O que foi implementado (Semana 3)

### Engine de Inteligência Vacinal (`src/engine/vacinaEngine.ts`)
O núcleo do sistema foi construído seguindo a **IN 2026**.
- **`sugerirProximasDoses`**: Calcula automaticamente as próximas doses pendentes baseando-se na data de nascimento e no histórico de doses aplicadas.
    - Implementa lógica de **Perda de Oportunidade** (ex: Rotavírus).
    - Suporta **Esquema de Resgate** (intervalos mínimos reduzidos se houver atraso).
    - Lida com especificidades indígenas (Varicela sem limite de idade).
- **`validarAplicacao`**: Validação ativa no momento do registro.
    - Verifica janelas de idade (min/max).
    - Verifica intervalo mínimo entre doses da mesma vacina.
    - Retorna severidade (OK, ALERTA, BLOQUEIO).
- **`validarSimultaneidade`**: Regras de aplicação no mesmo dia.
    - Bloqueio de SCR + FA em menores de 2 anos (Quadro 7 da IN).

### Modelagem do Domínio
- **`src/data/regrasVacinais.ts`**: Fonte da verdade codificada. Contém os 21 imunobiológicos e suas regras parametrizadas em dias.
- **`src/types/vacina.ts`**: Tipagem rigorosa para garantir consistência em todo o sistema.

### Integrações UI
- **Perfil do Paciente**: Novo componente `SugestoesVacinais` inserido no detalhe do indígena (Modal), mostrando o que está em atraso ou agendado.
- **Registro de Vacina**: Validação em tempo real no formulário. Alertas visuais mudam conforme os dados inseridos (Vacina, Dose, Data).
- **Dashboard**: As métricas de "Pendências" agora são calculadas em tempo real pelo motor de regras, não sendo mais dados estáticos.
- **Guia Técnico**: Página de Calendário transformada em uma biblioteca interativa com **Notas Técnicas SESAI** e busca.

## 2. Decisões Arquiteturais e "Gotchas"

- **Uso de `differenceInCalendarDays`**: Substituímos `differenceInDays` da `date-fns` por `differenceInCalendarDays` para evitar problemas de arredondamento causados por fusos horários ou horas (ex: 29.9 dias sendo arredondados para baixo).
- **Normalização de Datas**: O sistema agora usa `startOfDay` e `parseISO` de forma padronizada para evitar que a hora da aplicação interfira no cálculo de intervalos de 30 dias.
- **IDs de Vacina**: As siglas foram padronizadas em minúsculas (ex: `bcg`, `hepb`, `penta`) como chaves primárias para simplificar o mapeamento entre UI e Engine.

## 3. Débitos Técnicos / Próximos Passos (Semana 4)

- **Simultaneidade em Lote**: A engine valida simultaneidade entre duas vacinas, mas o formulário ainda não valida um "carrinho" de múltiplas vacinas sendo aplicadas no mesmo momento (Task para S4).
- **Cálculo Retroativo**: Atualmente a engine foca em doses futuras. A validação de se uma dose *já aplicada* no passado foi válida ou inválida (Nível D) ficou para o futuro.
- **Persistência Local**: Os dados continuam em mockData (em memória). A S4 deve focar na persistência em IndexedDB/PouchDB para offline-first.

## 4. Como validar

Rode os testes unitários:
```bash
npx vitest src/engine/vacinaEngine.test.ts
```
Os testes cobrem:
1. Resgate de Hepatite B (intervalo de 30 dias).
2. Perda de Rotavírus (atraso > 3m15d).
3. Bloqueio de simultaneidade SCR+FA em bebês.
