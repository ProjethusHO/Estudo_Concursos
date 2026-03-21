import { useState, useMemo } from 'react';
import type { Video } from './types/video';
import { FilterBar } from './components/FilterBar';
import { Catalog } from './components/Catalog';
import { FileExplorer } from './components/FileExplorer';
import { HypeSection } from './components/HypeSection';

// Configuração Dinâmica por Concurso (Simulando leitura de múltiplos editais)
const CONTEXT_DATA: Record<string, { subjects: string[], tree: any[], hype: any[] }> = {
  'SEFAZ GO': {
    subjects: ['Legislação Tributária', 'Tecnologia da Informação', 'Reforma Tributária', 'Auditoria', 'Contabilidade'],
    tree: [
      {
        id: 'root-lte',
        name: 'Legislação Tributária Estadual (GO)',
        type: 'folder' as const,
        children: [
          { id: 'f-icms', name: 'ICMS - Questões FCC (Goiás)', type: 'file' as const, url: 'https://www.qconcursos.com/questoes-de-concursos/questoes?q=ICMS%20Goi%C3%A1s&examining_board_ids[]=2&with_commented_feedback=true' },
          { id: 'f-pat', name: 'PAT - Processo Administrativo Tributário (GO)', type: 'file' as const, url: 'https://www.qconcursos.com/questoes-de-concursos/questoes?q=Processo%20Administrativo%20Tribut%C3%A1rio%20Goi%C3%A1s' }
        ]
      },
      {
        id: 'root-ti',
        name: 'Tecnologia da Informação (GO)',
        type: 'folder' as const,
        children: [
          { id: 'f-python', name: 'Python e Ciência de Dados (FCC)', type: 'file' as const, url: 'https://www.qconcursos.com/questoes-de-concursos/questoes?q=Python%20Ciencia%20de%20Dados&examining_board_ids[]=2' }
        ]
      }
    ],
    hype: [
      { id: 'h1', user: 'Fisco_Guru', text: 'O edital da SEFAZ GO veio pesado em TI. Foquem em Séries Temporais!', source: 'YouTube' as const, subject: 'TI', date: '21 Mar' },
      { id: 'h2', user: 'Concurseiro_Hype', text: 'A LC 214/2025 é leitura obrigatória para Auditor. Mudou tudo no IBS.', source: 'Hippy' as const, subject: 'Reforma', date: 'Hoje' },
      { id: 'h3', user: 'Mestre_LTE', text: 'A parte de benefícios fiscais (PRODUZIR/FOMENTAR) sempre cai em Goiás pela FCC.', source: 'Insta' as const, subject: 'LTE', date: '2h atrás' }
    ]
  },
  'SEFAZ SP': {
    subjects: ['Direito Tributário', 'Contabilidade Geral', 'Economia', 'TI'],
    tree: [
      {
        id: 'root-sp',
        name: 'Edital Estratégico SEFAZ SP',
        type: 'folder' as const,
        children: [
          { id: 'f-sp-tax', name: 'ICMS SP - Regulamento Atualizado', type: 'file' as const, url: 'https://www.qconcursos.com/questoes-de-concursos/questoes?q=ICMS%20S%C3%A3o%20Paulo' }
        ]
      }
    ],
    hype: [
      { id: 'hs1', user: 'SP_Fiscal', text: 'Boatos de edital da SEFAZ SP saindo em breve. Banca FCC quase confirmada.', source: 'Blog' as const, subject: 'Notícias', date: '18 Mar' }
    ]
  }
};

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Questões Avançadas FCC - Legislação GO',
    subject: 'Legislação Tributária',
    contest: 'SEFAZ GO',
    thumbnailUrl: 'https://img.youtube.com/vi/sTERnH0hAZc/mqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/sTERnH0hAZc'
  },
  {
    id: '2',
    title: 'Aprofundamento ICMS #1 - SEFAZ-GO',
    subject: 'Legislação Tributária',
    contest: 'SEFAZ GO',
    thumbnailUrl: 'https://img.youtube.com/vi/jNnPaBU8Jm4/mqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/jNnPaBU8Jm4'
  },
  {
    id: '3',
    title: 'TI para Fiscos - Fluência em Dados',
    subject: 'Tecnologia da Informação',
    contest: 'SEFAZ GO',
    thumbnailUrl: 'https://img.youtube.com/vi/vcEJFPjIa0k/mqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vcEJFPjIa0k'
  },
  {
    id: '4',
    title: 'Reforma Tributária 2025 - LC 214',
    subject: 'Reforma Tributária',
    contest: 'SEFAZ GO',
    thumbnailUrl: 'https://img.youtube.com/vi/CnWqHStOiFE/mqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/CnWqHStOiFE'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedContest, setSelectedContest] = useState('SEFAZ GO');

  // Metadados dinâmicos baseados no concurso
  const currentContext = useMemo(() => CONTEXT_DATA[selectedContest] || { subjects: [], tree: [], hype: [] }, [selectedContest]);
  const subjects = useMemo(() => currentContext.subjects, [currentContext]);
  const contests = useMemo(() => Object.keys(CONTEXT_DATA), []);

  // Lógica de Filtragem de Vídeos
  const filteredVideos = useMemo(() => {
    return MOCK_VIDEOS.filter(video => {
      const matchSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = selectedSubject ? video.subject === selectedSubject : true;
      const matchContest = video.contest === selectedContest;
      
      return matchSearch && matchSubject && matchContest;
    });
  }, [searchQuery, selectedSubject, selectedContest]);

  const videosBySubject = useMemo(() => {
    const grouped: Record<string, Video[]> = {};
    filteredVideos.forEach(v => {
      if (!grouped[v.subject]) grouped[v.subject] = [];
      grouped[v.subject].push(v);
    });
    return grouped;
  }, [filteredVideos]);

  return (
    <div className="min-h-screen bg-netflixDark text-white pb-20">
      <header className="px-4 md:px-12 py-8 bg-gradient-to-b from-black via-black to-transparent border-b border-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-netflixRed tracking-tighter">
              ANTIGRAVITY <span className="text-white">EDITS</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Curadoria Inteligente de Editais e Videoaulas</p>
          </div>
          <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
            {contests.map(c => (
              <button
                key={c}
                onClick={() => setSelectedContest(c)}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  selectedContest === c ? 'bg-netflixRed text-white shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 md:px-12 max-w-7xl mx-auto mt-8 space-y-12">
        <FilterBar 
          subjects={subjects}
          contests={[]} // Escondido pois o seletor está no header
          selectedSubject={selectedSubject}
          selectedContest={selectedContest}
          onSubjectChange={setSelectedSubject}
          onContestChange={() => {}} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* FEED DE HYPE (CORREÇÃO DE VISIBILIDADE) */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <HypeSection messages={currentContext.hype} />
        </section>

        {/* CATALOGO DE VÍDEOS */}
        <section className="space-y-8">
          {Object.keys(videosBySubject).length > 0 ? (
            Object.entries(videosBySubject).map(([subjectTitle, videos]) => (
              <Catalog 
                key={subjectTitle}
                title={subjectTitle}
                videos={videos}
              />
            ))
          ) : (
            <div className="py-20 text-center bg-gray-900 bg-opacity-30 rounded-2xl border border-dashed border-gray-800">
              <p className="text-gray-500 font-medium">Nenhuma aula disponível para este filtro.</p>
            </div>
          )}
        </section>

        {/* BANCO DE PROVAS ( TREE VIEW ) */}
        <section className="pb-12">
          <FileExplorer data={currentContext.tree} />
        </section>
      </main>
    </div>
  );
}
