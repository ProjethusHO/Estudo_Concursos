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
1. Use o script auxiliar em Python para gerar boas queries de busca usando a ferramenta `run_command`:
   ```bash
   python "C:\Users\Jarvis\Downloads\Estudo Concursos\QConcursos\scripts\youtube_search.py" "NOME_CONCURSO" "NOME_DISCIPLINA" --banca "NOME_BANCA"
   ```
2. Use as ferramentas do Antigravity, como o `browser_subagent` ou a `search_web`, para encontrar os vídeos no YouTube.
3. Extraia o link direto, duração, nome do professor e visualizações.

### Passo 3: Avaliação e Estruturação
1. Avalie a assertividade (1 a 5 estrelas) usando o arquivo `C:\Users\Jarvis\Downloads\Estudo Concursos\QConcursos\references\criterios_avaliacao.md`.
2. Use os templates `tabela_disciplinas.md` e `curadoria_videoaulas.md` para estruturar a entrega.

---

## Fluxo de Trabalho de Provas e Simulados

Quando o usuário solicitar provas anteriores ou um simulado:

### Passo 1: Busca de Provas Anteriores Reais
1. Use o script auxiliar para gerar queries de busca de provas rodando Python no terminal (com `run_command`):
   ```bash
   python "C:\Users\Jarvis\Downloads\Estudo Concursos\QConcursos\scripts\prova_search.py" "NOME_CONCURSO" "NOME_BANCA" "NOME_CARGO"
   ```
2. Utilize as ferramentas de pesquisa web (`search_web`) para buscar no Google os PDFs em domínios públicos confiáveis.
3. Se encontrar provas reais do mesmo cargo/banca, baixe-as e entregue ao usuário.

### Passo 2: Geração de Simulado Inédito (Fallback)
Se a banca nunca aplicou prova para o cargo específico ou se as provas forem muito antigas, **gere um simulado inédito**.

1. Leia as instruções de padrão de bancas em `C:\Users\Jarvis\Downloads\Estudo Concursos\QConcursos\references\padroes_bancas.md` para mimetizar o estilo da banca.
2. Identifique as disciplinas do edital e a proporção de questões.
3. Use o template armazenado localmente em `C:\Users\Jarvis\Downloads\Estudo Concursos\QConcursos\templates\prova_gerada.md` para criar a prova.
4. Crie questões que simulem a complexidade exigida para o cargo (ex: Auditor Fiscal exige casos práticos complexos).
5. **Obrigatório:** Inclua um gabarito comentado ao final.

### Passo 3: Exportação do Material
Após gerar o simulado em Markdown, você pode salvá-lo no diretório do usuário.
1. Salve o simulado estruturado com blocos `.md` e entregue como artefato via interface visual, garantindo a acessibilidade.
2. Caso o usuário exija o arquivo como um PDF real num diretório local, escreva e execute um script simples em Python, sem bibliotecas externas complexas e utilizando ferramentas disponíveis, para transcrever de `.md` para `.pdf` nas pastas de saída (por exemplo, na pasta Downloads).

## Regras Críticas

1. **Nunca entregue links quebrados.** Use a ferramenta `read_url_content` para confirmar antes que as requisições web funcionam.
2. **Geração de Provas:** A formatação da prova deve seguir estritamente o manual da banca que você usou para pesquisa.
3. **Crie artefatos ricos:** Privilegie criar arquivos `.md` bem formatados, e salve-os localmente utilizando `write_to_file`.
