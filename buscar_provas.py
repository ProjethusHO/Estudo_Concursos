import argparse
import os
from pathlib import Path

def buscar_e_salvar_provas(query: str):
    """
    Realiza a busca de provas com base no termo solicitado
    e salva os resultados no diretório materiais/Provas.
    """
    project_root = Path(__file__).parent.resolve()
    provas_dir = project_root / "materiais" / "Provas"
    
    # Criar diretório caso não exista
    provas_dir.mkdir(parents=True, exist_ok=True)
    
    nome_arquivo = query.replace(" ", "_").replace("/", "_") + ".md"
    dest_path = provas_dir / nome_arquivo
    
    # Simulando a busca/salvamento do resultado
    # Em uma versão completa, isso acionaria crawlers ou APIs (ex: QConcursos) 
    # para baixar os PDFs reais.
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(f"# Resultados da Busca de Provas\n\n")
        f.write(f"**Consulta:** {query}\n\n")
        f.write("> As provas relativas a esta requisição devem ser anexadas a este documento ou armazenadas nesta mesma pasta no formato PDF.\n")
        
    print(f"✅ Arquivo para alocar as provas de '{query}' criado em: {dest_path.relative_to(project_root)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Busca e aloca provas solicitadas pelos usuários.")
    parser.add_argument("query", type=str, nargs="+", help="Termos da busca (Ex: FCC Auditor ICMS)")
    args = parser.parse_args()
    
    termo = " ".join(args.query)
    buscar_e_salvar_provas(termo)
