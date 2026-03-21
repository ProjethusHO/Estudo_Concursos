import argparse
import urllib.parse

def search_hype(topic: str) -> dict:
    """
    Retorna URLs de busca com parâmetros para encontrar artigos de blogs
    e vídeos de vlogs (YouTube) recentes sobre o tópico quente do edital.
    """
    yt_query = urllib.parse.quote_plus(f"{topic} concurso")
    youtube_url = f"https://www.youtube.com/results?search_query={yt_query}"
    
    blog_query = urllib.parse.quote_plus(f"{topic} (Estratégia OR Direção OR Gran Cursos)")
    google_url = f"https://www.google.com/search?q={blog_query}"
    
    print(f"🎥 YouTube (VlogHype): {youtube_url}")
    print(f"📝 Google (BlogHype): {google_url}")
    
    return {"youtube": youtube_url, "blog": google_url}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Busca tendências (hype) sobre um tópico do edital.")
    parser.add_argument("topic", type=str, help="Tópico do edital em alta (ex: 'Reforma Tributária 2026')")
    args = parser.parse_args()
    
    search_hype(args.topic)
