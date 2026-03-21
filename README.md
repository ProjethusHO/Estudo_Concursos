# Toolkit para Concursos (FISCO GO)

Este repositório contém agentes e ferramentas de curadoria para auxiliar na preparação para concursos públicos (ex: SEFAZ GO).

## Estrutura do Projeto

```text
Estudo FISCO GO/
├── concurso-videoaulas-curator/          # Habilidade: Curadoria de Videoaulas e Provas
│   ├── SKILL.md                          
│   ├── scripts/                          
│   │   ├── youtube_search.py             
│   │   └── prova_search.py               
│   ├── references/                       
│   │   ├── criterios_avaliacao.md        
│   │   └── padroes_bancas.md             
│   └── templates/                        
│       ├── tabela_disciplinas.md         
│       ├── curadoria_videoaulas.md       
│       └── prova_gerada.md               
├── edital-materials-curator/             # Habilidade: Legislação & Hype (Blogs/Vlogs)
│   ├── SKILL.md                          
│   ├── scripts/                          
│   │   ├── legislation_search.py         
│   │   └── hype_search.py                
│   ├── references/                       
│   │   └── fontes_confiaveis.md          
│   └── templates/                        
│       └── relatorio_materiais.md        
├── materiais/                            # Materiais gerados e editais base
│   ├── editais/                          # Editais dos certames
│   │   └── edital_de_abertura_versao_10_12_2025_revisado_cec.pdf
│   ├── legislacao/                       # Textos de lei alimentados pelo agente
│   ├── hype/                             # Conteúdos em alta alimentados pelo agente
│   ├── Guia_Definitivo_de_Videoaulas_Preparação_Assertiva_para_SEFAZ_GO_2026.pdf
│   └── icms_mapa_mental.svg
└── README.md                             
```

## Funcionamento dos Agentes

### 1. Concurso Videoaulas Curator
- **Videoaulas:** Extrai disciplinas, avalia vídeos (1-5 estrelas) com base em `criterios_avaliacao.md` e monta cronograma.
- **Provas:** Busca provas reais de bancas. Se não existirem, simula questões inéditas baseadas no padrão da banca e gera o PDF.

### 2. Edital Materials Curator
- **Legislação Oficial:** Lê o edital e utiliza `legislation_search.py` para salvar links diretos da CF e Leis Secas do portal do Planalto/Sefaz.
- **Hype (Atualidades):** Executa `hype_search.py` para descobrir resumos, vlogs e dicas quentes nos canais de grandes cursos (Estratégia, Direção, Gran).

## 🚀 Como Executar

Cada diretório de habilidade contém seu respectivo `SKILL.md`. Alimente este arquivo em seu agente de IA preferido para executar a automação e abastecer a pasta `materiais/` com links e PDFs de alta qualidade.