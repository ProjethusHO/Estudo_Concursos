# Adaptação da Documentação QConcursos para Antigravity

Este plano descreve as modificações necessárias na pasta `QConcursos` para torná-la totalmente compatível com o assistente local Antigravity.

## Proposed Changes

### Componente de Habilidade (Skill)

#### [MODIFY] [SKILL.md](file:///C:/Users/Jarvis/Downloads/Estudo%20Concursos/QConcursos/SKILL.md)
- Atualizar o diretório de arquivos de `/home/ubuntu/skills/concurso-videoaulas-curator/...` para o caminho correto do Windows `C:\Users\Jarvis\Downloads\Estudo Concursos\QConcursos\...`.
- Trocar as ferramentas do Manus (`search`, `browser_navigate`) pelas ferramentas nativas do Antigravity (`search_web`, `browser_subagent`).
- Alterar o comando de exportação de PDF (`manus-md-to-pdf`) para indicar a criação de um Artefato Markdown nativo no Antigravity, visto que não há utilitário `manus-md-to-pdf` disponível no Windows por padrão, ou orientar o uso de um script Python para PDF se estritamente necessário.

### Componentes de Integração AppSheet

#### [MODIFY] [google_antigravity_deployment.md](file:///C:/Users/Jarvis/Downloads/Estudo%20Concursos/QConcursos/google_antigravity_deployment.md)
- Remover a confusão entre "Google Antigravity" e "AppSheet". O AppSheet é uma plataforma No-Code do Google, enquanto o Antigravity é este assistente de IA. O título e as referências serão ajustados para "Integração QConcursos com AppSheet".
- Manter o tutorial funcional intacto para o usuário que for implantar no AppSheet.

#### [MODIFY] [google_antigravity_config.json](file:///C:/Users/Jarvis/Downloads/Estudo%20Concursos/QConcursos/google_antigravity_config.json)
- Nenhuma alteração lógica profunda, apenas ajustar o nome do projeto se aplicável, mantendo-o como um arquivo de configuração/definição para AppSheet e uso por agentes.

### Scripts (Python)
Os scripts (`prova_search.py`, `youtube_search.py`, `qconcursos_url_generator.py`) em `scripts/` já são agnósticos de SO e usam bibliotecas padrão (`argparse`, `urllib`).  
Eles não precisam de modificações significativas, pois já foram verificados e rodam no Windows via Python.

## Verification Plan

### Manual Verification
- O usuário ou o agente irá revisar o arquivo `SKILL.md` final para garantir que as ferramentas declaradas (`search_web`, caminhos Windows) estão corretas.
- Validar se o Antigravity entende as novas instruções rodando um teste mental de uma query de prova.
