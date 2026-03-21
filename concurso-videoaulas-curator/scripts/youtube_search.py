#!/usr/bin/env python3
"""
Script para ajudar na busca de videoaulas no YouTube para concursos.
Este script serve como um utilitário para gerar queries de busca otimizadas.
"""

import argparse
import urllib.parse

def generate_queries(concurso, disciplina, banca=""):
    """Gera queries otimizadas para busca no YouTube."""
    queries = [
        f"{disciplina} {concurso} videoaula",
        f"{disciplina} {concurso} reta final",
        f"{disciplina} concurso {concurso}",
    ]
    
    if banca:
        queries.append(f"{disciplina} {concurso} banca {banca}")
        queries.append(f"{disciplina} questões {banca} {concurso}")
        
    return queries

def main():
    parser = argparse.ArgumentParser(description="Gera queries de busca para videoaulas de concursos")
    parser.add_argument("concurso", help="Nome do concurso (ex: 'SEFAZ GO')")
    parser.add_argument("disciplina", help="Nome da disciplina (ex: 'Direito Tributário')")
    parser.add_argument("--banca", help="Nome da banca (ex: 'FCC')", default="")
    
    args = parser.parse_args()
    
    queries = generate_queries(args.concurso, args.disciplina, args.banca)
    
    print(f"\nBuscas recomendadas para {args.disciplina} ({args.concurso}):\n")
    for i, query in enumerate(queries, 1):
        url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}"
        print(f"{i}. Query: '{query}'")
        print(f"   URL:   {url}\n")

if __name__ == "__main__":
    main()
