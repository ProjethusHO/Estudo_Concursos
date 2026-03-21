---
name: concurso-videoaulas-curator
description: Metodologia estruturada para curadoria de videoaulas e provas anteriores para concursos públicos. Use quando o usuário pedir um plano de estudos com videoaulas, provas anteriores ou simulados inéditos para um concurso específico.
license: Complete terms in LICENSE.txt
---

# Concurso Videoaulas e Provas Curator

Esta habilidade fornece um fluxo de trabalho estruturado para atuar como um curador especialista em preparação para concursos públicos. Ela permite entregar listas assertivas de videoaulas, buscar provas anteriores e gerar simulados inéditos no padrão da banca.

## Quando usar esta habilidade

- Quando o usuário pedir recomendações de videoaulas para um concurso.
- Quando o usuário pedir provas anteriores de um concurso ou banca específica.
- Quando o usuário quiser um simulado ou prova gerada especificamente para o seu cargo.
- Quando for solicitado um cronograma de estudos focado em videoaulas e resolução de questões.

## Fluxo de Trabalho de Curadoria de Videoaulas

### Passo 1: Análise do Edital e Estratégia
1. Use a ferramenta `search` para buscar o edital do concurso solicitado.
2. Identifique as disciplinas cobradas, número de questões por disciplina e pesos.
3. Classifique as disciplinas em três níveis de prioridade:
   - 🔴 **Prioridade Máxima:** Maior peso e maior número de questões. Define a aprovação.
   - 🟠 **Prioridade Alta:** Peso alto ou muitas questões. Garante a classificação.
   - 🟡 **Prioridade Média:** Conhecimentos básicos. Objetivo é não zerar.

### Passo 2: Busca Assertiva de Videoaulas
Para cada disciplina, especialmente as de Prioridade Máxima e Alta, busque videoaulas no YouTube.
1. Use o script auxiliar para gerar boas queries de busca:
   ```bash
   python /home/ubuntu/skills/concurso-videoaulas-curator/scripts/youtube_search.py "NOME_CONCURSO" "NOME_DISCIPLINA" --banca "NOME_BANCA"
   ```
2. Use a ferramenta `browser_navigate` para acessar o YouTube e buscar os vídeos.
3. Extraia o link direto, duração, nome do professor e visualizações.

### Passo 3: Avaliação e Estruturação
1. Avalie a assertividade (1 a 5 estrelas) usando `/home/ubuntu/skills/concurso-videoaulas-curator/references/criterios_avaliacao.md`.
2. Use os templates `tabela_disciplinas.md` e `curadoria_videoaulas.md` para estruturar a entrega.

---

## Fluxo de Trabalho de Provas e Simulados

Quando o usuário solicitar provas anteriores ou um simulado:

### Passo 1: Busca de Provas Anteriores Reais
1. Use o script auxiliar para gerar queries de busca de provas:
   ```bash
   python /home/ubuntu/skills/concurso-videoaulas-curator/scripts/prova_search.py "NOME_CONCURSO" "NOME_BANCA" "NOME_CARGO"
   ```
2. Busque no Google e tente encontrar PDFs de provas anteriores exatas.
3. Se encontrar provas reais do mesmo cargo/banca, baixe-as e entregue ao usuário.

### Passo 2: Geração de Simulado Inédito (Fallback)
Se a banca nunca aplicou prova para o cargo específico ou se as provas forem muito antigas, **gere um simulado inédito**.

1. Leia as instruções de padrão de bancas em `/home/ubuntu/skills/concurso-videoaulas-curator/references/padroes_bancas.md` para mimetizar o estilo da banca.
2. Identifique as disciplinas do edital e a proporção de questões.
3. Use o template `/home/ubuntu/skills/concurso-videoaulas-curator/templates/prova_gerada.md` para criar a prova.
4. Crie questões que simulem a complexidade exigida para o cargo (ex: Auditor Fiscal exige casos práticos complexos).
5. **Obrigatório:** Inclua um gabarito comentado ao final.

### Passo 3: Exportação para PDF
Após gerar o simulado em Markdown, você **deve** convertê-lo para PDF para facilitar o estudo do usuário.
1. Salve o simulado em um arquivo `.md`.
2. Use a utilidade do sistema para converter para PDF:
   ```bash
   manus-md-to-pdf /home/ubuntu/caminho_do_simulado.md /home/ubuntu/Simulado_Inedito_Concurso.pdf
   ```
3. Entregue o PDF final ao usuário como anexo na mensagem de resultado.

## Regras Críticas

1. **Nunca entregue links quebrados.** Vá até o vídeo/prova específico e verifique.
2. **Geração de Provas:** Se for gerar uma prova, ela deve ser rigorosamente no estilo da banca solicitada (ex: FCC = historinhas e lei seca; FGV = casos interpretativos complexos).
3. **Sempre converta simulados gerados para PDF** usando o utilitário `manus-md-to-pdf`.
