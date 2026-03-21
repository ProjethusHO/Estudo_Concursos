import argparse
import shutil
import os
from pathlib import Path

def carregar_edital(pdf_path: str):
    """Copia o edital fornecido para a pasta de editais, preparando o ambiente."""
    source = Path(pdf_path)
    if not source.exists() or not source.is_file():
        print(f"❌ Erro: O arquivo '{pdf_path}' não foi encontrado.")
        return

    # Sempre colocar o path relativo ao projeto atual
    project_root = Path(__file__).parent
    editais_dir = project_root / "materiais" / "editais"
    
    # Criar diretórios caso não existam
    editais_dir.mkdir(parents=True, exist_ok=True)

    dest = editais_dir / source.name

    try:
        shutil.copy2(source, dest)
        print(f"✅ Edital '{source.name}' carregado com sucesso em: {dest.relative_to(project_root)}")
        print("🚀 O ambiente está pronto para que os agentes iniciem a curadoria!")
    except Exception as e:
        print(f"❌ Erro ao mover o edital: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Carrega um edital para iniciar um novo ciclo de estudos.")
    parser.add_argument("pdf_path", type=str, help="Caminho do arquivo PDF do edital a ser carregado.")
    args = parser.parse_args()
    
    carregar_edital(args.pdf_path)
