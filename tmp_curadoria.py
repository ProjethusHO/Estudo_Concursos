import urllib.request
import re
import urllib.parse
import json

queries = [
    "Legislação Tributária SEFAZ GO",
    "Tecnologia da Informação Concurso SEFAZ",
    "Auditoria Fiscal SEFAZ GO",
    "Contabilidade Avançada Concurso Fiscal",
    "Direito Tributário SEFAZ FCC",
    "Reforma Tributária Concurso 2024 2025"
]

results = []
for title in queries:
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(title)
    html = urllib.request.urlopen(url).read().decode('utf-8')
    # Find all watch?v= IDs
    ids = re.findall(r'watch\?v=([a-zA-Z0-9_-]{11})', html)
    if not ids:
        continue
    video_id = ids[0]
    
    # Try to grab the title somewhere in the first snippet
    title_match = re.search(r'"title":\{"runs":\[\{"text":"(.*?)"\}\]', html)
    video_title = title_match.group(1).replace('"', '') if title_match else f"Video de {title}"
    
    results.append({"subject": title, "videoId": video_id, "title": video_title})

print(json.dumps(results, indent=2))
