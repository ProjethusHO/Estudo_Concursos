---
name: edital-materials-curator
description: Habilidade para ler editais de concursos e extrair legislações pertinentes, além de buscar conteúdos em alta (hype) em blogs e vlogs.
---

# Instruções da Habilidade: Edital Materials Curator

Esta habilidade foca em otimizar a preparação para o concurso filtrando diretamente o conteúdo de alto valor (Legislação Atualizada e Análises em Alta - "Hype").

## 🎯 Objetivo
Analisar as disciplinas e tópicos de um edital e preencher as pastas locais com o conteúdo correto.

## 🛠️ Passo a Passo de Execução

1. **Leitura do Edital**
   - Extrair a lista de legislações (Leis, Decretos, Constituição) cobradas no edital fornecido.
   - Identificar os assuntos mais "quentes" (novidades, assuntos polêmicos ou tópicos recém-adicionados ao edital).

2. **Pesquisa de Legislação**
   - Executar `python scripts/legislation_search.py "Nome da Lei"` para gerar links diretos para as leis no portal do Planalto ou sites oficiais.
   - Usar `references/fontes_confiaveis.md` para garantir que o candidato acesse apenas texto oficial atualizado.

3. **Pesquisa de Hype (Blogs e Vlogs)**
   - Executar `python scripts/hype_search.py "Tema quente"` para encontrar vídeos e artigos recentes de plataformas renomadas.

4. **Entrega de Materiais**
   - Utilizar o template em `templates/relatorio_materiais.md` para gerar o relatório final.
   - Salvar o relatório de Legislação em `materiais/legislacao/` e o de Hype em `materiais/hype/`.
