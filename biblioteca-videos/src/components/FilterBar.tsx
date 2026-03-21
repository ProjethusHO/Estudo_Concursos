import React from 'react';

interface FilterBarProps {
  subjects: string[];
  contests: string[];
  selectedSubject: string;
  selectedContest: string;
  onSubjectChange: (val: string) => void;
  onContestChange: (val: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  subjects, contests, selectedSubject, selectedContest, onSubjectChange, onContestChange, searchQuery, onSearchChange 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 bg-black bg-opacity-70 p-6 rounded-lg border border-gray-800 backdrop-blur-md sticky top-0 z-40 shadow-xl">
      <div className="flex-1">
        <label className="block text-xs text-gray-400 mb-1 font-semibold tracking-wider">BUSCAR AULA</label>
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Ex: Licitações, Crase..."
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-md pl-10 pr-4 py-2.5 outline-none focus:border-netflixRed transition-colors"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold tracking-wider">CONCURSO</label>
          <select 
            className="w-full md:w-56 bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2.5 outline-none focus:border-netflixRed transition-colors appearance-none"
            value={selectedContest}
            onChange={(e) => onContestChange(e.target.value)}
          >
            <option value="">Todos os Concursos</option>
            {contests.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1 font-semibold tracking-wider">MATÉRIA</label>
          <select 
            className="w-full md:w-56 bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2.5 outline-none focus:border-netflixRed transition-colors appearance-none"
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
          >
            <option value="">Todas as Matérias</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
