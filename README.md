# Concurso Videoaulas Curator

Esta é uma habilidade de curadoria para buscar, avaliar e organizar videoaulas e provas para concursos (ex: SEFAZ GO).

## Estrutura do Projeto

```text
Estudo FISCO GO/
├── concurso-videoaulas-curator/
│   ├── SKILL.md                          # Instruções principais (4.4 KB)
│   ├── scripts/                          # Scripts executáveis
│   │   ├── youtube_search.py             # Gera queries para videoaulas (1.5 KB)
│   │   └── prova_search.py               # Gera queries para provas (1.4 KB)
│   ├── references/                       # Documentação de referência
│   │   ├── criterios_avaliacao.md        # Critérios de 1-5 estrelas (2.4 KB)
│   │   └── padroes_bancas.md             # Padrões FCC, Cebraspe, FGV, Vunesp (3.0 KB)
│   └── templates/                        # Modelos para saída
│       ├── tabela_disciplinas.md         # Template de distribuição (970 B)
│       ├── curadoria_videoaulas.md       # Template de guia (2.5 KB)
│       └── prova_gerada.md               # Template de simulado (1.5 KB)
├── materiais/                            # Materiais de estudo e editais
│   ├── edital_de_abertura_versao_10_12_2025_revisado_cec.pdf
│   ├── Guia_Definitivo_de_Videoaulas_Preparação_Assertiva_para_SEFAZ_GO_2026.pdf
│   └── icms_mapa_mental.svg
└── README.md                             # Documentação do projeto
```

## Funcionamento

### 📚 Usuário pede videoaulas
1. **Análise do Edital**: Buscar edital, identificar disciplinas e classificar por prioridade (🔴🟠🟡).
2. **Busca Assertiva**: Usar `youtube_search.py` para buscar no YouTube e extrair links.
3. **Avaliação**: Classificar o conteúdo de 1 a 5 estrelas baseado em `criterios_avaliacao.md`.
4. **Estruturação**: Formatar com `tabela_disciplinas.md` e `curadoria_videoaulas.md`, criando um cronograma.
5. **Entrega**: Fornecer o resultado com o compilado e organizado profissionalmente.

### 📝 Usuário pede provas
1. **Busca de Provas Reais**: Usar `prova_search.py` para buscas especializadas. Se encontrar aprovada, entrega o PDF original.
2. **Se NÃO encontrar**: 
   - Ler os padrões em `padroes_bancas.md`.
   - Gerar simulado inédito usando `prova_gerada.md`.
   - Criar questões e incluir gabarito comentado.
3. **Exportação**: Converter as anotações para um PDF final.
4. **Entrega**: Enviar o PDF completo ao usuário.

## 🚀 Execução da Habilidade

A habilidade irá rodar localmente no agente utilizando o arquivo `SKILL.md` como guia. Use esta organização de pastas para disponibilizar o código em um repositório no GitHub para uso em outras infraestruturas.