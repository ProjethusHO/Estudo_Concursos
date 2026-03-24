import os
from pathlib import Path

def generate_dynamic_blog_html(output_path, github_user="NOME_USUARIO", github_repo="NOME_REPOSITORIO"):
    # URL base para buscar o JSON do GitHub
    raw_url = f"https://raw.githubusercontent.com/{github_user}/{github_repo}/main/materiais_prioritarios.json"
    
    html_template = f"""
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Curadoria Fiscal Dinâmica</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body {{ font-family: 'Inter', sans-serif; background-color: #0d0d0d; color: white; }}
            .netflix-red {{ color: #E50914; }}
            .bg-netflix-red {{ background-color: #E50914; }}
            .glass {{ background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }}
            .shimmer {{
                background: linear-gradient(90deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite;
            }}
            @keyframes shimmer {{
                0% {{ background-position: -200% 0; }}
                100% {{ background-position: 200% 0; }}
            }}
        </style>
    </head>
    <body class="p-4 md:p-10">
        <div class="max-w-5xl mx-auto space-y-12">
            <header class="text-center space-y-4">
                <h1 class="text-5xl md:text-7xl font-black tracking-tighter netflix-red">CURADORIA <span class="text-white">LIVE</span></h1>
                <p class="text-gray-400 text-lg uppercase tracking-widest text-xs">Sincronizado com o GitHub</p>
                <div class="h-1 w-20 bg-netflix-red mx-auto"></div>
            </header>

            <!-- Loading State -->
            <div id="loading" class="space-y-8 animate-pulse">
                <div class="h-48 glass rounded-3xl shimmer"></div>
                <div class="grid grid-cols-2 gap-8">
                    <div class="h-40 glass rounded-xl shimmer"></div>
                    <div class="h-40 glass rounded-xl shimmer"></div>
                </div>
            </div>

            <div id="content" class="hidden space-y-12">
                <!-- Hype Section -->
                <section id="hype-section" class="glass rounded-3xl p-8 border-l-8 border-netflix-red shadow-2xl">
                    <h2 class="text-2xl font-black mb-6 italic">🔥 TENDÊNCIAS & HYPE</h2>
                    <div id="hype-grid" class="grid md:grid-cols-2 gap-6"></div>
                </section>

                <!-- Videos Section -->
                <section class="space-y-10">
                    <h2 class="text-3xl font-black border-b border-gray-800 pb-4 uppercase tracking-tighter">📚 Materiais do Edital</h2>
                    <div id="video-grid" class="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
                </section>

                <!-- Provas Section -->
                <section id="provas-section" class="glass rounded-3xl p-8 bg-opacity-10">
                    <h2 class="text-2xl font-black mb-6 uppercase tracking-tighter">📂 Provas e Questões</h2>
                    <div id="provas-tree" class="space-y-6 font-mono text-sm border-l border-gray-800 pl-4"></div>
                </section>
            </div>

            <footer class="text-center py-10 border-t border-gray-900 opacity-50">
                <p class="text-[10px] uppercase tracking-[0.3em]">© 2026 Antigravity Live - <a href="https://github.com/{github_user}/{github_repo}" class="underline">Ver Código no GitHub</a></p>
            </footer>
        </div>

        <script>
            const DATA_URL = "{raw_url}";

            async function loadData() {{
                try {{
                    const response = await fetch(DATA_URL);
                    if (!response.ok) throw new Error("Falha ao carregar dados do GitHub");
                    const data = await response.json();
                    renderContent(data);
                }} catch (err) {{
                    console.error(err);
                    document.getElementById("loading").innerHTML = `
                        <div class="text-center py-10 bg-red-900 bg-opacity-20 rounded-xl border border-red-500">
                            <p class="text-red-400 font-bold">Erro ao sincronizar com o GitHub.</p>
                            <p class="text-xs text-gray-500 mt-2">Verifique se o repositório é público e o link do JSON está correto.</p>
                        </div>
                    `;
                }}
            }}

            // Utilitário de sanitização: escapa caracteres HTML para prevenir XSS
            function escapeHtml(str) {{
                if (typeof str !== 'string') return '';
                return str
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
            }}

            function renderContent(data) {{
                const hypeGrid = document.getElementById("hype-grid");
                const videoGrid = document.getElementById("video-grid");
                const provasTree = document.getElementById("provas-tree");

                // Render Hype (usando escapeHtml para prevenir XSS)
                data.forEach(cat => {{
                    if (cat.comentarios) {{
                        cat.comentarios.forEach(c => {{
                            const card = document.createElement('div');
                            card.className = 'bg-black bg-opacity-40 p-5 rounded-2xl border border-gray-800';

                            const texto = document.createElement('p');
                            texto.className = 'text-sm italic text-gray-300';
                            texto.textContent = '"' + c.texto + '"';

                            const meta = document.createElement('div');
                            meta.className = 'mt-4 flex justify-between items-center';

                            const usuario = document.createElement('span');
                            usuario.className = 'text-xs font-bold text-netflix-red underline';
                            usuario.textContent = '@' + c.usuario;

                            const fonte = document.createElement('span');
                            fonte.className = 'text-[10px] bg-red-900 px-2 py-0.5 rounded text-red-100 uppercase font-black';
                            fonte.textContent = c.fonte;

                            meta.appendChild(usuario);
                            meta.appendChild(fonte);
                            card.appendChild(texto);
                            card.appendChild(meta);
                            hypeGrid.appendChild(card);
                        }});
                    }}

                    // Render Videos (usando escapeHtml para prevenir XSS)
                    if (cat.videos) {{
                        cat.videos.forEach(v => {{
                            const urlParams = new URLSearchParams(v.url.split('?')[1] || '');
                            const videoId = escapeHtml(urlParams.get('v') || '');

                            const wrapper = document.createElement('div');
                            wrapper.className = 'group border border-gray-900 p-2 rounded-2xl hover:bg-gray-900 transition-all';

                            const imgWrapper = document.createElement('div');
                            imgWrapper.className = 'relative rounded-xl overflow-hidden mb-4 aspect-video';

                            const img = document.createElement('img');
                            img.src = 'https://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
                            img.className = 'w-full grayscale group-hover:grayscale-0 transition-all duration-700';
                            img.alt = escapeHtml(v.titulo);

                            const titulo = document.createElement('h3');
                            titulo.className = 'font-bold text-sm text-gray-200';
                            titulo.textContent = v.titulo;

                            const categoria = document.createElement('p');
                            categoria.className = 'text-[10px] text-netflix-red font-black mt-1 uppercase';
                            categoria.textContent = cat.categoria;

                            imgWrapper.appendChild(img);
                            wrapper.appendChild(imgWrapper);
                            wrapper.appendChild(titulo);
                            wrapper.appendChild(categoria);
                            videoGrid.appendChild(wrapper);
                        }});
                    }}

                    // Render Provas (usando textContent e href validado para prevenir XSS)
                    if (cat.provas) {{
                        const catDiv = document.createElement('div');
                        catDiv.className = 'mb-4';

                        const catLabel = document.createElement('span');
                        catLabel.className = 'text-netflix-red font-bold';
                        catLabel.textContent = '📁 ' + cat.categoria;

                        const provasList = document.createElement('div');
                        provasList.className = 'ml-4 space-y-1 mt-1';

                        cat.provas.forEach(p => {{
                            const item = document.createElement('div');
                            item.className = 'text-gray-500';

                            const link = document.createElement('a');
                            // Valida que a URL começa com http/https antes de atribuir
                            const safeUrl = (p.url && /^https?:\/\//i.test(p.url)) ? p.url : '#';
                            link.href = safeUrl;
                            link.target = '_blank';
                            link.rel = 'noopener noreferrer';
                            link.className = 'hover:text-white';
                            link.textContent = p.titulo + ' (' + p.ano + ')';

                            item.appendChild(document.createTextNode('📄 '));
                            item.appendChild(link);
                            provasList.appendChild(item);
                        }});

                        catDiv.appendChild(catLabel);
                        catDiv.appendChild(provasList);
                        provasTree.appendChild(catDiv);
                    }}
                }});

                document.getElementById("loading").classList.add("hidden");
                document.getElementById("content").classList.remove("hidden");
            }}

            loadData();
        </script>
    </body>
    </html>
    """
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_template)
    
    print(f"✅ Relatório DINÂMICO gerado em: {output_path}")

if __name__ == "__main__":
    # Caminho de saída relativo ao diretório do próprio script (portável e seguro)
    out_path = Path(__file__).parent / "relatorio_blogspot_dinamico.html"
    generate_dynamic_blog_html(str(out_path))
