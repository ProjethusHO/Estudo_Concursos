#!/usr/bin/env python3
"""
Gerador de URLs pré-configuradas para o QConcursos.
Este script cria links diretos que aplicam filtros automaticamente na plataforma.
"""

import urllib.parse
import json

# Mapeamento de Bancas comuns para IDs (Aproximado para demonstração)
BANCAS_MAP = {
    "FCC": "2",
    "CEBRASPE": "1",
    "CESPE": "1",
    "FGV": "3",
    "VUNESP": "4"
}

def generate_qconcursos_url(disciplina="", assunto="", banca="", cargo="", ano=""):
    """
    Gera uma URL de busca pré-configurada para o QConcursos.
    """
    base_url = "https://www.qconcursos.com/questoes-de-concursos/questoes"
    params = []
    
    # Adiciona filtros como palavra-chave (keyword search)
    # Como não temos os IDs exatos de todas as disciplinas/assuntos, 
    # a busca por palavra-chave combinada com filtros exatos é a melhor estratégia
    
    keywords = []
    if disciplina:
        keywords.append(disciplina)
    if assunto:
        keywords.append(assunto)
    if cargo:
        keywords.append(cargo)
        
    if keywords:
        query = " ".join(keywords)
        params.append(f"q={urllib.parse.quote(query)}")
        
    if banca and banca.upper() in BANCAS_MAP:
        params.append(f"examining_board_ids[]={BANCAS_MAP[banca.upper()]}")
        
    if ano:
        params.append(f"publication_year[]={ano}")
        
    # Sempre buscar questões com gabarito comentado
    params.append("with_commented_feedback=true")
    
    query_string = "&".join(params)
    
    if query_string:
        return f"{base_url}?{query_string}"
    return base_url

def main():
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--json":
        # Modo API para integração
        data = json.loads(sys.argv[2])
        url = generate_qconcursos_url(
            disciplina=data.get("disciplina", ""),
            assunto=data.get("assunto", ""),
            banca=data.get("banca", ""),
            cargo=data.get("cargo", ""),
            ano=data.get("ano", "")
        )
        print(json.dumps({"url": url}))
    else:
        # Modo CLI interativo
        print("Gerador de URLs do QConcursos")
        disciplina = input("Disciplina (ex: Direito Tributário): ")
        assunto = input("Assunto (ex: ICMS): ")
        banca = input("Banca (ex: FCC): ")
        cargo = input("Cargo (ex: Auditor Fiscal): ")
        ano = input("Ano (ex: 2024): ")
        
        url = generate_qconcursos_url(disciplina, assunto, banca, cargo, ano)
        print("\nURL Gerada:")
        print(url)

if __name__ == "__main__":
    main()
