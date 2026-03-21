import argparse
import shutil
from pathlib import Path

def resetar_ambiente():
    """Limpa todo o conteúdo gerado dentro de materiais/, resetando o ambiente."""
    project_root = Path(__file__).parent
    materiais_dir = project_root / "materiais"
    
    pastas_alvo = [
        materiais_dir / "editais",
        materiais_dir / "legislacao",
        materiais_dir / "hype",
    ]
    
    print("🧹 Iniciando limpeza do ambiente de estudos...")
    
    # Apagar diretórios e seu conteúdo
    for pasta in pastas_alvo:
        if pasta.exists():
            # Excluir todo o conteúdo da pasta
            for item in pasta.iterdir():
                if item.is_file():
                    item.unlink()
                elif item.is_dir():
                    shutil.rmtree(item)
            print(f" - Conteúdo de '{pasta.relative_to(project_root)}' apagado.")
        else:
            pasta.mkdir(parents=True, exist_ok=True)
            
    # Arquivos soltos na raiz de materiais também podem ser arquivos de estudo gerados (guias, etc)
    for item in materiais_dir.iterdir():
        if item.is_file() and item.name != ".gitkeep":
            item.unlink()
            print(f" - Arquivo '{item.name}' apagado de materiais/")

    # Garantir que a estrutura base continue existindo
    for pasta in pastas_alvo:
        pasta.mkdir(parents=True, exist_ok=True)
        # Opcional: criar .gitkeep para manter controle de versão da pasta vazia
        (pasta / ".gitkeep").touch()
        
    print("\n✅ Ambiente resetado com sucesso! A estrutura está limpa e pronta para um novo edital.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Reseta o ambiente, apagando todos os editais, legislações e materiais de estudo gerados.")
    # Permite passar flag para confirmação se necessário
    parser.add_argument("-y", "--yes", action="store_true", help="Confirma a exclusão sem perguntar.")
    args = parser.parse_args()
    
    if args.yes:
        resetar_ambiente()
    else:
        confirm = input("⚠️ ATENÇÃO: Isso vai apagar TODOS os arquivos de estudo e editais. Tem certeza? (s/n): ")
        if confirm.lower() == 's':
            resetar_ambiente()
        else:
            print("Operação cancelada.")
