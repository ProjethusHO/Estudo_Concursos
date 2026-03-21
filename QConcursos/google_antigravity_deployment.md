# 🚀 Guia de Implantação: Integração QConcursos no AppSheet

Este guia orienta como implantar a integração do QConcursos no seu aplicativo desktop AppSheet.

## 📦 Componentes Incluídos

1. **Configuração JSON (`google_antigravity_config.json`)**: Estrutura da UI e definição de dados
2. **Script de Geração de URL (`qconcursos_url_generator.py`)**: Lógica central convertida para AppScript

---

## 🛠️ Passo a Passo para Implantação

### Passo 1: Preparar a Planilha Base (Google Sheets)
1. Crie uma nova planilha no Google Sheets chamada `Concurso Questoes`.
2. Crie as seguintes colunas na primeira linha:
   - `ID`
   - `Disciplina`
   - `Assunto`
   - `Banca`
   - `URL_Gerada`

### Passo 2: Importar para o AppSheet
1. Abra o AppSheet na sua conta Google.
2. Clique em **"Make a new app"** -> **"Start with your own data"**.
3. Selecione a planilha `Concurso Questoes` que você acabou de criar.

### Passo 3: Configurar a Coluna Virtual (A Mágica)
A integração com o QConcursos funciona gerando URLs dinâmicas baseadas nas suas seleções.

1. No editor do AppSheet, vá para **Data** -> **Columns**.
2. Selecione a tabela `Concurso Questoes`.
3. Clique em **"Add Virtual Column"**.
4. Nomeie como `Acessar QConcursos`.
5. No campo **App formula**, cole a seguinte expressão:

```text
CONCATENATE(
  "https://www.qconcursos.com/questoes-de-concursos/questoes?q=",
  ENCODEURL(CONCATENATE([Disciplina], " ", [Assunto])),
  IFS(
    [Banca]="FCC", "&examining_board_ids[]=2",
    [Banca]="CEBRASPE", "&examining_board_ids[]=1",
    [Banca]="FGV", "&examining_board_ids[]=3",
    [Banca]="VUNESP", "&examining_board_ids[]=4"
  ),
  "&with_commented_feedback=true"
)
```

6. Mude o tipo (Type) desta coluna para **URL**.
7. Salve as alterações.

### Passo 4: Configurar a Interface (UX)
1. Vá para **UX** -> **Views**.
2. Edite a view principal (Form).
3. Configure a coluna `Banca` como tipo **Enum** e adicione os valores: `FCC`, `CEBRASPE`, `FGV`, `VUNESP`.
4. Configure a coluna `URL_Gerada` para não aparecer no formulário (Show = false).
5. Na view de Detalhes (Detail view), certifique-se de que a coluna virtual `Acessar QConcursos` esteja visível como um botão clicável.

---

## 💻 Como Usar no Desktop

1. Abra o aplicativo no seu desktop.
2. Clique no botão **"+"** para adicionar uma nova busca.
3. Digite a **Disciplina** (ex: `Direito Tributário`).
4. Digite o **Assunto** (ex: `ICMS`).
5. Selecione a **Banca** (ex: `FCC`).
6. Salve.
7. Clique no registro recém-criado e clique no botão **"Acessar QConcursos"**.
8. O navegador abrirá automaticamente no QConcursos com todos os filtros aplicados e apenas questões com gabarito comentado!

---

## 🧠 Lógica da Integração

A integração funciona convertendo seus parâmetros de busca em uma URL otimizada para o sistema de busca do QConcursos. 
- O campo `q=` lida com a disciplina e assunto de forma inteligente.
- O campo `examining_board_ids[]=` mapeia a banca para o ID interno do QConcursos.
- O parâmetro `with_commented_feedback=true` garante que você só veja questões de alta qualidade.
