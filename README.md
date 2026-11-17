# elizeu-montador-moveis-mvp
MVP PWA de gestao de agenda, filtro regional e alerta de conflitos para montador de moveis autonomo (Grande ABC e Grande SP).
# Elizeu Montador de Moveis — MVP (Agenda Operacional PWA)

Aplicacao web progressiva (PWA) mobile-first desenvolvida para apoiar a gestao diaria de atendimentos, filtragem regional e prevencao de conflitos de horario de um montador de moveis autonomo (MEI) atuante no Grande ABC, Grande Sao Paulo e Capital.

## Objetivo do MVP
Substituir o controle manual fragmentado em papel e mensagens soltas por uma agenda cronologica acessivel em campo, reduzindo deslocamentos improdutivos e choques de horario.

## Funcionalidades Principais
- **RF01 — Acesso Autenticado:** Entrada protegida para o tecnico responsavel (Tela 1).
- **RF02 — Cadastro Normalizado de Servicos:** Registro estruturado com cliente, endereco, bairro, municipio/macrorregiao, data, horario, movel e valor (Tela 3).
- **RF03 — Alerta Preventivo de Conflito:** Deteccao automatica de sobreposicao de horarios na mesma data com decisao consciente do profissional (Tela 3).
- **RF04 — Agenda Cronologica e Filtro Regional:** Visualizacao ordenada por horario e filtragem rapida por macrorregiao ou bairro (Tela 2).
- **RF05 — Atualizacao Rapida de Status:** Alteracao em um toque entre Pendente, Confirmado e Concluido (Tela 2).

## Acessibilidade e Requisitos Nao Funcionais
- **RNF01 / RNF02:** Sessao protegida via HTTPS, isolamento de dados e sanitizacao de entradas.
- **RNF03:** Arquitetura PWA leve otimizada para redes moveis em campo.
- **RNF04:** Interface mobile-first com alto contraste (minimo 4,5:1), tipografia legivel (minimo 16 px), areas de toque de no minimo 44x44 px para operacao com uma mao e alertas multimodais (cor + icone + texto explicativo).

## Estrutura do Projeto
- `/docs`: Prototipos validados e documentacao funcional do MVP.
- `/src`: Codigo-fonte da aplicacao (HTML, CSS, JavaScript e configuracao PWA).
## Como Executar o MVP
1. Clone este repositorio ou abra o ficheiro `src/index.html` em qualquer navegador moderno.
2. Utilize as credenciais ficticias de demonstracao (`tecnico.demo@elizeumoveis.com.br` / `12345678`) para testar o fluxo completo das tres telas.
