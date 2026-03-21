#!/usr/bin/env python3
"""
Script para gerar queries de busca para provas anteriores de concursos.
"""

import argparse
import urllib.parse

def generate_queries(concurso, banca, cargo):
    """Gera queries otimizadas para busca de provas anteriores."""
    queries = [
        f"prova anterior {concurso} {banca} {cargo} pdf",
        f"download prova {concurso} {banca}",
        f"questões {banca} {cargo} pdf",
        f"simulado {concurso} {banca} pdf",
        f"site:qconcursos.com provas {concurso} {banca}",
        f"site:tecconcursos.com.br provas {concurso} {banca}"
    ]
    return queries

def main():
    parser = argparse.ArgumentParser(description="Gera queries de busca para provas anteriores")
    parser.add_argument("concurso", help="Nome do concurso (ex: 'SEFAZ GO')")
    parser.add_argument("banca", help="Nome da banca (ex: 'FCC')")
    parser.add_argument("cargo", help="Nome do cargo (ex: 'Auditor Fiscal')")
    
    args = parser.parse_args()
    
    queries = generate_queries(args.concurso, args.banca, args.cargo)
    
    print(f"\nBuscas recomendadas para provas de {args.concurso} ({args.banca}):\n")
    for i, query in enumerate(queries, 1):
        url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
        print(f"{i}. Query: '{query}'")
        print(f"   URL:   {url}\n")

if __name__ == "__main__":
    main()
