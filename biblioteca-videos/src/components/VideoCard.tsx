import React, { useState } from 'react';
import type { Video } from '../types/video';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 flex-shrink-0 w-64 md:w-80 h-36 md:h-44 rounded-md overflow-hidden bg-gray-900"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <svg className="w-12 h-12 text-white bg-netflixRed bg-opacity-80 rounded-full p-2" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
           </svg>
        </div>

        {/* Info Gradient Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-netflixDark to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-sm truncate w-full">{video.title}</h3>
          <p className="text-gray-300 text-xs mt-1">{video.subject}</p>
        </div>
      </div>

      {/* Modal Iframe */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 animate-in fade-in duration-200">
          <div className="bg-netflixDark border border-gray-800 rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden relative">
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-netflixRed rounded-full p-2 z-10 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 overflow-y-auto max-h-[40vh]">
              <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
              <div className="flex space-x-4 text-sm font-semibold text-gray-400 mb-6">
                <span className="text-netflixRed border border-netflixRed px-2 py-0.5 rounded text-xs">{video.contest}</span>
                <span>•</span>
                <span>{video.subject}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Section: Provas */}
                {video.exams && video.exams.length > 0 && (
                  <div>
                    <h3 className="text-netflixRed font-bold uppercase text-xs tracking-widest mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Provas Relacionadas
                    </h3>
                    <ul className="space-y-2">
                      {video.exams.map(exam => (
                        <li key={exam.id} className="bg-gray-800 bg-opacity-50 p-3 rounded-md border border-gray-700 hover:border-netflixRed transition-colors">
                          <a href={exam.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center group">
                            <div>
                              <p className="text-sm font-medium text-white group-hover:text-netflixRed transition-colors">{exam.title}</p>
                              <p className="text-xs text-gray-500">{exam.year}</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-600 group-hover:text-netflixRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section: Comentários / Hype */}
                {video.comments && video.comments.length > 0 && (
                  <div>
                    <h3 className="text-netflixRed font-bold uppercase text-xs tracking-widest mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      Hype / Comentários
                    </h3>
                    <div className="space-y-3">
                      {video.comments.map(comment => (
                        <div key={comment.id} className="bg-netflixDark border-l-4 border-netflixRed p-3 rounded-r-md shadow-md">
                          <p className="text-xs font-bold text-netflixRed mb-1">@{comment.user} <span className="text-gray-600 font-normal italic ml-2">via {comment.source}</span></p>
                          <p className="text-sm text-gray-200 leading-relaxed italic">"{comment.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
