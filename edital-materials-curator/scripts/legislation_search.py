import argparse
import urllib.parse
from typing import List

def search_legislation(query: str) -> List[str]:
    """
    Simula uma busca para retornar o link oficial do Portal do Planalto ou afim para a legislação.
    Na prática, o agente lerá este script ou executará para obter a query de busca correta.
    """
    encoded_query = urllib.parse.quote_plus(f"{query} site:planalto.gov.br")
    url = f"https://www.google.com/search?q={encoded_query}"
    
    # Placeholder: O agente extrairá o primeiro link real ou utilizará a URL montada.
    print(f"🔍 URL para busca de legislação: {url}")
    return [url]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Script para buscar legislação oficial orientada ao edital.")
    parser.add_argument("query", type=str, help="Nome da Lei ou Decreto (ex: 'Lei 8666')")
    args = parser.parse_args()
    
    search_legislation(args.query)
